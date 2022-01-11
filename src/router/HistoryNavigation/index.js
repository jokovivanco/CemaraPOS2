import React from 'react'
import { HistoryScreen, InvoiceScreen } from '../../screens'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from 'react-native-paper'

const Stack = createNativeStackNavigator()

export default function HistoryNavigation() {
  const theme = useTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen name='HistoryScreen' component={HistoryScreen} />
      <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} options={{
        headerStyle: {
          backgroundColor: theme.colors.primary
        },
        headerTintColor: 'white'
      }} />
    </Stack.Navigator>
  )
}
