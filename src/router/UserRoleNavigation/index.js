import React, { useLayoutEffect, useState } from 'react'
import {
  UserScreen,
  RoleScreen
} from '../../screens'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'

import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const Tab = createMaterialTopTabNavigator()

export default function UserRoleNavigation({ navigation, route }) {
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
  }, [showSearch, route])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'UserScreen') {
            iconName = focused ? 'user' : 'user'
          } else if (route.name === 'RoleScreen') {
            iconName = focused ? 'user-check' : 'user-check'
          }

          return <Icon name={iconName} size={24} color={color} />
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#DE8D8C',
        tabBarLabelStyle: styles.tabBarStyle,
        tabBarContentContainerStyle: { backgroundColor: theme.colors.primary }
      })}
    >
      <Tab.Screen name='UserScreen' children={props => <UserScreen {...props} showSearch={showSearch} />} options={{
        tabBarLabel: 'User'
      }}
      />
      <Tab.Screen name='RoleScreen' children={props => <RoleScreen {...props} showSearch={showSearch} />} options={{
        tabBarLabel: 'Role'
      }}
      />
    </Tab.Navigator>
  )
}
