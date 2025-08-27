import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR } from '../utils/Colors'

const CustomDropDown = ({ title, placeholder, bad,onClick1}) => {
    return (
        <TouchableOpacity style={[styles.input, { borderColor: bad ? 'red' : '#9e9e9e' }]} onPress={()=>{
            onClick1()
        }} >
            <Text style={[styles.title, { color: bad ? 'red' : 'black' }]}>{title}</Text>
            <Text style={{ color: '#9e9e9e' }}>{placeholder}</Text>
            <Image source={require('../assetsts/images/edit.png')} style={styles.icon} />
        </TouchableOpacity>
    )
}

export default CustomDropDown

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: verticalScale(43),
        borderWidth: 0.4,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20)

    },
    title: {
        alignSelf: 'flex-start',
        marginLeft: moderateScale(20),
        top: -moderateVerticalScale(10),
        position: 'absolute',
        backgroundColor: BG_COLOR,
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
    },
    icon: {
        width: scale(10),
        height: scale(10)
    }
})