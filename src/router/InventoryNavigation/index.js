import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { InventoryScreen, InventoryDetailScreen, AddInventoryScreen } from '../../screens'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from 'react-native-paper'

const Stack = createNativeStackNavigator()

export default function InventoryNavigation({ navigation }) {
  const theme = useTheme()

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: 'white'
    }}>
      <Stack.Screen name='InventoryScreen' component={InventoryScreen} />
      <Stack.Screen name='InventoryDetailScreen' component={InventoryDetailScreen} />
      <Stack.Screen name='AddInventoryScreen' component={AddInventoryScreen} />
    </Stack.Navigator>
  )
}
