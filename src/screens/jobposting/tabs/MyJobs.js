import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { moderateScale } from 'react-native-size-matters'

const MyJobs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SearchMyJob</Text>
    </View>
  )
}

export default MyJobs

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_COLOR
  },
  heading:{
    fontSize:moderateScale(30),
    fontWeight:'600',
    color:TEXT_COLOR,
    marginLeft:moderateScale(20),
    marginTop:moderateScale(20)
  }
})