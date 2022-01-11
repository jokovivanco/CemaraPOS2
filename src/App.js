//default import
import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './router/AuthNavigation';
import AppNavigation from './router/AppNavigation';

//redux import
import { Provider } from 'react-redux';
import store from './redux/store';

//react-native-paper import
import { configureFonts, DefaultTheme, Provider as PaperProvider, ActivityIndicator } from 'react-native-paper'
import fontConfig from './assets/fonts/fontConfig'

//firebase import
import auth from '@react-native-firebase/auth'

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#9E3230',
      accent: '#F2B820',
      text: '#1C1819'
    },
    fonts: configureFonts(fontConfig)
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {!user ? (
            <AuthNavigation />
          ) : (
            <AppNavigation />
          )}
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({})
