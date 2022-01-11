import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

import { useTheme } from 'react-native-paper'

export default function VariantField({ left, right, value }) {
  const theme = useTheme()

  return (
    <View style={[styles.container, { borderColor: theme.colors.primary }]}>
      <Text style={[styles.text, { color: value ? theme.colors.text : theme.colors.disabled }]}>{left}</Text>
      <Text style={[styles.text, { color: value ? theme.colors.text : theme.colors.disabled }]}>{right}</Text>
    </View>
  )
}
