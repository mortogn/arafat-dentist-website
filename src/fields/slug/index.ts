import { CheckboxField, TextField } from 'payload'
import { formatSlugHook } from './formatSlug'

type SlugFieldsParams = {
  fieldToUse: string
  overrides?: {
    slugOverrides?: Partial<TextField>
    checkboxOverrides?: Partial<CheckboxField>
  }
}

export const slugFields = ({ overrides = {}, fieldToUse }: SlugFieldsParams) => {
  const { checkboxOverrides, slugOverrides } = overrides

  const CheckboxField: CheckboxField = {
    type: 'checkbox',
    name: 'lock',
    defaultValue: true,
    ...checkboxOverrides,
    admin: {
      hidden: true,
      position: 'sidebar',
      ...checkboxOverrides?.admin,
    },
  }

  // @ts-expect-error Expect ts error here because of typescript mismatching Partial<TextField> with TextField
  const SlugField: TextField = {
    type: 'text',
    name: 'slug',
    label: 'Slug',
    index: true,
    unique: true,
    required: true,
    ...(slugOverrides || {}),
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      components: {
        Field: {
          path: '@/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: CheckboxField.name,
          },
        },
      },
      description: "The page's URL",
      ...slugOverrides?.admin,
    },
  }

  return [CheckboxField, SlugField]
}
