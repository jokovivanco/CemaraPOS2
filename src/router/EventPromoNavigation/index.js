import React from 'react'
import { EventPromoScreen, EventPromoDetailScreen, AddEventPromoScreen } from '../../screens'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from 'react-native-paper'

const Stack = createNativeStackNavigator()

export default function AssetNavigation() {
  const theme = useTheme()

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: 'white'
    }}>
      <Stack.Screen name='EventPromoScreen' component={EventPromoScreen} />
      <Stack.Screen name='EventPromoDetailScreen' component={EventPromoDetailScreen} />
      <Stack.Screen name='AddEventPromoScreen' component={AddEventPromoScreen} />
    </Stack.Navigator>
  )
}
