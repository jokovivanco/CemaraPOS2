import React from 'react'

import ProductTransactionNavigation from '../ProductTransactionNavigation'
import CustomTransactionNavigation from '../CustomTransactionNavigation'
import HistoryNavigation from '../HistoryNavigation'
import ActiveNavigation from '../ActiveNavigation'
import InventoryNavigation from '../InventoryNavigation'
import AssetNavigation from '../AssetNavigation'
import EventPromoNavigation from '../EventPromoNavigation'
import UserManagementNavigation from '../UserManagementNavigation'
import ReportNavigation from '../ReportNavigation'

import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../../screens/DrawerContent'

import { useTheme } from 'react-native-paper'

import { useSelector } from 'react-redux'

const Drawer = createDrawerNavigator()

export default function MainNavigation() {
  const { currentUser } = useSelector(state => state.user)
  console.log(currentUser)
  const theme = useTheme()

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 0
        },
        headerTintColor: 'white'
      }}
      drawerContent={props => <DrawerContent {...props} currentUser={currentUser} />}
    >
      <Drawer.Screen name='ProductTransactionNavigation' component={ProductTransactionNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name='CustomTransactionNavigation' component={CustomTransactionNavigation} options={{ swipeEnabled: false, headerShown: false }} />
      <Drawer.Screen name='HistoryNavigation' component={HistoryNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name='ActiveNavigation' component={ActiveNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name='InventoryNavigation' component={InventoryNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name='AssetNavigation' component={AssetNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name='EventPromoNavigation' component={EventPromoNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name='UserManagementNavigation' component={UserManagementNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name='ReportNavigation' component={ReportNavigation} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}
