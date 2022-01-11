import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'

import { Text, Card, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

export default function UserRoleCard({ name, role, onDelete, deleteModeState, onPress }) {
  const theme = useTheme()

  return (
    <Card onPress={onPress} onLongPress={() => deleteModeState[1](!deleteModeState[0])}>
      <Card.Content style={styles.container}>
        <View style={styles.thumbnailWrapper}>
          <Icon name='user' size={40} color='black' />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.text}>{role}</Text>
        </View>
        {deleteModeState[0] ? (
          <TouchableOpacity style={styles.trashIconWrapper} onPress={onDelete}>
            <Icon name='trash-2' size={32} color={theme.colors.error} />
          </TouchableOpacity>
        ) : null}
      </Card.Content>
    </Card>
  )
}