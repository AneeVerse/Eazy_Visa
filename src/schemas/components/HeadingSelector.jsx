import React, { useMemo, useCallback } from 'react';
import { Stack, Card, Text, Button, Flex, Switch, Box } from '@sanity/ui';
import { set, unset, useFormValue } from 'sanity';

export function HeadingSelector(props) {
    const { value = [], onChange } = props;

    // Access the entire document to get all headings
    const document = useFormValue([]);

    // Extract all H1-H6 headings from the document body
    const allHeadings = useMemo(() => {
        if (!document?.body) return [];

        const headings = [];

        document.body.forEach((block) => {
            if (block._type === 'block' && block.style && /^h[1-6]$/.test(block.style)) {
                // Extract text from children
                const text = block.children
                    ?.filter((child) => child._type === 'span')
                    .map((child) => child.text)
                    .join('') || '';

                if (text.trim()) {
                    headings.push({
                        text: text.trim(),
                        style: block.style,
                        level: parseInt(block.style.replace('h', '')),
                    });
                }
            }
        });

        return headings;
    }, [document?.body]);

    const handleToggle = useCallback((headingText) => {
        const currentValue = value || [];
        const isExcluded = currentValue.includes(headingText);

        if (isExcluded) {
            // Remove from excluded list
            const newValue = currentValue.filter((h) => h !== headingText);
            onChange(newValue.length > 0 ? set(newValue) : unset());
        } else {
            // Add to excluded list
            onChange(set([...currentValue, headingText]));
        }
    }, [value, onChange]);

    const handleShowAll = useCallback(() => {
        onChange(unset());
    }, [onChange]);

    const handleHideAll = useCallback(() => {
        onChange(set(allHeadings.map(h => h.text)));
    }, [allHeadings, onChange]);

    if (allHeadings.length === 0) {
        return (
            <Card padding={4} tone="transparent" border radius={2}>
                <Text size={1} muted>
                    No headings found in the document. Add some H1-H6 headings to your content first.
                </Text>
            </Card>
        );
    }

    const excludedCount = value?.length || 0;
    const visibleCount = allHeadings.length - excludedCount;

    return (
        <Stack space={3}>
            {/* Summary Card */}
            <Card padding={3} tone="primary" radius={2}>
                <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold">
                        📊 {allHeadings.length} headings • {visibleCount} visible • {excludedCount} hidden
                    </Text>
                    <Flex gap={2}>
                        <Button text="Show All" onClick={handleShowAll} mode="ghost" fontSize={1} />
                        <Button text="Hide All" onClick={handleHideAll} mode="ghost" fontSize={1} />
                    </Flex>
                </Flex>
            </Card>

            {/* Headings List */}
            <Stack space={2}>
                {allHeadings.map((heading, index) => {
                    const isExcluded = value?.includes(heading.text) || false;
                    const borderColor = isExcluded ? '#ef4444' : '#10b981';

                    return (
                        <Card
                            key={`${heading.text}-${index}`}
                            padding={3}
                            radius={2}
                            tone="transparent"
                            border
                            style={{ borderLeft: `4px solid ${borderColor}` }}
                        >
                            <Flex align="center" justify="space-between" gap={3}>
                                <Box flex={1}>
                                    <Flex align="center" gap={2}>
                                        <Text size={0} muted style={{ minWidth: '30px' }}>
                                            {heading.style.toUpperCase()}
                                        </Text>
                                        <Text
                                            size={1}
                                            weight={heading.level <= 2 ? 'semibold' : 'regular'}
                                            style={{
                                                paddingLeft: `${(heading.level - 1) * 12}px`,
                                                opacity: isExcluded ? 0.5 : 1,
                                                textDecoration: isExcluded ? 'line-through' : 'none',
                                            }}
                                        >
                                            {heading.text}
                                        </Text>
                                    </Flex>
                                </Box>
                                <Flex align="center" gap={2}>
                                    <Text size={1} weight="medium" style={{ color: borderColor }}>
                                        {isExcluded ? 'HIDDEN' : 'VISIBLE'}
                                    </Text>
                                    <Switch
                                        checked={!isExcluded}
                                        onChange={() => handleToggle(heading.text)}
                                    />
                                </Flex>
                            </Flex>
                        </Card>
                    );
                })}
            </Stack>
        </Stack>
    );
}
