import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import styles from './styles'

import UserRoleCard from '../../components/UserRoleCard'

import { deleteUsers, searchUsers } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import { Divider, TextInput } from 'react-native-paper'
import moment from 'moment'

export default function Role({ showSearch }) {
  const { filteredUsers } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [deleteMode, setDeleteMode] = useState(false)
  const [searchText, setSearchText] = useState('')

  const searchHandle = (text) => {
    dispatch(searchUsers(text))
    setSearchText(text)
  }

  const onDelete = (id) => {
    firestore().collection('users').doc(id).delete().then(() => {
      dispatch(deleteUsers(id))
    })
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
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <Divider style={styles.card} />}
        data={filteredUsers.sort((a, b) => moment(b.dateTimeCreated.toDate()).diff(a.dateTimeCreated.toDate()))}
        keyExtractor={(_, index) => index}
        renderItem={({ item }) => {
          const { id, name, role } = item

          return (
            <UserRoleCard
              onPress={() => {
                if (deleteMode) {
                  return
                } else {
                  // navigation.navigate('AssetsDetailScreen', { id })
                }
              }}
              name={name}
              role={role}
              onDelete={() => { onDelete(id) }}
              deleteModeState={[deleteMode, setDeleteMode]}
            />
          )
        }}
      />
    </View>
  )
}
