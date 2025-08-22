import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BG_COLOR, TEXT_COLOR, TXT_COLOR } from '../../utils/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const splash = () => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SelectUser')
    }, 3000)
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require('../../assetsts/images/products.png')} style={styles.logo} />
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
    height: verticalScale(100)
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

