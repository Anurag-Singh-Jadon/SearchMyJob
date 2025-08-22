import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import CustomTextInput from '../../components/CustomTextInput'

import { useNavigation } from '@react-navigation/native'
const LoginForCompany = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [badEmail, setBadEmail] = useState('')
  const [password, setPassword] = useState('')
  const [badPassword, setBadPassword] = useState('')
  const validate = () => {
    let emailRegex = /@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    let validEmail = true
    let validPass = true

    //email
    if (email == '') {
      validEmail = false,
        setBadEmail("Please Enter Email")
    } else if (email != '' && !email.toString().match(emailRegex)) {
      validEmail = false
      setBadEmail("Please Enter Valid Email")
    } else if (email != '' && email.toString().match(emailRegex)) {
      validEmail = true
      setBadEmail("")
    }

    //Password
    if (password == '') {
      validPass = false
      setBadPassword('Please Enter Password')
    } else if (password != '' && password.length < 6) {
      validPass = false
      setBadPassword('Please enter minimum 6 characters')
    } else if (password != '' && password.length >= 6) {
      validPass = true
      setBadPassword('')
    }
    return validEmail && validPass
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assetsts/images/products.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <CustomTextInput
        title={'Email'}
        value={email}
        onChangeText={txt => {
          setEmail(txt)
        }}
        placeholder={'xyz@gmail.com'}
        bad={badEmail != '' ? true : false}
      />
      {badEmail != '' && <Text style={styles.errorMsg}>{badEmail}</Text>}
      <CustomTextInput
        title={'Password'}
        value={password}
        onChangeText={txt => {
          setPassword(txt)
        }}
        placeholder={'********'}
        bad={badPassword != '' ? true : false}
      />
      {badPassword != '' && <Text style={styles.errorMsg}>{badPassword}</Text>}
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
      <TouchableOpacity style={styles.btn} onPress={() => {
        if (validate()) {
          Alert.alert('Ready to send data on Server')
        }
      }}>
        <Text style={styles.title2}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpForCompany')} style={styles.btn1}>
        <Text style={styles.title1}>Create Account</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginForCompany

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40)
  },
  title: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: moderateVerticalScale(30),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: moderateScale(20),
    marginTop: moderateVerticalScale(10),
    fontWeight: '500',
    fontSize: moderateScale(15),
  },
  btn: {
    width: '90%',
    height: verticalScale(45),
    backgroundColor: TEXT_COLOR,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title1: {
    color: TEXT_COLOR,
    fontWeight: '500',
    fontSize: moderateScale(16)
  },
  btn1: {
    width: '90%',
    height: verticalScale(45),
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title2: {
    color: BG_COLOR,
    fontWeight: '500',
    fontSize: moderateScale(16)
  },
  errorMsg: {
    marginLeft: moderateScale(20),
    color: 'red'
  },

})
