export default {
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    {
      name: 'header',
      title: 'Header Row',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Header row for the table'
    },
    {
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        { type: 'tableRow' }
      ],
      description: 'Table rows'
    }
  ]
}; 