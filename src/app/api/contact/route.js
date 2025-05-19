import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const { name, email, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'All fields are required!'
        }),
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Please enter a valid email address'
        }),
        { status: 400 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    // Generate timestamp in 24-hour format
    const now = new Date();
    const timestamp = now.toLocaleString('en-GB', { hour12: false }); // 24-hour format

    // Email options
    const mailOptions = {
      from: `"EazyVisas Contact Form" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Message</h1>
          </div>
          
          <div style="padding: 20px; background: #ffffff;">
            <div style="margin-bottom: 15px;">
              <h2 style="color: #2563eb; margin-bottom: 5px; font-size: 18px;">Contact Details</h2>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Submitted At:</strong> ${timestamp}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 5px;">
              <h2 style="color: #2563eb; margin-bottom: 5px; font-size: 18px;">Message</h2>
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">This email was sent from the EazyVisas contact form.</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        --------------------------
        Name: ${name}
        Email: ${email}
        Submitted At: ${timestamp}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Message sent successfully!'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending contact form:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        message: 'An error occurred while sending your message. Please try again later.'
      }),
      { status: 500 }
    );
  }
};