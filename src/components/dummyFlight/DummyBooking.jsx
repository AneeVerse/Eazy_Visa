"use client";
import { useState } from "react";
import { FiChevronDown, FiPlus, FiMinus, FiArrowRight, FiCalendar } from "react-icons/fi";
import { FaPlane, FaHotel, FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import Layout from "../common/Layout";
import { Heading } from "../common/Typography";
import Button from "../common/Button";

export default function FlightBookingComponent() {
    const [tripType, setTripType] = useState("one-way");
    const [travellers, setTravellers] = useState({
        adults: 1,
        children: 0
    });
    const [flightClass, setFlightClass] = useState("economy");
    const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);
    const [cities, setCities] = useState([
        {
            from: "Delhi",
            fromCode: "DEL",
            to: "Bengaluru",
            toCode: "BLR",
            date: new Date(2025, 2, 23),
            returnDate: new Date(2025, 2, 30)
        }
    ]);

    // Date formatting helper
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: '2-digit',
            weekday: 'short'
        });
    };

    const addCity = () => {
        setCities([
            ...cities,
            {
                from: "Bengaluru",
                fromCode: "BLR",
                to: "",
                toCode: "",
                date: new Date(2025, 2, 24),
                returnDate: new Date(2025, 2, 31)
            }
        ]);
    };

    const removeCity = (index) => {
        const newCities = [...cities];
        newCities.splice(index, 1);
        setCities(newCities);
    };

    const updateCity = (index, field, value) => {
        const newCities = [...cities];
        newCities[index][field] = value;
        setCities(newCities);
    };

    const updateTravellers = (type, value) => {
        setTravellers(prev => ({
            ...prev,
            [type]: Math.max(0, value)
        }));
    };

    return (
        <Layout>
        <div className=" bg-white mt-[40px] rounded-2xl shadow-md border border-gray-100">
            {/* Header with Flight and Hotel Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                    className={`flex-1 py-5 px-6 flex items-center justify-center gap-3 font-medium text-lg transition-colors text-white bg-primary-500 rounded-tl-2xl shadow-md`}

                >
                    <FaPlane className="text-xl" />
                    <span>Flights</span>
                </button>
                <Link
                    href={"/services/dummy-hotel"}
                    className={`flex-1 py-5 px-6  cursor-pointer flex items-center justify-center gap-3 font-medium text-lg transition-colors text-gray-600 hover:text-blue-600`}

                >
                    <FaHotel className="text-xl" />
                    <span>Hotels</span>
                </Link>
            </div>

            <div className="p-3 sm:p-4 md:p-8">
                

                {/* Flight Type Tabs */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                    {["one-way", "round-trip", "multi-city"].map((type) => (
                        <button
                            key={type}
                            className={`flex-1 py-3 px-4 text-center font-medium capitalize rounded-md transition-colors ${tripType === type ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-blue-600"}`}
                            onClick={() => setTripType(type)}
                        >
                            {type.split('-').join(' ')}
                        </button>
                    ))}
                </div>

                {/* Flight Search Form */}
                <div className="space-y-6">
                    {cities.map((city, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 bg-gray-50 rounded-xl relative border border-gray-200">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">From</label>
                                <div className="relative">
                                    <select
                                        className="w-full p-4 border border-gray-300 rounded-xl bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={`${city.fromCode},${city.from}`}
                                        onChange={(e) => {
                                            const [code, name] = e.target.value.split(',');
                                            updateCity(index, 'fromCode', code);
                                            updateCity(index, 'from', name);
                                        }}
                                    >
                                        <option value="DEL,Delhi">Delhi (DEL)</option>
                                        <option value="BLR,Bengaluru">Bengaluru (BLR)</option>
                                        <option value="BOM,Mumbai">Mumbai (BOM)</option>
                                        <option value="MAA,Chennai">Chennai (MAA)</option>
                                    </select>
                                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">To</label>
                                <div className="relative">
                                    <select
                                        className="w-full p-4 border border-gray-300 rounded-xl bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={city.toCode ? `${city.toCode},${city.to}` : ""}
                                        onChange={(e) => {
                                            const [code, name] = e.target.value.split(',');
                                            updateCity(index, 'toCode', code);
                                            updateCity(index, 'to', name);
                                        }}
                                    >
                                        <option value="">Select destination</option>
                                        <option value="DEL,Delhi">Delhi (DEL)</option>
                                        <option value="BLR,Bengaluru">Bengaluru (BLR)</option>
                                        <option value="BOM,Mumbai">Mumbai (BOM)</option>
                                        <option value="MAA,Chennai">Chennai (MAA)</option>
                                    </select>
                                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Departure</label>
                                    <div className="p-4 border border-gray-300 rounded-xl bg-white flex items-center gap-3">
                                        <FiCalendar className="text-blue-500" />
                                        <div className="flex items-baseline gap-1">
                                            <div className="font-medium">{formatDate(city.date).split(',')[0]}</div>
                                            <div className="text-sm text-gray-500">{formatDate(city.date).split(',')[1]}</div>
                                        </div>
                                    </div>
                                </div>
                                {tripType === "round-trip" && index === 0 && (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Return</label>
                                        <div className="p-4 border border-gray-300 rounded-xl bg-white flex items-center gap-3">
                                            <FiCalendar className="text-blue-500" />
                                            <div>
                                                <div className="font-medium">{formatDate(city.returnDate).split(',')[0]}</div>
                                                <div className="text-sm text-gray-500">{formatDate(city.returnDate).split(',')[1]}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {index > 0 && (
                                <button
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 rounded-full bg-red-50"
                                    onClick={() => removeCity(index)}
                                >
                                    <FiMinus className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}

                    {tripType === "multi-city" && (
                        <button
                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2"
                            onClick={addCity}
                        >
                            <FiPlus className="mr-2" />
                            <span>Add another flight</span>
                        </button>
                    )}

                    {/* Travellers & Class */}
                    <div className="relative">
                        <button
                            className="flex items-center justify-between w-full md:w-80 p-4 border border-gray-300 rounded-xl bg-white hover:border-blue-500 transition-colors"
                            onClick={() => setShowTravellerDropdown(!showTravellerDropdown)}
                        >
                            <div className="flex items-center gap-3">
                                <FaUserFriends className="text-blue-500 text-xl" />
                                <div>
                                    <div className="text-sm font-medium text-gray-700">Travellers & Class</div>
                                    <div className="text-left text-gray-900">
                                        {travellers.adults + travellers.children} {travellers.adults + travellers.children === 1 ? "Traveller" : "Travellers"}, {flightClass === "economy" ? "Economy" : flightClass === "premium" ? "Premium Economy" : "Business"}
                                    </div>
                                </div>
                            </div>
                            <FiChevronDown className={`text-gray-400 text-xl transition-transform ${showTravellerDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showTravellerDropdown && (
                            <div className="absolute z-10 mt-2 w-full md:w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-6 space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <div className="font-medium text-gray-900">Adults</div>
                                            <div className="text-sm text-gray-500">12+ years</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                                                onClick={() => updateTravellers('adults', travellers.adults - 1)}
                                                disabled={travellers.adults <= 1}
                                            >
                                                <FiMinus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-medium">{travellers.adults}</span>
                                            <button
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                                                onClick={() => updateTravellers('adults', travellers.adults + 1)}
                                            >
                                                <FiPlus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium text-gray-900">Children</div>
                                            <div className="text-sm text-gray-500">2-11 years</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                                                onClick={() => updateTravellers('children', travellers.children - 1)}
                                                disabled={travellers.children <= 0}
                                            >
                                                <FiMinus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-medium">{travellers.children}</span>
                                            <button
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                                                onClick={() => updateTravellers('children', travellers.children + 1)}
                                            >
                                                <FiPlus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 mb-3">Travel Class</div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["economy", "premium", "business"].map((cls) => (
                                            <button
                                                key={cls}
                                                className={`py-2 px-3 rounded-lg border ${flightClass === cls ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                                                onClick={() => setFlightClass(cls)}
                                            >
                                                <span className="capitalize text-sm">
                                                    {cls === "premium" ? "Premium" : cls}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6 flex justify-center">
                        <Button variant="secondary" size="large" className="w-full md:w-auto" href="/flights/search">
                            Search Flights
                            <FiArrowRight className="ml-3 text-xl" />
                        </Button>

                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
}