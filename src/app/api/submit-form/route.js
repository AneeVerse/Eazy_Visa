import nodemailer from 'nodemailer';

// Function to get Indian time consistently
const getIndianTime = () => {
  const now = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  
  return now.toLocaleString('en-IN', options);
};

export const POST = async (req) => {
  try {
    const { firstName, lastName, email, phone, country, visaType, formSource } = await req.json();
    const name = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`.trim();

    console.log('Received form submission:', { firstName, lastName, email, phone, country, visaType, formSource });

    if (!firstName || !lastName || !email || !phone || !country || !visaType) {
      return new Response(
        JSON.stringify({ 
          error: 'All fields are required!',
          receivedData: { firstName, lastName, email, phone, country, visaType, formSource }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    // Get Indian time consistently
    const indianTime = getIndianTime();

    const mailOptions = {
      from: `"Eazy Visas Form" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Visa Consultation Request - ${visaType} - ${country}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Visa Consultation Request</h1>
          </div>
          
          <div style="padding: 20px; background: #ffffff;">
            <h2 style="color: #2563eb; margin-top: 0;">Visa Details</h2>
            <p><strong>Type:</strong> ${visaType}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Form Source:</strong> ${formSource || 'Homepage'}</p>
            
            <h2 style="color: #2563eb; margin-top: 20px;">Applicant Information</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">This request was submitted at ${indianTime} (Indian Time)</p>
          </div>
        </div>
      `,
      text: `
        New Visa Consultation Request
        ============================
        Visa Type: ${visaType}
        Country: ${country}
        Form Source: ${formSource || 'Homepage'}
        
        Applicant Details:
        -----------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        This Form was created at ${indianTime} (Indian Time)
        
        Submitted through Eazy Visas website form
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully. Message ID:', info.messageId);

    // Determine form name based on the source
    const formName = formSource === 'country' ? 'Countries Visa Consultation' : 'Visa Consultation';

    // Send to Google Sheets
    await fetch('https://script.google.com/macros/s/AKfycbymh3pK7scJVrPCxmX2tloCmvrc2ARxlGYVCHB2tuQ37saHOCPqxfDZN4NMd7_spyvz9Q/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formName: formName,
        name: name || '',
        email: email || '',
        phone: phone || '',
        message: '', // No message field in this form
        rating: '',
        country: country || '',
        visaType: visaType || '',
        extraInfo: formSource || 'Homepage'
      }),
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully!',
        data: {
          name,
          firstName,
          lastName,
          email,
          phone,
          country,
          visaType,
          formSource
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