import React, { useState } from 'react'
import { View, Image } from 'react-native'
import logo from '../../assets/images/small_rounded_logo.png'
import styles from './styles'

import { TextInput, Button } from 'react-native-paper'

import auth from '@react-native-firebase/auth'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Login was successfully')
        })
        .catch(error => {
          console.log('Login is failed', error)
        })
    } else {
      alert('Tolong lengkapi field terlebih dahulu!')
    }
  }

  const onRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
      />
      <TextInput
        keyboardType='email-address'
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Button
        style={styles.button}
        mode='contained'
        onPress={onLogin}
      >
        Sign In
      </Button>
      <Button
        style={styles.button}
        mode='contained'
        onPress={onRegister}
      >
        Sign Up
      </Button>
    </View>
  )
}
