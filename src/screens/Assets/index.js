import React, { useLayoutEffect, useState, useRef } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import AssetCard from '../../components/AssetCard'
import styles from './styles'

import { TextInput, Divider, FAB } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux'
import { deleteAssets, searchAssets } from '../../redux/actions'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'

import useDidMountEffect from '../../utilities/hooks/useDidMountEffect'

import firestore from '@react-native-firebase/firestore'

export default function Assets({ navigation }) {
  const { filteredAssets } = useSelector(state => state.assets)

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }
  const searchHandle = (text) => {
    dispatch(searchAssets(text))
    setSearchText(text)
  }

  const onDelete = (id) => {
    firestore().collection('assets').doc(id).delete().then(() => {
      dispatch(deleteAssets(id))
    })
  }

  useDidMountEffect(() => {
    if (filteredAssets.length === 0) {
      setDeleteMode(false)
    }
  }, [filteredAssets])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Assets',
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
          data={filteredAssets.sort((a, b) => moment(b.dateTimeCreated.toDate()).diff(a.dateTimeCreated.toDate()))}
          keyExtractor={(_, index) => index}
          renderItem={({ item }) => {
            const { id, name, description, ownBy, type, image } = item

            return (
              <AssetCard
                onPress={() => {
                  if (deleteMode) {
                    return
                  } else {
                    navigation.navigate('AssetsDetailScreen', { id })
                  }
                }}
                onDelete={() => { onDelete(id) }}
                deleteModeState={[deleteMode, setDeleteMode]}
                name={name}
                description={description}
                ownBy={ownBy}
                type={type}
                image={image}
              />
            )
          }}
        />
      </View>
      <FAB
        icon="plus"
        style={styles.FABStyle}
        onPress={() => navigation.navigate('AddAssetsScreen')}
      />
    </>
  )
}
