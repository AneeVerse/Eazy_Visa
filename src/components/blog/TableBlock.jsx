import React from 'react';

export default function TableBlock({ value }) {
    if (!value || !value.rows || value.rows.length === 0) {
        return null;
    }

    return (
        <div className="my-8 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-blue-600">
                    <tr>
                        {value.rows[0]?.cells?.map((cell, idx) => (
                            <th
                                key={idx}
                                className={`border border-blue-600 px-4 py-3 text-left text-white font-semibold text-sm ${
                                    idx === 0 ? 'rounded-tl-lg' : ''
                                } ${
                                    idx === value.rows[0]?.cells?.length - 1 ? 'rounded-tr-lg' : ''
                                }`}
                            >
                                {cell || ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {value.rows.slice(1).map((row, rowIdx) => (
                        <tr
                            key={row._key || rowIdx}
                            className={rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                        >
                            {row.cells?.map((cell, cellIdx) => (
                                <td
                                    key={cellIdx}
                                    className="border border-gray-300 px-4 py-3 text-sm text-gray-700"
                                >
                                    {cell || ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
