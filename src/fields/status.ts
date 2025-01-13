import { SelectField } from 'payload'

type PublishStatusFieldParams = {
  overrrides?: Partial<SelectField>
}

export const publishStatusField = ({ overrrides = {} }: PublishStatusFieldParams) => {
  // @ts-expect-error - Expect ts error here because of typescript mismatching Partial<SelectField> with SelectField
  const StatusField: SelectField = {
    name: 'status',
    type: 'select',
    label: 'Status',
    admin: {
      position: 'sidebar',
      description: 'The status of this content',
      ...(overrrides?.admin || {}),
    },
    ...(overrrides || {}),
    options: [
      {
        label: 'Draft',
        value: 'draft',
      },
      {
        label: 'Published',
        value: 'published',
      },
      ...(overrrides?.options || []),
    ],
  }

  return StatusField
}
