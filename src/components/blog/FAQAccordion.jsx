"use client";
import React, { useState } from "react";

export default function FAQAccordion({ faq }) {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faq.map((item, idx) => (
          <div key={idx} className="border rounded-lg bg-gray-50">
            <button
              className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
              onClick={() => toggle(idx)}
              aria-expanded={openIndex === idx}
            >
              <span className="font-semibold text-lg text-left">Q: {item.question}</span>
              <span className="ml-2 text-xl transition-transform duration-200" style={{ transform: openIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </span>
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-4 text-gray-700 animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 