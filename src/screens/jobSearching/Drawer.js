import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../utils/Colors'
import { scale, verticalScale } from 'react-native-size-matters'
import Home from '../jobSearching/tabs/Home'
import Applies from '../jobSearching/tabs/Applies'
import Inbox from '../jobSearching/tabs/Inbox'
import Profile from '../jobSearching/tabs/Profile'
const Drawer = () => {
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <View style={styles.container}>
            {
                currentTab == 0 ? (
                    <Home />
                ) : currentTab == 1 ? (
                    <Applies />
                ) : currentTab == 2 ? (
                    <Inbox />)
                    : (
                        <Profile />
                    )
            }
            <View style={styles.bottomNavView}>
                <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(0)}>
                    <Image source={currentTab == 0 ? require('../../assetsts/images/home-solid.png') :require('../../assetsts/images/home.png')} style={styles.tabIcon} />
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(1)}>
                    <Image source={currentTab == 1 ? require('../../assetsts/images/message.png') :require('../../assetsts/images/send.png')} style={styles.tabIcon} />
                    <Text>Applies</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(2)}>
                    <Image source={currentTab == 2 ? require('../../assetsts/images/chat.png') :require('../../assetsts/images/messenger.png')} style={styles.tabIcon} />
                    <Text>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(3)}>
                    <Image source={currentTab == 2 ? require('../../assetsts/images/user.png') :require('../../assetsts/images/user-solid.png')} style={styles.tabIcon} />
                    <Text>Profile</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Drawer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    bottomNavView: {
        width: '100%',
        height: verticalScale(85),
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.3,
        borderTopColor: '#9e9e9e'
    },
    tab: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabIcon: {
        width: scale(24),
        height: scale(24),
    }
})
