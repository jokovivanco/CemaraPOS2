import React, { useLayoutEffect, useState } from 'react'
import PromoCard from '../../components/PromoCard'
import { View, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'

import { TextInput, Divider, FAB } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux'
import { deletePromos, searchPromos } from '../../redux/actions'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'

import useDidMountEffect from '../../utilities/hooks/useDidMountEffect'

import firestore from '@react-native-firebase/firestore'

export default function EventPromo({ navigation }) {
  const { filteredPromos } = useSelector(state => state.promos)

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }
  const searchHandle = (text) => {
    dispatch(searchPromos(text))
    setSearchText(text)
  }

  const onDelete = (id) => {
    firestore().collection('promos').doc(id).delete().then(() => {
      dispatch(deletePromos(id))
    })
  }

  useDidMountEffect(() => {
    if (filteredPromos.length === 0) {
      setDeleteMode(false)
    }
  }, [filteredPromos])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Event Promo',
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
          data={filteredPromos.sort((a, b) => moment(b.dateTimeCreated.toDate()).diff(a.dateTimeCreated.toDate()))}
          keyExtractor={(_, index) => index}
          renderItem={({ item }) => {
            const { id, name, image, discountPercent, discountPrice, promoStart, promoEnd, } = item

            return (
              <PromoCard
                onPress={() => {
                  if (deleteMode) {
                    return
                  } else {
                    navigation.navigate('EventPromoDetailScreen', { id })
                  }
                }}
                onDelete={() => { onDelete(id) }}
                deleteModeState={[deleteMode, setDeleteMode]}
                name={name}
                discountPercent={discountPercent}
                discountPrice={discountPrice}
                promoStart={promoStart}
                promoEnd={promoEnd}
                image={image}
              />
            )
          }}
        />
      </View>
      <FAB
        icon="plus"
        style={styles.FABStyle}
        onPress={() => navigation.navigate('AddEventPromoScreen')}
      />
    </>
  )
}
