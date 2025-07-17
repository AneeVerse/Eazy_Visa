import nodemailer from 'nodemailer';


export async function POST(req) {
  try {
    const { name, email, phone, contactType, source } = await req.json();
    console.log('Received contact widget submission:', { name, email, phone, contactType, source });

    // Validation
    if (!name || !email || !phone || !contactType) {
      return Response.json({ 
        success: false, 
        message: 'All fields are required!' 
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Easy Visa Contact Widget" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Contact Widget Inquiry - ${contactType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Contact Widget Inquiry</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #2563eb; margin-top: 0;">Contact Information</h2>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Preferred Contact Method:</strong> ${contactType}</p>
            <p><strong>Source:</strong> ${source}</p>
            <p><strong>Submitted At (IST):</strong> ${indianTime}</p>
          </div>
          
          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <h4 style="color: #1e40af; margin-top: 0;">Next Steps</h4>
            <p style="margin-bottom: 0;">Please contact this lead through their preferred method: <strong>${contactType}</strong></p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This inquiry was submitted through the contact widget on the Easy Visa website.
          </p>
        </div>
      `,
      text: `
        New Contact Widget Inquiry
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Preferred Contact Method: ${contactType}
        Source: ${source}
        Submitted At (IST): ${indianTime}
        
        Please contact this lead through their preferred method: ${contactType}
        
        This inquiry was submitted through the contact widget on the Easy Visa website.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send to Google Sheets
    try {
      await fetch('https://script.google.com/macros/s/AKfycbymh3pK7scJVrPCxmX2tloCmvrc2ARxlGYVCHB2tuQ37saHOCPqxfDZN4NMd7_spyvz9Q/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'Contact Widget',
          firstName: name ? name.split(' ')[0] : '',
          lastName: name ? name.split(' ').slice(1).join(' ') : '',
          email: email || '',
          phone: phone || '',
          message: `Contact Type: ${contactType}`,
          rating: '',
          country: '',
          visaType: '',
          extraInfo: `Source: ${source} | Submitted At (IST): ${indianTime}`
        }),
      });
      console.log('Successfully added to Google Sheets');
    } catch (sheetsError) {
      console.error('Google Sheets error:', sheetsError);
      // Continue execution even if sheets fails
    }

    return Response.json({ 
      success: true, 
      message: 'Contact form submitted successfully!' 
    });

  } catch (error) {
    console.error('Contact widget API error:', error);
    return Response.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
} 