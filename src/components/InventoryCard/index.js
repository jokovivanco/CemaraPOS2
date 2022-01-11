import React, { useState } from 'react'
import { View, Image } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import dotFormatter from '../../utilities/dotFormatter'

import { Text, Card, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function InventoryCard({ image, name, price, variantCount, stockCount, onPress, onDelete, deleteModeState }) {
  const imageLink = image ? { uri: image } : thumbnail

  const theme = useTheme()

  return (
    <Card onPress={onPress} onLongPress={() => deleteModeState[1](!deleteModeState[0])}>
      <Card.Content style={styles.container}>
        <View style={styles.thumbnailWrapper}>
          <Image
            style={styles.thumbnailImage}
            source={imageLink}
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.text}>Rp. {dotFormatter(price)}/Item</Text>
          <View style={styles.row}>
            <Text style={styles.info}>Variant ({variantCount.toString()})</Text>
            <Text>  </Text>
            <Text style={styles.info}>Stock ({stockCount.toString()})</Text>
          </View>
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