const tableRow = {
  name: 'tableRow',
  type: 'object',
  title: 'Table Row',
  fields: [
    {
      name: 'cells',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
};

export default tableRow; 