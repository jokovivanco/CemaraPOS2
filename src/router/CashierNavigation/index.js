import React, { useLayoutEffect, useState } from 'react'
import {
  BestScreen,
  RecentScreen
} from '../../screens'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'

import { FAB, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

export default function CashierNavigation({ navigation }) {
  const theme = useTheme()

  const [showSearch, setShowSearch] = useState(false)

  const toggleSearch = () => setShowSearch(!showSearch)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={toggleSearch}>
          <Icon name='search' size={24} color='white' />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={styles.navHeaderLeft}>
          <Icon name='menu' size={24} color='white' onPress={() => navigation.openDrawer()} />
        </View>
      ),

    })
  }, [showSearch])

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'BestScreen') {
              iconName = focused ? 'star' : 'star'
            } else if (route.name === 'RecentScreen') {
              iconName = focused ? 'rotate-ccw' : 'rotate-ccw'
            }

            return <Icon name={iconName} size={24} color={color} />
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#DE8D8C',
          tabBarLabelStyle: styles.tabBarStyle,
          tabBarContentContainerStyle: { backgroundColor: theme.colors.primary }
        })}
      >
        <Tab.Screen name='BestScreen' children={props => <BestScreen {...props} showSearch={showSearch} />} options={{
          tabBarLabel: 'Best'
        }}
        />
        <Tab.Screen name='RecentScreen' children={props => <RecentScreen {...props} showSearch={showSearch} />} options={{
          tabBarLabel: 'Recent'
        }}
        />
      </Tab.Navigator>
      <FAB
        icon="plus"
        style={styles.FABStyle}
        onPress={() => navigation.navigate('CustomTransactionNavigation')}
      />
    </>
  )
}
