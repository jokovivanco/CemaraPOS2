import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Image, ToastAndroid } from 'react-native'
import logo from '../../assets/images/small_rounded_logo.png'
import styles from './styles'

import dotFormatter from '../../utilities/dotFormatter'
import dotDeserialize from '../../utilities/dotDeserialize'

import { CommonActions } from '@react-navigation/native'

import { Text, Divider, Button, useTheme, ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import {
  createNewInvoice,
  updateInvoiceStatus,
  updateProductData
} from '../../redux/actions'

import firestore from '@react-native-firebase/firestore'

const StatusReason = ({ data, mode }) => {
  const theme = useTheme()

  const colors = {
    cancel: theme.colors.error,
    refund: '#0788FF',
    done: '#00AE84'
  }

  if (mode === 'review') {
    return (
      <View style={styles.statusReasonContainer}>
        <Text style={styles.statusTitle}>Status</Text>
        <Text style={[styles.statusText, { color: colors[data.status] }]}>{data.status.charAt(0).toUpperCase() + data.status.slice(1)}</Text>
        {data.reason ? (
          <View style={styles.reasonContainer}>
            <Text style={styles.statusTitle}>Reason</Text>
            <Text style={styles.statusText}>{data.reason.charAt(0).toUpperCase() + data.reason.slice(1)}</Text>
          </View>
        ) : null}
      </View>
    )
  } else {
    return null
  }
}

const RenderTable = ({ inputs }) => {
  return (
    <Grid style={styles.grid}>
      <Row style={styles.rowGridHeader}>
        <Col style={{ width: '35%' }}><Text style={styles.colTitle}>Item</Text></Col>
        <Col style={{ width: '15%' }}><Text style={[styles.colTitle, { textAlign: 'center' }]}>Qty</Text></Col>
        <Col style={{ width: '25%' }}><Text style={[styles.colTitle, { textAlign: 'center' }]}>Price</Text></Col>
        <Col style={{ width: '25%' }}><Text style={[styles.colTitle, { textAlign: 'right' }]}>Amount</Text></Col>
      </Row>
      {inputs.map((item, index) => {
        const totalPrice = Number(dotDeserialize(item.price.toString())) * Number(item.value)
        return (
          <Row style={styles.rowGrid} key={index.toString()}>
            <Col style={{ width: '35%' }}><Text style={styles.colText}>{item.name}</Text></Col>
            <Col style={{ width: '15%' }}><Text style={[styles.colText, { textAlign: 'center' }]}>{item.value}</Text></Col>
            <Col style={{ width: '25%' }}><Text style={[styles.currencyText, styles.colText, { textAlign: 'center' }]}>{dotFormatter(item.price)}</Text></Col>
            <Col style={{ width: '25%' }}><Text style={[styles.currencyText, styles.colText, { textAlign: 'right' }]}>{dotFormatter(totalPrice)}</Text></Col>
          </Row>
        )
      })}
    </Grid>

  )
}

const ItemPreview = ({ data, setFinalTotal }) => {
  const { inputs, total, discount, selectedPromo, custom, productName } = data

  const selectedPromoCalculator = (selectedPromo) => {
    const selectedPromoPriceCut = selectedPromo.filter(item => item.discountPrice).map(item => item.discountPrice)
    const selectedPromoDiscount = selectedPromo.filter(item => item.discountPercent).map(item => item.discountPercent)
    const discountPercentTotal = selectedPromoDiscount.reduce((sum, item) => sum + item, 0)
    const discountAfterPriceCut = selectedPromoPriceCut.reduce((sum, item) => sum + item, 0)
    const discountAfterTotal = (discountPercentTotal / 100) * total
    const finalSelectedPromo = discountAfterPriceCut + discountAfterTotal
    return finalSelectedPromo
  }

  const discountNumber = Number(discount)

  const finalSelectedPromo = selectedPromo.length > 0 ? selectedPromoCalculator(selectedPromo) : 0
  const finalDiscount = discountNumber > 0 ? (discountNumber / 100) * total : discountNumber
  const beforeFinalTotal = total - (finalSelectedPromo + finalDiscount)
  const finalTotal = beforeFinalTotal >= 0 ? beforeFinalTotal : 0

  useEffect(() => {
    setFinalTotal(finalTotal)
  }, [finalTotal])

  return (
    <View style={styles.itemPreviewContainer}>
      <Text style={styles.productName}>{custom ? 'Custom Order' : productName}</Text>
      <RenderTable inputs={inputs} />
      <Text style={[styles.currencyText, styles.totalAmount]}>Rp. {dotFormatter(total)}</Text>
      <Divider style={styles.divider} />
      {discountNumber > 0 || selectedPromo.length > 0 ? (
        <>
          <View style={[styles.rowGridHeader, styles.rowBetween]}>
            <Text style={styles.colTitle}>Additional</Text>
            <Text style={styles.colTitle}>Value</Text>
          </View>
          {discountNumber > 0 ? (
            <View style={styles.rowBetween}>
              <Text style={styles.colText}>Discount</Text>
              <Text style={styles.colText}>% {discount}</Text>
            </View>
          ) : null}
          {selectedPromo.length > 0 ? selectedPromo.map(item => (
            <View style={styles.rowBetween} key={item.id}>
              <Text style={styles.colText}>{item.name}</Text>
              <Text style={styles.colText}>{item.discountPrice && item.discountPercent ? `% ${item.discountPercent} & Rp. ${dotFormatter(item.discountPrice)}` : item.discountPrice ? 'Rp. ' + dotFormatter(item.discountPrice) : `% ${item.discountPercent}`}</Text>
            </View>
          )) : null}
          <Divider style={styles.divider} />
        </>
      ) : null}
      <Text style={styles.everyTotal}>Total</Text>
      <Text style={[styles.currencyText, styles.everyTotal]}>Rp. {dotFormatter(finalTotal)}</Text>
    </View>
  )
}

const InitialInfo = ({ mode, initialInfoState }) => {
  const { invoices } = useSelector(state => state.invoices)
  const m = moment()

  useEffect(() => {
    if (mode === 'preview') {
      const lastInvoiceCode = invoices.length > 0 ? invoices[invoices.length - 1].invoiceCode : '0'
      const nextInvoiceCode = Number(lastInvoiceCode) + 1
      const nextInvoiceCodeString = nextInvoiceCode.toString().padStart(5, '0')
      initialInfoState[1]({
        invoiceCode: nextInvoiceCodeString,
        dateTimeCreated: firestore.Timestamp.fromDate(m.toDate())
      })
    }
  }, [invoices])

  return (
    <View style={[styles.rowBetween, styles.initialInfo]}>
      <Text style={styles.invoiceCodeText}>#{initialInfoState[0].invoiceCode}</Text>
      <Text style={styles.invoiceDateTime}>{m.format('DD MMM YYYY')}</Text>
      <Text style={styles.invoiceDateTime}>{m.format('HH:mm')}</Text>
    </View>
  )
}

const Header = () => (
  <View style={styles.header}>
    <Image
      source={logo}
      style={styles.logo}
    />
    <View style={styles.headerSub}>
      <Text style={styles.headerText}>UD. Cemilan Rakyat</Text>
      <Text style={styles.headerSubText}>Depok Street 202</Text>
    </View>
  </View>
)

export default function Invoice({ route, navigation }) {
  const { mode } = route.params
  const { products } = useSelector(state => state.products)

  const dispatch = useDispatch()
  const theme = useTheme()

  const [initialInfo, setInitialInfo] = useState({})
  const [finalTotal, setFinalTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const onCharge = () => {
    setIsLoading(true)
    const { custom, inputs, productName } = route.params
    const capitalPriceTotal = inputs.reduce((a, b) => a + (b.capitalPrice * b.value), 0)
    dispatch(createNewInvoice({ ...route.params, ...initialInfo, capitalPriceTotal: capitalPriceTotal, finalTotal: finalTotal, productName: custom ? `Custom - ${inputs[0].name}` : productName }, navigation))
  }

  const onShare = () => { }

  const onCancel = () => navigation.dispatch(
    CommonActions.reset({
      routes: [{ name: 'CashierNavigation' }]
    })
  )

  const onActiveOrder = (data) => {
    setIsLoading(true)
    firestore().collection('invoices').doc(data.invoiceCode)
      .update({ status: 'active' })
      .then(() => {
        dispatch(updateInvoiceStatus(data, 'active'))
      })
      .then(() => setIsLoading(false))
      .then(() => {
        ToastAndroid.showWithGravity(
          "Was added to Active Order Section",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        )
      })
      .then(() => navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: 'ProductTransactionNavigation' }]
        })
      ))
      .catch(error => { console.log('update status done invoice error', error) })
  }

  const onFinish = (data, products) => {
    setIsLoading(true)
    firestore().collection('invoices').doc(data.invoiceCode)
      .update({ status: 'done' })
      .then(() => {
        if (!data.custom) {
          dispatch(updateProductData(data))
          dispatch(updateInvoiceStatus(data, 'done'))
        } else {
          dispatch(updateInvoiceStatus(data, 'done'))
        }
      })
      .then(() => setIsLoading(false))
      .then(() => {
        ToastAndroid.showWithGravity(
          "Was added to History Section with status is done",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        )
      })
      .then(() => navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: 'ProductTransactionNavigation' }]
        })
      ))
      .catch(error => { console.log('update status done invoice error', error) })
  }

  useLayoutEffect(() => navigation.setOptions({
    title: `Invoice ${mode.charAt(0).toUpperCase()}${mode.slice(1)}`,
    headerLeft: () => mode ? (
      <View style={styles.navHeaderLeft}>
        <Icon name='arrow-left' size={24} color='white' onPress={() => navigation.goBack()} />
      </View>
    ) : (
      <View style={styles.navHeaderLeft}>
        <Icon name='close-circle' size={24} color='white' onPress={() => navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'ProductTransactionNavigation' }]
          })
        )} />
      </View>
    ),
    headerRight: () => mode === 'preview' ? (
      <Icon name='cart-plus' size={24} color='white' onPress={onCharge} />
    ) : (
      <Icon name='share-variant' size={24} color='white' onPress={onShare} />
    )
  }), [navigation, route.params, initialInfo])

  useEffect(() => {
    if (mode === 'review' || mode === '' || mode === 'active') {
      setInitialInfo({
        invoiceCode: route.params.invoiceCode,
        dateTimeCreated: firestore.Timestamp.fromDate(moment(route.params.dateTimeCreated).toDate())
      })
    }
  }, [mode])

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  )

  return (
    <>
      <View style={styles.container}>
        <Header />
        <InitialInfo mode={mode} initialInfoState={[initialInfo, setInitialInfo]} />
        <Divider style={styles.divider} />
        <ItemPreview data={route.params} setFinalTotal={setFinalTotal} />
        <StatusReason data={route.params} mode={mode} />
      </View>
      {mode === 'preview' ? (
        <View style={styles.buttonContainer}>
          <Button
            title='Cancel'
            style={styles.cancelButton}
            color={theme.colors.text}
            mode='contained'
            onPress={onCancel}
          >Cancel</Button>
        </View>
      ) : mode === 'review' ? null : mode === 'active' ? (
        <View style={styles.buttonContainer}>
          <Button
            title='Active Order'
            style={styles.finalButton}
            color='#004E96'
            mode='contained'
            onPress={() => navigation.navigate('RefundScreen', { ...route.params, ...initialInfo })}
          >Refund</Button>
          <Button
            title='Finish'
            style={styles.finalButton}
            color={theme.colors.primary}
            mode='contained'
            onPress={() => { onFinish(route.params, products) }}
          >Finish</Button>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title='Active Order'
            style={styles.finalButton}
            color='#0788FF'
            mode='contained'
            onPress={() => { onActiveOrder(route.params) }}
          >Active Order</Button>
          <Button
            title='Finish'
            style={styles.finalButton}
            color={theme.colors.primary}
            mode='contained'
            onPress={() => { onFinish(route.params, products) }}
          >Finish</Button>
        </View>
      )}
    </>
  )
}
