import React, { useState } from 'react'
import { View, ToastAndroid } from 'react-native'
import styles from './styles'

import { Text, TextInput, RadioButton, Button, ActivityIndicator, useTheme } from 'react-native-paper'

import { CommonActions } from '@react-navigation/native'

import { updateInvoiceReason, updateInvoiceStatus, updateProductData } from '../../redux/actions'
import { useDispatch } from 'react-redux'

import firestore from '@react-native-firebase/firestore'

export default function Refund({ route, navigation }) {
  const [reason, setReason] = useState('')
  const [checked, setChecked] = useState('Add to Stock')
  const [isLoading, setIsLoading] = useState(false)

  const theme = useTheme()
  const dispatch = useDispatch()

  const onAddToStock = async (data) => {
    dispatch(updateProductData(data))
  }

  const onRefund = (data) => {
    setIsLoading(true)
    firestore().collection('invoices').doc(data.invoiceCode).update({ status: 'refund', reason: reason })
      .then(() => {
        dispatch(updateInvoiceStatus(data, 'refund'))
        dispatch(updateInvoiceReason(data, reason))
      })
      .then(() => {
        if (checked === 'Add to Stock') {
          onAddToStock(data)
            .then(() => {
              ToastAndroid.showWithGravity(
                "Was added to History Section with status is Refund and stock is trashout",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              )
            })
            .then(() => navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: 'ProductTransactionNavigation' }]
              })
            ))
        } else {
          ToastAndroid.showWithGravity(
            "Was added to History Section with status is Refund and stock kept",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: 'ProductTransactionNavigation' }]
            })
          )
        }
      })
      .catch(error => console.log('Error while processing refund', error))
  }

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  )

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.reasonText}>Reason:</Text>
        <TextInput
          multiline
          blurOnSubmit
          numberOfLines={4}
          returnKeyType='done'
          value={reason}
          onChangeText={text => setReason(text)}
        />
        <View>
          <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
            <RadioButton.Item label="Add to Stock" value="Add to Stock" labelStyle={styles.radioLabelText} />
            <RadioButton.Item label="Trash" value="Trash" labelStyle={styles.radioLabelText} />
          </RadioButton.Group>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title='Refund'
          style={styles.button}
          color='#004E96'
          mode='contained'
          onPress={() => { onRefund(route.params) }}
        >Refund</Button>
      </View>
    </>
  )
}
