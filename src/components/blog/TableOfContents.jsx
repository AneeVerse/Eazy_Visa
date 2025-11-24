'use client';

import React, { useEffect, useState } from 'react';

export default function TableOfContents({
    title = "IN THIS ARTICLE",
    includeFAQ = false,
    faqTitle = "FAQ",
    excludedHeadings = []
}) {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const articleHeadings = Array.from(
            document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4')
        );

        const headingsData = articleHeadings
            .filter((heading) => {
                const text = heading.textContent?.trim() || '';
                // Filter out excluded headings
                return !excludedHeadings.includes(text);
            })
            .map((heading) => {
                let id = heading.id;
                if (!id) {
                    id = heading.textContent?.trim().toLowerCase().replace(/\s+/g, '-') || '';
                    heading.id = id;
                }
                return {
                    id,
                    text: heading.textContent?.trim() || '',
                    level: parseInt(heading.tagName.substring(1)),
                };
            });

        setHeadings(headingsData);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -80% 0px' }
        );

        articleHeadings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, [excludedHeadings]);

    if (headings.length === 0 && !includeFAQ) return null;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-8">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                {title}
            </h3>
            <nav>
                <ul className="space-y-3">
                    {headings.map((heading) => (
                        <li
                            key={heading.id}
                            className="flex items-center"
                        >
                            <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                            <a
                                href={`#${heading.id}`}
                                className={`text-sm transition-colors leading-relaxed ${activeId === heading.id
                                        ? 'text-blue-600 font-medium underline'
                                        : 'text-gray-700 hover:text-blue-600 hover:underline'
                                    }`}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                    {includeFAQ && (
                        <li className="flex items-center">
                            <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                            <a
                                href="#faq-section"
                                className={`text-sm transition-colors leading-relaxed ${activeId === 'faq-section'
                                        ? 'text-blue-600 font-medium underline'
                                        : 'text-gray-700 hover:text-blue-600 hover:underline'
                                    }`}
                            >
                                {faqTitle}
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}
