import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoLoginComponent from '../../../components/NoLoginComponent'
import { BG_COLOR } from '../../../utils/Colors'

const Profile = () => {
  return (
     <View style={styles.container}>
    <NoLoginComponent desc={'Manage your Professional Profile/Portfolio for attracting many jobs'}
     heading={"Easy Manage for Profile/Portfolio"}/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_COLOR
  }
})