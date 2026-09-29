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
import ConversionTracking from '../common/ConversionTracking';
import CountryCodeDropdown from '../common/CountryCodeDropdown';
import { BiPhone } from 'react-icons/bi';
import useGeoLocation from '../../hooks/useGeoLocation';
import airports from '../../data/airports';
import useSubmissionProtection from '../../hooks/useSubmissionProtection';
import SubmissionProtectionFields from '../common/SubmissionProtectionFields';

const FlightBookingComponent = ({ onTabClick, origin }) => {
    const userGeo = useGeoLocation();
    const {
        getProtectionData,
        resetProtection,
        isVerifying,
        protectionFieldProps,
    } = useSubmissionProtection('flight_booking');
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
            legs: [{ from: "", to: "", date: null }],
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

    // Check for hero form data and pre-fill
    useEffect(() => {
        const heroFormData = sessionStorage.getItem('heroFormData');
        if (heroFormData) {
            try {
                const parsedData = JSON.parse(heroFormData);

                // Pre-fill flight form with hero form data
                if (parsedData.flight) {
                    setFormData(prev => ({
                        ...prev,
                        flight: {
                            type: parsedData.flight.type || "one-way",
                            legs: parsedData.flight.legs.map(leg => ({
                                from: leg.from || "DEL",
                                to: leg.to || "BOM",
                                date: leg.date ? new Date(leg.date) : null
                            }))
                        },
                        travelers: {
                            ...prev.travelers,
                            count: parsedData.travelers?.count || 1,
                            list: Array(parsedData.travelers?.count || 1).fill().map(() => ({
                                type: "adult",
                                title: "Mr",
                                firstName: "",
                                lastName: "",
                                age: ""
                            }))
                        }
                    }));
                }

                // Clear the hero form data after using it
                sessionStorage.removeItem('heroFormData');
            } catch (error) {
                console.error('Error parsing hero form data:', error);
            }
        }
    }, []);
    


    const travelerTypes = [
        { value: "adult", label: "Adult (12+ years)", titles: ["Mr", "Mrs", "Ms", "Dr"] },
        { value: "child", label: "Child (2-12 years)", titles: ["Master", "Miss"] },
        { value: "infant", label: "Infant (0-2 years)", titles: ["Master", "Miss"] }
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

    // Handle country code change
    const handleCountryCodeChange = (value) => {
        console.log('Country code changed to:', value);
        handleInputChange('contact.phoneCode', value);
    };

    // Handle input changes
    const handleInputChange = (path, value) => {
        const [parent, child] = path.split('.');

        if (parent === 'flight' && child === 'type') {
            // Handle flight type change
            setFormData(prev => {
                let legs = [...prev.flight.legs];

                if (value === "one-way") {
                    // For one-way, keep only the first leg
                    legs = legs.slice(0, 1);
                } else if (value === "round-trip" && legs.length < 2) {
                    // For round-trip, add return leg if needed
                    legs = [
                        ...legs,
                        {
                            from: legs[0].to,
                            to: legs[0].from,
                            date: null
                        }
                    ];
                }
                // For multi-city, leave legs as they are

                return {
                    ...prev,
                    flight: {
                        ...prev.flight,
                        type: value,
                        legs
                    }
                };
            });
        } else {
            // Normal case for other fields
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        }
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
        if (formData.flight.type === "multi-city") {
            setFormData(prev => ({
                ...prev,
                flight: {
                    ...prev.flight,
                    legs: [...prev.flight.legs, {
                        from: prev.flight.legs[prev.flight.legs.length - 1].to,
                        to: "",
                        date: null
                    }]
                }
            }));
        }
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
            const protectionData = await getProtectionData();
            const response = await fetch('/api/flight-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formName: origin,
                    ...formData,
                    price: price,
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
                    },
                    userLocation: userGeo ? `${userGeo.city}, ${userGeo.region}, ${userGeo.country}` : 'Unknown',
                    userPincode: userGeo ? userGeo.pincode : 'Unknown',
                    userIp: userGeo ? userGeo.ip : 'Unknown',
                    ...protectionData,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                // toast.success('Flight booking submitted successfully!');
                sessionStorage.setItem('formSubmitted', 'true');
                sessionStorage.setItem('bookingPrice', price.toString());

                // Redirect based on origin
                if (origin === 'landing-flight' || origin === 'landing-hotel' || origin === 'landing-most-preferred') {
                    // For visa ads page, redirect to thank-you-conversion
                    window.location.href = '/thank-you-conversion';
                } else {
                    // For normal dummy bookings, redirect to dynamic confirmation
                    window.location.href = '/Confirmation-flight';
                }

                setFormData(initialFormData);
                // setCurrentStep(1);
            } else {
                toast.error(result.error || 'Failed to submit booking');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.message || 'An error occurred while submitting your booking');
        } finally {
            setIsLoading(false);
            resetProtection();
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
        if (currentStep === 3) resetProtection();
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
            {/* Google Ads Conversion Tracking - Fire when user reaches review step */}
            {currentStep === 3 && <ConversionTracking />}

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

            <div className="mt-8 relative " ref={formRef}>
                {/* Header with Flight and Hotel Navigation */}
                <div className="flex bg-white shadow-md relative z-30 -mb-13 border mx-5 sm:mx-10 md:mx-16 rounded-2xl border-gray-200">
                    {onTabClick ? (
                        <button
                            onClick={() => onTabClick('flight')}
                            className="flex-1 py-3 px-6 cursor-pointer flex flex-col rounded-l-2xl items-center justify-center font-bold text-lg transition-colors text-white bg-white"
                        >
                            <img src="/images/icon/png/aeroplan-blue.png" alt="Flight Icon" className="w-16 h-14 object-cover" />
                            <span className="text-primary-500">Flights</span>
                        </button>
                    ) : (
                        <Link
                            href="/services/dummy-flights"
                            className="flex-1 py-3 px-6 cursor-pointer flex flex-col rounded-l-2xl items-center justify-center font-bold text-lg transition-colors text-white bg-white"
                        >
                            <img src="/images/icon/png/aeroplan-blue.png" alt="Flight Icon" className="w-16 h-14 object-cover" />
                            <span className="text-primary-500">Flights</span>
                        </Link>
                    )}
                    {onTabClick ? (
                        <button
                            onClick={() => onTabClick('hotel')}
                            className="flex-1 py-3 px-6 flex flex-col border-l border-gray-200 items-center justify-center font-bold text-lg transition-colors rounded-r-2xl text-gray-600 hover:text-blue-600"
                        >
                            <img src="/images/icon/png/hotel-black.png" alt="Hotel Icon" className="w-16 h-14 object-cover" />
                            <span className="text-gray-600">Hotels</span>
                        </button>
                    ) : (
                        <Link
                            href="/services/dummy-hotel"
                            className="flex-1 py-3 px-6 flex flex-col border-l border-gray-200 items-center justify-center font-bold text-lg transition-colors rounded-r-2xl text-gray-600 hover:text-blue-600"
                        >
                            <img src="/images/icon/png/hotel-black.png" alt="Hotel Icon" className="w-16 h-14 object-cover" />
                            <span className="text-gray-600">Hotels</span>
                        </Link>
                    )}
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
                                            {["one-way", "round-trip", "multi-city"].map((type) => (
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
                                                                    style={{ BiBorderRadius: "30px" }}
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

                                            {formData.flight.type === "multi-city" && (
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

                                    <div className="flex justify-center sm:justify-end pt-4">
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
                                                    <div className="flex-shrink-0 relative">
                                                        <CountryCodeDropdown
                                                            value={formData.contact.phoneCode}
                                                            onChange={handleCountryCodeChange}
                                                            height="h-14"
                                                            borderColor="border-gray-300"
                                                            bgColor="bg-white"
                                                        />
                                                    </div>
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

                                    <SubmissionProtectionFields
                                        {...protectionFieldProps}
                                        className="pt-2"
                                    />

                                    <div className="flex justify-between pt-4">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={prevStep}
                                                className="w-full md:w-auto px-3 sm:px-8 py-3"
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
                                                disabled={isLoading || isVerifying}
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