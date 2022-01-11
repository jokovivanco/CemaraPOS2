import React, { useState } from 'react'
import {
  AddCustomOrderScreen,
  InvoiceScreen
} from '../../screens'

import { useTheme } from 'react-native-paper'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function ProductTransactionNavigation({ route }) {
  const theme = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: theme.colors.primary }
      }}>
      <Stack.Screen name='AddCustomOrderScreen' component={AddCustomOrderScreen} />
      <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} />
    </Stack.Navigator>
  )
}
