import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BG_COLOR, TEXT_COLOR, TXT_COLOR } from '../../utils/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const splash = () => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 3000)
  }, []);
  const getData=async()=>{
   let type = await AsyncStorage.getItem("USER_TYPE")
   if(type != null){
    if(type == 'company'){
    navigation.navigate('DashboardForCompany')
    }else{
      navigation.navigate('JobSearchingNavigator')
    }
   }else{
    navigation.navigate('SelectUser')
   }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assetsts/images/job-seeker.png')} style={styles.logo} />
      <Text style={styles.name}>Search My Job</Text>
      <Text style={styles.slogan}>Post & Find Jobs in One Tap</Text>
    </View>
  )
}
export default splash

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG_COLOR
  },
  logo: {
    width: scale(100),
    height: verticalScale(100),
    resizeMode: 'contain'
  },
  name: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginTop: verticalScale(20),
    color: TEXT_COLOR
  },
  slogan: {
    fontSize: moderateScale(16),
    fontStyle: 'italic',
    position: 'absolute',
    bottom: moderateScale(80),
    color: TXT_COLOR,
    textDecorationLine: 'underline',
    fontWeight: 600
  }
}

