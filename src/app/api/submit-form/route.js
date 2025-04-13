import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const { name, email, phone, country, visaType } = await req.json();

    console.log('Received form submission:', { name, email, phone, country, visaType });

    if (!name || !email || !phone || !country || !visaType) {
      return new Response(
        JSON.stringify({ 
          error: 'All fields are required!',
          receivedData: { name, email, phone, country, visaType }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Eazy Visas Form" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New ${visaType} Consultation for ${country}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Visa Consultation</h1>
            <p style="margin: 5px 0 0; font-size: 16px;">${visaType} - ${country}</p>
          </div>
          
          <div style="padding: 20px; background: #ffffff;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
              <div>
                <h3 style="color: #2563eb; margin-bottom: 5px; font-size: 16px;">Applicant Details</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
              </div>
              <div>
                <h3 style="color: #2563eb; margin-bottom: 5px; font-size: 16px;">Visa Details</h3>
                <p style="margin: 5px 0;"><strong>Visa Type:</strong> ${visaType}</p>
                <p style="margin: 5px 0;"><strong>Country:</strong> ${country}</p>
              </div>
            </div>
            
       
          </div>
          
        </div>
      `,
      text: `
        New Visa Consultation Request
        ============================
        Visa Type: ${visaType}
        Country: ${country}
        
        Applicant Details:
        -----------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        Submitted through Eazy Visas website form
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully. Message ID:', info.messageId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully!',
        data: {
          name,
          email,
          phone,
          country,
          visaType
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error submitting form:', {
      message: error.message,
      stack: error.stack,
    });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error submitting form. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : null
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};