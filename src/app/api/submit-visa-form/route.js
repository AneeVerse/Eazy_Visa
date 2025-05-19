import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const { name, email, phone, visaType } = await req.json();

    if (!name || !email || !phone || !visaType) {
      return new Response(
        JSON.stringify({ 
          error: 'All fields are required!',
          receivedData: { name, email, phone, visaType }
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
      subject: `New ${visaType} Visa Consultation Request`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Visa Consultation</h1>
            <p style="margin: 5px 0 0; font-size: 16px;">${visaType}</p>
          </div>
          
          <div style="padding: 20px; background: #ffffff;">
            <div style="margin-bottom: 15px;">
              <h3 style="color: #2563eb; margin-bottom: 5px; font-size: 16px;">Applicant Details</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 5px 0;"><strong>Visa Type:</strong> ${visaType}</p>
            </div>
          </div>
            <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">This Form was created at ${new Date().toLocaleString()}</p>
        </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully!',
        visaType: visaType
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error submitting form. Please try again later.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};