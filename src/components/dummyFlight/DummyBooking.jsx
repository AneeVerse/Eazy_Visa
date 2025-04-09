"use client";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiPlus, FiMinus, FiArrowRight, FiX, FiUser, FiCalendar } from "react-icons/fi";
import { FaPlane, FaHotel } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../common/Layout";
import Button from "../common/Button";
import AirportDropdown from "./AirportDropdown";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

const FlightBookingComponent = () => {
    // Form steps
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
    const travelersDropdownRef = useRef(null);
    const formRef = useRef(null);

    // Initial form data
    const initialFormData = {
        contact: {
            email: "",
            phone: "",
            phoneCode: "+91",
        },
        flight: {
            type: "one-way",
            legs: [{ from: "DEL", to: "BOM", date: null }],
        },
        travelers: {
            count: 1,
            list: [{ type: "adult", title: "Mr", firstName: "", lastName: "", age: "" }],
        },
        additional: {
            visaInterviewDate: null,
            deliveryDate: null,
            specialInstructions: ""
        }
    };

    // Form data
    const [formData, setFormData] = useState(initialFormData);

    // UI states
    const [price, setPrice] = useState(0);
    const [airports] = useState([
        { code: "DEL", name: "Delhi" },
  { code: "BOM", name: "Mumbai" },
  { code: "BLR", name: "Bengaluru" },
  { code: "MAA", name: "Chennai" },
  { code: "HYD", name: "Hyderabad" },
  { code: "CCU", name: "Kolkata" },
  { code: "GOI", name: "Goa" },
  { code: "PNQ", name: "Pune" },
  { code: "KBL", name: "Bamrauli Airport, Allahabad" },
  { code: "IXG", name: "Belgaum Airport, Belgaum" },
  { code: "BEP", name: "Bellary Airport, Bellary" },
  { code: "BUP", name: "Bathinda Airport, Bathinda" },
  { code: "VDY", name: "Vijayapura Airport, Bijapur" },
  { code: "BWN", name: "Burnpur Airport, Burnpur" },
  { code: "CBD", name: "Car Nicobar Air Force Base, Car Nicobar" },
  { code: "DBR", name: "Darbhanga Airport, Darbhanga" },
  { code: "DHM", name: "Gaggal Airport, Dharamshala" },
  { code: "DIB", name: "Dibrugarh Airport, Dibrugarh" },
  { code: "GOP", name: "Gorakhpur Airport, Gorakhpur" },
  { code: "GUX", name: "Guna Airport, Guna" },
  { code: "HSS", name: "Hissar Airport, Hisar" },
  { code: "JRG", name: "Jharsuguda Airport, Jharsuguda" },
  { code: "KJB", name: "Khajuraho Airport, Khajuraho" },
  { code: "KUU", name: "Kullu Manali Airport, Bhuntar" },
  { code: "MZU", name: "Muzaffarpur Airport, Muzaffarpur" },
  { code: "NAG", name: "Dr. Babasaheb Ambedkar International Airport, Nagpur" },
  { code: "PGH", name: "Pantnagar Airport, Pantnagar" },
  { code: "PAT", name: "Jay Prakash Narayan Airport, Patna" },
  { code: "PBD", name: "Porbandar Airport, Porbandar" },
  { code: "RAJ", name: "Rajkot Airport, Rajkot" },
  { code: "RJA", name: "Rajahmundry Airport, Rajahmundry" },
  { code: "RPR", name: "Swami Vivekananda Airport, Raipur" },
  { code: "RTC", name: "Ratnagiri Airport, Ratnagiri" },
  { code: "SXR", name: "Srinagar Airport, Srinagar" },
  { code: "STV", name: "Surat Airport, Surat" },
  { code: "TIR", name: "Tirupati Airport, Tirupati" },
  { code: "TRV", name: "Trivandrum International Airport, Thiruvananthapuram" },
  { code: "UDR", name: "Maharana Pratap Airport, Udaipur" },
  { code: "VGA", name: "Vijayawada Airport, Vijayawada" },
  { code: "VNS", name: "Lal Bahadur Shastri Airport, Varanasi" },
  { code: "VTZ", name: "Visakhapatnam Airport, Visakhapatnam" },
  { code: "ZED", name: "Ziro Airport, Ziro" },

//   internation
{ code: "ATL", name: "Hartsfield–Jackson Atlanta International Airport" },
{ code: "PEK", name: "Beijing Capital International Airport" },
{ code: "DXB", name: "Dubai International Airport" },
{ code: "LAX", name: "Los Angeles International Airport" },
{ code: "HND", name: "Tokyo Haneda Airport" },
{ code: "ORD", name: "O'Hare International Airport, Chicago" },
{ code: "LHR", name: "London Heathrow Airport" },
{ code: "HKG", name: "Hong Kong International Airport" },
{ code: "PVG", name: "Shanghai Pudong International Airport" },
{ code: "CDG", name: "Charles de Gaulle Airport, Paris" },
{ code: "AMS", name: "Amsterdam Airport Schiphol" },
{ code: "FRA", name: "Frankfurt am Main Airport" },
{ code: "IST", name: "Istanbul Airport" },
{ code: "SIN", name: "Singapore Changi Airport" },
{ code: "ICN", name: "Incheon International Airport, Seoul" },
{ code: "DEN", name: "Denver International Airport" },
{ code: "CAN", name: "Guangzhou Baiyun International Airport" },
{ code: "JFK", name: "John F. Kennedy International Airport, New York" },
{ code: "KUL", name: "Kuala Lumpur International Airport" },
{ code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport" },
{ code: "BKK", name: "Suvarnabhumi Airport, Bangkok" },
{ code: "SFO", name: "San Francisco International Airport" },
{ code: "LAS", name: "McCarran International Airport, Las Vegas" },
{ code: "SEA", name: "Seattle–Tacoma International Airport" },
{ code: "MIA", name: "Miami International Airport" },
{ code: "MUC", name: "Munich Airport" },
{ code: "YYZ", name: "Toronto Pearson International Airport" },
{ code: "GRU", name: "São Paulo/Guarulhos International Airport" },
{ code: "SYD", name: "Sydney Kingsford Smith Airport" },
{ code: "BCN", name: "Barcelona–El Prat Airport" },
{ code: "MEX", name: "Mexico City International Airport" },
{ code: "GIG", name: "Rio de Janeiro–Galeão International Airport" },
{ code: "JNB", name: "O. R. Tambo International Airport, Johannesburg" },
{ code: "ZRH", name: "Zurich Airport" },
{ code: "VIE", name: "Vienna International Airport" },
{ code: "MNL", name: "Ninoy Aquino International Airport, Manila" },
{ code: "DOH", name: "Hamad International Airport, Doha" },
{ code: "OSL", name: "Oslo Gardermoen Airport" },
{ code: "ARN", name: "Stockholm Arlanda Airport" },
{ code: "CPH", name: "Copenhagen Airport" },
{ code: "HEL", name: "Helsinki-Vantaa Airport" },
{ code: "BRU", name: "Brussels Airport" },
{ code: "DUB", name: "Dublin Airport" },
{ code: "LIS", name: "Lisbon Humberto Delgado Airport" },
{ code: "PRG", name: "Václav Havel Airport Prague" },
{ code: "WAW", name: "Warsaw Chopin Airport" },
{ code: "ATH", name: "Athens International Airport" },
{ code: "BUD", name: "Budapest Ferenc Liszt International Airport" },
{ code: "OTP", name: "Henri Coandă International Airport, Bucharest" },
{ code: "SOF", name: "Sofia Airport" },
{ code: "BEG", name: "Belgrade Nikola Tesla Airport" },
{ code: "ZAG", name: "Zagreb Airport" },
{ code: "LED", name: "Pulkovo Airport, Saint Petersburg" },
{ code: "SVO", name: "Sheremetyevo International Airport, Moscow" },
{ code: "DME", name: "Domodedovo International Airport, Moscow" },
{ code: "GVA", name: "Geneva Airport" },
{ code: "LYS", name: "Lyon–Saint-Exupéry Airport" },
{ code: "NCE", name: "Nice Côte d'Azur Airport" },
{ code: "MXP", name: "Milan Malpensa Airport" },
{ code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport, Rome" },
{ code: "TXL", name: "Berlin Tegel Airport" },
{ code: "HAM", name: "Hamburg Airport" },
{ code: "DUS", name: "Düsseldorf Airport" },
{ code: "MAN", name: "Manchester Airport" },
{ code: "LGW", name: "London Gatwick Airport" },
{ code: "STN", name: "London Stansted Airport" },
{ code: "LTN", name: "London Luton Airport" },
{ code: "EDI", name: "Edinburgh Airport" },
{ code: "GLA", name: "Glasgow Airport" },
{ code: "BNE", name: "Brisbane Airport" },
{ code: "MEL", name: "Melbourne Airport" },
{ code: "PER", name: "Perth Airport" },
{ code: "AKL", name: "Auckland Airport" },
{ code: "WLG", name: "Wellington Airport" },
{ code: "CHC", name: "Christchurch Airport" },
{ code: "HNL", name: "Daniel K. Inouye International Airport, Honolulu" },
{ code: "GUM", name: "Antonio B. Won Pat International Airport, Guam" },
{ code: "CUN", name: "Cancún International Airport" },
{ code: "BOG", name: "El Dorado International Airport, Bogotá" },
{ code: "LIM", name: "Jorge Chávez International Airport, Lima" },
{ code: "SCL", name: "Comodoro Arturo Merino Benítez International Airport, Santiago" },
{ code: "EZE", name: "Ministro Pistarini International Airport, Buenos Aires" },
  { code: "GIG", name: "Rio de Janeiro–Galeão International Airport" },
  { code: "CPT", name: "Cape Town International Airport" },
  { code: "NBO", name: "Jomo Kenyatta International Airport, Nairobi" },
  { code: "CMN", name: "Mohammed V International Airport, Casablanca" },
  { code: "CAI", name: "Cairo International Airport" },
  { code: "ADD", name: "Addis Ababa Bole International Airport" },
  { code: "TUN", name: "Tunis–Carthage International Airport" },
  { code: "ALG", name: "Houari Boumediene Airport, Algiers" },
  { code: "KWI", name: "Kuwait International Airport" },
  { code: "RUH", name: "King Khalid International Airport, Riyadh" },
  { code: "JED", name: "King Abdulaziz International Airport, Jeddah" },
  { code: "BAH", name: "Bahrain International Airport" },
  { code: "AUH", name: "Abu Dhabi International Airport" },
  { code: "DOH", name: "Hamad International Airport, Doha" },
  { code: "AMM", name: "Queen Alia International Airport, Amman" },
  { code: "TLV", name: "Ben Gurion Airport, Tel Aviv" },
  { code: "IKA", name: "Imam Khomeini International Airport, Tehran" },
  { code: "DEL", name: "Indira Gandhi International Airport, Delhi" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport, Mumbai" },
  { code: "BLR", name: "Kempegowda International Airport, Bengaluru" },
  { code: "MAA", name: "Chennai International Airport" },
  { code: "HYD", name: "Rajiv Gandhi International Airport, Hyderabad" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International Airport, Kolkata" },
  { code: "COK", name: "Cochin International Airport" },
  { code: "GOI", name: "Goa International Airport" },
  { code: "TRV", name: "Trivandrum International Airport" },
  { code: "PNQ", name: "Pune Airport" },
  { code: "IXC", name: "Chandigarh International Airport" },
  { code: "LKO", name: "Chaudhary Charan Singh International Airport, Lucknow" },
  { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport, Ahmedabad" },
  { code: "NAG", name: "Dr. Babasaheb Ambedkar International Airport, Nagpur" },
  { code: "JAI", name: "Jaipur International Airport" },
  { code: "ATQ", name: "Sri Guru Ram Dass Jee International Airport, Amritsar" },
  { code: "IXB", name: "Bagdogra Airport" },
  { code: "VTZ", name: "Visakhapatnam Airport" },
  { code: "BBI", name: "Biju Patnaik International Airport, Bhubaneswar" },
  { code: "GAU", name: "Lokpriya Gopinath Bordoloi International Airport, Guwahati" },
  { code: "IXM", name: "Madurai Airport" },
  { code: "IXE", name: "Mangalore International Airport" },
  { code: "TRZ", name: "Tiruchirappalli International Airport" },
  { code: "UDR", name: "Maharana Pratap Airport, Udaipur" },
    ]);

    const countryCodes = [
        { code: "+91", name: "India" },
        { code: "+1", name: "USA" },
        { code: "+44", name: "UK" },
        { code: "+971", name: "UAE" },
        { code: "+65", name: "Singapore" },
    ];

    const travelerTypes = [
        { value: "adult", label: "Adult (12+ years)", titles: ["Mr", "Mrs", "Ms", "Dr"] },
        { value: "child", label: "Child (2-12 years)", titles: ["Master", "Miss"] },
        { value: "infant", label: "Infant (0-2 years)", titles: ["Baby"] }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (travelersDropdownRef.current && !travelersDropdownRef.current.contains(event.target)) {
                setShowTravelersDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Price calculation
    useEffect(() => {
        const basePrice = 1000;
        const discount = 1; // ₹1 discount per person
        const calculatedPrice = formData.travelers.count > 0 ?
            (formData.travelers.count * basePrice) - discount : 0;
        setPrice(calculatedPrice);
    }, [formData.travelers.count]);

    // Handle input changes
    const handleInputChange = (path, value) => {
        const [parent, child] = path.split('.');
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [child]: value
            }
        }));
    };

    // Handle flight leg changes
    const handleFlightLegChange = (index, field, value) => {
        setFormData(prev => {
            const updatedLegs = [...prev.flight.legs];
            updatedLegs[index] = {
                ...updatedLegs[index],
                [field]: value
            };
            return {
                ...prev,
                flight: {
                    ...prev.flight,
                    legs: updatedLegs
                }
            };
        });
    };

    // Traveler functions
    const updateTravelerCount = (count) => {
        const newCount = Math.max(1, Math.min(10000, count));
        setFormData(prev => {
            const currentList = [...prev.travelers.list];

            if (newCount > currentList.length) {
                const newTravelers = Array(newCount - currentList.length)
                    .fill()
                    .map(() => ({
                        type: "adult",
                        title: "Mr",
                        firstName: "",
                        lastName: "",
                        age: ""
                    }));
                return {
                    ...prev,
                    travelers: {
                        count: newCount,
                        list: [...currentList, ...newTravelers]
                    }
                };
            } else if (newCount < currentList.length) {
                return {
                    ...prev,
                    travelers: {
                        count: newCount,
                        list: currentList.slice(0, newCount)
                    }
                };
            }

            return {
                ...prev,
                travelers: {
                    ...prev.travelers,
                    count: newCount
                }
            };
        });
    };

    const handleTravelerManualInput = (e) => {
        const value = parseInt(e.target.value) || 1;
        updateTravelerCount(value);
    };

    const handleTravelerSelect = (count) => {
        updateTravelerCount(count);
        setShowTravelersDropdown(false);
    };

    const handleTravelerChange = (index, field, value) => {
        setFormData(prev => {
            const updatedTravelers = [...prev.travelers.list];
            updatedTravelers[index] = {
                ...updatedTravelers[index],
                [field]: value
            };
            return {
                ...prev,
                travelers: {
                    ...prev.travelers,
                    list: updatedTravelers
                }
            };
        });
    };

    // Flight leg functions
    const addFlightLeg = () => {
        setFormData(prev => ({
            ...prev,
            flight: {
                ...prev.flight,
                legs: [...prev.flight.legs, { from: "", to: "", date: null }]
            }
        }));
    };

    const removeFlightLeg = (index) => {
        if (formData.flight.legs.length > 1) {
            setFormData(prev => {
                const updatedLegs = [...prev.flight.legs];
                updatedLegs.splice(index, 1);
                return {
                    ...prev,
                    flight: {
                        ...prev.flight,
                        legs: updatedLegs
                    }
                };
            });
        }
    };

    // Validate current step
    const validateCurrentStep = () => {
        if (currentStep === 1) {
            // Validate flight details
            for (const leg of formData.flight.legs) {
                if (!leg.from || !leg.to || !leg.date) {
                    return false;
                }
            }
            return true;
        } else if (currentStep === 2) {
            // Validate traveler info
            for (const traveler of formData.travelers.list) {
                if (!traveler.firstName || !traveler.lastName) {
                    return false;
                }
            }
            return true;
        } else if (currentStep === 3) {
            // Validate contact info
            if (!formData.contact.email || !formData.contact.phone) {
                return false;
            }
            return true;
        }
        return true;
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCurrentStep()) {
            return;
        }

        if (currentStep < 3) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch('/api/flight-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    flight: {
                        ...formData.flight,
                        legs: formData.flight.legs.map(leg => ({
                            ...leg,
                            date: leg.date ? new Date(leg.date).toISOString() : null
                        }))
                    },
                    additional: {
                        ...formData.additional,
                        visaInterviewDate: formData.additional.visaInterviewDate ? new Date(formData.additional.visaInterviewDate).toISOString() : null,
                        deliveryDate: formData.additional.deliveryDate ? new Date(formData.additional.deliveryDate).toISOString() : null
                    }
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Flight booking submitted successfully!');

                setFormData(initialFormData);
                setCurrentStep(1);
            } else {
                toast.error(result.error || 'Failed to submit booking');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting your booking');
        } finally {
            setIsLoading(false);
        }
    };

    // Step navigation
    const nextStep = () => {
        if (validateCurrentStep() && currentStep < 3) {
            setCurrentStep(currentStep + 1);
            // Scroll to top of form
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Animation variants
    const stepVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <Layout>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                className="mt-[70px]"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="mt-8 relative overflow-hidden" ref={formRef}>
                {/* Header with Flight and Hotel Navigation */}
                <div className="flex bg-white shadow-md relative z-30 -mb-13 border mx-5 sm:mx-10 md:mx-16 rounded-2xl border-gray-200">
                    <Link
                        href="/services/dummy-flights"
                        className={`flex-1 py-3 px-6 cursor-pointer flex flex-col rounded-l-2xl items-center justify-center font-bold text-lg transition-colors text-white bg-white`}
                    >
                        <img
                            src="/images/icon/png/aeroplan-blue.png"
                            alt="Flight Icon"
                            className="w-16 h-14 object-cover"
                        />
                        <span className="text-primary-500">Flights</span>
                    </Link>
                    <Link
                        href={"/services/dummy-hotel"}
                        className={`flex-1 py-3 px-6 flex flex-col border-l border-gray-200 items-center justify-center font-bold text-lg transition-colors rounded-r-2xl text-gray-600 hover:text-blue-600`}
                    >
                        <img
                            src="/images/icon/png/hotel-black.png"
                            alt="Flight Icon"
                            className="w-16 h-14 object-cover"
                        />
                        <span className="text-gray-600">Hotels</span>
                    </Link>
                </div>

                {/* Progress Steps */}
                <div className="px-8 rounded-t-2xl border-t border-r border-l border-gray-200 pt-20 bg-white">
                    <div className="flex items-center justify-between relative">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex flex-col items-center z-10">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border-2 border-gray-300'}`}
                                >
                                    {step}
                                </div>
                                <span className={`text-sm mt-2 font-medium ${currentStep >= step ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {step === 1 ? 'Flight Details' : step === 2 ? 'Traveler Info' : 'Review'}
                                </span>
                            </div>
                        ))}
                        <div className="absolute top-6 left-12 right-12 h-1 bg-gray-200 z-0">
                            <div
                                className="h-full bg-blue-600 transition-all duration-500"
                                style={{ width: `${(currentStep - 1) * 50}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-8 border-r border-l border-b rounded-b-2xl border-gray-200 bg-white">
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {/* Step 1: Flight Details */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={stepVariants}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Flight Details</h2>

                                        {/* Flight Type Radio Buttons */}
                                        <div className="flex gap-1 sm:gap-4 mb-0">
                                            {["one-way", "multi-city"].map((type) => (
                                                <div key={type} className={`rounded-2xl py-[4px] px-[6px] flex items-center ${formData.flight.type === type ? "bg-blue-100" : ""}`}>
                                                    <input
                                                        type="radio"
                                                        id={`flight-type-${type}`}
                                                        name="flightType"
                                                        value={type}
                                                        checked={formData.flight.type === type}
                                                        onChange={() => handleInputChange('flight.type', type)}
                                                        className={`h-5 w-5 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300`}
                                                    />
                                                    <label
                                                        htmlFor={`flight-type-${type}`}
                                                        className={`ml-[6px] block text-sm font-medium text-gray-700 capitalize ${formData.flight.type === type ? "font-semibold" : ""}`}
                                                    >
                                                        {type.split('-').join(' ')}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Flight Legs */}
                                        <div className="space-y-6">
                                            {formData.flight.legs.map((leg, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="pt-10 bg-white rounded-xl relative"
                                                >
                                                    {formData.flight.legs.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="absolute top-0 right-4 text-red-500 hover:text-red-700 p-1 rounded-full bg-red-50"
                                                            onClick={() => removeFlightLeg(index)}
                                                        >
                                                            <FiX className="w-5 h-5" />
                                                        </button>
                                                    )}

                                                    <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 rounded-xl">
                                                        <AirportDropdown
                                                            value={leg.from}
                                                            options={airports}
                                                            onChange={(val) => handleFlightLegChange(index, 'from', val)}
                                                            label="From"
                                                        />

                                                        <AirportDropdown
                                                            value={leg.to}
                                                            options={airports}
                                                            onChange={(val) => handleFlightLegChange(index, 'to', val)}
                                                            label="To"
                                                        />

                                                        <div className="px-4 py-3">
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                {index === 0 ? 'Departure Date' : 'Next Flight Date'}
                                                            </label>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                <DatePicker
                                                                    value={leg.date}
                                                                    style={{BiBorderRadius: "30px"}}
                                                                    onChange={(newValue) => handleFlightLegChange(index, 'date', newValue)}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            fullWidth
                                                                            sx={{
                                                                                '& .MuiOutlinedInput-root': {

                                                                                     borderRadius: '30px', // ✅ Custom border radius
                                                                                    height: '56px',
                                                                                    '& fieldset': {
                                                                                        borderColor: 'rgb(255, 253, 252)',
                                                                                    },
                                                                                    '&:hover fieldset': {
                                                                                        borderColor: 'rgb(255, 253, 252)',
                                                                                    },
                                                                                    '&.Mui-focused fieldset': {
                                                                                        borderColor: 'rgb(59, 130, 246)',
                                                                                        borderWidth: '2px',
                                                                                    },
                                                                                },
                                                                            }}
                                                                        />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}

                                            {(formData.flight.type === "multi-city" ||
                                                (formData.flight.type === "round-trip" && formData.flight.legs.length < 2)) && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        type="button"
                                                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                                        onClick={addFlightLeg}
                                                    >
                                                        <FiPlus className="mr-2" />
                                                        <span>Add another flight</span>
                                                    </motion.button>
                                                )}
                                        </div>
                                    </div>

                                    {/* Number of Travelers */}
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">Number of Travelers</h3>
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            <div className="flex-1 max-w-xs w-full relative" ref={travelersDropdownRef}>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Travelers
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        value={formData.travelers.count}
                                                        onChange={handleTravelerManualInput}
                                                        onFocus={() => setShowTravelersDropdown(true)}
                                                        className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
                                                    >
                                                        <FiChevronDown className={`transition-transform ${showTravelersDropdown ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    
                                                    {showTravelersDropdown && (
                                                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-[180px] overflow-auto">
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                                <div
                                                                    key={num}
                                                                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${formData.travelers.count === num ? 'bg-blue-100' : ''}`}
                                                                    onClick={() => handleTravelerSelect(num)}
                                                                >
                                                                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 px-6 py-4 rounded-lg border border-blue-100">
                                                <div className="inline-flex justify-between items-center">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-700">Total Price:</div>
                                                        <div className="text-2xl font-bold text-blue-600">₹{price.toLocaleString()}.00</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="w-full md:w-auto px-8 py-3"
                                            >
                                                Continue to Traveler Details
                                                <FiArrowRight className="ml-3 text-xl" />
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                            {/* Step 2: Traveler Information */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={stepVariants}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Traveler Information</h2>
                                        <p className="text-gray-600 mb-6">Please enter details for all travelers</p>

                                        <div className="space-y-6">
                                            {formData.travelers.list.map((traveler, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                                    className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                                                            <FiUser className="text-blue-500" />
                                                            Traveler {index + 1}
                                                        </h3>
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                className="text-sm text-red-500 hover:text-red-700"
                                                                onClick={() => updateTravelerCount(formData.travelers.count - 1)}
                                                            >
                                                                Remove traveler
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                        {/* Traveler Type */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">Traveler Type</label>
                                                            <select
                                                                value={traveler.type}
                                                                onChange={(e) => handleTravelerChange(index, 'type', e.target.value)}
                                                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            >
                                                                {travelerTypes.map((type) => (
                                                                    <option key={type.value} value={type.value}>{type.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        {/* Title */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                                            <select
                                                                value={traveler.title}
                                                                onChange={(e) => handleTravelerChange(index, 'title', e.target.value)}
                                                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            >
                                                                {travelerTypes.find(t => t.value === traveler.type)?.titles.map(title => (
                                                                    <option key={title} value={title}>{title}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        {/* First Name */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                                            <input
                                                                type="text"
                                                                value={traveler.firstName}
                                                                onChange={(e) => handleTravelerChange(index, 'firstName', e.target.value)}
                                                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                placeholder="Given name"
                                                                required
                                                            />
                                                        </div>

                                                        {/* Last Name */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                                            <input
                                                                type="text"
                                                                value={traveler.lastName}
                                                                onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                                                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                placeholder="Surname"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={prevStep}
                                                className="w-full md:w-auto px-8 py-3"
                                            >
                                                Back
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="w-full md:w-auto px-8 py-3"
                                            >
                                                Contact Info
                                                <FiArrowRight className="ml-3 text-xl" />
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Contact Information */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={stepVariants}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                    <span className="text-xs text-gray-500 block mt-1">Order confirmation will be sent here</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.contact.email}
                                                    onChange={(e) => handleInputChange('contact.email', e.target.value)}
                                                    className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="your.email@example.com"
                                                    required
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                    <span className="text-xs text-gray-500 block mt-1">For booking confirmation</span>
                                                </label>
                                                <div className="flex">
                                                    <select
                                                        name="phoneCode"
                                                        value={formData.contact.phoneCode}
                                                        onChange={(e) => handleInputChange('contact.phoneCode', e.target.value)}
                                                        className="w-24 p-3.5 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        {countryCodes.map((country) => (
                                                            <option key={country.code} value={country.code}>
                                                                {country.code}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.contact.phone}
                                                        onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                                                        className="flex-1 p-3.5 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="9876543210"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Information */}
                                        <div className="mt-8">
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Visa Interview Date */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Visa Interview Date</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            value={formData.additional.visaInterviewDate}
                                                            onChange={(newValue) => handleInputChange('additional.visaInterviewDate', newValue)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    fullWidth
                                                                    sx={{
                                                                        '& .MuiOutlinedInput-root': {
                                                                            height: '56px',
                                                                            '& fieldset': {
                                                                                borderColor: 'rgb(209, 213, 219)',
                                                                            },
                                                                            '&:hover fieldset': {
                                                                                borderColor: 'rgb(59, 130, 246)',
                                                                            },
                                                                            '&.Mui-focused fieldset': {
                                                                                borderColor: 'rgb(59, 130, 246)',
                                                                                borderWidth: '2px',
                                                                            },
                                                                        },
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </div>

                                                {/* Delivery Date */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Delivery Date</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            value={formData.additional.deliveryDate}
                                                            onChange={(newValue) => handleInputChange('additional.deliveryDate', newValue)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    fullWidth
                                                                    sx={{
                                                                        '& .MuiOutlinedInput-root': {
                                                                            height: '56px',
                                                                            '& fieldset': {
                                                                                borderColor: 'rgb(209, 213, 219)',
                                                                            },
                                                                            '&:hover fieldset': {
                                                                                borderColor: 'rgb(59, 130, 246)',
                                                                            },
                                                                            '&.Mui-focused fieldset': {
                                                                                borderColor: 'rgb(59, 130, 246)',
                                                                                borderWidth: '2px',
                                                                            },
                                                                        },
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>

                                            {/* Special Instructions */}
                                            <div className="mt-6">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Special Instructions
                                                    <span className="text-xs text-gray-500 block mt-1">Any special requests or questions?</span>
                                                </label>
                                                <textarea
                                                    name="specialInstructions"
                                                    value={formData.additional.specialInstructions}
                                                    onChange={(e) => handleInputChange('additional.specialInstructions', e.target.value)}
                                                    className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    rows="3"
                                                    placeholder="e.g., Wheelchair assistance, dietary requirements, etc."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={prevStep}
                                                className="w-full md:w-auto px-8 py-3"
                                            >
                                                Back
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="submit"
                                                className="w-full md:w-auto px-8 py-3"
                                                disabled={isLoading ? true : false}
                                            >
                                                {!isLoading ? "Complete Booking" : "Submiting..."}

                                                {!isLoading && <FiArrowRight className="ml-3 text-xl" />}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default FlightBookingComponent;