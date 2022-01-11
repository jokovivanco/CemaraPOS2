import React, { useEffect, useLayoutEffect } from 'react'
import {
  ChargeScreen,
  InvoiceScreen,
} from '../../screens'
import CashierNavigation from '../CashierNavigation'

import { useTheme } from 'react-native-paper'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

export default function ProductTransactionNavigation({ route, navigation }) {
  const theme = useTheme()

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    navigation.setOptions({
      swipeEnabled: routeName !== 'InvoiceScreen'
    })
  }, [route])

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary
        },
        headerShadowVisible: false,
        headerTintColor: 'white'
      }}>
      <Stack.Screen name='CashierNavigation' component={CashierNavigation} options={{ title: 'Cashier' }} />
      <Stack.Screen name='ChargeScreen' component={ChargeScreen} />
      <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} />
    </Stack.Navigator>
  )
}
