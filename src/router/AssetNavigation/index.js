import React from 'react'
import { AssetsScreen, AssetsDetailScreen, AddAssetsScreen } from '../../screens'

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
      <Stack.Screen name='AssetsScreen' component={AssetsScreen} />
      <Stack.Screen name='AssetsDetailScreen' component={AssetsDetailScreen} />
      <Stack.Screen name='AddAssetsScreen' component={AddAssetsScreen} />
    </Stack.Navigator>
  )
}
