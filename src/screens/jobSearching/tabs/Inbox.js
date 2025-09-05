import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoLoginComponent from '../../../components/NoLoginComponent'
import { BG_COLOR } from '../../../utils/Colors'

const Inbox = () => {
  return (
     <View style={styles.container}>
    <NoLoginComponent desc={'Talk to any recruiter for getting a job recommendations from MNCs'}
     heading={"You can chat with recruiters of MNCs"}/>
    </View>
  )
}

export default Inbox

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_COLOR
  }
})