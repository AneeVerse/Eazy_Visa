"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiCalendar, BiX, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FiClock } from "react-icons/fi";

const CalendarPopup = ({ isOpen, onClose, onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [internalSelectedDate, setInternalSelectedDate] = useState(selectedDate);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (day) => {
    const today = new Date();
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate < today.setHours(0, 0, 0, 0);
  };

  const handleDateClick = (day) => {
    if (isDateDisabled(day)) return;
    
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setInternalSelectedDate(selected);
  };

  const handleConfirmDateTime = () => {
    if (internalSelectedDate) {
      const dateTimeString = `${internalSelectedDate.toDateString()} at ${selectedTime}`;
      onDateSelect(internalSelectedDate, selectedTime, dateTimeString);
      onClose();
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      const isSelected = internalSelectedDate && 
        internalSelectedDate.getDate() === day && 
        internalSelectedDate.getMonth() === currentDate.getMonth() &&
        internalSelectedDate.getFullYear() === currentDate.getFullYear();

      days.push(
        <motion.button
          key={day}
          type="button"
          whileHover={!isDisabled ? { scale: 1.1 } : {}}
          whileTap={!isDisabled ? { scale: 0.95 } : {}}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
            isSelected
              ? "bg-blue-600 text-white shadow-md"
              : isDisabled
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          {day}
        </motion.button>
      );
    }

    return days;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <BiCalendar className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Select Date & Time</h3>
                  <p className="text-sm opacity-90">Choose your consultation slot</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <BiX className="text-2xl" />
              </motion.button>
            </div>
          </div>

          {/* Main Content - Side by Side Layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Calendar Section */}
            <div className="flex-1 p-6 lg:border-r border-gray-200">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <BiChevronLeft className="text-xl text-gray-600" />
                </motion.button>
                
                <h4 className="text-lg font-semibold text-gray-800">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h4>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <BiChevronRight className="text-xl text-gray-600" />
                </motion.button>
              </div>

              {/* Calendar Grid */}
              <div>
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>

            {/* Time Selection Section */}
            <div className="flex-1 p-6 bg-gray-50 lg:bg-white">
              <div className="flex items-center space-x-2 mb-6">
                <FiClock className="text-blue-500" />
                <h5 className="font-medium text-gray-800">Select Time</h5>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTime(time)}
                    className={`py-4 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      selectedTime === time
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {time}
                  </motion.button>
                ))}
              </div>

              {/* Confirm Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmDateTime}
                disabled={!internalSelectedDate}
                className={`w-full mt-8 py-4 px-6 rounded-lg font-medium transition-all duration-300 ${
                  internalSelectedDate
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
              >
                Confirm Date & Time
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CalendarPopup;