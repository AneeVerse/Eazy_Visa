import { TablePasteInput } from './components/TablePasteInput';

const table = {
    name: 'table',
    title: 'Table',
    type: 'object',
    fields: [
        {
            name: 'rows',
            title: 'Table Rows',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'tableRow',
                    fields: [
                        {
                            name: 'cells',
                            title: 'Cells',
                            type: 'array',
                            of: [{ type: 'string' }],
                        },
                    ],
                },
            ],
        },
    ],
    components: {
        input: TablePasteInput,
    },
    preview: {
        select: {
            rows: 'rows',
        },
        prepare({ rows }) {
            const rowCount = rows?.length || 0;
            const colCount = rows?.[0]?.cells?.length || 0;
            return {
                title: 'Table',
                subtitle: `${rowCount} rows × ${colCount} columns`,
            };
        },
    },
};

export default table;
