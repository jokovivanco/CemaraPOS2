import React, { useLayoutEffect, useState } from 'react'
import { View, Image, ScrollView, Pressable } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import OperationButton from '../../components/OperationButton'
import useDidMountEffect from '../../utilities/hooks/useDidMountEffect'

import { Text, TextInput, Divider, useTheme, ActivityIndicator, Modal, Portal, Provider } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import CalendarPicker from 'react-native-calendar-picker'

import firestore from '@react-native-firebase/firestore'

import { addPromosData } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const CalendarPickerComponent = ({ onDateChange, visibleCalendar, setVisibleCalendar }) => {
  const minDate = moment()

  const onDismiss = () => setVisibleCalendar(false)

  return (
    <Provider>
      <Portal>
        <Modal visible={visibleCalendar} onDismiss={onDismiss} contentContainerStyle={styles.assetsChooseContainer}>
          <CalendarPicker
            textStyle={styles.calendarText}
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

export default function AddEventPromo({ navigation }) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [discountPrice, setDiscountPrice] = useState('')
  const [description, setDescription] = useState('')
  const [promoStart, setPromoStart] = useState(null)
  const [promoEnd, setPromoEnd] = useState(null)
  const [dateRangeValue, setDateRangeValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [visibleCalendar, setVisibleCalendar] = useState(false)

  const onIncreaseDiscount = () => {
    const discountValue = discountPercent === '' ? '0' : discountPercent
    const afterIncrease = Number(discountValue) + 1
    setDiscountPercent(afterIncrease.toString())
  }

  const onDecreaseDiscount = () => {
    const discountValue = discountPercent === '' ? '0' : discountPercent
    const afterDecrease = Number(discountValue) <= 0 ? Number(discountValue) : Number(discountValue) - 1
    setDiscountPercent(afterDecrease.toString())
  }

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setPromoEnd(date)
    } else {
      setPromoStart(date)
      setPromoEnd(date)
    }
  }

  const onSubmit = () => {
    const validator = name && (discountPercent || discountPrice) && description && promoStart && promoEnd
    const newPromos = {
      name: name,
      discountPercent: Number(discountPercent),
      discountPrice: Number(discountPrice),
      image: '',
      promoEnd: firestore.Timestamp.fromDate(moment(promoEnd).endOf('day').toDate()),
      promoStart: firestore.Timestamp.fromDate(moment(promoStart).startOf('day').toDate()),
      desc: description,
      dateTimeCreated: firestore.Timestamp.now()
    }

    if (validator) {
      setIsLoading(true)
      firestore().collection('promos').add(newPromos)
        .then(snapshot => {
          return {
            ...newPromos,
            id: snapshot.id
          }
        })
        .then(newPromosWithId => dispatch(addPromosData(newPromosWithId)))
        .then(() => setIsLoading(false))
        .then(() => navigation.goBack())
        .catch(error => { console.log('Error update promos', error) })
    } else {
      alert('Tolong untuk melengkapi data sebelum submit!')
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Promo',
      headerRight: () => <Icon name='plus' size={24} color='white' onPress={onSubmit} />
    })
  }, [
    navigation,
    name,
    discountPercent,
    discountPrice,
    description,
    promoStart,
    promoEnd
  ])

  useDidMountEffect(() => {
    const promoStartString = moment(promoStart)
    const promoEndString = moment(promoEnd)
    setDateRangeValue(`${promoStartString.format('DD-MM-YYYY')} s/d ${promoEndString.format('DD-MM-YYYY')}`)
  }, [promoStart, promoEnd])

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
            placeholder='Type your event name'
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.inputForm}>
          <Text style={styles.title}>Discount</Text>
          <View style={styles.row}>
            <TextInput
              placeholder='0'
              value={discountPercent}
              onChangeText={text => setDiscountPercent(text)}
              keyboardType='numeric'
              style={styles.flex}
              left={<TextInput.Affix text='% ' />}
            />
            <OperationButton iconName='plus' style={styles.operationButtonDiscount} onPress={onIncreaseDiscount} />
            <OperationButton iconName='minus' style={styles.operationButtonDiscount} onPress={onDecreaseDiscount} />
          </View>
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.title}>Price Cut</Text>
          <TextInput
            placeholder='0'
            value={discountPrice}
            onChangeText={text => setDiscountPrice(text)}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.title}>Description</Text>
          <TextInput
            placeholder='Type promo description'
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.title}>Date Range</Text>
          <TextInput
            editable={false}
            placeholder='Select your date range'
            value={dateRangeValue}
            right={<TextInput.Icon name='calendar' onPress={() => setVisibleCalendar(true)} />}
          />
        </View>
      </ScrollView>
      <CalendarPickerComponent
        promoStart={promoStart}
        promoEnd={promoEnd}
        onDateChange={onDateChange}
        visibleCalendar={visibleCalendar}
        setVisibleCalendar={setVisibleCalendar}
        setDateRangeValue={setDateRangeValue}
      />
    </View>
  )
}
