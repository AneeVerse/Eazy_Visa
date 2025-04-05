"use client";
import { useState } from "react";
import { FiSearch, FiCalendar, FiChevronDown, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { FaPlane, FaHotel, FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import Layout from "../common/Layout";
import { Heading } from "../common/Typography";
import Button from "../common/Button";

export default function HotelBookingComponent() {
    const [location, setLocation] = useState("Gold India");
    const [checkInDate, setCheckInDate] = useState(new Date(2025, 2, 23));
    const [checkOutDate, setCheckOutDate] = useState(new Date(2025, 2, 24));
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [showRoomOptions, setShowRoomOptions] = useState(false);
    const [priceRange, setPriceRange] = useState([100, 1500, 2500]);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: '2-digit',
            weekday: 'short'
        });
    };

    const updateGuests = (type, value) => {
        if (type === 'adults') {
            setAdults(Math.max(1, value));
        } else if (type === 'rooms') {
            setRooms(Math.max(1, Math.min(4, value)));
        }
    };

    return (
        <Layout>
            <div className="mt-[40px]  bg-white rounded-2xl shadow-md border border-gray-100">
                {/* Header with Flight and Hotel Navigation */}
                <div className="flex border-b border-gray-200 bg-gray-50">
                    <Link
                        href="/services/dummy-flights"
                        className={`flex-1 py-5 px-6 cursor-pointer flex items-center justify-center gap-3 font-medium text-lg transition-colors text-gray-600 hover:text-blue-600`}
                    >
                        <FaPlane className="text-xl" />
                        <span>Flights</span>
                    </Link>
                    <button
                        className={`flex-1 py-5 px-6 flex items-center justify-center gap-3 font-medium text-lg transition-colors text-white bg-primary-500 shadow-md`}
                    >
                        <FaHotel className="text-xl" />
                        <span>Hotels</span>
                    </button>
                </div>

                <div className="p-3 sm:p-4 md:p-8">
                   
                    <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex-1 min-w-[60%]">


                            {/* Search Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">City, Property Name or Location</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full p-4 border border-gray-300 rounded-xl bg-white pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Where do you want to stay?"
                                        />
                                        <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Check-In</label>
                                        <div className="p-4 border border-gray-300 rounded-xl bg-white flex items-center gap-3">
                                            <FiCalendar className="text-blue-500" />
                                            <div>
                                                <div className="font-medium">{formatDate(checkInDate).split(',')[0]}</div>
                                                <div className="text-sm text-gray-500">{formatDate(checkInDate).split(',')[1]}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Check-Out</label>
                                        <div className="p-4 border border-gray-300 rounded-xl bg-white flex items-center gap-3">
                                            <FiCalendar className="text-blue-500" />
                                            <div>
                                                <div className="font-medium">{formatDate(checkOutDate).split(',')[0]}</div>
                                                <div className="text-sm text-gray-500">{formatDate(checkOutDate).split(',')[1]}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rooms & Guests */}
                            <div className="relative mb-6">
                                <button
                                    className="flex items-center justify-between w-full p-4 border border-gray-300 rounded-xl bg-white hover:border-blue-500 transition-colors"
                                    onClick={() => setShowRoomOptions(!showRoomOptions)}
                                >
                                    <div className="flex items-center gap-3">
                                        <FaUserFriends className="text-blue-500 text-xl" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-700">Rooms & Guests</div>
                                            <div className="text-left text-gray-900">
                                                {rooms} {rooms === 1 ? "Room" : "Rooms"}, {adults} {adults === 1 ? "Adult" : "Adults"}
                                            </div>
                                        </div>
                                    </div>
                                    <FiChevronDown className={`text-gray-400 text-xl transition-transform ${showRoomOptions ? 'rotate-180' : ''}`} />
                                </button>

                                {showRoomOptions && (
                                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl p-6 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-medium text-gray-900">Rooms</div>
                                                <div className="text-sm text-gray-500">Maximum 4 rooms</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                                                    onClick={() => updateGuests('rooms', rooms - 1)}
                                                    disabled={rooms <= 1}
                                                >
                                                    <FiMinus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">{rooms}</span>
                                                <button
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                                                    onClick={() => updateGuests('rooms', rooms + 1)}
                                                    disabled={rooms >= 4}
                                                >
                                                    <FiPlus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-medium text-gray-900">Adults</div>
                                                <div className="text-sm text-gray-500">12+ years</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                                                    onClick={() => updateGuests('adults', adults - 1)}
                                                    disabled={adults <= 1}
                                                >
                                                    <FiMinus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">{adults}</span>
                                                <button
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                                                    onClick={() => updateGuests('adults', adults + 1)}
                                                >
                                                    <FiPlus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-8">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Price Per Night</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {priceRange.map((price, index) => (
                                    <div key={index} className={`p-4 rounded-xl border ${index === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} text-center`}>
                                        <div className="text-gray-500 text-sm">From</div>
                                        <div className="font-bold text-lg">₹{price.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 flex justify-center">
                        <Button variant="secondary" size="large" className="w-full md:w-auto" href="/flights/search">
                            Search Hotel
                            <FiArrowRight className="ml-3 text-xl" />
                        </Button>

                    </div>
                </div>
            </div>
        </Layout>
    );
}