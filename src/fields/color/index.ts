import { TextField } from 'payload'

type ColorFieldParams = {
  override?: Partial<TextField>
}

export const colorField = ({ override = {} }: ColorFieldParams) => {
  // @ts-expect-error Expect ts error here because of typescript mismatching Partial<TextField> with TextField
  const field: TextField = {
    type: 'text',
    name: 'color',
    label: 'Color',
    required: true,
    ...override,
    admin: {
      ...(override?.admin || {}),
      components: {
        Field: '@/fields/color/ColorComponent#ColorComponent',
      },
    },
  }

  return field
}
