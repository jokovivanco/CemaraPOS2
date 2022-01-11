import React, { useLayoutEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'

import HistoryCard from '../../components/HistoryCard'

import { TextInput, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { searchInvoices } from '../../redux/actions'

export default function Active({ navigation }) {
  const { filteredInvoices } = useSelector(state => state.invoices)

  const theme = useTheme()
  const dispatch = useDispatch()

  const actives = filteredInvoices.filter(invoice => invoice.status === 'active')

  const [searchText, setSearchText] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const toggleSearch = () => setShowSearch(!showSearch)
  const searchHandle = (text) => {
    dispatch(searchInvoices(text))
    setSearchText(text)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Active Order',
      headerLeft: () => (
        <View style={styles.navHeaderLeft}>
          <MaterialCommunityIcons name='menu' size={24} color='white' onPress={() => navigation.openDrawer()} />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={toggleSearch}>
          <Icon name='search' size={24} color='white' />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: 'white'
    })
  }, [navigation, showSearch])

  const renderItem = ({ item }) => (
    <HistoryCard
      onPress={() => navigation.navigate('InvoiceScreen', {
        inputs: item.items,
        total: item.total,
        stock: item.stock,
        discount: item.discount,
        selectedPromo: item.promo,
        productId: item.productId,
        productName: item.productName,
        custom: item.custom,
        dateTimeCreated: item.dateTimeCreated,
        mode: 'active',
        invoiceCode: item.invoiceCode,
        status: item.status
      })}
      invoiceCode={item.invoiceCode}
      custom={item.custom}
      name={item.productName}
      status={item.status}
      date={item.dateTimeCreated}
      total={item.finalTotal}
      image={''}
    />
  )

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
        data={actives.sort((a, b) => b.invoiceCode - a.invoiceCode)}
        keyExtractor={history => history.invoiceCode}
        renderItem={renderItem}
      />
    </View>
  )
}
