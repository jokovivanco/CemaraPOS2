import React from 'react'
import { ReportScreen, ReportDetailScreen, AddReportScreen } from '../../screens'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from 'react-native-paper'

const Stack = createNativeStackNavigator()

export default function ReportNavigation() {
  const theme = useTheme()

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: 'white'
    }}>
      <Stack.Screen name='ReportScreen' component={ReportScreen} />
      <Stack.Screen name='ReportDetailScreen' component={ReportDetailScreen} />
      <Stack.Screen name='AddReportScreen' component={AddReportScreen} />
    </Stack.Navigator>
  )
}
