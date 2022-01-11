import React from 'react'
import { View, Image } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import dotFormatter from '../../utilities/dotFormatter'

import { Text, Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

export default function CashierCard({ image, name, price, variantCount, stockCount, onPress }) {
  const imageLink = image ? { uri: image } : thumbnail

  return (
    <Card onPress={onPress}>
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
        <View style={styles.chevronWrapper}>
          <Icon name='chevron-right' size={32} color='black' />
        </View>
      </Card.Content>
    </Card>
  )
}