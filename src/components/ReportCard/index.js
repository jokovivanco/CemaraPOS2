import React from 'react'
import { View } from 'react-native'
import styles from './styles'

import { Text, Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

export default function UserRoleCard({ name, date, onPress }) {
  return (
    <Card style={{ marginBottom: 5 }} onPress={onPress}>
      <Card.Content style={styles.container}>
        <View style={styles.thumbnailWrapper}>
          <Icon name='trending-up' size={40} color='black' />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.text}>{date}</Text>
        </View>
      </Card.Content>
    </Card>
  )
}