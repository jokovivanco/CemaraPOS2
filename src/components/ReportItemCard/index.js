import React from 'react'
import { View } from 'react-native'
import styles from './styles'

import { Text, Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

export default function ReportItemCard({ rightText, icon, title, onPress }) {
  return (
    <Card style={{ marginBottom: 10 }} onPress={onPress}>
      <Card.Content style={styles.container}>
        <View style={styles.thumbnailWrapper}>
          <Icon name={icon} size={32} color='black' />
        </View>
        <View style={[styles.cardTitle]}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.text}>{rightText}</Text>
        </View>
      </Card.Content>
    </Card>
  )
}