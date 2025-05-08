import { extractVideoId } from '@/utilities/extractVideoId'
import { FieldHook } from 'payload'

export const videoIdBeforeValidateHook: FieldHook = async ({ value }) => {
  return extractVideoId(value)
}
