import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import OperationButton from '../../components/OperationButton'
import styles from './styles'

import dotFormatter from '../../utilities/dotFormatter'
import dotDeserialize from '../../utilities/dotDeserialize'
import useDidMountEffect from '../../utilities/hooks/useDidMountEffect'

import { Divider, Text, useTheme, List, Switch, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useSelector } from 'react-redux'

const PromoComponent = ({ name, promoState, item }) => {
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

const DiscountComponent = ({ discountState }) => {
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

  return (
    <View style={styles.discountContainer}>
      <View style={styles.inputBox}>
        <View style={styles.rowBetween}>
          <Text style={styles.textInput}>Discount</Text>
        </View>
        <View style={styles.row}>
          <TextInput
            multiline
            blurOnSubmit
            returnKeyType='done'
            numberOfLines={1}
            value={discountState[0]}
            left={<TextInput.Affix text='%' />}
            style={[styles.numberInput, { flex: 4 }]}
            onChangeText={text => discountState[1](text)}
            placeholder='0'
            keyboardType='number-pad'
          />
          <OperationButton iconName='plus' style={styles.operationButton} onPress={onIncreaseDiscount} />
          <OperationButton iconName='minus' style={styles.operationButton} onPress={onDecreaseDiscount} />
        </View>
      </View>
    </View>
  )
}

const MainInputComponent = ({ item, inputsState }) => {
  const theme = useTheme()

  const onDelete = () => {
    if (item.locked) {
      alert('Can\'t delete first input')
    } else {
      const inlier = inputsState[0].filter(data => data.id !== item.id)
      inputsState[1](inlier)
    }
  }

  const onIncreaseQty = () => {
    // inputsState[0] === input 
    const inlier = inputsState[0].filter(data => data.id !== item.id)
    const value = item.value === '' ? '0' : item.value
    const result = Number(value) + 1
    inputsState[1]([
      ...inlier,
      {
        ...item,
        value: result.toString()
      }
    ])
  }

  const onDecreaseQty = () => {
    const inlier = inputsState[0].filter(data => data.id !== item.id)
    const value = item.value === '' ? '0' : item.value
    const result = Number(value) <= 0 ? Number(value) : Number(value) - 1
    inputsState[1]([
      ...inlier,
      {
        ...item,
        value: result.toString()
      }
    ])
  }

  return (
    <View style={styles.mainInputContainer}>
      {inputsState[0].length > 1 ? <Text style={styles.mainInputOrderText}>{`# ${item.id + 1}`}</Text> : null}
      {/* Order Name */}
      <View style={styles.inputBox}>
        <View style={styles.rowBetween}>
          <Text style={styles.textInput}>Order Name</Text>
          <TouchableOpacity onPress={onDelete}>
            <Text style={[styles.textInputDelete, { color: theme.colors.error }]}>Delete</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={item.name}
          onChangeText={text => {
            const inlier = inputsState[0].filter(data => data.id !== item.id)
            inputsState[1]([
              ...inlier,
              {
                ...item,
                name: text
              }
            ])
          }}
          placeholder='e.g. Jagung Bakar'
        />
      </View>

      {/* Price */}
      <View style={styles.inputBox}>
        <View style={styles.rowBetween}>
          <Text style={styles.textInput}>Price</Text>
        </View>
        <TextInput
          multiline
          blurOnSubmit
          numberOfLines={1}
          returnKeyType='done'
          value={item.price}
          style={styles.numberInput}
          left={<TextInput.Affix text='Rp' />}
          onChangeText={text => {
            const inlier = inputsState[0].filter(data => data.id !== item.id)
            inputsState[1]([
              ...inlier,
              {
                ...item,
                price: text
              }
            ])
          }}
          onFocus={() => {
            const inlier = inputsState[0].filter(data => data.id !== item.id)
            inputsState[1]([
              ...inlier,
              {
                ...item,
                price: dotDeserialize(item.price)
              }
            ])
          }}
          onBlur={() => {
            const inlier = inputsState[0].filter(data => data.id !== item.id)
            inputsState[1]([
              ...inlier,
              {
                ...item,
                price: dotFormatter(item.price)
              }
            ])
          }}
          placeholder='0'
          keyboardType='number-pad'
        />
      </View>

      {/* Capital Price */}
      <View style={styles.inputBox}>
        <View style={styles.rowBetween}>
          <Text style={styles.textInput}>Capital Price</Text>
        </View>
        <TextInput
          multiline
          blurOnSubmit
          numberOfLines={1}
          returnKeyType='done'
          value={item.capitalPrice}
          style={styles.numberInput}
          left={<TextInput.Affix text='Rp' />}
          onChangeText={text => {
            const inlier = inputsState[0].filter(data => data.id !== item.id)
            inputsState[1]([
              ...inlier,
              {
                ...item,
                capitalPrice: text
              }
            ])
          }}
          onFocus={() => {
            const inlier = inputsState[0].filter(data => data.id !== item.id)
            inputsState[1]([
              ...inlier,
              {
                ...item,
                capitalPrice: dotDeserialize(item.capitalPrice)
              }
            ])
          }}
          onBlur={() => {
            const inlier = inputsState[0].filter(data => data.id !== item.id)
            inputsState[1]([
              ...inlier,
              {
                ...item,
                capitalPrice: dotFormatter(item.capitalPrice)
              }
            ])
          }}
          placeholder='0'
          keyboardType='number-pad'
        />
      </View>

      {/* Qty */}
      <View style={styles.inputBox}>
        <View style={styles.rowBetween}>
          <Text style={styles.textInput}>Quantity</Text>
        </View>
        <View style={styles.row}>
          <TextInput
            multiline
            blurOnSubmit
            numberOfLines={1}
            returnKeyType='done'
            value={item.value}
            style={[styles.numberInput, { flex: 4 }]}
            onChangeText={text => {
              const inlier = inputsState[0].filter(data => data.id !== item.id)
              inputsState[1]([
                ...inlier,
                {
                  ...item,
                  value: text
                }
              ])
            }}
            placeholder='0'
            keyboardType='number-pad'
          />
          <OperationButton iconName='plus' style={styles.operationButton} onPress={onIncreaseQty} />
          <OperationButton iconName='minus' style={styles.operationButton} onPress={onDecreaseQty} />
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  )
}

const TotalComponent = ({ totalState }) => (
  <>
    <View style={styles.row}>
      <Text style={styles.totalText}>Total</Text>
      <TextInput
        value={dotFormatter(totalState[0])}
        editable={false}
        left={<TextInput.Affix text='Rp. ' />}
        style={styles.totalInput}
      />
    </View>
    <Divider style={styles.divider} />
  </>
)

export default function AddCustomOrder({ navigation }) {
  const { promos } = useSelector(state => state.promos)

  const [total, setTotal] = useState(0)
  const [inputs, setInputs] = useState([{
    id: 0,
    name: '',
    price: '',
    capitalPrice: '',
    value: '',
    stock: '',
    locked: true
  }])
  const [discount, setDiscount] = useState('')
  const [selectedPromo, setSelectedPromo] = useState([])

  const onSend = () => {
    const inputsValidation = inputs.every(item => {
      const name = item.name.length > 0
      const price = Number(dotDeserialize(item.price)) > 0
      const capitalPrice = Number(dotDeserialize(item.capitalPrice)) > 0
      const quantity = Number(item.value) > 0
      return name && price && capitalPrice && quantity
    })

    if (inputsValidation) {
      const objectInputs = inputs[0]
      const serializedInputs = [{
        ...objectInputs,
        price: Number(dotDeserialize(objectInputs.price)),
        capitalPrice: Number(dotDeserialize(objectInputs.capitalPrice)),
        value: Number(objectInputs.value)
      }]

      navigation.navigate('InvoiceScreen', {
        inputs: serializedInputs,
        total,
        discount,
        selectedPromo,
        productId: '',
        productName: '',
        stock: '',
        custom: true,
        mode: 'preview'
      })

    } else {
      alert('Form input belum lengkap! Silahkan isi semua terlebih dahulu')
    }
  }

  const addVariant = () => setInputs(current => {
    const nextId = inputs[inputs.length - 1].id + 1
    return [
      ...current,
      {
        id: nextId,
        name: '',
        price: '',
        capitalPrice: '',
        value: '',
        stock: '',
        locked: false
      }
    ]
  })

  useLayoutEffect(() => navigation.setOptions({
    title: 'Add Custom Order',
    headerLeft: () => (
      <View style={styles.navHeaderLeft}>
        <Icon name='arrow-left' size={24} color='white' onPress={() => navigation.goBack()} />
      </View>
    ),
    headerRight: () => <Icon name='send' size={24} color='white' onPress={onSend} />
  }), [navigation, inputs, total, discount, selectedPromo])

  useEffect(() => {
    const totalInputs = inputs.reduce((a, b) => {
      const first = Number(dotDeserialize(b.price))
      const second = Number(b.value)
      return a + (first * second)
    }, 0)
    setTotal(totalInputs)
  }, [inputs])

  return (
    <View style={styles.container}>
      <TotalComponent totalState={[total, setTotal]} />
      <ScrollView style={styles.container}>
        {inputs.sort((a, b) => a.id - b.id).map(item => (
          <MainInputComponent key={item.id} item={item} inputsState={[inputs, setInputs]} />
        ))}
        <TouchableOpacity style={styles.addVariantButton} onPress={addVariant}>
          <Text style={styles.addVariantText}>Add New Variant</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <DiscountComponent discountState={[discount, setDiscount]} />
        {promos.map(item => (
          <PromoComponent
            key={item.id}
            name={item.name}
            promoState={[selectedPromo, setSelectedPromo]}
            item={item}
          />
        ))}
      </ScrollView>
    </View>
  )
}
