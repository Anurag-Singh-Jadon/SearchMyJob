import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoLoginComponent from '../../../components/NoLoginComponent'
import { BG_COLOR } from '../../../utils/Colors'
const Applies = () => {
  return (
    <View style={styles.container}>
    <NoLoginComponent desc={'track all your jobs which you applied but for that you need to create account'}
     heading={"One place to track all your application"}/>
    </View>
  )
}

export default Applies

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_COLOR
  }
})