import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { RegisterScreen } from '../../screens'
import MainNavigation from '../MainNavigation'
import styles from './styles'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ActivityIndicator } from 'react-native-paper'

import { useDispatch } from 'react-redux'
import {
  fetchEverything
} from '../../redux/actions'

import { useTheme } from 'react-native-paper'

const Stack = createNativeStackNavigator()

export default function AppNavigation({ user }) {
  const dispatch = useDispatch()
  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchEverything()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  )

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MainNavigation' component={MainNavigation} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
    </Stack.Navigator>
  )
}