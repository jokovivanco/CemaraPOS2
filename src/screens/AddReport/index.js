import React, { useCallback, useLayoutEffect, useState } from 'react'
import { View, Image, ScrollView, Pressable } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import { Text, TextInput, Divider, useTheme, ActivityIndicator, Modal, Portal, Provider, RadioButton, List } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import firestore from '@react-native-firebase/firestore'

import { addAssetsData, deleteAssetsOwnersItem, deleteAssetsTypesItem, addAssetsOwnerItem, addAssetsTypeItem } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const AddAssetsTypes = ({ visibleAddAssetsTypes, setAddVisibleAssetsTypes }) => {
  const [name, setName] = useState('')

  const theme = useTheme()
  const dispatch = useDispatch()

  const onSubmit = () => {
    firestore().collection('assetsTypes').add({
      name: name
    })
      .then(snapshot => {
        console.log(name)
        dispatch(addAssetsTypeItem(name, snapshot.id))
        setName('')
        setAddVisibleAssetsTypes(false)
      })
      .catch(error => { console.log('Error delete assetsOwner item', error) })
  }

  return (
    <Provider>
      <Portal>
        <Modal visible={visibleAddAssetsTypes} onDismiss={() => {
          setName('')
          setAddVisibleAssetsTypes(false)
        }} contentContainerStyle={styles.assetsChooseContainer}>
          <Text style={styles.title}>Add New Type</Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            placeholder='Type the name...'
          />
          <View style={styles.addNewOwnerButtons}>
            <Text style={[styles.addNewOwnerCancelButton, { color: theme.colors.error }]} onPress={() => {
              setName('')
              setAddVisibleAssetsTypes(false)
            }}>Cancel</Text>
            <Text style={styles.addNewOwnerAddButton} onPress={onSubmit}>Add</Text>
          </View>
        </Modal>
      </Portal>
    </Provider>
  )
}

const AddAssetsOwners = ({ visibleAddAssetsOwners, setAddVisibleAssetsOwners }) => {
  const [name, setName] = useState('')

  const theme = useTheme()
  const dispatch = useDispatch()

  const onSubmit = () => {
    firestore().collection('assetsOwners').add({
      name: name
    })
      .then(snapshot => {
        dispatch(addAssetsOwnerItem(name, snapshot.id))
        setName('')
        setAddVisibleAssetsOwners(false)
      })
      .catch(error => { console.log('Error delete assetsOwner item', error) })
  }

  return (
    <Provider>
      <Portal>
        <Modal visible={visibleAddAssetsOwners} onDismiss={() => {
          setName('')
          setAddVisibleAssetsOwners(false)
        }} contentContainerStyle={styles.assetsChooseContainer}>
          <Text style={styles.title}>Add New Owner</Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            placeholder='Type the name...'
          />
          <View style={styles.addNewOwnerButtons}>
            <Text style={[styles.addNewOwnerCancelButton, { color: theme.colors.error }]} onPress={() => {
              setName('')
              setAddVisibleAssetsOwners(false)
            }}>Cancel</Text>
            <Text style={styles.addNewOwnerAddButton} onPress={onSubmit}>Add</Text>
          </View>
        </Modal>
      </Portal>
    </Provider>
  )
}

const AssetsTypes = ({ valueState, visibleAssetsTypes, setVisibleAssetsTypes, setAddVisibleAssetsTypes }) => {
  const { assetsTypes } = useSelector(state => state.assets)

  const theme = useTheme()
  const dispatch = useDispatch()

  const [checked, setChecked] = useState(valueState[0])

  const onDelete = id => {
    firestore().collection('assetsTypes').doc(id).delete()
      .then(() => {
        dispatch(deleteAssetsTypesItem(id))
      })
      .catch(error => { console.log('Error delete assetsOwner item', error) })
  }

  return (
    <Provider>
      <Portal>
        <Modal visible={visibleAssetsTypes} onDismiss={() => setVisibleAssetsTypes(false)} contentContainerStyle={styles.assetsChooseContainer}>
          {assetsTypes.length > 0 ? assetsTypes.map(type => (
            <List.Item
              onPress={() => {
                setChecked(type.name)
                valueState[1](type.name)
              }}
              style={styles.listItemStyle}
              key={type.id}
              title={type.name}
              left={props => (
                <Pressable style={styles.radioStyle}>
                  <RadioButton
                    {...props}
                    value={type.name}
                    status={checked === type.name ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(type.name)
                      valueState[1](type.name)
                    }}
                  />
                </Pressable>
              )}
              right={props => (
                <Pressable {...props} onPress={() => { onDelete(type.id) }}>
                  <List.Icon color={theme.colors.error} icon='trash-can-outline' />
                </Pressable>
              )}
            />
          )) : null}
          <Pressable style={styles.addNewOwnerContainer} onPress={() => {
            setAddVisibleAssetsTypes(true)
          }}>
            <Text style={styles.addNewOwnerText}>Add New Types</Text>
          </Pressable>
        </Modal>
      </Portal>
    </Provider>
  )
}

const AssetsOwners = ({ valueState, visibleAssetsOwners, setVisibleAssetsOwners, setAddVisibleAssetsOwners }) => {
  const { assetsOwners } = useSelector(state => state.assets)

  const theme = useTheme()
  const dispatch = useDispatch()

  const [checked, setChecked] = useState(valueState[0])

  const onDelete = id => {
    firestore().collection('assetsOwners').doc(id).delete()
      .then(() => {
        dispatch(deleteAssetsOwnersItem(id))
      })
      .catch(error => { console.log('Error delete assetsOwner item', error) })
  }

  return (
    <Provider>
      <Portal>
        <Modal visible={visibleAssetsOwners} onDismiss={() => setVisibleAssetsOwners(false)} contentContainerStyle={styles.assetsChooseContainer}>
          {assetsOwners.length > 0 ? assetsOwners.map(owner => (
            <List.Item
              onPress={() => {
                setChecked(owner.name)
                valueState[1](owner.name)
              }}
              style={styles.listItemStyle}
              key={owner.id}
              title={owner.name}
              left={props => (
                <View style={styles.radioStyle}>
                  <RadioButton
                    {...props}
                    value={owner.name}
                    status={checked === owner.name ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(owner.name)
                      valueState[1](owner.name)
                    }}
                  />
                </View>
              )}
              right={props => (
                <Pressable {...props} onPress={() => { onDelete(owner.id) }}>
                  <List.Icon color={theme.colors.error} icon='trash-can-outline' />
                </Pressable>
              )}
            />
          )) : null}
          <Pressable style={styles.addNewOwnerContainer} onPress={() => {
            setAddVisibleAssetsOwners(true)
          }}>
            <Text style={styles.addNewOwnerText}>Add New Owner</Text>
          </Pressable>
        </Modal>
      </Portal>
    </Provider>
  )
}

const NewAssetForm = ({ nameState, descState, ownByState, typeState, setVisibleAssetsOwners, setVisibleAssetsTypes }) => {

  return (
    <View style={styles.containerForm}>
      <View style={styles.inputForm}>
        <Text style={styles.title}>Name</Text>
        <TextInput
          placeholder='Asset name'
          value={nameState[0]}
          onChangeText={text => nameState[1](text)}
        />
      </View>
      <View style={styles.inputForm}>
        <Text style={styles.title}>Description</Text>
        <TextInput
          placeholder='Description'
          value={descState[0]}
          onChangeText={text => descState[1](text)}
        />
      </View>
      <View style={styles.inputForm}>
        <Text style={styles.title}>Own By</Text>
        <Pressable onPress={() => { setVisibleAssetsOwners(true) }}>
          <TextInput
            editable={false}
            placeholder='Choose owner'
            value={ownByState[0]}
            onChangeText={text => ownByState[1](text)}
            right={<TextInput.Icon name='chevron-down' onPress={() => setVisibleAssetsOwners(true)} />}
          />
        </Pressable>
      </View>
      <View style={styles.inputForm}>
        <Text style={styles.title}>Type</Text>
        <Pressable onPress={() => { setVisibleAssetsTypes(true) }}>
          <TextInput
            editable={false}
            placeholder='Choose type'
            value={typeState[0]}
            onChangeText={text => typeState[1](text)}
            right={<TextInput.Icon name='chevron-down' onPress={() => setVisibleAssetsTypes(true)} />}
          />
        </Pressable>
      </View>
    </View>
  )
}

const Header = () => (
  <View style={styles.headerContainer}>
    <Image
      source={thumbnail}
      style={styles.headerImage}
    />
  </View>
)

export default function AddAssets({ navigation }) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [ownBy, setOwnBy] = useState('')
  const [type, setType] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [visibleAssetsOwners, setVisibleAssetsOwners] = useState(false)
  const [visibleAssetsTypes, setVisibleAssetsTypes] = useState(false)
  const [visibleAddAssetsOwners, setAddVisibleAssetsOwners] = useState(false)
  const [visibleAddAssetsTypes, setAddVisibleAssetsTypes] = useState(false)

  const onSubmit = () => {
    const validator = name && desc && ownBy && type
    const newAssets = {
      name: name,
      description: desc,
      image: '',
      ownBy: ownBy,
      type: type,
      dateTimeCreated: firestore.Timestamp.now()
    }

    if (validator) {
      setIsLoading(true)
      firestore().collection('assets').add(newAssets)
        .then(snapshot => {
          return {
            ...newAssets,
            id: snapshot.id
          }
        })
        .then(newAssetsWithId => dispatch(addAssetsData(newAssetsWithId)))
        .then(() => setIsLoading(false))
        .then(() => navigation.goBack())
        .catch(error => { console.log('Error update assets', error) })
    } else {
      alert('Tolong untuk melengkapi data sebelum submit!')
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Asset',
      headerRight: () => <Icon name='plus' size={24} color='white' onPress={onSubmit} />
    })
  }, [navigation, name, desc, ownBy, type])

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Header />
        <Divider stlye={styles.divider} />
        <NewAssetForm
          nameState={[name, setName]}
          descState={[desc, setDesc]}
          ownByState={[ownBy, setOwnBy]}
          typeState={[type, setType]}
          setVisibleAssetsOwners={setVisibleAssetsOwners}
          setVisibleAssetsTypes={setVisibleAssetsTypes}
        />
      </ScrollView>
      <AssetsOwners valueState={[ownBy, setOwnBy]} visibleAssetsOwners={visibleAssetsOwners} setVisibleAssetsOwners={setVisibleAssetsOwners} setAddVisibleAssetsOwners={setAddVisibleAssetsOwners} />
      <AssetsTypes valueState={[type, setType]} visibleAssetsTypes={visibleAssetsTypes} setVisibleAssetsTypes={setVisibleAssetsTypes} setAddVisibleAssetsTypes={setAddVisibleAssetsTypes} />
      <AddAssetsOwners visibleAddAssetsOwners={visibleAddAssetsOwners} setAddVisibleAssetsOwners={setAddVisibleAssetsOwners} setVisibleAssetsOwners={setVisibleAssetsOwners} />
      <AddAssetsTypes visibleAddAssetsTypes={visibleAddAssetsTypes} setAddVisibleAssetsTypes={setAddVisibleAssetsTypes} setVisibleAssetsTypes={setVisibleAssetsTypes} />
    </View>
  )
}
