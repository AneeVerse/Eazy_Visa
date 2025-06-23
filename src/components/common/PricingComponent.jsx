import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PricingComponent = ({ 
  plans, 
  showBadge = true, 
  onPlanClick, 
  buttonText = "Get Started",
  enableAnimation = false,
  className = "grid gap-12 lg:gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0"
}) => {
  const CardComponent = enableAnimation ? motion.div : 'div';
  
  return (
    <div className={className}>
      {plans.map((plan, index) => (
        <CardComponent 
          key={index}
          {...(enableAnimation && {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: index * 0.1 }
          })}
          className={`relative rounded-2xl backdrop-blur-sm bg-white/70 border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1
            ${plan.popular ? 'ring-2 ring-blue-500/50 shadow-blue-100/50' : ''}`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
          )}

          {showBadge && (
            <div className="absolute top-[-50px] right-0 p-2">
              <img src='/images/pricing/hourly-badge1.png' alt="hourly" className="w-20 h-20" />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                {plan.icon && <plan.icon className="text-blue-600 text-3xl mb-3" />}
                <h2 className="text-xl mb-5 font-bold text-gray-900">{plan.name}</h2>
              </div>
            </div>
            
            <div className="mb-3 flex items-baseline">
              <p className="text-3xl font-bold text-blue-600">
                ₹{plan.price}
              </p>
              <p className="text-black mb-5 font-semibold text-[13px]">/{plan.billing}</p>
            </div>
            <p 
              style={{"color": `${plan.popular ? "#0B82E6":""}`}} 
              className={`${plan.note != "" ? " mt-[-6px]  ":" hidden "}text-black mb-5 font-semibold text-[12px]`}
            >
              {plan.note}
            </p>
            
            {onPlanClick ? (
              <button 
                onClick={() => onPlanClick(plan)}
                className={`w-full block text-center py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 mb-6 shadow-sm
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-md' 
                    : 'bg-white text-gray-800 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
              >
                {buttonText}
              </button>
            ) : (
              <Link 
                href={plan.url} 
                className={`w-full block text-center py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 mb-6 shadow-sm
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-md' 
                    : 'bg-white text-gray-800 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
              >
                {buttonText}
              </Link>
            )}
          </div>
          
          <div className="border-t border-gray-200/50 px-6 pt-5 pb-6 bg-white/30">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What&apos;s included:</h3>
            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mr-2 mt-0.5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FaCheck className="h-3 w-3" />
                  </div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardComponent>
      ))}
    </div>
  );
};

export default PricingComponent; 