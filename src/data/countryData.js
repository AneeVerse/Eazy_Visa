export const countryData = {
  asia: [
    {
      id: 1,
      name: "Australia",
      searchName: "australia",
      price : "7,500",
      continent: "Asia",
      isTrending: true,
      visasOnTime: "200K+",
      flag: "/images/flags/au.webp",
      landmark: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
      landmarkName: "Sydney Opera House",
      altName: "Sydney Opera House in Australia",
      description: "Australia offers diverse experiences from urban adventures in Sydney to the natural wonders of the Great Barrier Reef.",
      
      // Visa Types Information
     basicInfo: {
      visaType: "E-Visa",
      lengthOfStay: "90 days",
      validity: "30 days",
     },
     pdfDownload: "/pdf/visa-guides/australia-visa-guide.pdf",
      
      // Documents Required
      documentsRequired: [
        {
          category: "General Requirements for All Visa Types",
          documents: [
            "Valid passport (minimum 6 months validity)",
            "Completed visa application form",
            "Passport-size photographs (45mm x 35mm)",
            "Travel itinerary including return tickets",
            "Proof of sufficient funds (bank statements)",
            "Hotel bookings or invitation letter"
          ]
        },
        {
          category: "Additional Requirements for Student Visa",
          documents: [
            "Letter of acceptance from Australian institution",
            "Proof of English proficiency (IELTS/TOEFL)",
            "Overseas Student Health Cover (OSHC)",
            "Academic transcripts and certificates",
            "Genuine Temporary Entrant (GTE) statement"
          ]
        }
      ],
      
      // Visa Rejection Reasons
      rejectionReasons: [
        {
          title: "Expired Passport",
          description:
            "Applying with a passport that has expired or expires within 6 months.",
          icon: "passport",
        },
        {
          title: "Insufficient Funds",
          description:
            "Failing to demonstrate enough financial resources to support your stay.",
          icon: "money",
        },
        {
          title: "Criminal Record",
          description:
            "Having a criminal history that disqualifies you from obtaining a visa.",
          icon: "criminal",
        },
        {
          title: "Previous Visa Violations",
          description:
            "Having overstayed or violated the terms of a previous visa.",
          icon: "warning",
        },
      ],
      
     
      
      // FAQs
      faqs: [
        {
          question: "How early should I apply for Australia visa?",
          answer: "We recommend applying at least 4-6 weeks before your intended travel date."
        },
        {
          question: "Can I extend my Australia tourist visa?",
          answer: "Extensions may be possible in exceptional circumstances but must be applied for before current visa expires."
        },
        {
          question: "Is interview required for Australia visa?",
          answer: "Interviews are rarely required but the embassy may request one in some cases."
        }
      ],
      
      sampleVisaCopy: "/pdf/visa-samples/australia-visa-sample.pdf"
    },
    // Add more countries similarly...
  ],
  europe: [
    // European countries data...
  ]
  // Other continents...
};