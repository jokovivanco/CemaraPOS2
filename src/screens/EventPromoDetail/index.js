import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Image, ScrollView, Pressable } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import OperationButton from '../../components/OperationButton'

import { Text, TextInput, Divider, useTheme, ActivityIndicator, Modal, Portal, Provider } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import CalendarPicker from 'react-native-calendar-picker'

import firestore from '@react-native-firebase/firestore'

import { updatePromosData } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import useDidMountEffect from '../../utilities/hooks/useDidMountEffect'

const CalendarPickerComponent = ({ onDateChange, visibleCalendar, setVisibleCalendar }) => {
  const minDate = moment()

  const onDismiss = () => setVisibleCalendar(false)

  return (
    <Provider>
      <Portal>
        <Modal visible={visibleCalendar} onDismiss={onDismiss} contentContainerStyle={styles.assetsChooseContainer}>
          <CalendarPicker
            startFromMonday
            allowRangeSelection
            minDate={minDate}
            todayBackgroundColor='#f2e6ff'
            selectedDayColor='#7300e6'
            selectedDayTextColor='#FFFFFF'
            onDateChange={onDateChange}
          />
        </Modal>
      </Portal>
    </Provider>
  )
}

export default function EventPromoDetail({ navigation, route }) {
  const { id } = route.params
  const { filteredPromos } = useSelector(state => state.promos)
  const currentItem = filteredPromos.filter(promo => promo.id !== id)
  const item = filteredPromos.filter(promo => promo.id === id)[0]

  const dispatch = useDispatch()
  const theme = useTheme()

  const [editable, setEditable] = useState(false)
  const [dateRangeValue, setDateRangeValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [currentPromos, setCurrentPromos] = useState(item)
  const [promos, setPromos] = useState(item)

  const [visibleCalendar, setVisibleCalendar] = useState(false)

  const onIncreaseDiscount = () => {
    const discountValue = promos.discountPercent === '' ? '0' : promos.discountPercent
    const afterIncrease = Number(discountValue) + 1
    setPromos(current => ({
      ...current,
      discountPercent: afterIncrease.toString()
    }))
  }

  const onDecreaseDiscount = () => {
    const discountValue = promos.discountPercent === '' ? '0' : promos.discountPercent
    const afterDecrease = Number(discountValue) <= 0 ? Number(discountValue) : Number(discountValue) - 1
    setPromos(current => ({
      ...current,
      discountPercent: afterDecrease.toString()
    }))
  }

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setPromos(current => ({
        ...current,
        promoEnd: date
      }))
    } else {
      setPromos(current => ({
        ...current,
        promoStart: date,
        promoEnd: date
      }))
    }
  }

  const onSave = () => {
    const { name, discountPercent, discountPrice, desc, promoStart, promoEnd } = promos

    const validator = name && (discountPercent || discountPrice) && desc && promoStart && promoEnd
    if (validator) {
      if (JSON.stringify(promos) !== JSON.stringify(currentPromos)) {
        const newPromos = {
          name: name,
          discountPercent: Number(discountPercent),
          discountPrice: Number(discountPrice),
          image: '',
          promoEnd: firestore.Timestamp.fromDate(moment(promoEnd).startOf('day').toDate()),
          promoStart: firestore.Timestamp.fromDate(moment(promoStart).endOf('day').toDate()),
          desc: desc,
          dateTimeCreated: firestore.Timestamp.now()
        }

        setIsLoading(true)
        firestore().collection('promos').doc(id).update(newPromos)
          .then(() => {
            dispatch(updatePromosData({
              ...promos,
              ...newPromos
            }))
          })
          .then(() => {
            setPromos({
              ...promos,
              ...newPromos
            })
            setCurrentPromos({
              ...promos,
              ...newPromos
            })
          })
          .then(() => setEditable(false))
          .then(() => setIsLoading(false))
          .catch(error => { console.log('Error update assets', error) })
      } else {
        setEditable(false)
      }

    } else {
      alert('Tolong untuk melengkapi data sebelum save!')
    }
  }

  useDidMountEffect(() => {
    setPromos(item)
  }, [item, filteredPromos])

  useEffect(() => {
    const promoStartString = moment(promos.promoStart.toDate())
    const promoEndString = moment(promos.promoEnd.toDate())
    setDateRangeValue(`${promoStartString.format('DD-MM-YYYY')} s/d ${promoEndString.format('DD-MM-YYYY')}`)
  }, [promos.promoStart, promos.promoEnd])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Event Promo Detail',
      headerRight: () => editable ? (
        <Icon name='check' size={24} color='white' onPress={onSave} />
      ) : (
        <Icon name='square-edit-outline' size={24} color='white' onPress={() => setEditable(!editable)} />
      )
    })
  }, [navigation, editable, promos, currentPromos, item, currentItem])

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputForm}>
          <Text style={styles.title}>Event Name</Text>
          <TextInput
            editable={editable}
            placeholder='Type your event name'
            value={promos.name}
            onChangeText={text => setPromos(current => ({
              ...current,
              name: text
            }))}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.inputForm}>
          <Text style={styles.title}>Discount</Text>
          <View style={styles.row}>
            <TextInput
              editable={editable}
              placeholder='0'
              value={promos.discountPercent.toString()}
              onChangeText={text => setPromos(current => ({
                ...current,
                discountPercent: text
              }))}
              keyboardType='numeric'
              style={styles.flex}
              left={<TextInput.Affix text='% ' />}
            />
            <OperationButton iconName='plus' style={styles.operationButtonDiscount} onPress={() => {
              if (editable) {
                onIncreaseDiscount()
              } else {
                return
              }
            }} />
            <OperationButton iconName='minus' style={styles.operationButtonDiscount} onPress={() => {
              if (editable) {
                onDecreaseDiscount()
              } else {
                return
              }
            }} />
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.title}>Price Cut</Text>
          <TextInput
            editable={editable}
            placeholder='0'
            value={promos.discountPrice.toString()}
            onChangeText={text => setPromos(current => ({
              ...current,
              discountPrice: text
            }))}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.title}>Description</Text>
          <TextInput
            editable={editable}
            placeholder='Type promo description'
            value={promos.desc}
            onChangeText={text => setPromos(current => ({
              ...current,
              desc: text
            }))}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.title}>Date Range</Text>
          <TextInput
            editable={false}
            placeholder='Select your date range'
            value={dateRangeValue}
            right={<TextInput.Icon name='calendar' onPress={() => {
              if (editable) {
                setVisibleCalendar(true)
              } else {
                return
              }
            }} />}
          />
        </View>
      </ScrollView>
      <CalendarPickerComponent
        textStyle={styles.calendarText}
        onDateChange={onDateChange}
        visibleCalendar={visibleCalendar}
        setVisibleCalendar={setVisibleCalendar}
      />
    </View>
  )
}
