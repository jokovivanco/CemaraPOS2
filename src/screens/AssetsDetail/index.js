import React, { useLayoutEffect, useState } from 'react'
import { View, Image, ScrollView, Pressable } from 'react-native'
import thumbnail from '../../assets/images/thumbnail_default.png'
import styles from './styles'

import { Text, TextInput, Divider, ActivityIndicator, useTheme, Modal, Portal, Provider, RadioButton, List } from 'react-native-paper'

import useDidMountEffect from '../../utilities/hooks/useDidMountEffect'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import firestore from '@react-native-firebase/firestore'

import { useDispatch, useSelector } from 'react-redux'
import { updateAssetsData, deleteAssetsOwnersItem, deleteAssetsTypesItem, addAssetsOwnerItem, addAssetsTypeItem } from '../../redux/actions'

const AddAssetsTypes = ({ visibleAddAssetsTypes, setAddVisibleAssetsTypes }) => {
  const [name, setName] = useState('')

  const theme = useTheme()
  const dispatch = useDispatch()

  const onSubmit = () => {
    firestore().collection('assetsTypes').add({
      name: name
    })
      .then(snapshot => {
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

const AssetsTypes = ({ assetsState, visibleAssetsTypes, setVisibleAssetsTypes, setAddVisibleAssetsTypes }) => {
  const { assetsTypes } = useSelector(state => state.assets)

  const theme = useTheme()
  const dispatch = useDispatch()

  const [checked, setChecked] = useState(assetsState[0].type)

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
                assetsState[1](current => ({
                  ...current,
                  type: type.name
                }))
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
                      assetsState[1](current => ({
                        ...current,
                        type: type.name
                      }))
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

const AssetsOwners = ({ assetsState, visibleAssetsOwners, setVisibleAssetsOwners, setAddVisibleAssetsOwners }) => {
  const { assetsOwners } = useSelector(state => state.assets)

  const theme = useTheme()
  const dispatch = useDispatch()

  const [checked, setChecked] = useState(assetsState[0].ownBy)

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
                assetsState[1](current => ({
                  ...current,
                  ownBy: owner.name
                }))
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
                      assetsState[1](current => ({
                        ...current,
                        ownBy: owner.name
                      }))
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

const AssetsForm = ({ editable, assetsState, setVisibleAssetsOwners, setVisibleAssetsTypes }) => {
  return (
    <View style={styles.containerForm}>
      <View style={styles.inputForm}>
        <Text style={styles.title}>Name</Text>
        <TextInput
          editable={editable}
          value={assetsState[0].name}
          onChangeText={text => assetsState[1](current => ({
            ...current,
            name: text
          }))}
        />
      </View>
      <View style={styles.inputForm}>
        <Text style={styles.title}>Description</Text>
        <TextInput
          editable={editable}
          value={assetsState[0].description}
          onChangeText={text => assetsState[1](current => ({
            ...current,
            description: text
          }))}
        />
      </View>
      <View style={styles.inputForm}>
        <Text style={styles.title}>Own By</Text>
        <Pressable onPress={() => {
          if (editable) {
            setVisibleAssetsOwners(true)
          } else {
            return
          }
        }}>
          <TextInput
            editable={false}
            value={assetsState[0].ownBy}
            onChangeText={text => assetsState[1](current => ({
              ...current,
              ownBy: text
            }))}
            right={editable ? (
              <TextInput.Icon name='chevron-down' onPress={() => setVisibleAssetsOwners(true)} />
            ) : null}
          />
        </Pressable>
      </View>
      <View style={styles.inputForm}>
        <Text style={styles.title}>Type</Text>
        <Pressable onPress={() => {
          if (editable) {
            setVisibleAssetsTypes(true)
          } else {
            return
          }
        }}>
          <TextInput
            editable={false}
            value={assetsState[0].type}
            onChangeText={text => assetsState[1](current => ({
              ...current,
              type: text
            }))}
            right={editable ? (
              <TextInput.Icon name='chevron-down' onPress={() => setVisibleAssetsType(true)} />
            ) : null}
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

export default function InventoryDetail({ navigation, route }) {
  const { id } = route.params
  const { filteredAssets } = useSelector(state => state.assets)
  const currentItem = filteredAssets.filter(asset => asset.id !== id)
  const item = filteredAssets.filter(asset => asset.id === id)[0]

  const dispatch = useDispatch()
  const theme = useTheme()

  const [editable, setEditable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [currentAssets, setCurrentAssets] = useState(item)
  const [assets, setAssets] = useState(item)

  const [visibleAssetsOwners, setVisibleAssetsOwners] = useState(false)
  const [visibleAssetsTypes, setVisibleAssetsTypes] = useState(false)
  const [visibleAddAssetsOwners, setAddVisibleAssetsOwners] = useState(false)
  const [visibleAddAssetsTypes, setAddVisibleAssetsTypes] = useState(false)

  const onSave = () => {
    const validator = assets.name.length > 0 && assets.description.length > 0

    if (validator) {
      if (JSON.stringify(assets) !== JSON.stringify(currentAssets)) {
        const newAsset = {
          name: assets.name,
          description: assets.description,
          image: assets.image,
          ownBy: assets.ownBy,
          type: assets.type,
          dateTimeCreated: firestore.Timestamp.now()
        }

        setIsLoading(true)
        firestore().collection('assets').doc(id).update(newAsset)
          .then(() => {
            dispatch(updateAssetsData({
              ...assets,
              ...newAsset
            }))
          })
          .then(() => {
            setAssets({
              ...assets,
              ...newAsset
            })
            setCurrentAssets({
              ...assets,
              ...newAsset
            })
          })
          .then(() => setEditable(false))
          .then(() => setIsLoading(false))
          .catch(error => { console.log('Error update assets', error) })
      } else {
        setEditable(false)
      }

    } else {
      alert('Tolong untuk melengkapi data sebelum save!')
    }
  }

  useDidMountEffect(() => {
    setAssets(item)
  }, [item, filteredAssets])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Asset Detail',
      headerRight: () => editable ? (
        <Icon name='check' size={24} color='white' onPress={onSave} />
      ) : (
        <Icon name='square-edit-outline' size={24} color='white' onPress={() => setEditable(!editable)} />
      )
    })
  }, [navigation, editable, assets, currentAssets, item, currentItem])

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <Divider stlye={styles.divider} />
        <AssetsForm
          editable={editable}
          assetsState={[assets, setAssets]}
          setVisibleAssetsOwners={setVisibleAssetsOwners}
          setVisibleAssetsTypes={setVisibleAssetsTypes}
        />
      </ScrollView>
      <AssetsOwners assetsState={[assets, setAssets]} visibleAssetsOwners={visibleAssetsOwners} setVisibleAssetsOwners={setVisibleAssetsOwners} setAddVisibleAssetsOwners={setAddVisibleAssetsOwners} />
      <AssetsTypes assetsState={[assets, setAssets]} visibleAssetsTypes={visibleAssetsTypes} setVisibleAssetsTypes={setVisibleAssetsTypes} setAddVisibleAssetsTypes={setAddVisibleAssetsTypes} />
      <AddAssetsOwners visibleAddAssetsOwners={visibleAddAssetsOwners} setAddVisibleAssetsOwners={setAddVisibleAssetsOwners} setVisibleAssetsOwners={setVisibleAssetsOwners} />
      <AddAssetsTypes visibleAddAssetsTypes={visibleAddAssetsTypes} setAddVisibleAssetsTypes={setAddVisibleAssetsTypes} setVisibleAssetsTypes={setVisibleAssetsTypes} />
    </View>
  )
}
