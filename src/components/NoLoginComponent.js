import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR } from '../utils/Colors'
import { moderateScale } from 'react-native-size-matters'
import CustomSolidButton from './CustomSolidButton'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NoLoginComponent = ({heading,desc}) => {
      const isFocused = useIsFocused();
      const [isLogin, setIsLogin] = useState(false)
        useEffect(() => {
            getData()
        }, [isFocused])
        const getData = async () => {
            const id = await AsyncStorage.getItem("USER_ID")
            const type = await AsyncStorage.getItem("USER_TYPE")
            if (id != null && type != null) {
                if (type == 'user') {
                    setIsLogin(true)
                }
            }
        }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading?heading : ""}</Text>
      <Text style={styles.desc}>{desc?desc : ""}</Text>
      {!isLogin && (<CustomSolidButton title={'Login'} onClick={()=>{

      }}/>)}
      <View style={styles.signUpView}>
      <Text style={styles.text1}>{"Don't have an account?"}</Text>
      <Text style={styles.text2}>{"Create Account"}</Text>
      </View>
    </View>
  )
}

export default NoLoginComponent

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BG_COLOR
    },heading:{
        fontSize:moderateScale(20),
        alignSelf:'center',
        width:'80%',
        marginTop:moderateScale(100),
        fontWeight:'700',
        textAlign:'center'
    },
    desc:{
        width:'90%',
        alignSelf:'center',
        fontSize:moderateScale(12),
        textAlign:'center',
        marginTop:moderateScale(10)
    },
    signUpView:{
        flexDirection:'row',
        alignSelf:'center',
        width:'90%',
        marginTop:moderateScale(50),
        justifyContent:'center'
    },
    text1:{
        fontWeight:'500',
        fontSize:moderateScale(16)
    },
    text2:{
        fontWeight:'700',
        fontSize:moderateScale(16),
        marginLeft:moderateScale(10)
    },
})