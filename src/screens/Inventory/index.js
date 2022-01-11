import React, { useLayoutEffect, useState } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import InventoryCard from '../../components/InventoryCard'
import styles from './styles'

import { TextInput, Divider, FAB } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux'
import { deleteProducts, searchProducts } from '../../redux/actions'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'

export default function Inventory({ navigation }) {
  const { filteredProducts } = useSelector(state => state.products)

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)

  const toggleSearch = () => setShowSearch(!showSearch)
  const searchHandle = (text) => {
    dispatch(searchProducts(text))
    setSearchText(text)
  }

  const onDelete = (id) => {
    firestore().collection('products').doc(id).delete().then(() => {
      dispatch(deleteProducts(id))
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Inventory',
      headerLeft: () => (
        <View style={styles.navHeaderLeft}>
          <MaterialCommunityIcons name='menu' size={24} color='white' onPress={() => navigation.openDrawer()} />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={toggleSearch}>
          <Icon name='search' size={24} color='white' />
        </TouchableOpacity>
      )
    })
  }, [navigation, showSearch])

  return (
    <>
      <View>
        {showSearch ? (
          <TextInput
            autoFocus={true}
            value={searchText}
            onChangeText={searchHandle}
            placeholder='Search'
          />
        ) : null}

        <FlatList
          ItemSeparatorComponent={() => <Divider />}
          data={filteredProducts.sort((a, b) => b.completeTx - a.completeTx)}
          keyExtractor={(_, index) => index}
          renderItem={({ item }) => {
            const price = item.variants.sort((a, b) => a.indexPos - b.indexPos)[0].price
            const variantCount = item.variants.length
            const stockCount = item.variants.reduce((a, b) => a + b.stock, 0)

            return (
              <InventoryCard
                onPress={() => {
                  if (deleteMode) {
                    return
                  } else {
                    navigation.navigate('InventoryDetailScreen', { id: item.id })
                  }
                }}
                deleteModeState={[deleteMode, setDeleteMode]}
                name={item.name}
                price={price}
                variantCount={variantCount}
                stockCount={stockCount}
                image={item.image}
                onDelete={() => { onDelete(item.id) }}
              />
            )
          }}
        />
      </View>
      <FAB
        icon="plus"
        style={styles.FABStyle}
        onPress={() => navigation.navigate('AddInventoryScreen')}
      />
    </>
  )
}
