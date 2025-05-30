export default {
  name: 'tableRow',
  title: 'Table Row',
  type: 'object',
  fields: [
    {
      name: 'cells',
      title: 'Cells',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Cells content for the row'
    }
  ]
}; 