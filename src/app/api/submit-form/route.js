import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const { name, email, phone, country, message } = await req.json();

    console.log('Received form submission for country:', country);
    console.log('Form data:', { name, email, phone, message });

    if (!name || !email || !phone || !country) {
      return new Response(
        JSON.stringify({ 
          error: 'Name, Email, Phone and Country are required!',
          receivedData: { name, email, phone, country }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("Using email credentials:", {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      receiver: process.env.NEXT_PUBLIC_EMAIL_RECEIVER
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Eazy Visa Form" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Visa Consultation Request for ${country}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Visa Consultation - ${country}</h1>
          </div>
          
          <div style="padding: 20px; background: #ffffff;">
            <div style="margin-bottom: 15px;">
              <h2 style="color: #2563eb; margin-bottom: 5px; font-size: 18px;">Contact Details</h2>
              <p style="margin: 5px 0;"><strong>Country:</strong> ${country}</p>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 5px;">
              <h2 style="color: #2563eb; margin-bottom: 5px; font-size: 18px;">Message</h2>
              <p style="margin: 0;">${message || 'No additional message provided'}</p>
            </div>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">This email was sent from the ${country} visa consultation form.</p>
          </div>
        </div>
      `,
      text: `
        New Visa Consultation Request - ${country}
        --------------------------------------
        Country: ${country}
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message || 'No additional message provided'}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully for country:', country, 'Message ID:', info.messageId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully!',
        country: country
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Full error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response
    });
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error submitting form. Please try again later.',
        errorDetails: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};