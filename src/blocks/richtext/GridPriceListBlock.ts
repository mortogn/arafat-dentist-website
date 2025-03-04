import { Block } from 'payload'

export const GridPriceListBlock: Block = {
  slug: 'grid-price-list',
  labels: {
    singular: 'Grid Price List',
    plural: 'Grid Price Lists',
  },
  interfaceName: 'GridPriceListBlock',
  fields: [
    {
      type: 'array',
      name: 'items',
      label: 'Items',
      minRows: 1,
      required: true,
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          relationTo: 'media',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          type: 'text',
          name: 'price',
          label: 'Price',
          required: true,
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Description',
        },
      ],
    },
  ],
}
