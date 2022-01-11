import React, { useState } from 'react'
import { View, Image } from 'react-native'
import logo from '../../assets/images/small_rounded_logo.png'
import styles from './styles'

import { Picker } from '@react-native-picker/picker'
import { TextInput, Button } from 'react-native-paper'

import { useSelector } from 'react-redux'

export default function Register() {
  const { roles } = useSelector(state => state.roles)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={hidePassword}
        value={password}
        onChangeText={password => setPassword(password)}
        right={<TextInput.Icon
          name='eye'
          onPressIn={() => setHidePassword(!hidePassword)}
          onPressOut={() => setHidePassword(!hidePassword)}
        />}
      />
      <Picker
        style={styles.input}
        selectedValue={role}
        onValueChange={itemValue =>
          setRole(itemValue)
        }>
        {roles.map(role => (
          <Picker.Item key={role.id} label={`As ${role.name[0].toUpperCase() + role.name.slice(1)}`} value={role.name} />
        ))}
      </Picker>
      <Button
        style={styles.button}
        onPress={() => { }}
        mode='contained'
      >
        Register
      </Button>
    </View>
  )
}
