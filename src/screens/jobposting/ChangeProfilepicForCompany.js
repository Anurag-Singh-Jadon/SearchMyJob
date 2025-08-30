import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../utils/Colors'
import { moderateScale, scale } from 'react-native-size-matters'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import CustomBorderButton from '../../components/CustomBorderButton'
import CustomSolidButton from '../../components/CustomSolidButton'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../components/Loader'
const ChangeProfilepicForCompany = () => {
    const navigation = useNavigation()
    const [imageData, setImageData] = useState(null)
    const [loading, setLoading] = useState(false)
    const openGallery = async () => {
        const resp = await launchImageLibrary({ mediaType: 'photo' })
        if (!resp.didCancel) {
            setImageData(resp)
        }
    }
    const openCamera = async () => {
        const res = await launchCamera({ mediaType: 'photo' })
        if (!res.didCancel) {
            setImageData(res)
        }
    }
    const uploadPic = async () => {
        setLoading(true)
        const id = await AsyncStorage.getItem("USER_ID")
        const reference = storage().ref(imageData.assets[0].fileName);
        const pathToFile = imageData.assets[0].uri
        // uploads file
        await reference.putFile(pathToFile);
        const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
        firestore().collection("job_posters").doc(id).update({
            profileImage: url

        })
            .then(async () => {
                setLoading(false)
                await AsyncStorage.setItem("PROFILE_IMAGE", url)
                navigation.goBack()
                // console.log('User registered successfully!');
            })
            .catch(error => {
                setLoading(false);
                console.error('Error adding user: ', error); // Use console.error for errors
            });
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn}>
                <Image source={require('../../assetsts/images/remove.png')} style={styles.back} />
            </TouchableOpacity>
            {imageData == null ? (<Image source={require('../../assetsts/images/banner.jpg')} style={styles.profile} />)
                : (<Image source={{ uri: imageData.assets[0].uri }} style={styles.profile} />)}

            <CustomBorderButton title={'Pick Image from Galary'} onClick1={() => {
                openGallery()
            }} />
            {imageData != null && <CustomSolidButton title={'Upload Profile Pic'} onClick={() => {
                uploadPic()
            }} />}
            <Loader visible={loading}/>
        </View>
    )
}

export default ChangeProfilepicForCompany

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    back: {
        width: scale(24),
        height: scale(24)
    },
    backBtn: {
        marginLeft: moderateScale(20),
        marginTop: moderateScale(30)
    },
    profile: {
        width: scale(200),
        height: scale(200),
        borderRadius: scale(200),
        alignSelf: 'center',
    },
    pickBtn: {
        padding: moderateScale(10),
        borderWidth: 1,
        width: '60%',
        alignSelf: 'center',
        marginTop: moderateScale(30),
        textAlign: 'center',
        borderRadius: moderateScale(10)
    }
})