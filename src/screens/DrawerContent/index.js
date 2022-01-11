import React from 'react'
import { View } from 'react-native'
import styles from './styles'

import { Drawer, Title, Caption } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import auth from '@react-native-firebase/auth'

export default function DrawerContent(props) {
  const { navigation, currentUser } = props

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userSection}>
            <Title style={styles.title}>{currentUser.name}</Title>
            <Caption style={styles.caption}>{currentUser.role}</Caption>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='shopping-cart' size={size} color={color} />
              )}
              label='Cashier'
              onPress={() => navigation.navigate('CashierNavigation')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='package' size={size} color={color} />
              )}
              label='Inventory'
              onPress={() => navigation.navigate('InventoryNavigation')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='layers' size={size} color={color} />
              )}
              label='Assets'
              onPress={() => navigation.navigate('AssetNavigation')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='rotate-ccw' size={size} color={color} />
              )}
              label='History'
              onPress={() => navigation.navigate('HistoryNavigation')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='repeat' size={size} color={color} />
              )}
              label='Active Orders'
              onPress={() => navigation.navigate('ActiveNavigation')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='thumbs-up' size={size} color={color} />
              )}
              label='Event Promo'
              onPress={() => navigation.navigate('EventPromoNavigation')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='user' size={size} color={color} />
              )}
              label='User Management'
              onPress={() => navigation.navigate('UserManagementNavigation')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='trending-up' size={size} color={color} />
              )}
              label='Report'
              onPress={() => navigation.navigate('ReportNavigation')}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name='log-out' color={color} size={size} />
          )}
          label='Sign Out'
          onPress={() => auth().signOut()}
        />
      </Drawer.Section>
    </View>
  )
}
