import { ButtonsField } from '@/payload-types'

const sizeMapObject = {
  small: 'sm',
  large: 'lg',
  default: 'default',
}

type Params = NonNullable<ButtonsField>[0]['size']

export function sizeMapper(size: Params) {
  return sizeMapObject[size] as 'sm' | 'lg' | 'default'
}
