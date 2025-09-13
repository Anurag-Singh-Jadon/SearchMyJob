import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../utils/Colors'
import { scale, verticalScale } from 'react-native-size-matters'
import MyJobs from './tabs/MyJobs'
import SearchCandidates from './tabs/SearchCandidates'
import Chats from './tabs/Chats'
import Profile1 from './tabs/Profile1'
import { useNavigation } from '@react-navigation/native'
const DashboardForCompany = () => {
  const [selecteTab, setSelectedTab] = useState(0)
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {selecteTab == 0 ? <MyJobs /> : selecteTab == 1 ? <SearchCandidates /> : selecteTab == 2 ? <Chats /> : <Profile1 onJobsClick={() => {
        setSelectedTab(0)
      }} />}
      <View style={styles.bottomView}>
        <TouchableOpacity style={[styles.bottomTab, { borderTopWidth: selecteTab == 0 ? 3 : 0, borderTopColor: 'red' }]} onPress={() => { setSelectedTab(0) }}>
          <Image source={selecteTab == 0 ? require('../../assetsts/images/home-solid.png') : require('../../assetsts/images/home.png')} style={[styles.tabIcon, { tintColor: selecteTab === 0 ? 'red' : '#9e9e9e' }]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomTab, { borderTopWidth: selecteTab == 1 ? 3 : 0, borderTopColor: 'red' }]} onPress={() => { setSelectedTab(1) }}>
          <Image source={require('../../assetsts/images/camera.png')} style={[styles.tabIcon, { tintColor: selecteTab === 1 ? 'red' : '#9e9e9e' }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={() => {
          navigation.navigate('AddJob')
        }}>
          <Image source={selecteTab == 2 ? require('../../assetsts/images/add.png') : require('../../assetsts/images/add.png')} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomTab, { borderTopWidth: selecteTab == 2 ? 3 : 0, borderTopColor: 'red' }]} onPress={() => { setSelectedTab(2) }}>
          <Image source={require('../../assetsts/images/camera.png')} style={[styles.tabIcon, { tintColor: selecteTab === 2 ? 'red' : '#9e9e9e' }]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomTab, { borderTopWidth: selecteTab == 3 ? 3 : 0, borderTopColor: 'red' }]} onPress={() => { setSelectedTab(3) }}>
          <Image source={selecteTab == 4 ? require('../../assetsts/images/user.png') :require('../../assetsts/images/user-solid.png')} style={[styles.tabIcon, { tintColor: selecteTab === 3 ? 'red' : '#9e9e9e' }]} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DashboardForCompany

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },
  bottomView: {
    width: '100%',
    height: verticalScale(90),
    backgroundColor: BG_COLOR,
    shadowColor: 'rgba(0,0,0,.5)',
    shadowOpacity: 0.6,
    shadowOffset: { x: 0, y: 1 },
    position: 'absolute',
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    borderWidth: 0.5,
  },
  bottomTab: {
    width: "20%",
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: scale(24),
    height: scale(24),

  }
})