import { View } from 'react-native'

import { spacing } from '../utils/spacings'

const sizeVariant = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
}

const positionVariant = {
  top: 'marginTop',
  left: 'marginLeft',
  right: 'marginRight',
  bottom: 'marginBottom',
}

export const Spacer = ({ position, size, children }) => {
  const sizeIndex = sizeVariant[size]
  const property = positionVariant[position]
  const value = spacing[sizeIndex]

  return <View style={{ [property]: value }}>{children}</View>
}
