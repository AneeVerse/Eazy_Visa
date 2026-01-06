import { MarkdownTableInput } from './components/MarkdownTableInput';

const markdownTable = {
    name: 'markdownTable',
    title: 'Table (Paste Supported)',
    type: 'object',
    fields: [
        {
            name: 'tableContent',
            title: 'Table Content',
            type: 'markdown',
            components: {
                input: MarkdownTableInput,
            },
        },
    ],
    preview: {
        select: {
            content: 'tableContent',
        },
        prepare({ content }) {
            const lines = (content || '').split('\n').filter((l) => l.trim() && !l.includes('---'));
            const rowCount = lines.length;
            return {
                title: `Table (${rowCount} rows)`,
                subtitle: lines[0]?.substring(0, 50) || 'Empty table',
            };
        },
    },
};

export default markdownTable;
