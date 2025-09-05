import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import CustomSolidButton from '../../../components/CustomSolidButton'


const Home = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.searchBox}>
        <Image source={require('../../../assetsts/images/products.png')} style={styles.icon} />
        <Text style={styles.placeHolder}>Search Job here...</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>{"You are one step away from getting a good job"}</Text>
      <View style={styles.notes}>
        <Image source={require('../../../assetsts/images/products.png')} style={styles.icon} />
        <Text style={styles.note}>{"Get Jobs after creating account"}</Text>
      </View>
      <View style={styles.notes}>
        <Image source={require('../../../assetsts/images/products.png')} style={styles.icon} />
        <Text style={styles.note}>{"Chat with recruiter directly"}</Text>
      </View>
      <View style={styles.btnsView}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={[styles.btnText, { color: BG_COLOR }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpBtn}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.jobSearchCard}>
        <Image source={require('../../../assetsts/images/search.gif')} style={styles.gif} />
        <TextInput style={styles.input} placeholder='Enter Job Title'/>
        <TextInput style={styles.input} placeholder='Enter Job Title'/>
         <CustomSolidButton title={'Search Jobs'} onClick={()=>{
          
         }}/>
      </View>
     
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },
  searchBox: {
    width: '90%',
    height: verticalScale(45),
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: moderateScale(20),
    borderRadius: moderateScale(30),
    borderColor: '#9e9e9e',
    flexDirection: 'row',
    paddingLeft: moderateScale(15),
    alignItems: 'center'

  },
  icon: {
    width: scale(16),
    height: scale(16),
    tintColor: '#9e9e9e'
  },
  placeHolder: {
    marginLeft: moderateScale(10),
    color: '#9e9e9e'
  },
  heading: {
    color: TEXT_COLOR,
    fontWeight: '700',
    fontSize: moderateScale(22),
    alignSelf: 'center',
    width: '90%',
    marginTop: moderateScale(20)
  },
  notes: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScale(4)
  },
  note: {
    marginLeft: moderateScale(10),
  },
  btnsView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    marginTop: moderateVerticalScale(20)
  },
  loginBtn: {
    width: '40%',
    height: verticalScale(30),
    backgroundColor: TEXT_COLOR,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpBtn: {
    width: '40%',
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontWeight: '500',
    fontSize: moderateScale(15)
  },
  jobSearchCard:{
    width:'90%',
    paddingBottom:moderateScale(20),
    alignSelf:'center',
    marginTop:moderateScale(50),
    backgroundColor:'#f2f2f2',
    borderRadius:moderateScale(10),
   
  },
  gif:{
   width:moderateScale(80),
   height:moderateScale(80),
   marginLeft:moderateScale(130),
   marginTop:moderateVerticalScale(10)
  },
  input:{
    width:'90%',
    height:verticalScale(35),
    borderWidth:1,
    alignSelf:'center',
    borderRadius:moderateScale(15),
    paddingLeft:moderateScale(10),
    marginTop:moderateScale(10)
  }
})