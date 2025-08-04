"use client";

import { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';

const CountryCodeDropdown = ({ 
  value, 
  onChange, 
  className = "", 
  disabled = false,
  error = false,
  height = "h-10", // Default height to match input fields
  bgColor = "bg-white", // Default background color
  borderColor = "border-blue-700" // Default border color
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef(null);
  const searchInputRef = useRef(null);

  // Get all countries and their data
  const countries = getCountries();
  const countryData = countries.map(country => ({
    code: country,
    name: new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country,
    flag: getCountryFlag(country),
    callingCode: getCountryCallingCode(country)
  })).sort((a, b) => a.name.localeCompare(b.name));

  // Ensure default value is set when component mounts
  useEffect(() => {
    if (!value && countryData.length > 0) {
      // If no value is provided, default to India (+91)
      const indiaCountry = countryData.find(country => country.code === 'IN');
      if (indiaCountry) {
        onChange(`+${indiaCountry.callingCode}`);
      }
    }
  }, [value, countryData, onChange]);

  // Get flag emoji for country code
  function getCountryFlag(country) {
    const codePoints = country
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  // Find the selected country, with better fallback logic
  const selectedCountry = countryData.find(country => `+${country.callingCode}` === value) || 
                         countryData.find(country => country.callingCode === value?.replace('+', '')) ||
                         countryData.find(country => country.code === 'IN') || // Default to India
                         countryData[0];

  // Filter countries based on search term
  const filteredCountries = countryData.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.callingCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (callingCode) => {
    onChange(`+${callingCode}`);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!disabled) {
      if (!isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX
        });
        // Reset search term when opening
        setSearchTerm('');
      }
      setIsOpen(!isOpen);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownButton = event.target.closest('.country-dropdown');
      const isDropdownOption = event.target.closest('[data-country-dropdown]');
      const isSearchInput = event.target.closest('input[type="text"]');
      
      if (isOpen && !isDropdownButton && !isDropdownOption && !isSearchInput) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative country-dropdown">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full px-3 text-sm border rounded-l-lg appearance-none ${height}
          ${error ? "border-red-500" : borderColor}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : `${bgColor} cursor-pointer`}
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
          ${className}
        `}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="font-medium">+{selectedCountry.callingCode}</span>
        </div>
        <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !disabled && typeof window !== 'undefined' && createPortal(
        <div 
          data-country-dropdown
          className="fixed z-[9999] w-72 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            position: 'fixed'
          }}
        >
          {/* Search Input */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search country or code..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>
          
          {/* Country List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
            <button
              key={country.code}
              type="button"
                  onClick={() => handleSelect(country.callingCode)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-lg flex-shrink-0">{country.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{country.name}</div>
                    <div className="text-gray-500 text-xs">+{country.callingCode}</div>
                  </div>
            </button>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-gray-500 text-center">
                No countries found
              </div>
            )}
        </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CountryCodeDropdown; 