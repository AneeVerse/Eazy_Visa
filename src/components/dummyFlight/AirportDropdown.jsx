"use client"

import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiSearch, FiX } from 'react-icons/fi';

export default function AirportDropdown({
    value,
    options,
    onChange,
    label,
    className = "",
    placeholderSize = "base"
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Filter options based on search term
    useEffect(() => {
        const filtered = options.filter(option => 
            option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.city?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [searchTerm, options]);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.code === value);

    const handleSelect = (code) => {
        onChange(code);
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div 
            className={`relative px-4 py-3 border-r border-gray-200 ${className}`}
            ref={dropdownRef}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
        >
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            {/* Custom dropdown trigger */}
            <button
                type="button"
                className="w-full min-w-[180px] flex items-center justify-between text-2xl font-bold rounded-lg h-14 focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={`${label} dropdown`}
            >
                {selectedOption ? (
                    <span className="truncate text-left">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">{selectedOption.code}</span>
                            <span className="text-xs line-clamp-1 max-w-full text-gray-500 mt-1">{selectedOption.city || selectedOption.name}</span>
                        </div>
                    </span>
                ) : (
                    <span className={`whitespace-normal text-left text-gray-400 ${placeholderSize === "sm" ? 'text-sm' : 'text-xl'}`}>Country, city or airport</span>
                )}
                <FiChevronDown className={`ml-2 h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {/* Dropdown options */}
            {isOpen && (
                <div className="absolute z-20 mt-2 w-full max-h-96 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-gray-200 focus:outline-none">
                    {/* Search bar */}
                    <div className="sticky top-0 bg-white p-3 border-b border-gray-200">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                ref={searchInputRef}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search airport or city"
                                className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md  focus:border-blue-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <FiX />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Options list */}
                    <ul 
                        className="max-h-[270px] overflow-y-auto"
                        role="listbox"
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option,ind) => (
                                <li
                                    key={option.code +ind }
                                    className={`cursor-pointer select-none relative py-3 px-4 hover:bg-blue-50 ${value === option.code ? 'bg-blue-100' : ''}`}
                                    onClick={() => handleSelect(option.code)}
                                    role="option"
                                    aria-selected={value === option.code}
                                >
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 p-1 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-blue-600 font-medium text-[10px]">{option.code}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {option.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {option.city && `${option.city}, `}{option.country}
                                            </p>
                                        </div>
                                    </div>

                                    {value === option.code && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                            ✓
                                        </span>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li className="py-4 px-4 text-center text-gray-500">
                                No airports found
                            </li>
                        )}
                    </ul>

                    {/* Recent searches (optional) */}
                    {/* <div className="sticky bottom-0 bg-gray-50 p-3 border-t border-gray-200">
                        <h4 className="text-xs font-medium text-gray-500 mb-2">RECENT SEARCHES</h4>
                        <div className="flex flex-wrap gap-2">
                            {recentSearches.map(search => (
                                <button 
                                    key={search.code}
                                    className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-100"
                                >
                                    {search.code}
                                </button>
                            ))}
                        </div>
                    </div> */}
                </div>
            )}
        </div>
    );
};