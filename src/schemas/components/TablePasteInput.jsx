import React, { useState, useCallback } from 'react';
import { Stack, Card, Text, Button, Box, Flex, TextArea } from '@sanity/ui';
import { set, unset } from 'sanity';
import { ClipboardIcon, TrashIcon, EditIcon } from '@sanity/icons';

function generateKey() {
    return `row_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function TablePasteInput(props) {
    const { value, onChange } = props;
    const [pasteText, setPasteText] = useState('');
    const [showPasteArea, setShowPasteArea] = useState(false);
    const [editingCell, setEditingCell] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [parseError, setParseError] = useState(null);

    const parseTable = useCallback((text) => {
        if (!text.trim()) return null;
        setParseError(null);

        try {
            let lines = text.trim().split('\n').map(line => line.trim()).filter(line => line);
            if (lines.length === 0) return null;

            const isMarkdown = lines[0].startsWith('|');
            let delimiter = '\t';

            if (isMarkdown) {
                lines = lines.filter(line => {
                    const cleaned = line.replace(/\|/g, '').trim();
                    return !(/^[-–—\s]+$/.test(cleaned));
                });
                delimiter = '|';
            } else if (lines[0].includes('\t')) {
                delimiter = '\t';
            } else if (lines[0].includes(',')) {
                delimiter = ',';
            }

            const rows = lines.map((line) => {
                let cells;
                if (delimiter === '|') {
                    cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
                } else {
                    cells = line.split(delimiter).map(cell => cell.trim());
                }
                return { _key: generateKey(), cells };
            });

            const validRows = rows.filter(row => row.cells.length > 0);
            if (validRows.length === 0) {
                setParseError('No valid rows found');
                return null;
            }

            const maxColumns = Math.max(...validRows.map(row => row.cells.length));
            const normalizedRows = validRows.map(row => ({
                _key: row._key,
                cells: [...row.cells, ...Array(maxColumns - row.cells.length).fill('')]
            }));

            return { _type: 'table', rows: normalizedRows };
        } catch (error) {
            setParseError('Failed to parse table');
            return null;
        }
    }, []);

    const handlePaste = useCallback(() => {
        const parsedTable = parseTable(pasteText);
        if (parsedTable) {
            onChange(set(parsedTable));
            setPasteText('');
            setShowPasteArea(false);
        }
    }, [pasteText, parseTable, onChange]);

    const handleQuickPaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            const parsedTable = parseTable(clipboardText);
            if (parsedTable) {
                onChange(set(parsedTable));
            } else {
                setPasteText(clipboardText);
                setShowPasteArea(true);
            }
        } catch (err) {
            setShowPasteArea(true);
        }
    }, [parseTable, onChange]);

    const handleCellClick = useCallback((rowIdx, colIdx, currentValue) => {
        setEditingCell({ row: rowIdx, col: colIdx });
        setEditValue(currentValue);
    }, []);

    const handleCellSave = useCallback(() => {
        if (!editingCell || !value) return;
        const newRows = [...value.rows];
        newRows[editingCell.row].cells[editingCell.col] = editValue;
        onChange(set({ _type: 'table', ...value, rows: newRows }));
        setEditingCell(null);
        setEditValue('');
    }, [editingCell, editValue, value, onChange]);

    const handleCellCancel = useCallback(() => {
        setEditingCell(null);
        setEditValue('');
    }, []);

    const handleAddRow = useCallback(() => {
        if (!value || !value.rows || value.rows.length === 0) return;
        const columnCount = value.rows[0].cells.length;
        const newRow = { _key: generateKey(), cells: Array(columnCount).fill('') };
        onChange(set({ _type: 'table', ...value, rows: [...value.rows, newRow] }));
    }, [value, onChange]);

    const handleDeleteRow = useCallback((rowIdx) => {
        if (!value || !value.rows) return;
        const newRows = value.rows.filter((_, idx) => idx !== rowIdx);
        if (newRows.length === 0) {
            onChange(unset());
        } else {
            onChange(set({ _type: 'table', ...value, rows: newRows }));
        }
    }, [value, onChange]);

    const handleFixKeys = useCallback(() => {
        if (!value || !value.rows) return;
        const fixedRows = value.rows.map(row => ({ ...row, _key: row._key || generateKey() }));
        onChange(set({ _type: 'table', ...value, rows: fixedRows }));
    }, [value, onChange]);

    const hasMissingKeys = value?.rows?.some(row => !row._key) || !value?._type;

    return (
        <Stack space={3}>
            {hasMissingKeys && (
                <Card padding={3} tone="caution">
                    <Flex align="center" justify="space-between">
                        <Text size={1}>⚠️ Table has validation issues</Text>
                        <Button text="Fix Table Issues" tone="primary" onClick={handleFixKeys} fontSize={1} />
                    </Flex>
                </Card>
            )}

            <Flex gap={2} wrap="wrap">
                <Button icon={ClipboardIcon} text="Quick Paste" tone="primary" onClick={handleQuickPaste} />
                {value && (
                    <>
                        <Button icon={EditIcon} text="Add Row" tone="positive" onClick={handleAddRow} mode="ghost" />
                        <Button icon={TrashIcon} text="Clear" tone="critical" onClick={() => onChange(unset())} mode="ghost" />
                    </>
                )}
                <Button text={showPasteArea ? "Hide" : "Manual Paste"} onClick={() => setShowPasteArea(!showPasteArea)} mode="ghost" />
            </Flex>

            {parseError && <Card padding={3} tone="critical"><Text size={1}>⚠️ {parseError}</Text></Card>}

            {showPasteArea && (
                <Card padding={3} tone="primary">
                    <Stack space={3}>
                        <TextArea
                            value={pasteText}
                            onChange={(e) => setPasteText(e.currentTarget.value)}
                            placeholder="Paste table here (Markdown, CSV, TSV)..."
                            rows={10}
                        />
                        <Flex gap={2}>
                            <Button text="Parse & Insert" tone="positive" onClick={handlePaste} disabled={!pasteText.trim()} />
                            <Button text="Cancel" mode="ghost" onClick={() => { setShowPasteArea(false); setPasteText(''); }} />
                        </Flex>
                    </Stack>
                </Card>
            )}

            {value && value.rows && value.rows.length > 0 && (
                <Card padding={3} border>
                    <Stack space={2}>
                        <Text size={1} weight="semibold">
                            ✓ Table ({value.rows.length} rows × {value.rows[0]?.cells?.length || 0} cols)
                        </Text>
                        <Box style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#2276fc', color: 'white' }}>
                                        {value.rows[0]?.cells?.map((cell, idx) => (
                                            <th key={idx} style={{ padding: '10px', border: '1px solid #ccc', cursor: 'pointer' }} onClick={() => handleCellClick(0, idx, cell)}>
                                                {editingCell?.row === 0 && editingCell?.col === idx ? (
                                                    <input
                                                        type="text"
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleCellSave();
                                                            if (e.key === 'Escape') handleCellCancel();
                                                        }}
                                                        autoFocus
                                                        style={{ padding: '6px', border: '2px solid yellow', borderRadius: '4px', width: '100%' }}
                                                    />
                                                ) : (cell || '(empty)')}
                                            </th>
                                        ))}
                                        <th style={{ padding: '10px', width: '70px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {value.rows.slice(1).map((row, rowIdx) => (
                                        <tr key={row._key || rowIdx}>
                                            {row.cells?.map((cell, cellIdx) => (
                                                <td key={cellIdx} style={{ padding: '10px', border: '1px solid #ccc', cursor: 'pointer' }} onClick={() => handleCellClick(rowIdx + 1, cellIdx, cell)}>
                                                    {editingCell?.row === rowIdx + 1 && editingCell?.col === cellIdx ? (
                                                        <input
                                                            type="text"
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') handleCellSave();
                                                                if (e.key === 'Escape') handleCellCancel();
                                                            }}
                                                            autoFocus
                                                            style={{ padding: '6px', border: '2px solid blue', borderRadius: '4px', width: '100%' }}
                                                        />
                                                    ) : (cell || '(empty)')}
                                                </td>
                                            ))}
                                            <td style={{ padding: '10px', textAlign: 'center' }}>
                                                <button onClick={() => handleDeleteRow(rowIdx + 1)} style={{ background: '#fee', color: '#c00', padding: '4px 8px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Box>
                    </Stack>
                </Card>
            )}
        </Stack>
    );
}
