import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import { Text, TextInput, Divider, ActivityIndicator, useTheme } from 'react-native-paper'

import useDidMountEffect from '../../utilities/hooks/useDidMountEffect'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import firestore from '@react-native-firebase/firestore'

import { useDispatch, useSelector } from 'react-redux'
import { updateInventoryData } from '../../redux/actions'

const Header = () => (
  <View style={styles.headerContainer}>
    <Image
      source={thumbnail}
      style={styles.headerImage}
    />
  </View>
)

const ProductName = ({ editable, productNameState }) => (
  <>
    <Text style={styles.title}>Name</Text>
    <TextInput
      editable={editable}
      value={productNameState[0]}
      onChangeText={text => productNameState[1](text)}
    />
  </>
)

export default function InventoryDetail({ navigation, route }) {
  const { id } = route.params
  const { filteredProducts } = useSelector(state => state.products)
  const item = filteredProducts.filter(product => product.id === id)[0]

  const dispatch = useDispatch()
  const theme = useTheme()

  const [editable, setEditable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [currentProductName, setCurrentProductName] = useState(item.name)
  const [productName, setProductName] = useState(item.name)
  const [currentVariants, setCurrentVariants] = useState(item.variants.slice())
  const [variants, setVariants] = useState(item.variants.slice())

  const onDelete = (indexPos) => {
    if (item.variants.length <= 1) {
      alert('Can\'t delete only variant')
    } else {
      const unselectedVariant = item.variants.filter(variant => variant.indexPos !== indexPos)

      setIsLoading(true)
      firestore().collection('products').doc(item.id)
        .update({
          ...item,
          variants: unselectedVariant
        })
        .then(() => {
          setProductName(item.name)
          setVariants(item.variants.slice())
        })
        .then(() => { dispatch(updateInventoryData(item, productName, unselectedVariant)) })
        .then(() => setIsLoading(false))
    }
  }

  const onSave = () => {
    const validator = variants.every(item => {
      const capitalPrice = item.capitalPrice > 0
      const name = item.name.length > 0
      const price = item.price > 0
      return capitalPrice && name && price
    })

    if (validator) {
      const serializedVariants = variants.map(variant => ({
        indexPos: variant.indexPos,
        name: variant.name,
        price: variant.price,
        stock: variant.stock,
        dateTimeCreated: variant.dateTimeCreated,
        capitalPrice: variant.capitalPrice
      }))

      if (JSON.stringify(variants) !== JSON.stringify(currentVariants) || productName !== currentProductName) {
        setIsLoading(true)
        firestore().collection('products').doc(item.id).update({
          ...item,
          name: productName,
          variants: serializedVariants
        })
          .then(() => { dispatch(updateInventoryData(item, productName, serializedVariants)) })
          .then(() => {
            setCurrentProductName(productName)
            setCurrentVariants(serializedVariants)
          })
          .then(() => setEditable(false))
          .then(() => setIsLoading(false))
          .catch(error => { console.log('Error update variant', error) })
      } else {
        setEditable(false)
      }

    } else {
      alert('Tolong untuk melengkapi data sebelum save!')
    }
  }

  const addVariant = () => setVariants(current => {
    const nextIndexPos = variants[variants.length - 1].indexPos + 1
    return [
      ...current,
      {
        indexPos: nextIndexPos,
        id: false,
        name: '',
        price: 0,
        stock: 0,
        dateTimeCreated: firestore.Timestamp.now(),
        capitalPrice: 0,
      }
    ]
  })

  useDidMountEffect(() => {
    setProductName(item.name)
    setVariants(item.variants.slice())
  }, [item, filteredProducts])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Inventory Detail',
      headerRight: () => editable ? (
        <Icon name='check' size={24} color='white' onPress={onSave} />
      ) : (
        <Icon name='square-edit-outline' size={24} color='white' onPress={() => setEditable(!editable)} />
      )
    })
  }, [navigation, editable, variants, item, productName, currentProductName, currentVariants])

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.variantsHeader}>
          <Text style={styles.variantsTitle}>Variant #{item.indexPos}</Text>
          {editable ? (
            <TouchableOpacity onPress={() => { onDelete(item.indexPos) }}>
              <Text style={{ color: theme.colors.error }}>Delete</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.variantsHeader}>
          <View style={{ flex: 2 }}>
            <TextInput
              editable={editable}
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
              editable={editable}
              multiline
              blurOnSubmit
              numberOfLines={1}
              returnKeyType='done'
              keyboardType='numeric'
              dense
              style={styles.numberInput}
              value={item.price.toString()}
              onChangeText={price => {
                const outlier = variants.filter(data => data.indexPos === item.indexPos)[0]
                const inlier = variants.filter(data => data.indexPos !== item.indexPos)
                setVariants([
                  ...inlier,
                  {
                    ...outlier,
                    price: Number(price)
                  }
                ])
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.variantsTitle}>Capital Price</Text>
          <TextInput
            editable={editable}
            multiline
            blurOnSubmit
            numberOfLines={1}
            returnKeyType='done'
            keyboardType='numeric'
            dense
            style={styles.numberInput}
            value={item.capitalPrice.toString()}
            onChangeText={capitalPrice => {
              const outlier = variants.filter(data => data.indexPos === item.indexPos)[0]
              const inlier = variants.filter(data => data.indexPos !== item.indexPos)
              setVariants([
                ...inlier,
                {
                  ...outlier,
                  capitalPrice: Number(capitalPrice)
                }
              ])
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.variantsTitle}>Stock</Text>
          <TextInput
            editable={editable}
            multiline
            blurOnSubmit
            numberOfLines={1}
            dense
            returnKeyType='done'
            keyboardType='numeric'
            style={styles.numberInput}
            value={item.stock.toString()}
            onChangeText={stock => {
              const outlier = variants.filter(data => data.indexPos === item.indexPos)[0]
              const inlier = variants.filter(data => data.indexPos !== item.indexPos)
              setVariants([
                ...inlier,
                {
                  ...outlier,
                  stock: Number(stock)
                }
              ])
            }}
          />
        </View>
      </View>
    )
  }

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Header />
      <ProductName editable={editable} productNameState={[productName, setProductName]} />
      <Divider stlye={styles.divider} />
      <FlatList
        style={styles.variantsContainer}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        data={variants.sort((a, b) => a.indexPos - b.indexPos)}
        keyExtractor={variant => variant.indexPos}
        renderItem={renderItem}
      />
      {editable ? (
        <TouchableOpacity style={styles.addVariantButton} onPress={addVariant}>
          <Text style={styles.addVariantText}>Add New Variant</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
