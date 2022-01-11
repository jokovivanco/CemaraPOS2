import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import { Text, Card, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

import dotFormatter from '../../utilities/dotFormatter'

import moment from 'moment'

export default function PromoCard({ name, image, discountPercent, discountPrice, promoStart, promoEnd, onDelete, deleteModeState, onPress }) {
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
          <Text style={styles.text}>{moment(promoStart.toDate()).format('DD/MM/YYYY')} - {moment(promoEnd.toDate()).format('DD/MM/YYYY')}</Text>
          <Text style={styles.text}>{discountPercent ? discountPrice ? discountPercent.toString() + '% Rp. ' + dotFormatter(discountPrice) : discountPercent.toString() + '%' : dotFormatter(discountPrice)}</Text>
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