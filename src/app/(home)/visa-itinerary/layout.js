import Script from 'next/script';

export const metadata = {
  title: "Dummy Bookings for Visa: Dummy Flight Ticket + Dummy Hotel Booking (Verified Itinerary) | Eazy Visas",
  description: "Get dummy bookings for visa: dummy flight ticket + dummy hotel booking in one place. Fast delivery, visa-ready format, and expert support.",
  keywords: "dummy bookings, dummy flight ticket, dummy hotel booking, visa applications, verified itinerary, travel documents, visa support, flight itinerary for visa",

  openGraph: {
    title: "Dummy Bookings for Visa: Dummy Flight Ticket + Dummy Hotel Booking (Verified Itinerary) | Eazy Visas",
    description: "Get dummy bookings for visa: dummy flight ticket + dummy hotel booking in one place. Fast delivery, visa-ready format, and expert support.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dummy Bookings for Visa: Dummy Flight Ticket + Dummy Hotel Booking (Verified Itinerary) | Eazy Visas",
    description: "Get dummy bookings for visa: dummy flight ticket + dummy hotel booking in one place. Fast delivery, visa-ready format, and expert support.",
  }
};

export default function DummyBookingsLayout({ children }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18339214667"
        strategy="afterInteractive"
        async
      />
      <Script id="visa-itinerary-google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18339214667');
        `}
      </Script>
      {children}
    </>
  );
} 