import React, { useLayoutEffect, useState } from 'react'
import { View, ScrollView, Image } from 'react-native'
import logo from '../../assets/images/small_rounded_logo.png'
import styles from './styles'

import { Text, TextInput, Divider, List, Switch } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import VariantField from '../../components/VariantField'
import OperationButton from '../../components/OperationButton'
import useDidMountEffect from '../../utilities/hooks/useDidMountEffect'

import { useSelector } from 'react-redux'

const PromoComponent = ({ routeItem, name, promoState, item }) => {
  const [enable, setEnable] = useState(false)
  const onToggleSwitch = () => setEnable(!enable)

  useDidMountEffect(() => {
    if (enable) {
      const inlier = promoState[0].filter(data => data.id !== item.id)
      promoState[1]([
        ...inlier,
        item
      ])
    } else {
      const inlier = promoState[0].filter(data => data.id !== item.id)
      promoState[1]([...inlier])
    }
  }, [enable])

  useDidMountEffect(() => {
    setEnable(false)
    promoState[1]([])
  }, [routeItem])

  return (
    <List.Item
      style={styles.promoCard}
      title={name}
      right={() => <Switch value={enable} onValueChange={onToggleSwitch} />}
    >
      <Text>{name}</Text>
    </List.Item>
  )
}

const DiscountComponent = ({ routeItem, discountState }) => {
  const onIncreaseDiscount = () => {
    const discountValue = discountState[0] === '' ? '0' : discountState[0]
    const result = Number(discountValue) + 1
    discountState[1](result.toString())
  }
  const onDecreaseDiscount = () => {
    const discountValue = discountState[0] === '' ? '0' : discountState[0]
    const result = Number(discountValue) <= 0 ? Number(discountValue) : Number(discountValue) - 1
    discountState[1](result.toString())
  }

  useDidMountEffect(() => {
    discountState[1]('')
  }, [routeItem])

  return (
    <View style={styles.discountContainer}>
      <View style={styles.inputBox}>
        <View style={styles.rowBetween}>
          <Text style={styles.componentTitle}>Discount</Text>
        </View>
        <View style={styles.row}>
          <TextInput
            value={discountState[0]}
            left={<TextInput.Affix text='%' />}
            style={[styles.numberInput, { flex: 4 }]}
            onChangeText={text => discountState[1](text)}
            placeholder='0'
            keyboardType='number-pad'
          />
          <OperationButton iconName='plus' style={styles.operationButtonDiscount} onPress={onIncreaseDiscount} />
          <OperationButton iconName='minus' style={styles.operationButtonDiscount} onPress={onDecreaseDiscount} />
        </View>
      </View>
    </View>
  )
}

const VariantItem = ({ routeItem, item, inputs, setInputs, setTotal, setStock }) => {
  const [operation, setOperation] = useState({
    value: 0,
    stock: item.stock,
    mode: ''
  })

  const onIncreaseQuantity = () => {
    const nextValue = operation.stock > 0 ? operation.value + 1 : operation.value
    const nextStock = operation.stock > 0 ? operation.stock - 1 : operation.stock
    if (operation.stock === 0) {
      alert('Stock variant ini sudah mencapai 0!')
      return
    } else {
      setOperation({
        stock: nextStock,
        value: nextValue,
        mode: 'increase'
      })
    }
  }
  const onDecreaseQuantity = () => {
    const nextValue = operation.value <= 0 ? 0 : operation.value - 1
    const nextStock = operation.value <= 0 ? 0 : operation.stock + 1
    if (operation.value === 0) {
      alert('Quantity variant ini sudah mencapai 0!')
      return
    } else {
      setOperation({
        stock: nextStock,
        value: nextValue,
        mode: 'decrease'
      })
    }
  }

  useDidMountEffect(() => {
    if (operation.mode === 'increase') {
      const inlier = inputs.filter(input => input.indexPos !== item.indexPos)
      const outlier = inputs.filter(input => input.indexPos === item.indexPos)[0]
      setInputs([
        ...inlier,
        {
          ...outlier,
          stock: operation.stock,
          value: operation.value
        }
      ])
      setTotal(current => current + item.price)
      setStock(current => current - 1)
    }
    if (operation.mode === 'decrease') {
      const inlier = inputs.filter(input => input.indexPos !== item.indexPos)
      const outlier = inputs.filter(input => input.indexPos === item.indexPos)[0]
      setInputs([
        ...inlier,
        {
          ...outlier,
          stock: operation.stock,
          value: operation.value
        }
      ])
      setTotal(current => current - item.price)
      setStock(current => current + 1)
    }
  }, [operation])

  useDidMountEffect(() => {
    setOperation({
      value: 0,
      stock: item.stock,
      mode: ''
    })
  }, [routeItem])

  return (
    <View key={item.indexPos} style={styles.variantItemContainer}>
      <VariantField left={item.name} right={item.price} value={operation.value} />
      <View style={styles.VariantButtons}>
        <OperationButton iconName='box' text={operation.stock.toString()} style={styles.operationButton} />
        <OperationButton text={operation.value.toString()} style={styles.operationButton} />
        <OperationButton iconName='plus' style={styles.operationButton} onPress={onIncreaseQuantity} />
        <OperationButton iconName='minus' style={styles.operationButton} onPress={onDecreaseQuantity} />
      </View>
    </View>
  )
}

const Variant = ({ routeItem, inputs, setInputs, setTotal, setStock }) => {
  return (
    <View style={styles.variantContainer}>
      <Text style={styles.componentTitle}>Variants & Quantities</Text>
      {inputs.sort((a, b) => a.indexPos - b.indexPos).map(item => (
        <VariantItem key={item.indexPos} routeItem={routeItem} inputs={inputs} item={item} setInputs={setInputs} setTotal={setTotal} setStock={setStock} />
      ))}
    </View>

  )
}

const Header = ({ total, name, stock }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.productName}>{name}</Text>
      <View style={styles.initialInfoContainer}>
        <Image
          source={logo}
          style={styles.headerImage}
        />
        <View style={styles.headerRight}>
          <Text style={styles.headerTitle}>Total</Text>
          <TextInput
            dense
            value={'Rp. ' + total}
            editable={false}
            style={styles.headerForm}
          />
          <Text style={styles.headerTitle}>Stock</Text>
          <TextInput
            dense
            value={stock.toString()}
            editable={false}
            style={styles.headerForm}
          />
        </View>
      </View>
    </View>
  )
}

export default function Charge({ route, navigation }) {
  const { item, stockCount } = route.params
  const { promos } = useSelector(state => state.promos)
  const nonExpiredPromos = promos.filter(promo => {
    const promoStartString = moment(promo.promoStart.toDate())
    const promoEndString = moment(promo.promoEnd.toDate())
    return moment(promoEndString).diff(promoStartString) > 0
  })

  const [total, setTotal] = useState(0)
  const [stock, setStock] = useState(stockCount)
  const [inputs, setInputs] = useState(item.variants.slice())
  const [discount, setDiscount] = useState('')
  const [selectedPromo, setSelectedPromo] = useState([])

  const onSend = () => {
    const inputsValidation = inputs.some(input => input.value > 0)
    const filteredInputs = inputs.filter(input => input.value > 0)
    console.log(filteredInputs)
    if (inputsValidation) {
      navigation.navigate('InvoiceScreen', {
        inputs: filteredInputs,
        total: total,
        stock: stock,
        discount: discount,
        selectedPromo: selectedPromo,
        productId: item.id,
        productName: item.name,
        custom: false,
        mode: 'preview'
      })

    } else {
      alert('Form input belum lengkap! Silahkan isi semua terlebih dahulu')
    }
  }

  useDidMountEffect(() => {
    setTotal(0)
    setStock(item.countStock)
    setInputs(item.variants.slice())
  }, [item])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Charge',
      headerLeft: () => (
        <View style={styles.navHeaderLeft}>
          <Icon name='arrow-left' size={24} color='white' onPress={() => navigation.goBack()} />
        </View>
      ),
      headerRight: () => <Icon name='send' size={24} color='white' onPress={onSend} />
    })
  }, [navigation, inputs, total, discount, selectedPromo, stock])

  return (
    <ScrollView style={styles.container}>
      <Header total={total} name={item.name} stock={stock} />
      <Divider style={styles.divider} />
      <Variant routeItem={item} inputs={inputs} setInputs={setInputs} setTotal={setTotal} setStock={setStock} />
      <DiscountComponent routeItem={item} discountState={[discount, setDiscount]} />
      {nonExpiredPromos.length > 0 ? nonExpiredPromos.map(promo => (
        <PromoComponent
          routeItem={item}
          key={promo.id}
          name={promo.name}
          promoState={[selectedPromo, setSelectedPromo]}
          item={promo}
        />
      )) : null}
    </ScrollView>
  )
}
