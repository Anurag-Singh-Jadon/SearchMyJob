import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import CustomTextInput from '../../components/CustomTextInput'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginForCompany = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [badEmail, setBadEmail] = useState('')
  const [password, setPassword] = useState('')
  const [badPassword, setBadPassword] = useState('')
  const [loading, setLoading] = useState(false)
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
  // const loginUser = async () => {
  //   console.log('Checking');
  //   setLoading(true);

  //   try {
  //     // Await the result of the Firestore query.
  //     // The code will pause here until the data is fetched or an error occurs.
  //     const querySnapshot = await firestore().collection("job_posters").where("email", "==", email).get();
  // //     const q = query(collection(db,'job_posters'),where("email", "==", email));
  // //     const querySnapshot = await getDocs(q);
  // //     querySnapshot.forEach(doc => {
  // //   console.log('Data mil raha hai',doc);
  // // });
  //     console.log('Data has arrived:', querySnapshot);
  //     setLoading(false);
  //     console.log(querySnapshot.docs);
  //   } catch (error) {
  //     // If any error occurs in the `try` block, it will be caught here.
  //     console.log('An error occurred');
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  const loginUser = () => {
    setLoading(true);
    firestore().collection('job_posters').where('email', '==', email).get().then(data => {
      setLoading(false)
      console.log(data.docs)
      if (data.docs.length > 0) {
        data.docs.forEach(item => {
          if (item._data.password == password) {
            setBadEmail("")
            setBadPassword("")
            goToNextScreen(item.id, item._data.email, item._data.name)
          } else {
            setBadPassword("Wrong Password")
          }
        })

      } else {
        setBadEmail("No User Exists with this Email")
      }
    }).catch(error => {
      setLoading(false)
      console.log(error)
    })
  }

  const goToNextScreen = async (id, email, name) => {
    await AsyncStorage.setItem("NAME", name)
    await AsyncStorage.setItem("EMAIL", email)
    await AsyncStorage.setItem("USER_ID", id)
    await AsyncStorage.setItem("USER_TYPE", "company")
      navigation.navigate('DashboardForCompany')
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
      <TouchableOpacity style={styles.btn} onPress={() => {
        if (validate()) {
          // Alert.alert('Ready to send data on Server')
          loginUser()
        }
      }}>
        <Text style={styles.title2}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpForCompany')} style={styles.btn1}>
        <Text style={styles.title1}>Create Account</Text>
      </TouchableOpacity>
      <Loader visible={loading} />
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

