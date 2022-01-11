import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import CashierCard from '../../components/CashierCard'

import { TextInput, Divider } from 'react-native-paper'
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import { searchProducts } from '../../redux/actions'

export default function Recent({ showSearch, navigation }) {
  const { filteredProducts } = useSelector(state => state.products)

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState('')

  const searchHandle = (text) => {
    dispatch(searchProducts(text))
    setSearchText(text)
  }

  return (
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
        data={filteredProducts.sort((a, b) => moment(b.lastTx.toDate()).diff(a.lastTx.toDate()))}
        keyExtractor={(_, index) => index}
        renderItem={({ item }) => {
          const price = item.variants.sort((a, b) => a.indexPos - b.indexPos)[0].price
          const variantCount = item.variants.length
          const stockCount = item.variants.reduce((a, b) => a + b.stock, 0)

          return (
            <CashierCard
              onPress={() => navigation.navigate('ChargeScreen', { item, variantCount, stockCount })}
              name={item.name}
              price={price}
              variantCount={variantCount}
              stockCount={stockCount}
              image={item.image}
            />
          )
        }}
      />
    </View>
  )
}
