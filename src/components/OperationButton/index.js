import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './styles'

import Icon from 'react-native-vector-icons/Feather'
import { Text, useTheme } from 'react-native-paper'

export default function OperationButton({ text, iconName, style, onPress }) {
  const theme = useTheme()

  return (
    <TouchableOpacity style={[styles.container, text ? { flexDirection: 'row' } : null, style]} onPress={onPress}>
      {iconName ? <Icon name={iconName} size={24} color={theme.colors.text} /> : null}
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </TouchableOpacity>
  )
}
