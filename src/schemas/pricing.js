const pricing = {
  name: 'pricing',
  title: 'Pricing Cards',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading (Optional)',
      type: 'string',
      description: 'e.g. Our Packages & Pricing',
    },
    {
      name: 'subheading',
      title: 'Section Subheading (Optional)',
      type: 'string',
      description: 'e.g. Choose the best plan for your visa requirements',
    },
    {
      name: 'mode',
      title: 'Pricing Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Default Standard Plans (Flight, Hotel, Daywise, Most Preferred)', value: 'default' },
          { title: 'Custom Pricing Plans', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    },
    {
      name: 'showBadge',
      title: 'Show Fast Delivery Badge',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'customPlans',
      title: 'Custom Plans',
      type: 'array',
      hidden: ({ parent }) => parent?.mode !== 'custom',
      of: [
        {
          type: 'object',
          name: 'customPlan',
          title: 'Plan Card',
          fields: [
            {
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price (in ₹)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'billing',
              title: 'Billing Subtitle',
              type: 'string',
              initialValue: 'per person',
            },
            {
              name: 'note',
              title: 'Note / Small Disclaimer',
              type: 'string',
              description: 'e.g. *Price applicable for 2+ passengers',
            },
            {
              name: 'popular',
              title: 'Mark as Most Popular / Featured',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'features',
              title: 'Features List',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'url',
              title: 'Button Link URL',
              type: 'string',
              initialValue: '/book-flight-hotel-dummy-ticket-for-visa',
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Get Started',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      mode: 'mode',
      customPlans: 'customPlans',
    },
    prepare({ heading, mode, customPlans }) {
      const planCount = customPlans?.length || 0;
      const sub = mode === 'custom' ? `Custom Plans (${planCount})` : 'Standard 4 Plans (Flight, Hotel, Daywise, Most Preferred)';
      return {
        title: heading ? `Pricing: ${heading}` : 'Pricing Cards',
        subtitle: sub,
      };
    },
  },
};

export default pricing;
