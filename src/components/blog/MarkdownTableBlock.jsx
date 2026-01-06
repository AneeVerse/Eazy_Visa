import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownTableBlock = ({ value }) => {
    if (!value || !value.tableContent) return null;

    return (
        <div className="overflow-x-auto my-6 shadow-sm rounded-lg -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle markdown-table-wrapper">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: ({ children }) => (
                            <table className="min-w-full border border-gray-300 text-sm">
                                {children}
                            </table>
                        ),
                        thead: ({ children }) => <thead className="bg-[#2276fc] text-white">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children, ...props }) => {
                            // Check if this is in thead or tbody for styling
                            // This prop handling might depend on react-markdown version, but usually node is passed
                            const isHeader = props.node?.parentNode?.tagName === 'thead';
                            return (
                                <tr className={isHeader ? "" : "even:bg-white odd:bg-gray-50"}>
                                    {children}
                                </tr>
                            );
                        },
                        th: ({ children }) => (
                            <th className="px-2 sm:px-3 py-2 font-semibold border border-blue-500 text-left text-xs sm:text-sm whitespace-nowrap">
                                {children}
                            </th>
                        ),
                        td: ({ children }) => (
                            <td className="border px-2 sm:px-3 py-2 align-top text-xs sm:text-sm text-gray-700 leading-relaxed max-w-xs break-words">
                                {children}
                            </td>
                        ),
                    }}
                >
                    {value.tableContent}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownTableBlock;
