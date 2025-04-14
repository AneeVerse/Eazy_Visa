// app/api/flight-booking/route.js
import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const formData = await req.json();

    // Validate required fields
    if (!formData.contact.email || !formData.contact.phone || 
        !formData.flight.legs[0].from || !formData.flight.legs[0].to) {
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
        <p><strong>Date:</strong> ${new Date(leg.date).toISOString().split("T")[0] }</p>
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
      from: `"Flight Booking Form" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Flight Booking Request - ${formData.flight.type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Flight Booking Request</h1>
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
            ${travelersHTML}
            
            <h2 style="color: #2563eb; margin-top: 20px;">Additional Information</h2>
            <p><strong>Visa Interview Date:</strong> ${new Date(formData.additional.visaInterviewDate).toISOString().split("T")[0] || 'Not specified'}</p>
            <p><strong>Delivery Date:</strong> ${new Date(formData.additional.deliveryDate).toISOString().split("T")[0] || 'Not specified'}</p>
            <p><strong>Special Instructions:</strong> ${formData.additional.specialInstructions || 'None'}</p>
          </div>
          
           <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">This booking was created at ${new Date().toLocaleString()}</p>
        </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Flight booking request submitted successfully!'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error submitting flight booking:', error);
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