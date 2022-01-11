import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import styles from './styles'

import UserRoleCard from '../../components/UserRoleCard'

import { deleteRoles, searchRoles } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import { Divider, TextInput } from 'react-native-paper'

export default function Role({ showSearch }) {
  const { filteredRoles } = useSelector(state => state.roles)
  const dispatch = useDispatch()

  const [deleteMode, setDeleteMode] = useState(false)
  const [searchText, setSearchText] = useState('')

  const searchHandle = (text) => {
    dispatch(searchRoles(text))
    setSearchText(text)
  }

  const onDelete = (id) => {
    firestore().collection('roles').doc(id).delete().then(() => {
      dispatch(deleteRoles(id))
    })
  }

  // useDidMountEffect(() => {
  //   if (filteredRoles.length === 0) {
  //     setDeleteMode(false)
  //   }
  // }, [filteredRoles])

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
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <Divider style={styles.card} />}
        data={filteredRoles}
        keyExtractor={(_, index) => index}
        renderItem={({ item }) => {
          const { id, name, deleteAble } = item

          return (
            <UserRoleCard
              onPress={() => {
                if (deleteMode) {
                  return
                } else {
                  // navigation.navigate('AssetsDetailScreen', { id })
                }
              }}
              name={name.charAt(0).toUpperCase() + name.slice(1)}
              role={name}
              onDelete={() => {
                if (deleteAble) {
                  onDelete(id)
                } else {
                  return
                }
              }}
              deleteModeState={[deleteMode, setDeleteMode]}
            />
          )
        }}
      />
    </View>
  )
}
