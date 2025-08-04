// app/api/flight-booking/route.js
import nodemailer from 'nodemailer';

// Aggressive IST time function - This will definitely work
const getIndianTime = () => {
  const now = new Date();
  // Get current UTC time
  const utcTime = now.getTime();
  // IST is UTC + 5 hours 30 minutes
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
  // Create IST time
  const istTime = new Date(utcTime + istOffset);
  // Extract components
  const year = istTime.getUTCFullYear();
  const month = String(istTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istTime.getUTCDate()).padStart(2, '0');
  let hours = istTime.getUTCHours();
  const minutes = String(istTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(istTime.getUTCSeconds()).padStart(2, '0');
  // Convert to 12-hour format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const displayHours = String(hours).padStart(2, '0');
  return `${day}/${month}/${year}, ${displayHours}:${minutes}:${seconds} ${ampm} (IST)`;
};

export const POST = async (req) => {
  try {
    console.log('Most preferred booking API called');
    const formData = await req.json();
    console.log('Flight data received:', formData);

    // Validate required fields
    if (!formData.contact.email || !formData.contact.phone || 
        !formData.flight.legs[0].from || !formData.flight.legs[0].to) {
      console.log('Missing required fields in most preferred booking', {
        email: formData.contact.email,
        phone: formData.contact.phone,
        from: formData.flight?.legs?.[0]?.from,
        to: formData.flight?.legs?.[0]?.to
      });
      return new Response(
        JSON.stringify({ 
          error: 'Required fields are missing!',
          receivedData: formData
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    // Format flight legs for email
    const flightLegsHTML = formData.flight.legs.map((leg, index) => `
      <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #e2e8f0; border-radius: 5px;">
        <h3 style="color: #2563eb; margin-top: 0;">Flight Leg ${index + 1}</h3>
        <p><strong>From:</strong> ${leg.from}</p>
        <p><strong>To:</strong> ${leg.to}</p>
        <p><strong>Date:</strong> ${new Date(leg.date + 'T00:00:00').toISOString().split('T')[0]}</p>
      </div>
    `).join('');

    // Format travelers for email
    const travelersHTML = formData.travelers.list.map((traveler, index) => `
      <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #e2e8f0; border-radius: 5px;">
        <h3 style="color: #2563eb; margin-top: 0;">Traveler ${index + 1}</h3>
        <p><strong>Type:</strong> ${traveler.type}</p>
        <p><strong>Title:</strong> ${traveler.title}</p>
        <p><strong>Name:</strong> ${traveler.firstName} ${traveler.lastName}</p>
        ${traveler.age ? `<p><strong>Age:</strong> ${traveler.age}</p>` : ''}
      </div>
    `).join('');

    // Email options
    const mailOptions = {
      from: `"New package Request" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New package Request`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New package Request</h1>
          </div>
          
          <div style="padding: 20px; background: #ffffff;">
            <h2 style="color: #2563eb; margin-top: 0;">Contact Information</h2>
            <p><strong>Email:</strong> ${formData.contact.email}</p>
            <p><strong>Phone:</strong> ${formData.contact.phoneCode} ${formData.contact.phone}</p>
            <p><strong>Price:</strong> ${formData.price}</p>
            
            <h2 style="color: #2563eb; margin-top: 20px;">Flight Details</h2>
            <p><strong>Type:</strong> ${formData.flight.type}</p>
            ${flightLegsHTML}
            
            <h2 style="color: #2563eb; margin-top: 20px;">Travelers (${formData.travelers.count})</h2>
            ${formData.travelers.list.map((traveler, index) => `
              <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #e2e8f0; border-radius: 5px;">
                <h3 style="color: #2563eb; margin-top: 0;">Traveler ${index + 1}</h3>
                <p><strong>Type:</strong> ${traveler.type}</p>
                <p><strong>Title:</strong> ${traveler.title}</p>
                <p><strong>First Name:</strong> ${traveler.firstName}</p>
                <p><strong>Last Name:</strong> ${traveler.lastName}</p>
                ${traveler.age ? `<p><strong>Age:</strong> ${traveler.age}</p>` : ''}
              </div>
            `).join('')}
            
            <h2 style="color: #2563eb; margin-top: 20px;">Additional Information</h2>
            <p><strong>Visa Interview Date:</strong> ${formData.additional.visaInterviewDate ? new Date(formData.additional.visaInterviewDate + 'T00:00:00').toISOString().split('T')[0] : 'Not specified'}</p>
            <p><strong>Delivery Date:</strong> ${formData.additional.deliveryDate ? new Date(formData.additional.deliveryDate + 'T00:00:00').toISOString().split('T')[0] : 'Not specified'}</p>
            <p><strong>Special Instructions:</strong> ${formData.additional.specialInstructions || 'None'}</p>
          </div>
          
           <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">This booking was created at ${getIndianTime()}</p>
        </div>
        </div>
      `,
    };

    // Send email
    console.log('Sending most preferred booking email');
    try {
      await transporter.sendMail(mailOptions);
      console.log('Most preferred booking email sent successfully');
    } catch (emailError) {
      console.error('Error sending most preferred booking email:', emailError);
    }

    // Get the first traveler's name for the Google Sheet
    const firstTraveler = formData.travelers.list[0];
    
    // Create formatted flight info (keep it short for Google Sheets)
    const flightRoute = formData.flight.legs.map(leg => 
      `${leg.from} to ${leg.to}`
    ).join(', ');
    
    const flightDates = formData.flight.legs.map(leg => 
      new Date(leg.date + 'T00:00:00').toISOString().split('T')[0]
    ).join(', ');

    // Prepare data for Google Sheets
    const sheetData = {
      formName: 'Flight Booking',
      firstName: firstTraveler.firstName || '',
      lastName: firstTraveler.lastName || '',
      email: formData.contact.email,
      phone: formData.contact.phoneCode + formData.contact.phone,
      message: `Flight Type: ${formData.flight.type}, Routes: ${flightRoute}, Dates: ${flightDates}`,
      rating: '',
      country: formData.flight.legs[0].from + ' to ' + formData.flight.legs[0].to,
      visaType: '',
      extraInfo: `Travelers: ${formData.travelers.count}, Price: ${formData.price}, Special Instructions: ${formData.additional.specialInstructions || 'None'} | Submitted At (IST): ${getIndianTime()}`
    };
    
    console.log('Sending most preferred booking data to Google Sheets:', sheetData);

    // Send to Google Sheets
    try {
      console.log('Attempting to send most preferred booking data to Google Sheet...');
      const googleResponse = await fetch('https://script.google.com/macros/s/AKfycbymh3pK7scJVrPCxmX2tloCmvrc2ARxlGYVCHB2tuQ37saHOCPqxfDZN4NMd7_spyvz9Q/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
      });
      
      const googleData = await googleResponse.text();
      console.log('Google Sheets response for most preferred booking:', googleResponse.status, googleData);
      
      if (googleResponse.status !== 200) {
        console.error('Google Sheets returned non-200 status for most preferred booking', googleResponse.status);
      }
    } catch (sheetError) {
      console.error('Error sending most preferred booking data to Google Sheets:', sheetError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Flight booking request submitted successfully!'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in most preferred booking API:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error submitting flight booking. Please try again later.',
        errorDetails: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};