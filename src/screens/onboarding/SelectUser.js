import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'


const SelectUser = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Image source={require('../../assetsts/images/job-seeker.png')} style={styles.logo}/>
            <Text style={styles.title}>What are you looking for?</Text>
            <TouchableOpacity style={styles.wantToHire} onPress={() =>{
                navigation.navigate("JobPostingNavigator")
            }}>
                <Text style={styles.btnTxt1}>Want to Hire Candidate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wantToJob} onPress={() =>{
                navigation.navigate("JobSearchingNavigator")
            }}>
                <Text style={styles.btnTxt2}>Want to Get Job</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_COLOR
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: TEXT_COLOR
    },
    wantToHire: {
        width: '80%',
        height: moderateScale(50),
        backgroundColor: TEXT_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        marginTop: moderateScale(20)
    },
    wantToJob: {
        width: '80%',
        height: moderateScale(50),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        marginTop: moderateScale(20)
    },
    btnTxt1: {
        color: BG_COLOR,
        fontSize: moderateScale(16),
        fontWeight: '500'
    },
    btnTxt2: {
        color: TEXT_COLOR,
        fontSize: moderateScale(16),
        fontWeight: '500'
    },
    logo:{
        width:scale(100),
        height:scale(100),
        marginBottom:moderateScale(50)
    }
})