import { HeadingSelector } from './components/HeadingSelector';

const tableOfContents = {
    name: 'tableOfContents',
    title: 'Table of Contents',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Table of Contents',
        },
        {
            name: 'showInline',
            title: 'Show Inline (in article)',
            type: 'boolean',
            description: 'Display TOC within the article content',
            initialValue: true,
        },
        {
            name: 'includeFAQ',
            title: 'Include FAQ Section',
            type: 'boolean',
            description: 'Add FAQ section link in TOC',
            initialValue: true,
        },
        {
            name: 'faqTitle',
            title: 'FAQ Section Title',
            type: 'string',
            initialValue: 'Frequently Asked Questions',
            hidden: ({ parent }) => !parent?.includeFAQ,
        },
        {
            name: 'excludedHeadings',
            title: 'Hidden Headings',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Select which headings to hide from the Table of Contents',
            components: {
                input: HeadingSelector,
            },
        },
    ],
    preview: {
        select: {
            title: 'title',
            showInline: 'showInline',
        },
        prepare({ title, showInline }) {
            return {
                title: title || 'Table of Contents',
                subtitle: showInline ? 'Inline' : 'Sidebar',
            };
        },
    },
};

export default tableOfContents;
