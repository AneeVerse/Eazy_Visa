import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const formData = await req.json();
    console.log('Blog contact form submission:', formData);
    
    // Handle different field formats (either name as single field or firstName+lastName)
    let name, email, phone;
    
    if (formData.name) {
      // If a single name field is provided
      name = formData.name;
      email = formData.email;
      phone = formData.phone;
    } else if (formData.firstName) {
      // If firstName/lastName format is used
      name = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
      email = formData.email;
      phone = formData.phone;
    }
    
    console.log('Processed blog contact data:', { name, email, phone });

    // Validate required fields
    if (!name || !email || !phone) {
      console.error('Missing required fields:', { name, email, phone, formData });
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'All fields are required!',
          receivedData: formData
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

    // Email options
    const mailOptions = {
      from: `"EazyVisas Blog Contact" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Blog Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Blog Contact Message</h1>
          </div>
          
          <div style="padding: 20px; background: #ffffff;">
            <div style="margin-bottom: 15px;">
              <h2 style="color: #2563eb; margin-bottom: 5px; font-size: 18px;">Contact Details</h2>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Timestamp:</strong> ${timestamp}</p>
            </div>
            
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">This email was sent from the EazyVisas blog contact form.</p>
          </div>
        </div>
      `,
      text: `
        New Blog Contact Form Submission
        --------------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Timestamp: ${timestamp}
      `,
    };

    // Send email
    console.log('Sending blog contact email');
    try {
      await transporter.sendMail(mailOptions);
      console.log('Blog contact email sent successfully');
    } catch (emailError) {
      console.error('Error sending blog contact email:', emailError);
    }

    // Send to Google Sheets
    console.log('Sending blog contact data to Google Sheets');
    try {
      await fetch('https://script.google.com/macros/s/AKfycbymh3pK7scJVrPCxmX2tloCmvrc2ARxlGYVCHB2tuQ37saHOCPqxfDZN4NMd7_spyvz9Q/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'Blog Contact',
          name: name || '',
          email: email || '',
          phone: phone || '',
          message: '',
          rating: '',
          country: '',
          visaType: '',
          extraInfo: `Submitted from blog contact form at ${timestamp}`
        }),
      });
      console.log('Blog contact data sent to Google Sheets successfully');
    } catch (sheetError) {
      console.error('Error sending blog contact data to Google Sheets:', sheetError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Message sent successfully!'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in blog contact form API:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        message: 'An error occurred while sending your message. Please try again later.',
        error: error.message
      }),
      { status: 500 }
    );
  }
};