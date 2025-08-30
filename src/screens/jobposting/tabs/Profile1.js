import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ProfileOptionItem from '../../../components/ProfileOptionItem'

const Profile1 = ({ onJobsClick }) => {
  const [name, setName] = useState('')
  const [jobs, setJobs] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  useEffect(() => {
    getData()
  }, [isFocused])
  const getData = async () => {
    setName(await AsyncStorage.getItem("NAME"))
    setJobs(await AsyncStorage.getItem("JOBS"))
    let imgs = await AsyncStorage.getItem("PROFILE_IMAGE")
    if (imgs != null) {
      setProfileImg(imgs)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SearchMyJob</Text>
      <TouchableOpacity>
        {profileImg != '' ? (<Image source={{ uri: profileImg }} style={styles.profileImg} />
        ): (<Image source={require('../../../assetsts/images/products.png')} style={styles.profileImg} />)}
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.changeProfilePic} onPress={() => navigation.navigate('UpdateProfileForCompany')}>Update Profile </Text>
      <Text style={styles.changeProfilePic} onPress={() => {
        navigation.navigate('ChangeProfilepicForCompany')
      }}>Change Profile Picture</Text>
      <View style={styles.optionArea}>
        <ProfileOptionItem icon={require('../../../assetsts/images/products.png')} title={`My Jobs (${jobs})`} onClick={() => {
          onJobsClick()
        }} />
        <ProfileOptionItem icon={require('../../../assetsts/images/products.png')} title={'Contact Us'} onClick={() => {
          onJobsClick()
        }} />
        <ProfileOptionItem icon={require('../../../assetsts/images/products.png')} title={'App Theme'} onClick={() => {
          onJobsClick()
        }} />
        <ProfileOptionItem icon={require('../../../assetsts/images/products.png')} title={'Logout'} onClick={() => {
          onJobsClick()
        }} />
      </View>
    </View>
  )
}

export default Profile1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },
  heading: {
    fontSize: moderateScale(30),
    fontWeight: '600',
    color: TEXT_COLOR,
    marginLeft: moderateScale(20),
    marginTop: moderateScale(25)
  },
  profileImg: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    alignSelf: 'center',
    marginTop: moderateScale(20)
  },
  changeProfilePic: {
    textDecorationLine: "underline",
    marginTop: moderateScale(10),
    alignSelf: 'center',
    color: TEXT_COLOR,
    fontSize: moderateScale(16)
  },
  name: {
    fontSize: moderateScale(25),
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: moderateScale(10)
  },
  optionArea: {
    marginTop: moderateVerticalScale(70)
  }
})