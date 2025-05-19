// app/api/hotel-booking/route.js
import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const formData = await req.json();
    console.log('Received form data:', formData);
    // Validate required fields
    if (!formData.contact?.email || !formData.contact?.phone || 
      !formData.hotels || formData.hotels.length === 0) {
    return new Response(
      JSON.stringify({ 
        error: 'Required fields are missing!',
        receivedData: formData
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate each hotel
  for (const hotel of formData.hotels) {
    if (!hotel.location || !hotel.checkInDate || !hotel.checkOutDate) {
      return new Response(
        JSON.stringify({ 
          error: 'All hotels must have location, check-in and check-out dates!',
          invalidHotel: hotel
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }


    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    // Calculate nights
    // const nights = formData.hotel.checkInDate && formData.hotel.checkOutDate ? 
    //   Math.ceil((new Date(formData.hotel.checkOutDate) - new Date(formData.hotel.checkInDate)) / (1000 * 60 * 60 * 24)) : 1;
  // Format hotels for email
  const hotelsHTML = formData.hotels.map((hotel, index) => {
    const nights = Math.ceil(
      (new Date(hotel.checkOutDate) - new Date(hotel.checkInDate)) / (1000 * 60 * 60 * 24));
    return `
      <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e2e8f0; border-radius: 5px;">
        <h3 style="color: #2563eb; margin-top: 0;">Hotel ${index + 1}</h3>
        <p><strong>Location:</strong> ${hotel.location}</p>
        <p><strong>Check-In:</strong> ${new Date(hotel.checkInDate).toISOString().split("T")[0]}</p>
        <p><strong>Check-Out:</strong> ${new Date(hotel.checkOutDate).toISOString().split("T")[0]}</p>
        <p><strong>Nights:</strong> ${nights}</p>
      </div>
    `;
  }).join('');

  // Format travelers for email
  const travelersHTML = formData.travelers.list.map((traveler, index) => `
    <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #e2e8f0; border-radius: 5px;">
      <h3 style="color: #2563eb; margin-top: 0;">
        ${index < formData.guests.adults ? `Adult ${index + 1}` : `Child ${index - formData.guests.adults + 1}`}
      </h3>
      <p><strong>Title:</strong> ${traveler.title}</p>
      <p><strong>Name:</strong> ${traveler.firstName} ${traveler.lastName}</p>
    </div>
  `).join('');

  // Email options
  const mailOptions = {
    from: `"Hotel Booking System" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
    to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
    subject: `New Hotel Booking Request - ${formData.hotels[0].location}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">New Hotel Booking Request</h1>
        </div>
        
        <div style="padding: 20px; background: #ffffff;">
          <h2 style="color: #2563eb; margin-top: 0;">Contact Information</h2>
          <p><strong>Email:</strong> ${formData.contact.email}</p>
          <p><strong>Phone:</strong> ${formData.contact.phoneCode} ${formData.contact.phone}</p>
          <p><strong>Total Price:</strong> ₹${formData.price.toLocaleString()}</p>
          
          <h2 style="color: #2563eb; margin-top: 20px;">Booking Details</h2>
          <p><strong>Rooms:</strong> ${formData.guests.rooms}</p>
          <p><strong>Guests:</strong> ${formData.guests.adults} Adults, ${formData.guests.children} Children</p>
          
          <h3 style="color: #2563eb; margin-top: 15px;">Hotels</h3>
          ${hotelsHTML}
          
          <h2 style="color: #2563eb; margin-top: 20px;">Guest Information</h2>
          ${travelersHTML}
          
          <h2 style="color: #2563eb; margin-top: 20px;">Additional Information</h2>
          <p><strong>Visa Interview Date:</strong> ${formData.additional.visaInterviewDate ? 
            new Date(formData.additional.visaInterviewDate).toISOString().split("T")[0] : 'Not specified'}</p>
          <p><strong>Delivery Date:</strong> ${formData.additional.deliveryDate ? 
            new Date(formData.additional.deliveryDate).toISOString().split("T")[0] : 'Not specified'}</p>
          <p><strong>Special Requests:</strong> ${formData.additional.specialInstructions || 'None'}</p>
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
        message: 'Hotel booking request submitted successfully!'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error submitting hotel booking:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error submitting hotel booking. Please try again later.',
        errorDetails: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};