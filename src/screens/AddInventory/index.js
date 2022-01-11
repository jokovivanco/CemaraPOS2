import React, { useLayoutEffect, useState } from 'react'
import { View, Image, FlatList, TouchableOpacity } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import { Text, TextInput, Divider, useTheme, ActivityIndicator } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import firestore from '@react-native-firebase/firestore'

import { addInventoryData } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const VariantsForm = ({ variants, setVariants }) => {
  const addVariant = () => setVariants(current => {
    const nextIndexPos = variants[variants.length - 1].indexPos + 1
    return [
      ...current,
      {
        indexPos: nextIndexPos,
        name: '',
        price: '',
        stock: '',
        dateTimeCreated: firestore.Timestamp.now(),
        capitalPrice: '',
      }
    ]
  })

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.variantsHeader}>
          <Text style={styles.variantsTitle}>Variant #{item.indexPos}</Text>
        </View>
        <View style={styles.variantsHeader}>
          <View style={{ flex: 2 }}>
            <TextInput
              value={item.name}
              placeholder='Variant name'
              dense
              onChangeText={text => {
                const outlier = variants.filter(data => data.indexPos === item.indexPos)[0]
                const inlier = variants.filter(data => data.indexPos !== item.indexPos)
                setVariants([
                  ...inlier,
                  {
                    ...outlier,
                    name: text
                  }
                ])
              }}
            />
          </View>
          <View style={{ marginLeft: 10, flex: 1 }}>
            <TextInput
              multiline
              blurOnSubmit
              numberOfLines={1}
              returnKeyType='done'
              keyboardType='numeric'
              dense
              placeholder='Price'
              style={styles.numberInput}
              value={item.price}
              onChangeText={price => {
                const outlier = variants.filter(data => data.indexPos === item.indexPos)[0]
                const inlier = variants.filter(data => data.indexPos !== item.indexPos)
                setVariants([
                  ...inlier,
                  {
                    ...outlier,
                    price: price
                  }
                ])
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.variantsTitle}>Capital Price</Text>
          <TextInput
            multiline
            blurOnSubmit
            numberOfLines={1}
            returnKeyType='done'
            keyboardType='numeric'
            dense
            placeholder='0'
            style={styles.numberInput}
            value={item.capitalPrice}
            onChangeText={capitalPrice => {
              const outlier = variants.filter(data => data.indexPos === item.indexPos)[0]
              const inlier = variants.filter(data => data.indexPos !== item.indexPos)
              setVariants([
                ...inlier,
                {
                  ...outlier,
                  capitalPrice: capitalPrice
                }
              ])
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.variantsTitle}>Stock</Text>
          <TextInput
            multiline
            blurOnSubmit
            numberOfLines={1}
            dense
            returnKeyType='done'
            keyboardType='numeric'
            placeholder='0'
            style={styles.numberInput}
            value={item.stock.toString()}
            onChangeText={stock => {
              const outlier = variants.filter(data => data.indexPos === item.indexPos)[0]
              const inlier = variants.filter(data => data.indexPos !== item.indexPos)
              setVariants([
                ...inlier,
                {
                  ...outlier,
                  stock: stock
                }
              ])
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <>
      <FlatList
        style={styles.variantsContainer}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        data={variants.sort((a, b) => a.indexPos - b.indexPos)}
        keyExtractor={variant => variant.indexPos}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addVariantButton} onPress={addVariant}>
        <Text style={styles.addVariantText}>Add New Variant</Text>
      </TouchableOpacity>
    </>

  )
}

const ProductName = ({ productNameState }) => (
  <>
    <Text style={styles.title}>Name</Text>
    <TextInput
      placeholder='Product name'
      value={productNameState[0]}
      onChangeText={text => productNameState[1](text)}
    />
  </>
)

const Header = () => (
  <View style={styles.headerContainer}>
    <Image
      source={thumbnail}
      style={styles.headerImage}
    />
  </View>
)

export default function AddInventory({ navigation }) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [productName, setProductName] = useState('')
  const [variants, setVariants] = useState([{
    indexPos: 1,
    name: '',
    price: '',
    stock: '',
    dateTimeCreated: firestore.Timestamp.now(),
    capitalPrice: '',
  }])
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = () => {
    const validator = variants.every(item => {
      const capitalPrice = Number(item.capitalPrice) > 0
      const name = item.name.length > 0
      const price = Number(item.price) > 0
      return capitalPrice && name && price
    })

    if (validator) {
      const serializedVariants = variants.map(variant => ({
        indexPos: variant.indexPos,
        name: variant.name,
        price: Number(variant.price),
        stock: Number(variant.stock),
        dateTimeCreated: variant.dateTimeCreated,
        capitalPrice: Number(variant.capitalPrice)
      }))

      const newProductData = {
        completeTx: 0,
        dateTimeCreated: firestore.Timestamp.now(),
        image: '',
        lastTx: firestore.Timestamp.now(),
        name: productName,
        variants: serializedVariants
      }

      setIsLoading(true)
      firestore().collection('products').add(newProductData)
        .then(() => { dispatch(addInventoryData(newProductData)) })
        .then(() => navigation.goBack())
        .catch(error => { console.log('Error add new product', error) })
    } else {
      alert('Tolong untuk melengkapi data sebelum submit!')
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Inventory Item',
      headerRight: () => <Icon name='check' size={24} color='white' onPress={onSubmit} />
    })
  }, [navigation, productName, variants])

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Header />
      <ProductName productNameState={[productName, setProductName]} />
      <Divider stlye={styles.divider} />
      <VariantsForm variants={variants} setVariants={setVariants} />
    </View>
  )
}
