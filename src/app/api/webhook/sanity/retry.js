// Retry utility for webhook operations
export class WebhookRetryHandler {
  constructor(maxRetries = 3, baseDelay = 1000) {
    this.maxRetries = maxRetries;
    this.baseDelay = baseDelay;
  }

  async executeWithRetry(operation, context = {}) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await operation();
        
        if (attempt > 1) {
          console.log(`Operation succeeded on attempt ${attempt}`, context);
        }
        
        return result;
      } catch (error) {
        lastError = error;
        
        console.warn(`Operation failed on attempt ${attempt}/${this.maxRetries}:`, {
          error: error.message,
          context,
          attempt
        });
        
        // Don't wait after the last attempt
        if (attempt < this.maxRetries) {
          const delay = this.calculateDelay(attempt);
          await this.sleep(delay);
        }
      }
    }
    
    console.error(`Operation failed after ${this.maxRetries} attempts:`, {
      error: lastError.message,
      context
    });
    
    throw lastError;
  }

  calculateDelay(attempt) {
    // Exponential backoff with jitter
    const exponentialDelay = this.baseDelay * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 0.1 * exponentialDelay;
    return Math.min(exponentialDelay + jitter, 10000); // Max 10 seconds
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Specific retry operations for webhook tasks
export const webhookRetryOperations = {
  revalidatePath: (revalidatePath, path, type = 'page') => {
    const retryHandler = new WebhookRetryHandler(2, 500); // Quick retries for revalidation
    
    return retryHandler.executeWithRetry(
      () => {
        revalidatePath(path, type);
        return { success: true, path, type };
      },
      { operation: 'revalidatePath', path, type }
    );
  },

  fetchSitemap: (url, options = {}) => {
    const retryHandler = new WebhookRetryHandler(3, 1000);
    
    return retryHandler.executeWithRetry(
      async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        try {
          const response = await fetch(url, {
            ...options,
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          return response;
        } catch (error) {
          clearTimeout(timeoutId);
          throw error;
        }
      },
      { operation: 'fetchSitemap', url }
    );
  },

  parseWebhookPayload: (body) => {
    const retryHandler = new WebhookRetryHandler(2, 100);
    
    return retryHandler.executeWithRetry(
      () => {
        if (typeof body === 'string') {
          return JSON.parse(body);
        }
        return body;
      },
      { operation: 'parseWebhookPayload' }
    );
  }
};

// Circuit breaker for preventing cascade failures
export class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  async execute(operation, context = {}) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
        console.log('Circuit breaker moving to HALF_OPEN state', context);
      } else {
        throw new Error('Circuit breaker is OPEN - operation blocked');
      }
    }

    try {
      const result = await operation();
      
      if (this.state === 'HALF_OPEN') {
        this.reset();
        console.log('Circuit breaker reset to CLOSED state', context);
      }
      
      return result;
    } catch (error) {
      this.recordFailure();
      
      if (this.state === 'HALF_OPEN') {
        this.state = 'OPEN';
        console.log('Circuit breaker opened due to failure in HALF_OPEN state', context);
      }
      
      throw error;
    }
  }

  recordFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      console.log(`Circuit breaker opened after ${this.failureCount} failures`);
    }
  }

  reset() {
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED';
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime
    };
  }
}