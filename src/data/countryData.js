export const countryData = 
   [
       {
      id: 111,
      name: "Japan",
      searchName: "Japan JP",
      price: "9,500",
      continent: "Asia",
      isTrending: true,
      isTop: true,
      visasOnTime: "220K+",
      flag: "/images/flags/jp.webp",
      landmark: "/images/landmarks/Mount Fuji in Japan Visa.webp",
      landmarkName: "Mount Fuji",
      altName: "Mount Fuji in Japan Visa",
      description: "Japan blends ancient traditions with cutting-edge technology, offering cherry blossoms, sushi, and bullet trains.",

        visaType: "Tourist Visa",
        lengthOfStay: "Up to 90 days",
        validity: "3 months",
        entry: "Single/Multiple",
     
      pdfDownload: "/pdf/visa-guides/japan-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Basic Requirements",
          documents: [
            "Passport (6+ months validity)",
            "Completed application form",
            "45x45mm color photo",
            "Flight itinerary",
            "Bank statements (6 months)"
          ]
        },
        {
          category: "Additional Documents",
          documents: [
            "Hotel reservations",
            "Daily schedule plan",
            "Letter of employment (if working)"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Insufficient Financial Proof",
          description: "Bank balance below ¥500,000 requirement",
          icon: "money"
        },
        {
          title: "Unclear Itinerary",
          description: "Vague or unrealistic travel plans",
          icon: "itinerary"
        }
      ],

      faqs: [
        {
          question: "Can I visit Okinawa with this visa?",
          answer: "Yes, it covers all Japanese prefectures"
        },
        {
          question: "Is vaccination certificate required?",
          answer: "Check latest health advisories before travel"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/japan-visa-sample.pdf"
    },
    {
      id: 1,
      name: "France",
      searchName: "France",
      price: "8000",
      continent: "Europe",
      isTop: true,
      isTrending: true,
      visasOnTime: "250K+",
      flag: "/images/flags/fr.webp",
      landmark: "/images/landmarks/Eiffel Tower in France Visa.webp",
      landmarkName: "Eiffel Tower",
      altName: "Eiffel Tower tourist places in France Visa",
      description: "France is renowned for its art, fashion, gastronomy, and culture, with iconic landmarks like the Eiffel Tower.",
      visaType: "Sticker Visa",
      lengthOfStay: "Up to 90 days",
      validity: "6 months",
      pdfDownload: "/pdf/visa-guides/france-visa-guide.pdf",
      documentsRequired: [
        {
          category: "Mandatory Documents",
          documents: [
            "Passport with 2 blank pages",
            "Completed application form",
            "Travel itinerary",
            "Proof of accommodation",
            "Recent bank statements"
          ]
        }
      ],
      rejectionReasons: [
        {
          title: "Incomplete Application",
          description: "Missing required documents or information.",
          icon: "incomplete",
        },
        {
          title: "Suspicious Travel History",
          description: "Frequent travel to high-risk countries.",
          icon: "suspicious",
        }
      ],
      faqs: [
        {
          question: "Is travel insurance mandatory?",
          answer: "Yes, it is a requirement for Schengen visa."
        },
        {
          question: "Can I extend my visa?",
          answer: "Extensions are possible under specific circumstances."
        }
      ],
      sampleVisaCopy: "/pdf/visa-samples/france-visa-sample.pdf"
    },

    {
      id: 2,
      name: "Hungary",
      searchName: "Hungary",
      price: "7000",
      continent: "Europe",
      isTop: true,
      isTrending: false,
      visasOnTime: "220K+",
      flag: "/images/flags/hu.webp",
      landmark: "/images/landmarks/Budapest Parliament Building tourist places in Hungary Visa.jpg",
      landmarkName: "Budapest Parliament Building",

      altName: "Budapest Parliament Building tourist places in Hungary Visa",
      description: "Hungary is famous for its thermal baths, stunning architecture, and vibrant cultural scene.",
      visaType: "Sticker Visa",
      lengthOfStay: "Up to 90 days",
      validity: "6 months",
      pdfDownload: "/pdf/visa-guides/hungary-visa-guide.pdf",
      documentsRequired: [
        {
          category: "Essential Documents",
          documents: [
            "Passport with 2 blank pages",
            "Completed application form",
            "Travel itinerary",
            "Proof of accommodation",
            "Recent bank statements"
          ]
        }
      ],
      rejectionReasons: [
        {
          title: "Insufficient Funds",
          description: "Bank statements do not show sufficient funds.",
          icon: "funds",
        },
        {
          title: "Incomplete Travel Itinerary",
          description: "Missing flight or accommodation details.",
          icon: "itinerary",
        }
      ],
      faqs: [
        {
          question: "Is travel insurance mandatory?",
          answer: "Yes, it is a requirement for Schengen visa."
        },
        {
          question: "Can I extend my visa?",
          answer: "Extensions are possible under specific circumstances."
        }
      ],
      sampleVisaCopy: "/pdf/visa-samples/hungary-visa-sample.pdf"
    },



    {
      id: 3,
      name: "Italy",
      searchName: "Italy",
      price: "7500",
      continent: "Europe",
      isTop: true,
      isTrending: false,
      visasOnTime: "200K+",
      flag: "/images/flags/it.webp",
      landmark: "/images/landmarks/Colosseum in Italy Visa.webp",
      landmarkName: "Colosseum",
      altName: "Colosseum in Italy Visa",
      description: "Italy enchants visitors with its ancient ruins, Renaissance art, and culinary delights.",

      visaType: "Tourist Visa",
      lengthOfStay: "Up to 90 days",
      validity: "6 months",

      pdfDownload: "/pdf/visa-guides/italy-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Required Documents for Italy Visa",
          documents: [
            "Passport with 2 blank pages",
            "Completed application form",
            "Travel itinerary",
            "Proof of accommodation",
            "Recent bank statements"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Previous Visa Overstay",
          description: "History of overstaying in Schengen area.",
          icon: "overstay",
        },
        {
          title: "Employment Suspicion",
          description: "Suspicion of intending to work illegally.",
          icon: "employment",
        }
      ],

      faqs: [
        {
          question: "Is COVID-19 vaccination required?",
          answer: "Check latest health requirements before traveling."
        },
        {
          question: "Can I extend my Italian visa?",
          answer: "Extensions are possible only in exceptional circumstances."
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/italy-visa-sample.pdf"
    },
    {
      id: 4,
      name: "Spain",
      searchName: "Spain",
      price: "7500",
      continent: "Europe",
      isTop: true,
      isTrending: true,
      visasOnTime: "180K+",
      flag: "/images/flags/es.webp",
      landmark: "/images/landmarks/Sagrada Familia tourist places in Spain Visa.webp",
      landmarkName: "Sagrada Familia",
      altName: "Sagrada Familia tourist places in Spain Visa",
      description: "Spain dazzles with its vibrant culture, stunning architecture, and beautiful Mediterranean coastline.",


      visaType: "Sticker Visa",
      lengthOfStay: "Up to 90 days",
      validity: "6 months",

      pdfDownload: "/pdf/visa-guides/spain-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Mandatory Documents",
          documents: [
            "Passport with 6+ months validity",
            "Completed application form",
            "Travel insurance (€30,000 coverage)",
            "Flight itinerary",
            "Hotel reservations"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Insufficient Travel Insurance",
          description: "Insurance doesn't meet Schengen requirements",
          icon: "insurance"
        },
        {
          title: "Weak Ties to Home Country",
          description: "Insufficient proof of return intention",
          icon: "home"
        }
      ],

      faqs: [
        {
          question: "Can I visit Gibraltar with this visa?",
          answer: "No, Gibraltar requires separate documentation"
        },
        {
          question: "Is biometric data required?",
          answer: "Yes, for first-time Schengen applicants"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/spain-visa-sample.pdf"
    },
    {
      id: 5,
      name: "Switzerland",
      searchName: "Switzerland",
      price: "8200",
      continent: "Europe",
      isTop: true,
      isTrending: false,
      visasOnTime: "150K+",
      flag: "/images/flags/ch.webp",
      landmark: "/images/landmarks/Matterhorn tourist places in Switzerland Visa.webp",
      landmarkName: "Matterhorn",
      altName: "Matterhorn tourist places in Switzerland Visa",
      description: "Switzerland offers breathtaking Alpine scenery, precision watches, and world-famous chocolates.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
     
      pdfDownload: "/pdf/visa-guides/switzerland-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Financial Requirements",
          documents: [
            "Bank statements (last 3 months)",
            "Salary slips",
            "Sponsorship letter if applicable"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "High Risk of Overstay",
          description: "Previous immigration violations",
          icon: "overstay"
        }
      ],

      faqs: [
        {
          question: "Do I need separate visas for Liechtenstein?",
          answer: "No, it's covered by Swiss visa"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/switzerland-visa-sample.pdf"
    },
    {
      id: 6,
      name: "Netherlands",
      searchName: "Netherlands",
      price: "7800",
      continent: "Europe",
      isTrending: true,
      visasOnTime: "190K+",
      flag: "/images/flags/nl.webp",
      landmark: "/images/landmarks/Windmills tourist places in Netherlands Visa.webp",
      landmarkName: "Windmills",
      altName: "Windmills tourist places in Netherlands Visa",
      description: "The Netherlands charms visitors with its iconic canals, tulip fields, and rich artistic heritage.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
    
      pdfDownload: "/pdf/visa-guides/netherlands-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Special Requirements",
          documents: [
            "Detailed day-by-day itinerary",
            "Proof of Schengen travel insurance",
            "Return flight confirmation"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Visa Shopping",
          description: "Applying in Netherlands without being main destination",
          icon: "shopping"
        }
      ],

      faqs: [
        {
          question: "Can I visit Caribbean Netherlands islands?",
          answer: "No, they have different visa requirements"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/netherlands-visa-sample.pdf"
    },
    {
      id: 7,
      name: "Portugal",
      searchName: "Portugal",
      price: "6900",
      continent: "Europe",
      isTop: true,
      isTrending: false,
      visasOnTime: "160K+",
      flag: "/images/flags/pt.webp",
      landmark: "/images/landmarks/Belem Tower tourist places in Portugal Visa.webp",
      landmarkName: "Belem Tower",
      altName: "Belem Tower tourist places in Portugal Visa",
      description: "Portugal enchants visitors with its golden beaches, historic landmarks, and world-famous port wine.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
     
      pdfDownload: "/pdf/visa-guides/portugal-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Essential Documents",
          documents: [
            "Valid passport (3+ months validity)",
            "Two recent passport photos",
            "Proof of accommodation",
            "Travel medical insurance",
            "Financial means proof (€40/day)"
          ]
        },
        {
          category: "For Minors",
          documents: [
            "Notarized parental authorization",
            "Birth certificate copy"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Invalid Travel Dates",
          description: "Application submitted too early or too late",
          icon: "calendar"
        },
        {
          title: "Document Authenticity",
          description: "Suspected forged documents",
          icon: "forgery"
        }
      ],

      faqs: [
        {
          question: "Can I visit Madeira with this visa?",
          answer: "Yes, it's part of Portuguese territory"
        },
        {
          question: "Is interview mandatory?",
          answer: "Only if requested by consulate"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/portugal-visa-sample.pdf"
    },
    {
      id: 8,
      name: "Austria",
      searchName: "Austria",
      price: "8000",
      continent: "Europe",
      isTop: true,
      isTrending: true,
      visasOnTime: "170K+",
      flag: "/images/flags/at.webp",
      landmark: "/images/landmarks/Schonbrunn Palace tourist places in Austria Visa.webp",
      landmarkName: "Schonbrunn Palace",
      altName: "Schonbrunn Palace tourist places in Austria Visa",
      description: "Austria offers imperial palaces, Alpine ski resorts, and the cultural riches of Vienna - the city of music.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
     
      pdfDownload: "/pdf/visa-guides/austria-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Standard Requirements",
          documents: [
            "Completed application form",
            "Passport-size photo (35x45mm)",
            "Travel health insurance (€30,000 coverage)",
            "Proof of financial means (€100/day)"
          ]
        },
        {
          category: "Business Visa Additions",
          documents: [
            "Company invitation letter",
            "Commercial register extract"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Inconsistent Information",
          description: "Contradictions in application details",
          icon: "inconsistency"
        },
        {
          title: "Security Concerns",
          description: "Appears in security databases",
          icon: "security"
        }
      ],

      faqs: [
        {
          question: "Can I enter Liechtenstein with this visa?",
          answer: "Yes, through Austrian border points"
        },
        {
          question: "Winter sports equipment requirements?",
          answer: "Must declare specialized equipment"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/austria-visa-sample.pdf"
    },
    {
      id: 9,
      name: "Belgium",
      searchName: "Belgium",
      price: "7200",
      isTop: true,
      continent: "Europe",
      isTrending: false,
      visasOnTime: "145K+",
      flag: "/images/flags/be.webp",
      landmark: "/images/landmarks/Atomium in Belgium Visa.webp",
      landmarkName: "Atomium",
      altName: "Atomium in Belgium Visa",
      description: "Belgium delights visitors with medieval towns, world-class chocolates, and being the heart of EU politics.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
        entryType: "Single/Multiple",
   
      pdfDownload: "/pdf/visa-guides/belgium-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Core Documents",
          documents: [
            "Passport (2 blank pages minimum)",
            "2 identical color photos (35x45mm)",
            "Travel medical insurance (minimum €30,000)",
            "Proof of accommodation (hotel bookings or host invitation)"
          ]
        },
        {
          category: "Financial Proof",
          documents: [
            "Bank statements (last 3 months)",
            "Sponsorship letter if applicable",
            "Minimum €45 per day of stay"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Main Destination Not Belgium",
          description: "Applying in Belgium but spending most time elsewhere in Schengen",
          icon: "destination"
        },
        {
          title: "Dubious Employer Reference",
          description: "Unverifiable employment details",
          icon: "employment"
        }
      ],

      faqs: [
        {
          question: "Can I visit Luxembourg with this visa?",
          answer: "Yes, as both are Schengen states"
        },
        {
          question: "Is biometric data required?",
          answer: "Yes, for all applicants aged 12+"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/belgium-visa-sample.pdf"
    },
    {
      id: 10,
      name: "Greece",
      searchName: "Greece",
      price: "6,500",
      continent: "Europe",
      isTrending: true,
      visasOnTime: "210K+",
      flag: "/images/flags/gr.webp",
      landmark: "/images/landmarks/Parthenon in Greece Visa.webp",
      landmarkName: "Parthenon",
      altName: "Parthenon in Greece Visa",
      description: "Greece offers sun-drenched islands, ancient ruins, and the birthplace of Western civilization.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
        entryType: "Single/Multiple",
     
      pdfDownload: "/pdf/visa-guides/greece-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Mandatory Documents",
          documents: [
            "Completed application form (signed)",
            "Passport valid 3+ months beyond return",
            "Round-trip flight reservation",
            "Hotel bookings for entire stay"
          ]
        },
        {
          category: "Financial Requirements",
          documents: [
            "Bank statements (last 6 months)",
            "Credit card copies",
            "Minimum €50 per day of stay"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Island Hopping Without Proof",
          description: "No confirmed ferry/domestic flight bookings",
          icon: "transport"
        },
        {
          title: "Peak Season Overcrowding",
          description: "Applications exceed consulate capacity (summer months)",
          icon: "seasonal"
        }
      ],

      faqs: [
        {
          question: "Can I visit Turkish islands near Greece?",
          answer: "No, requires separate Turkish visa"
        },
        {
          question: "Is COVID vaccination still required?",
          answer: "Check latest travel advisories before application"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/greece-visa-sample.pdf"
    },
    {
      id: 11,
      name: "Norway",
      searchName: "Norway",
      price: "9,500",
      continent: "Europe",
      isTrending: true,
      visasOnTime: "135K+",
      flag: "/images/flags/no.webp",
      landmark: "/images/landmarks/Geirangerfjord tourist places in Norway Visa.webp",
      landmarkName: "Geirangerfjord",
      altName: "Geirangerfjord tourist places in Norway Visa",
      description: "Norway mesmerizes with its dramatic fjords, northern lights, and vibrant Viking heritage.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
        entryType: "Single/Multiple",
      pdfDownload: "/pdf/visa-guides/norway-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Standard Requirements",
          documents: [
            "Passport valid for 3+ months beyond stay",
            "Two recent white-background photos (35x45mm)",
            "Detailed travel itinerary",
            "Proof of accommodation (hotel/private stay)"
          ]
        },
        {
          category: "Financial Proof",
          documents: [
            "Bank statements (last 3 months)",
            "Credit card copies",
            "Minimum NOK 500 per day (approx ₹4,000)"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Insufficient Arctic Preparation",
          description: "Lacking proper winter gear documentation for northern travel",
          icon: "winter"
        },
        {
          title: "Schengen First-Entry Rule",
          description: "Norway not being main destination for multi-country trips",
          icon: "itinerary"
        }
      ],

      faqs: [
        {
          question: "Can I visit Svalbard with this visa?",
          answer: "No, Svalbard has separate entry requirements"
        },
        {
          question: "Is cash required or cards accepted?",
          answer: "Norway is largely cashless - cards preferred"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/norway-visa-sample.pdf"
    },
    {
      id: 12,
      name: "Denmark",
      searchName: "Denmark",
      price: "8,300",
      continent: "Europe",
      isTrending: false,
      visasOnTime: "155K+",
      flag: "/images/flags/dk.webp",
      landmark: "/images/landmarks/Little Mermaid Statue tourist places in Denmark visa.webp",
      landmarkName: "Little Mermaid Statue",
      altName: "Little Mermaid Statue tourist places in Denmark visa",
      description: "Denmark charms with hygge culture, colorful harbors, and being the birthplace of LEGO.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
        entryType: "Single/Multiple",
      
      pdfDownload: "/pdf/visa-guides/denmark-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Core Documents",
          documents: [
            "Completed application form (digital signature accepted)",
            "Passport with 2+ blank pages",
            "Travel insurance covering repatriation"
          ]
        },
        {
          category: "Special Cases",
          documents: [
            "For business trips: Invitation from Danish company",
            "For students: Enrollment proof from Danish institution"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Bicycle Tour Insufficient Documentation",
          description: "Lacking detailed cycling route plans",
          icon: "bicycle"
        },
        {
          title: "Greenland/Faroe Islands Confusion",
          description: "Applying wrong visa type for autonomous territories",
          icon: "territory"
        }
      ],

      faqs: [
        {
          question: "Can I visit Sweden with this visa?",
          answer: "Yes, via the Øresund Bridge to Malmö"
        },
        {
          question: "Is Copenhagen Card useful for visa proof?",
          answer: "Yes, shows prepaid attractions and transport"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/denmark-visa-sample.pdf"
    },
    {
      id: 13,
      name: "Finland",
      searchName: "Finland",
      price: "8,700",
      continent: "Europe",
      isTrending: true,
      visasOnTime: "125K+",
      flag: "/images/flags/fi.webp",
      landmark: "/images/landmarks/Helsinki Cathedral tourist places in Finland Visa.webp",
      landmarkName: "Helsinki Cathedral",
      altName: "Helsinki Cathedral tourist places in Finland Visa",
      description: "Finland offers magical Northern Lights, midnight sun, sauna culture, and Santa Claus Village in Rovaniemi.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
        entryType: "Single/Multiple",
        processingTime: "15 calendar days",
  
      pdfDownload: "/pdf/visa-guides/finland-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Standard Requirements",
          documents: [
            "Passport (issued within last 10 years)",
            "Two biometric photos (47x36mm)",
            "Travel medical insurance (minimum €30,000 coverage)",
            "Proof of sufficient funds (€30/day)"
          ]
        },
        {
          category: "Winter-Specific Documents",
          documents: [
            "Detailed winter travel itinerary",
            "Proof of adequate winter clothing/gear",
            "Confirmed bookings for Arctic activities"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Insufficient Winter Preparation",
          description: "Lacking proof of proper Arctic travel preparations",
          icon: "snowflake"
        },
        {
          title: "Santa Claus Village Misuse",
          description: "Using tourist attraction as accommodation proof without bookings",
          icon: "santa"
        }
      ],

      faqs: [
        {
          question: "Can I visit Estonia by ferry with this visa?",
          answer: "Yes, Tallinn ferries accept Sticker Visas"
        },
        {
          question: "Is Aurora hunting itinerary mandatory?",
          answer: "Recommended but not required for Northern travel"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/finland-visa-sample.pdf",
      specialNotes: "Lapland visits require extra documentation for winter activities between November-March"
    },
    {
      id: 14,
      name: "Sweden",
      searchName: "Sweden",
      price: "8,900",
      continent: "Europe",
      isTrending: false,
      visasOnTime: "140K+",
      flag: "/images/flags/se.webp",
      landmark: "/images/landmarks/Stockholm Palace places in Sweden Visa.webp",
      landmarkName: "Stockholm Palace",
      altName: "Stockholm Palace places in Sweden Visa",
      description: "Sweden delights with its archipelago landscapes, innovative design, and the original ABBA Museum.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
        entryType: "Single/Multiple",
        processingTime: "10-15 working days",
    
      pdfDownload: "/pdf/visa-guides/sweden-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Core Documents",
          documents: [
            "Completed application form (digital submission preferred)",
            "Passport with 2 blank pages",
            "Proof of accommodation (hotel/private stay invitation)"
          ]
        },
        {
          category: "Financial Requirements",
          documents: [
            "Bank statements (last 3 months)",
            "Credit card limit confirmation",
            "Minimum SEK 450 per day (approx ₹3,200)"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Archipelago Cruise Documentation",
          description: "Missing ferry reservations for island hopping",
          icon: "ferry"
        },
        {
          title: "Cashless Society Misunderstanding",
          description: "Claiming to carry only cash in digital-first economy",
          icon: "credit-card"
        }
      ],

      faqs: [
        {
          question: "Can I visit Norway from Sweden?",
          answer: "Yes, border-free travel within Schengen area"
        },
        {
          question: "Is the Arctic Circle entry different?",
          description: "Kiruna visits follow same visa rules as mainland"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/sweden-visa-sample.pdf",
      specialNotes: "Stockholm archipelago visits require detailed ferry schedules in summer months"
    },
    {
      id: 15,
      name: "Iceland",
      searchName: "Iceland",
      price: "9,800",
      continent: "Europe",
      isTrending: true,
      visasOnTime: "110K+",
      flag: "/images/flags/is.webp",
      landmark: "/images/landmarks/Blue Lagoon in Iceland Visa.webp",
      landmarkName: "Blue Lagoon",
      altName: "Blue Lagoon in Iceland Visa",
      description: "Iceland enchants with geothermal wonders, glaciers, volcanoes, and the magical Northern Lights.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
        entryType: "Single/Multiple",
        processingTime: "10-15 working days",
     
      pdfDownload: "/pdf/visa-guides/iceland-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Standard Requirements",
          documents: [
            "Passport valid 3+ months beyond stay",
            "Two recent photos (35x45mm white background)",
            "Detailed travel itinerary with locations",
            "Proof of accommodation for entire stay"
          ]
        },
        {
          category: "Special Conditions",
          documents: [
            "Winter travel: Proof of 4x4 vehicle rental",
            "Adventure activities: Guide certifications",
            "Minimum ISK 4,000 per day (approx ₹2,400)"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Inadequate Vehicle Rental",
          description: "Standard cars booked for F-road mountain routes",
          icon: "jeep"
        },
        {
          title: "Aurora Chase Misrepresentation",
          description: "No confirmed Northern Lights tour bookings",
          icon: "northern-lights"
        }
      ],

      faqs: [
        {
          question: "Can I visit Greenland with this visa?",
          answer: "No, Greenland has separate visa requirements"
        },
        {
          question: "Is cash necessary for remote areas?",
          answer: "No, cards accepted everywhere including rural gas stations"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/iceland-visa-sample.pdf",
      specialNotes: "F-road mountain routes require certified 4x4 vehicles between June-September"
    },
    // {
    //   id: 16,
    //   name: "Ireland",
    //   searchName: "Ireland",
    //   price: "8,500",
    //   continent: "Europe",
    //   isTrending: false,
    //   visasOnTime: "95K+",
    //   flag: "/images/flags/ie.webp",
    //   landmark: "/images/landmarks/Cliffs of Moher in Ireland Visa.webp",
    //   landmarkName: "Cliffs of Moher",
    //   altName: "Cliffs of Moher in Ireland Visa",
    //   description: "Ireland captivates with rugged coastlines, ancient castles, vibrant pubs, and rich literary heritage.",

    //   basicInfo: {
    //     visaType: "Short-Stay 'C' Visa",
    //     lengthOfStay: "Up to 90 days",
    //     validity: "6 months",
    //     entryType: "Single",
    //     processingTime: "4-8 weeks (peak season)"
    //   },
    //   pdfDownload: "/pdf/visa-guides/ireland-visa-guide.pdf",

    //   documentsRequired: [
    //     {
    //       category: "Core Documents",
    //       documents: [
    //         "Passport valid 6+ months beyond stay",
    //         "Signed letter of application",
    //         "Proof of ties to home country",
    //         "Medical/travel insurance (minimum €25,000)"
    //       ]
    //     },
    //     {
    //       category: "Financial Proof",
    //       documents: [
    //         "6 months bank statements",
    //         "Sponsorship form if applicable",
    //         "Minimum €100 per day of stay"
    //       ]
    //     }
    //   ],

    //   rejectionReasons: [
    //     {
    //       title: "Pub Crawl Itinerary",
    //       description: "Focusing only on alcohol-related activities",
    //       icon: "beer"
    //     },
    //     {
    //       title: "UK-Ireland Confusion",
    //       description: "Attempting to enter UK with Irish visa",
    //       icon: "border"
    //     }
    //   ],

    //   faqs: [
    //     {
    //       question: "Can I visit Northern Ireland?",
    //       answer: "No, requires separate UK visa despite geographic proximity"
    //     },
    //     {
    //       question: "Is Gaelic language proof required?",
    //       answer: "No, English is sufficient for all official purposes"
    //     }
    //   ],

    //   sampleVisaCopy: "/pdf/visa-samples/ireland-visa-sample.pdf",
    //   specialNotes: "Important: Ireland is not part of Schengen despite EU membership"
    // },
    {
      id: 17,
      name: "Poland",
      searchName: "Poland",
      price: "6,200",
      continent: "Europe",
      isTrending: true,
      visasOnTime: "185K+",
      flag: "/images/flags/pl.webp",
      landmark: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
      landmarkName: "Wawel Castle",
      altName: "Wawel Castle tourist places in Poland Visa",
      description: "Poland fascinates with medieval old towns, hearty cuisine, and resilient historical sites from WWII.",

        visaType: "Sticker Visa",
        lengthOfStay: "Up to 90 days",
        validity: "6 months",
        entryType: "Single/Multiple",
        processingTime: "10-15 working days",
    
      pdfDownload: "/pdf/visa-guides/poland-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Standard Requirements",
          documents: [
            "Passport with 3+ months validity",
            "Two recent photos (35x45mm)",
            "Travel insurance (minimum €30,000 coverage)",
            "Confirmed return tickets"
          ]
        },
        {
          category: "Special Cases",
          documents: [
            "For Auschwitz visits: Museum booking confirmation",
            "Winter travel: Proof of thermal clothing purchases"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Schengen Itinerary Mismatch",
          description: "Poland not being main destination for multi-country trips",
          icon: "itinerary"
        },
        {
          title: "Currency Confusion",
          description: "Showing funds in złoty instead of required euro equivalent",
          icon: "currency"
        }
      ],

      faqs: [
        {
          question: "Can I visit Ukraine from Poland?",
          answer: "No, requires separate Ukrainian visa despite border proximity"
        },
        {
          question: "Is Polish language required?",
          answer: "No, but English/German helps in major cities"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/poland-visa-sample.pdf",
      specialNotes: "Historic site visits (like Auschwitz) require advance online registrations"
    },
    {
      id: 3,
      name: "Singapore",
      searchName: "Singapore SG",
      price: "6,800",
      continent: "Asia",
      isTrending: false,
      visasOnTime: "280K+",
      flag: "/images/flags/sg.webp",
      landmark: "/images/landmarks/Marina Bay Sands tourist places in Singapore Visa.webp",
      landmarkName: "Marina Bay Sands",
      altName: "Marina Bay Sands tourist places in Singapore Visa",
      description: "Singapore dazzles with its futuristic skyline, multicultural cuisine, and immaculate green spaces.",

     
        visaType: "Tourist Visa",
        lengthOfStay: "30 days",
        validity: "2 years",
        entry: "Multiple",
     
      pdfDownload: "/pdf/visa-guides/singapore-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Standard Documents",
          documents: [
            "Passport (6+ months validity)",
            "Form 14A completed",
            "Recent color photo",
            "Proof of funds (SGD 1,000+)"
          ]
        },
        {
          category: "For Business Visits",
          documents: [
            "Company letter",
            "V39A form (if sponsored)"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "Criminal Record",
          description: "Any drug-related offenses",
          icon: "crime"
        },
        {
          title: "Previous Deportation",
          description: "Prior removal from Singapore",
          icon: "deport"
        }
      ],

      faqs: [
        {
          question: "Can I visit Malaysia with this visa?",
          answer: "No, separate Malaysian visa required"
        },
        {
          question: "Is eVisa available?",
          answer: "Yes, through authorized agents only"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/singapore-visa-sample.pdf"
    },
    {
      id: 114,
      name: "Croatia",
      searchName: "Croatia HR",
      price: "7,200",
      continent: "Europe",
      isTrending: true,
      visasOnTime: "190K+",
      flag: "/images/flags/hr.webp",
      landmark: "/images/landmarks/Dubrovnik Old Town Croatia.jpg",
      landmarkName: "Dubrovnik Old Town",
      altName: "Dubrovnik Old Town tourist places in Croatia Visa",
      description: "Croatia entices travelers with its stunning Adriatic coastline, historic cities, and Mediterranean charm.",
    
      visaType: "Tourist Visa",
      lengthOfStay: "90 days",
      validity: "6 months",
      entry: "Single / Multiple",
    
      pdfDownload: "/pdf/visa-guides/croatia-visa-guide.pdf",
    
      documentsRequired: [
        {
          category: "Standard Documents",
          documents: [
            "Passport (valid for at least 3 months after stay)",
            "Completed visa application form",
            "Recent passport-size photograph",
            "Proof of accommodation and travel itinerary",
            "Travel health insurance (min €30,000 coverage)",
            "Proof of financial means (bank statement, etc.)"
          ]
        },
        {
          category: "For Business Visits",
          documents: [
            "Invitation letter from Croatian company",
            "Cover letter from Indian employer",
            "Company registration details"
          ]
        }
      ],
    
      rejectionReasons: [
        {
          title: "Insufficient Funds",
          description: "Bank statement doesn't reflect enough balance",
          icon: "funds"
        },
        {
          title: "Incomplete Documents",
          description: "Missing application form or insurance",
          icon: "documents"
        }
      ],
    
      faqs: [
        {
          question: "Is Croatia part of the Schengen Zone?",
          answer: "Yes, as of January 2023, Croatia is part of Schengen."
        },
        {
          question: "Can I apply for a Croatian visa online?",
          answer: "No, you must apply through VFS or the Croatian consulate."
        }
      ],
    
      sampleVisaCopy: "/pdf/visa-samples/croatia-visa-sample.pdf"
    },

    {
      id: 115,
      name: "Malta",
      searchName: "Malta MT",
      price: "6,500",
      continent: "Europe",
      isTrending: false,
      visasOnTime: "160K+",
      flag: "/images/flags/mt.webp",
      landmark: "/images/landmarks/Valletta Malta tourist attraction visa.jpg",
      landmarkName: "Valletta",
      altName: "Valletta Malta tourist attraction visa",
      description: "Malta blends rich history, Mediterranean charm, and stunning coastlines in a compact island paradise.",
    
      visaType: "Tourist Visa",
      lengthOfStay: "90 days",
      validity: "6 months",
      entry: "Single / Multiple",
    
      pdfDownload: "/pdf/visa-guides/malta-visa-guide.pdf",
    
      documentsRequired: [
        {
          category: "Standard Documents",
          documents: [
            "Passport (valid at least 3 months beyond stay)",
            "Completed Schengen visa application form",
            "Recent passport-size photograph",
            "Proof of travel itinerary and accommodation",
            "Travel medical insurance (€30,000 coverage)",
            "Proof of financial means (last 3 months bank statement)"
          ]
        },
        {
          category: "For Business Visits",
          documents: [
            "Invitation letter from Malta-based company",
            "Cover letter from Indian employer",
            "Business registration proof"
          ]
        }
      ],
    
      rejectionReasons: [
        {
          title: "Travel History Issues",
          description: "Lack of previous international travel",
          icon: "history"
        },
        {
          title: "Document Discrepancies",
          description: "Mismatch in dates or incomplete forms",
          icon: "error"
        }
      ],
    
      faqs: [
        {
          question: "Is Malta part of the Schengen Zone?",
          answer: "Yes, Malta is a Schengen country."
        },
        {
          question: "Can I travel to other countries with this visa?",
          answer: "Yes, within the Schengen area."
        }
      ],
    
      sampleVisaCopy: "/pdf/visa-samples/malta-visa-sample.pdf"
    },
    
    {
      id: 116,
      name: "Germany",
      searchName: "Germany DE",
      price: "7,200",
      continent: "Europe",
      isTrending: true,
      visasOnTime: "450K+",
      flag: "/images/flags/de.webp",
      landmark: "/images/landmarks/Brandenburg Gate in Germany Visa.webp",
      landmarkName: "Brandenburg Gate",
      altName: "Brandenburg Gate Germany tourist place visa",
      description: "Germany offers rich cultural heritage, historic cities, and scenic landscapes with a world-class transport system.",
    
      visaType: "Tourist Visa (Schengen)",
      lengthOfStay: "90 days",
      validity: "6 months",
      entry: "Single / Multiple",
    
      pdfDownload: "/pdf/visa-guides/germany-visa-guide.pdf",
    
      documentsRequired: [
        {
          category: "Standard Documents",
          documents: [
            "Passport (valid for at least 3 months beyond departure)",
            "Completed Schengen visa application form",
            "2 recent passport-size photos",
            "Cover letter explaining travel purpose",
            "Confirmed flight and accommodation bookings",
            "Travel medical insurance (minimum €30,000 coverage)",
            "Proof of financial means (bank statements for last 3 months)"
          ]
        },
        {
          category: "For Business Visits",
          documents: [
            "Invitation letter from German company",
            "Company registration and trade license",
            "Cover letter from Indian employer"
          ]
        }
      ],
    
      rejectionReasons: [
        {
          title: "Insufficient Financial Proof",
          description: "Unable to show enough funds for the trip",
          icon: "money"
        },
        {
          title: "Unclear Travel Itinerary",
          description: "Missing accommodation or transport details",
          icon: "itinerary"
        }
      ],
    
      faqs: [
        {
          question: "Can I visit other Schengen countries with a Germany visa?",
          answer: "Yes, you can visit all Schengen states."
        },
        {
          question: "Is biometric data required?",
          answer: "Yes, fingerprints and photo are mandatory."
        }
      ],
    
      sampleVisaCopy: "/pdf/visa-samples/germany-visa-sample.pdf"
    },
    
       {
      id: 9,
      name: "United States",
      searchName: "United States USA",
      price: "15,000",
      continent: "North America",
      isTrending: true,
      visasOnTime: "500K+",
      flag: "/images/flags/us.webp",
      landmark: "/images/landmarks/Tourist Places in United States Visa.webp",
      landmarkName: "Statue of Liberty",
      altName: "Statue of Liberty in the United States Visa",
      description: "The USA offers diverse experiences from the bright lights of New York to the natural wonders of the Grand Canyon and technological innovations of Silicon Valley.",

        visaType: "B1/B2 Visa",
        lengthOfStay: "Up to 6 months",
        validity: "10 years",
  
      pdfDownload: "/pdf/visa-guides/usa-visa-guide.pdf",

      documentsRequired: [
        {
          category: "Mandatory Documents",
          documents: [
            "Valid passport (6+ months validity)",
            "DS-160 confirmation page",
            "Visa fee payment receipt",
            "Passport-style photo (5x5 cm)",
            "Proof of strong ties to home country"
          ]
        },
        {
          category: "For Students (F1 Visa)",
          documents: [
            "I-20 form from US institution",
            "SEVIS fee payment proof",
            "Academic transcripts"
          ]
        }
      ],

      rejectionReasons: [
        {
          title: "214(b) Refusal",
          description: "Failed to prove non-immigrant intent",
          icon: "immigrant-intent"
        },
        {
          title: "Previous Violations",
          description: "History of visa overstay or violations",
          icon: "violation"
        }
      ],

      faqs: [
        {
          question: "How early should I apply for US visa?",
          answer: "At least 3 months before planned travel date"
        },
        {
          question: "Can I extend my stay on B1/B2 visa?",
          answer: "Possible but must apply before current I-94 expires"
        }
      ],

      sampleVisaCopy: "/pdf/visa-samples/us-visa-sample.pdf",
      visaTypes: [
        {
          type: "US Tourist Visa (B2)",
          processingTime: "15-30 days",
          stayPeriod: "Up to 6 months",
          validity: "10 years",
          visaCategory: "Tourist",
          entry: "Multiple",
          fees: "USD 160/-"
        },
        {
          type: "US Student Visa (F1)",
          processingTime: "60 days",
          stayPeriod: "Course duration",
          validity: "5 years",
          visaCategory: "Student",
          entry: "Multiple",
          fees: "USD 160/-"  
        }
      ]
    },
    
  ];
  // Other continents can be added similarly...
  // asia: [
 
  //   {
  //     id: 2,
  //     name: "Thailand",
  //     searchName: "Thailand",
  //     price: "4,500",
  //     continent: "Asia",
  //     isTrending: true,
  //     visasOnTime: "350K+",
  //     flag: "/images/flags/th.webp",
  //     landmark: "/images/landmarks/Grand Palace tourist places in Thailand Visa.webp",
  //     landmarkName: "Grand Palace",
  //     altName: "Grand Palace tourist places in Thailand Visa",
  //     description: "Thailand attracts visitors with tropical beaches, ornate temples, vibrant street life, and delicious cuisine.",

  //     basicInfo: {
  //       visaType: "Tourist Visa",
  //       lengthOfStay: "60 days",
  //       validity: "3 months",
  //       entry: "Single"
  //     },
  //     pdfDownload: "/pdf/visa-guides/thailand-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "Essential Documents",
  //         documents: [
  //           "Passport with 2 blank pages",
  //           "Application form with 4x6cm photo",
  //           "Proof of onward travel",
  //           "Financial proof (20,000 THB)"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Previous Overstay",
  //         description: "History of visa violations in Thailand",
  //         icon: "overstay"
  //       },
  //       {
  //         title: "Suspected Employment",
  //         description: "Insufficient tourism purpose evidence",
  //         icon: "work"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Can I extend my stay?",
  //         answer: "Yes, at immigration offices for 30 days (1,900 THB fee)"
  //       },
  //       {
  //         question: "Is visa-on-arrival available?",
  //         answer: "Yes for 15 days (2,000 THB, cash only)"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/thailand-visa-sample.pdf"
  //   },
    
  //   {
  //     id: 4,
  //     name: "South Korea",
  //     searchName: "South Korea KR",
  //     price: "8,200",
  //     continent: "Asia",
  //     isTrending: true,
  //     visasOnTime: "190K+",
  //     flag: "/images/flags/kr.webp",
  //     landmark: "/images/landmarks/Gyeongbokgung Palace in South Korea Visa.webp",
  //     landmarkName: "Gyeongbokgung Palace",
  //     altName: "Gyeongbokgung Palace in South Korea Visa",
  //     description: "South Korea combines futuristic cities, ancient palaces, K-pop culture, and world-renowned cuisine.",

  //     basicInfo: {
  //       visaType: "C-3 Tourist Visa",
  //       lengthOfStay: "90 days",
  //       validity: "3 months",
  //       entry: "Single/Multiple"
  //     },
  //     pdfDownload: "/pdf/visa-guides/south-korea-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "Mandatory Documents",
  //         documents: [
  //           "Passport (6+ months validity)",
  //           "Completed application form",
  //           "35x45mm color photo (white background)",
  //           "Detailed travel itinerary",
  //           "Bank statements (min. ₩1,000,000 balance)"
  //         ]
  //       },
  //       {
  //         category: "For First-Time Visitors",
  //         documents: [
  //           "Proof of employment/studies",
  //           "Return flight tickets",
  //           "Hotel reservations"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Incomplete Itinerary",
  //         description: "Missing day-by-day travel plans",
  //         icon: "itinerary"
  //       },
  //       {
  //         title: "North Korea Travel History",
  //         description: "Recent visits to DPRK without clearance",
  //         icon: "security"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Can I visit Jeju Island without visa?",
  //         answer: "Yes, visa-free for 30 days (direct flights only)"
  //       },
  //       {
  //         question: "Is K-ETA required with visa?",
  //         answer: "No, K-ETA is only for visa-free entries"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/south-korea-visa-sample.pdf"
  //   },
  //   {
  //     id: 5,
  //     name: "Malaysia",
  //     searchName: "Malaysia MY",
  //     price: "5,500",
  //     continent: "Asia",
  //     isTrending: false,
  //     visasOnTime: "320K+",
  //     flag: "/images/flags/my.webp",
  //     landmark: "/images/landmarks/Petronas Towers tourist places in Malaysia Visa.webp",
  //     landmarkName: "Petronas Towers",
  //     altName: "Petronas Towers tourist places in Malaysia Visa",
  //     description: "Malaysia offers diverse experiences from Kuala Lumpur's skyscrapers to Borneo's rainforests and pristine islands.",

  //     basicInfo: {
  //       visaType: "eVISA",
  //       lengthOfStay: "30 days",
  //       validity: "3 months",
  //       entry: "Single"
  //     },
  //     pdfDownload: "/pdf/visa-guides/malaysia-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "eVISA Requirements",
  //         documents: [
  //           "Passport bio page scan",
  //           "Digital photo (35x50mm)",
  //           "Confirmed return ticket",
  //           "Hotel booking (first 3 nights)"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Incorrect Photo Format",
  //         description: "Doesn't meet Malaysia's specifications",
  //         icon: "photo"
  //       },
  //       {
  //         title: "Previous Immigration Ban",
  //         description: "Record of overstay in Malaysia",
  //         icon: "ban"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Can I enter East Malaysia with this visa?",
  //         answer: "Yes, but may require additional documentation"
  //       },
  //       {
  //         question: "Is vaccination proof required?",
  //         answer: "Check latest MySejahtera requirements"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/malaysia-visa-sample.pdf"
  //   },
  //   {
  //     id: 6,
  //     name: "Vietnam",
  //     searchName: "Vietnam VN",
  //     price: "6,300",
  //     continent: "Asia",
  //     isTrending: true,
  //     visasOnTime: "250K+",
  //     flag: "/images/flags/vn.webp",
  //     landmark: "/images/landmarks/Ha Long Bay tourist places in Vietnam Visa.webp",
  //     landmarkName: "Ha Long Bay",
  //     altName: "Ha Long Bay tourist places in Vietnam Visa",
  //     description: "Vietnam captivates with its emerald waters, ancient towns, French colonial architecture, and vibrant street food culture.",

  //     basicInfo: {
  //       visaType: "eVISA/VOA",
  //       lengthOfStay: "30 days",
  //       validity: "1 month",
  //       entry: "Single"
  //     },
  //     pdfDownload: "/pdf/visa-guides/vietnam-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "For eVISA",
  //         documents: [
  //           "Passport scan (front page)",
  //           "Digital portrait photo (4x6cm)",
  //           "Entry/exit dates",
  //           "Port of entry details"
  //         ]
  //       },
  //       {
  //         category: "For Visa on Arrival",
  //         documents: [
  //           "Approval letter (pre-arranged)",
  //           "Passport photos (2 copies)",
  //           "USD cash for stamping fee ($25-$50)"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Name Mismatch",
  //         description: "Discrepancy between documents",
  //         icon: "name"
  //       },
  //       {
  //         title: "Invalid Port of Entry",
  //         description: "Applied for wrong airport/seaport",
  //         icon: "location"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Can I extend my eVISA in Vietnam?",
  //         answer: "Yes, through immigration offices (3-5 day processing)"
  //       },
  //       {
  //         question: "Is Phu Quoc Island visa-free?",
  //         answer: "Yes, for 30 days if arriving directly"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/vietnam-visa-sample.pdf"
  //   },
  //   {
  //     id: 7,
  //     name: "India",
  //     searchName: "India Bharat Hindustan",
  //     price: "3,800",
  //     continent: "Asia",
  //     isTrending: true,
  //     visasOnTime: "500K+",
  //     flag: "/images/flags/in.webp",
  //     landmark: "/images/landmarks/gateway-of-india.jpeg",
  //     landmarkName: "Gateway of India",
  //     altName: "Gateway of India in Mumbai",
  //     description: "India mesmerizes with its ancient heritage, diverse cultures, vibrant festivals, and breathtaking landscapes from Himalayas to tropical beaches.",

  //     basicInfo: {
  //       visaType: "e-Visa",
  //       lengthOfStay: "30/60/180 days",
  //       validity: "1 year",
  //       entry: "Multiple"
  //     },
  //     pdfDownload: "/pdf/visa-guides/india-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "e-Visa Requirements",
  //         documents: [
  //           "Passport with 6+ months validity",
  //           "Digital photo (2x2 inch)",
  //           "Scanned passport bio page",
  //           "Proof of onward travel"
  //         ]
  //       },
  //       {
  //         category: "Special Cases",
  //         documents: [
  //           "PIO/OCI card if applicable",
  //           "Parental authorization for minors"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Pakistani Travel History",
  //         description: "Recent visits without special clearance",
  //         icon: "security"
  //       },
  //       {
  //         title: "Incorrect Photo",
  //         description: "Doesn't meet India's strict standards",
  //         icon: "photo"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Can I visit restricted areas like Andamans?",
  //         answer: "Yes, but need RAP (Restricted Area Permit)"
  //       },
  //       {
  //         question: "Is separate visa required for Bhutan/Nepal?",
  //         answer: "No visa needed for these neighboring countries"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/india-visa-sample.pdf"
  //   },
  //   {
  //     id: 8,
  //     name: "Sri Lanka",
  //     searchName: "Sri Lanka SL",
  //     price: "4,200",
  //     continent: "Asia",
  //     isTrending: false,
  //     visasOnTime: "180K+",
  //     flag: "/images/flags/lk.webp",
  //     landmark: "/images/landmarks/Sigiriya Rock tourist places in Sri Lanka Visa.webp",
  //     landmarkName: "Sigiriya Rock",
  //     altName: "Ancient Sigiriya Rock Fortress",
  //     description: "Sri Lanka delights with its golden beaches, ancient ruins, tea plantations, and incredible wildlife including leopards and elephants.",

  //     basicInfo: {
  //       visaType: "ETA",
  //       lengthOfStay: "30 days",
  //       validity: "6 months",
  //       entry: "Double"
  //     },
  //     pdfDownload: "/pdf/visa-guides/sri-lanka-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "ETA Requirements",
  //         documents: [
  //           "Passport valid 6+ months",
  //           "Return/onward ticket",
  //           "Proof of sufficient funds ($50/day)"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Previous Visa Violations",
  //         description: "Overstaying during last visit",
  //         icon: "overstay"
  //       },
  //       {
  //         title: "Incomplete ETA Form",
  //         description: "Missing critical information",
  //         icon: "form"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Can I extend my stay beyond 30 days?",
  //         answer: "Yes, at Colombo Immigration for up to 6 months"
  //       },
  //       {
  //         question: "Is visa required for transit passengers?",
  //         answer: "No, if staying airside less than 12 hours"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/sri-lanka-visa-sample.pdf"
  //   },
  // ],

  // northamerica: [
 
  //   {
  //     id: 10,
  //     name: "Canada",
  //     searchName: "Canada",
  //     price: "12,500",
  //     continent: "North America",
  //     isTrending: true,
  //     visasOnTime: "350K+",
  //     flag: "/images/flags/ca.webp",
  //     landmark: "/images/landmarks/Tourist Places in Canada Visa.webp",
  //     landmarkName: "Niagara Falls",
  //     altName: "Niagara Falls in Canada Visa",
  //     description: "Canada boasts stunning natural landscapes from the Rocky Mountains to coastal beauty, along with vibrant multicultural cities like Toronto and Vancouver.",

  //     basicInfo: {
  //       visaType: "Visitor Visa",
  //       lengthOfStay: "Up to 6 months",
  //       validity: "10 years or passport expiry",
  //     },
  //     pdfDownload: "/pdf/visa-guides/canada-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "General Requirements",
  //         documents: [
  //           "Valid passport",
  //           "Proof of financial support",
  //           "Travel history",
  //           "Purpose of visit proof",
  //           "Immigration medical exam (if staying >6 months)"
  //         ]
  //       },
  //       {
  //         category: "For Super Visa (Parents/Grandparents)",
  //         documents: [
  //           "Letter of invitation from Canadian host",
  //           "Proof of private medical insurance",
  //           "Host's financial documents"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Insufficient Funds",
  //         description: "Cannot demonstrate ability to support stay",
  //         icon: "funds"
  //       },
  //       {
  //         title: "Criminal Inadmissibility",
  //         description: "Previous criminal record",
  //         icon: "criminal"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Is biometrics required?",
  //         answer: "Yes, for most applicants aged 14-79"
  //       },
  //       {
  //         question: "Can I work on visitor visa?",
  //         answer: "No, requires separate work permit"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/canada-visa-sample.pdf",
  //     visaTypes: [
  //       {
  //         type: "Canada Visitor Visa",
  //         processingTime: "15-20 days",
  //         stayPeriod: "Up to 6 months",
  //         validity: "10 years or until passport expiry",
  //         visaCategory: "Tourist / Family Visit",
  //         entry: "Single / Multiple",
  //         fees: "CAD 100/-"
  //       },
  //       {
  //         type: "Canada Student Visa",
  //         processingTime: "45 days",
  //         stayPeriod: "Course duration",
  //         validity: "1-4 years",
  //         visaCategory: "Student",
  //         entry: "Multiple",
  //         fees: "CAD 150/-"
  //       }
  //     ]
  //   },
  //   {
  //     id: 11,
  //     name: "Mexico",
  //     searchName: "Mexico",
  //     price: "8,800",
  //     continent: "North America",
  //     isTrending: false,
  //     visasOnTime: "200K+",
  //     flag: "/images/flags/mx.webp",
  //     landmark: "/images/landmarks/Tourist Places in Mexico Visa.webp",
  //     landmarkName: "Chichen Itza",
  //     altName: "Chichen Itza in Mexico Visa",
  //     description: "Mexico fascinates with ancient Mayan ruins, vibrant festivals, beautiful beaches, and rich culinary traditions recognized by UNESCO.",

  //     basicInfo: {
  //       visaType: "Tourist Visa",
  //       lengthOfStay: "Up to 180 days",
  //       validity: "6 months",
  //     },
  //     pdfDownload: "/pdf/visa-guides/mexico-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "Basic Requirements",
  //         documents: [
  //           "Passport (6+ months validity)",
  //           "Completed application form",
  //           "Proof of economic solvency",
  //           "Hotel reservation or invitation letter",
  //           "Return flight ticket"
  //         ]
  //       },
  //       {
  //         category: "For Business Visas",
  //         documents: [
  //           "Letter from Mexican company",
  //           "Company registration documents",
  //           "Bank statements"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Previous Immigration Issues",
  //         description: "History of overstay in Mexico",
  //         icon: "overstay"
  //       },
  //       {
  //         title: "Incomplete Itinerary",
  //         description: "Lack of clear travel plans",
  //         icon: "itinerary"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Do I need visa if I have US visa?",
  //         answer: "Yes, but can enter with valid US visa under certain conditions"
  //       },
  //       {
  //         question: "Can I extend my stay in Mexico?",
  //         answer: "Possible at INM offices before visa expires"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/mexico-visa-sample.pdf",
  //     visaTypes: [
  //       {
  //         type: "Mexico Tourist Visa",
  //         processingTime: "10-15 days",
  //         stayPeriod: "Up to 180 days",
  //         validity: "6 months",
  //         visaCategory: "Tourist",
  //         entry: "Single / Multiple",
  //         fees: "USD 36/-"
  //       },
  //       {
  //         type: "Mexico Business Visa",
  //         processingTime: "10-15 days",
  //         stayPeriod: "Up to 180 days",
  //         validity: "6 months",
  //         visaCategory: "Business",
  //         entry: "Single / Multiple",
  //         fees: "USD 36/-"
  //       }
  //     ]
  //   },
  // ],
  // southAmerica: [
  //   {
  //     id: 1,
  //     name: "Brazil",
  //     searchName: "Brazil",
  //     price: "9,500",
  //     continent: "South America",
  //     isTrending: true,
  //     visasOnTime: "85K+",
  //     flag: "/images/flags/br.webp",
  //     landmark: "/images/landmarks/Christ the Redeemer tourist places in Brazil Visa.webp",
  //     landmarkName: "Christ the Redeemer",
  //     altName: "Christ the Redeemer tourist places in Brazil Visa",
  //     description: "Brazil dazzles with its vibrant carnivals, Amazon rainforest, and iconic beaches of Rio de Janeiro.",

  //     basicInfo: {
  //       visaType: "Tourist Visa (VIVIS)",
  //       lengthOfStay: "Up to 90 days",
  //       validity: "5 years (for US visa holders)",
  //     },
  //     pdfDownload: "/pdf/visa-guides/brazil-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "Core Requirements",
  //         documents: [
  //           "Passport with 2 blank pages",
  //           "Recent 2x2 inch photo (white background)",
  //           "Proof of onward travel",
  //           "Bank statements (last 3 months)",
  //           "Yellow fever certificate (if applicable)"
  //         ]
  //       },
  //       {
  //         category: "For Minors",
  //         documents: [
  //           "Notarized parental consent",
  //           "Birth certificate copy"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Criminal Record",
  //         description: "Felony convictions may disqualify applicants",
  //         icon: "criminal"
  //       },
  //       {
  //         title: "Incomplete Application",
  //         description: "Missing biometrics or signatures",
  //         icon: "incomplete"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Is visa required for Carnival visit?",
  //         answer: "Yes, all tourists need visa regardless of purpose"
  //       },
  //       {
  //         question: "Can I visit Iguazu Falls with this visa?",
  //         answer: "Yes, but need separate permit for Argentine side"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/brazil-visa-sample.pdf"
  //   },
  //   {
  //     id: 2,
  //     name: "Argentina",
  //     searchName: "Argentina",
  //     price: "8,800",
  //     continent: "South America",
  //     isTrending: false,
  //     visasOnTime: "72K+",
  //     flag: "/images/flags/ar.webp",
  //     landmark: "/images/landmarks/Iguazu Falls tourist places in Argentina Visa.webp",
  //     landmarkName: "Iguazu Falls",
  //     altName: "Iguazu Falls tourist places in Argentina Visa",
  //     description: "Argentina offers spectacular natural wonders, passionate tango, and world-renowned beef cuisine.",

  //     basicInfo: {
  //       visaType: "ETA",
  //       lengthOfStay: "90 days",
  //       validity: "Multiple entries for 3 years",
  //     },
  //     pdfDownload: "/pdf/visa-guides/argentina-visa-guide.pdf",

  //     documentsRequired: [
  //       {
  //         category: "ETA Requirements",
  //         documents: [
  //           "Passport valid for 6+ months",
  //           "Digital photo meeting specifications",
  //           "Credit card for payment",
  //           "Confirmed accommodation details"
  //         ]
  //       },
  //       {
  //         category: "Additional for Business",
  //         documents: [
  //           "Invitation from Argentine company",
  //           "Company registration documents"
  //         ]
  //       }
  //     ],

  //     rejectionReasons: [
  //       {
  //         title: "Previous Immigration Violations",
  //         description: "Overstays in Argentina or neighboring countries",
  //         icon: "overstay"
  //       },
  //       {
  //         title: "Health Restrictions",
  //         description: "Failure to meet vaccination requirements",
  //         icon: "health"
  //       }
  //     ],

  //     faqs: [
  //       {
  //         question: "Is reciprocity fee still applicable?",
  //         answer: "No, abolished for most nationalities since 2016"
  //       },
  //       {
  //         question: "Can I visit Antarctica from Argentina?",
  //         answer: "Yes, but requires additional permits from tour operators"
  //       }
  //     ],

  //     sampleVisaCopy: "/pdf/visa-samples/argentina-visa-sample.pdf"
  //   }
  // ]

// };