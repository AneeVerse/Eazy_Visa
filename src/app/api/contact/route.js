import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const { firstName, lastName, phone, email, message, visaType, country } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
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
    const timestamp = now.toLocaleString('en-GB', { hour12: false });

    // Compose email content
    const mailOptions = {
      from: `"Eazy Visas Website" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 5px;">
          <h2 style="color: #1a73e8;">New Contact Form Submission</h2>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          ${visaType ? `<p><strong>Visa Type:</strong> ${visaType}</p>` : ''}
          ${country ? `<p><strong>Country:</strong> ${country}</p>` : ''}
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #1a73e8;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">This message was sent from the contact form on the Eazy Visas website.</p>
        </div>
      `,
      text: `
        New Contact Form Submission
        ==========================
        
        Timestamp: ${timestamp}
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        ${visaType ? `Visa Type: ${visaType}` : ''}
        ${country ? `Country: ${country}` : ''}
        
        Message:
        ${message}
        
        This message was sent from the contact form on the Eazy Visas website.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send to Google Sheets
    const name = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`.trim();
    await fetch('https://script.google.com/macros/s/AKfycbymh3pK7scJVrPCxmX2tloCmvrc2ARxlGYVCHB2tuQ37saHOCPqxfDZN4NMd7_spyvz9Q/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formName: 'Contact Form',
        name: name || '',
        email: email || '',
        phone: phone || '',
        message: message || '',
        rating: '',
        country: country || '',
        visaType: visaType || '',
        extraInfo: ''
      }),
    });

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