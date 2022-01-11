import React from 'react'
import { View } from 'react-native'
import styles from './styles'

import { Text, Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

export default function ReportItemCard({ rightText, icon, title, onPress, children }) {
  return (
    <Card style={{ marginBottom: 10 }} onPress={onPress}>
      <Card.Content style={styles.container}>
        {children}
      </Card.Content>
    </Card>
  )
}