import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaViewBase, Alert } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR, RED_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import CustomTextInput from '../../components/CustomTextInput'
import { useNavigation } from '@react-navigation/native'
const SignUpForCompany = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [badName, setBadName] = useState('')
  const [email, setEmail] = useState('')
  const [badEmail, setBadEmail] = useState('')
  const [contact, setContact] = useState('')
  const [badContact, setBadContact] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [badCompanyName, setBadCompanyName] = useState('')
  const [address, setAddress] = useState('')
  const [badAddress, setBadAddress] = useState('')
  const [password, setPassword] = useState('')
  const [badPassword, setBadPassword] = useState('')
  const validate = () => {
    let nameRegex = /^[A-Za-z]+$/
    let emailRegex = /@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    let contactRegex = /^\d+$/
    let validEmail = true
    let validName = true
    let validContact = true
    let validCompany = true
    let validAddress = true
    let validPass = true
    //name
    if (name == '') {
      validName = false
      setBadName('Please Enter the Name')
    } else if (name != '' && name.length < 3) {
      validName = false
      setBadName('Please Enter Valid Name')
    } else if (name != '' && name.length >= 3 && !name.toString().match(nameRegex)) {
      validName = false
      setBadName('Please Enter Valid Name')
    } else if (name != '' && name.length > 3 && name.toString().match(nameRegex)) {
      validName = true
      setBadName('')
    }
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
    //contact
    if (contact == '') {
      validContact = false
      setBadContact('Please Enter the contact')
    } else if (contact != '' && contact.length < 10) {
      validContact = false
      setBadContact("Please Enter Valid Contact")
    } else if (contact != '' && contact.length >= 10 && !contact.toString().match(contactRegex)) {
      validContact = false
      setBadContact("Please Enter Valid Contact")
    } else if (contact != '' && contact.length >= 10 && contact.toString().match(contactRegex)) {
      validContact = true
      setBadContact('')
    }
    //Company
    if (companyName == '') {
      validCompany = false
      setBadCompanyName('Please Enter Company Name')
    } else if (companyName != '') {
      validCompany = true
      setBadCompanyName('')
    }
    //Address
    if (address == '') {
      validAddress = false
      setBadAddress('Please Enter Valid Address')
    } else if (address != '') {
      validAddress = true
      setBadAddress('')
    }
    //Password
    if (password == '') {
      validPass = false
      setBadPassword('Please Enter Password')
    } else if (password != '' && password.length<6) {
      validPass = false
      setBadPassword('Please enter minimum 6 characters')
    }else if(password !='' && password.length>=6){
      validPass = true
      setBadPassword('')
    }
    return validName && validEmail && validContact && validCompany && validAddress && validPass
  }
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assetsts/images/products.png')} style={styles.logo} />
        <Text style={styles.title}>Create Account</Text>
        <ScrollView height={'50%'}>
          <CustomTextInput
            title={'Name'}
            value={name}
            onChangeText={txt => {
              setName(txt)
            }}
            placeholder={'Anurag Singh'}
            bad={badName != '' ? true : false}
          />
          {badName != '' && <Text style={styles.errorMsg}>{badName}</Text>}
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
            title={'Contact No'}
            value={contact}
            onChangeText={txt => {
              setContact(txt)
            }}
            placeholder={'913344****'}
            bad={badContact != '' ? true : false}
          />
          {badContact != '' && <Text style={styles.errorMsg}>{badContact}</Text>}
          <CustomTextInput
            title={'Company'}
            value={companyName}
            onChangeText={txt => {
              setCompanyName(txt)
            }}
            placeholder={'Infosys'}
            bad={badCompanyName !='' ? true : false}
          />
          {badCompanyName != '' && <Text style={styles.errorMsg}>{badCompanyName}</Text>}
          <CustomTextInput
            title={'Address'}
            value={address}
            onChangeText={txt => {
              setAddress(txt)
            }}
            placeholder={'Gurgaon'}
            bad={badAddress != '' ? true : false}
          />
          {badAddress != '' && <Text style={styles.errorMsg}>{badAddress}</Text>}
          <CustomTextInput
            title={'Password'}
            value={password}
            onChangeText={txt => {
              setPassword(txt)
            }}
            placeholder={'********'}
            bad={badPassword !='' ?true : false}
          />
           {badPassword != '' && <Text style={styles.errorMsg}>{badPassword}</Text>}
        </ScrollView>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <TouchableOpacity style={styles.btn} onPress={() => {
          if (validate()) {
          Alert.alert('Ready to send data on Server')
          }
        }} >
          <Text style={styles.title2}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn1}>
          <Text style={styles.title1}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpForCompany

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
