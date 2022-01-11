import React from 'react'
import { View, Image } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import dotFormatter from '../../utilities/dotFormatter'

import { Text, Card, useTheme } from 'react-native-paper'
import moment from 'moment'

export default function HistoryCard({ image, custom, invoiceCode, name, status, date, total, onPress }) {
  const imageLink = image ? { uri: image } : thumbnail

  const dateMoment = moment(date.toDate())
  const theme = useTheme()

  const colors = {
    cancel: theme.colors.error,
    refund: '#0788FF',
    done: '#00AE84'
  }

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
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{name}</Text>
            <Text style={[styles.status, { color: colors[status] }]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
          </View>
          <Text style={styles.text}>#{invoiceCode}</Text>
          <Text style={styles.date}>{dateMoment.format('DD/MM/YYYY')} - {dateMoment.format('hh:mm A')}</Text>
          <Text style={styles.text}>Rp. {dotFormatter(total)}</Text>
        </View>
      </Card.Content>
    </Card>
  )
}