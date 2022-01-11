import React, { useCallback, useState } from 'react'
import { View, Image } from 'react-native'
import logo from '../../assets/images/small_rounded_logo.png'
import styles from './styles'

import { TextInput, Button } from 'react-native-paper'

import auth from '@react-native-firebase/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = useCallback(() => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login was successfully')
      })
      .catch(error => {
        console.log('Login is failed', error)
      })
  }, [email, password])

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
      />
      <TextInput
        keyboardType='email-address'
        placeholder="Username"
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
        onPress={() => { }}
        mode='contained'
        onPress={onLogin}
      >
        Sign In
      </Button>
    </View>
  )
}
