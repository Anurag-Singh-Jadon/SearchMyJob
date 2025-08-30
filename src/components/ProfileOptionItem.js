import { StyleSheet, Text, TouchableOpacity, Image,View} from 'react-native'
import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'


const ProfileOptionItem = ({ title, icon, onClick }) => {
    return (
        <TouchableOpacity style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: moderateScale(20) }} onPress={()=>{
            onClick()
        }}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={icon} style={{ width: scale(20), height: scale(20) }} />
                <Text style={{marginLeft: moderateScale(15),fontSize:moderateScale(15)}}>{title}</Text>
            </View>
            <Image source={require('../assetsts/images/edit.png')} style={{ width: scale(20), height: scale(20) }} />
        </TouchableOpacity>
    )
}

export default ProfileOptionItem

const styles = StyleSheet.create({

})