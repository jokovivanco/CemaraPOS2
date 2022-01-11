import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import styles from './styles'

import ReportCard from '../../components/ReportCard'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

export default function Report({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Report',
      headerLeft: () => (
        <View style={styles.navHeaderLeft}>
          <MaterialCommunityIcons name='menu' size={24} color='white' onPress={() => navigation.openDrawer()} />
        </View>
      )
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <ReportCard
        onPress={() => {
          const weekOfMonth = [1, 8, 15, 22, 29]
          const weekOfDay = Math.ceil(moment().date() / 7)
          const dateTimeStart = weekOfMonth.filter((_, i) => {
            return i === (weekOfDay - 1)
          })[0]
          const dateTimeEnd = dateTimeStart + 6

          navigation.navigate('ReportDetailScreen', {
            dateTimeStart: moment().date(dateTimeStart).startOf('day'),
            dateTimeEnd: moment().date(dateTimeEnd).endOf('day'),
          })
        }}
        name={'Daily'}
        date={moment().format('DD/MM/YYYY')}
      />
      <ReportCard
        onPress={() => navigation.navigate('ReportDetailScreen', {
          dateTimeStart: moment().startOf('month'),
          dateTimeEnd: moment().endOf('month')
        })}
        name={'Monthly'}
        date={moment().format('MMMM YYYY')}
      />
      <ReportCard
        onPress={() => navigation.navigate('ReportDetailScreen', {
          dateTimeStart: moment().startOf('year'),
          dateTimeEnd: moment().endOf('year')
        })}
        name={'Annual'}
        date={moment().format('YYYY')}
      />
      <ReportCard
        onPress={() => navigation.navigate('ReportDetailScreen', {
          dateTimeStart: moment().startOf('month'),
          dateTimeEnd: moment().endOf('month')
        })}
        name={'By Date'}
        date={'Custom'}
      />
    </View>
  )
}
