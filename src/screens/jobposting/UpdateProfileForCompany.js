

import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaViewBase, Alert } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { BG_COLOR, RED_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import CustomTextInput from '../../components/CustomTextInput'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../components/Loader'
import auth from '@react-native-firebase/auth'; // Import the Auth module
import firestore from '@react-native-firebase/firestore';
import CustomHeader from '../../components/CustomHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
const UpdateProfileForCompany = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [badName, setBadName] = useState('')
    const [email, setEmail] = useState('')
    const [badEmail, setBadEmail] = useState('')
    const [contact, setContact] = useState('')
    const [badContact, setBadContact] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [badCompanyName, setBadCompanyName] = useState('')
    const [address, setAddress] = useState('')
    const [badAddress, setBadAddress] = useState('')
    const [password, setPassword] = useState('')
    const [badPassword, setBadPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [accountCreated, setAccountCreated] = useState(false)
    const validate = () => {
        let nameRegex = /^[A-Za-z]+$/
        let emailRegex = /@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        let contactRegex = /^\d+$/
        let validEmail = true
        let validName = true
        let validContact = true
        let validCompany = true
        let validAddress = true

        //name
        if (name == '') {
            validName = false
            setBadName('Please Enter the Name')
        } else if (name != '' && name.length < 3) {
            validName = false
            setBadName('Please Enter Valid Name')
        } else if (name != '' && name.length >= 3 && !name.toString().match(nameRegex)) {
            validName = false
            setBadName('Please Enter Valid Name')
        } else if (name != '' && name.length > 3 && name.toString().match(nameRegex)) {
            validName = true
            setBadName('')
        }
        //email
        if (email == '') {
            validEmail = false,
                setBadEmail("Please Enter Email")
        } else if (email != '' && !email.toString().match(emailRegex)) {
            validEmail = false
            setBadEmail("Please Enter Valid Email")
        } else if (email != '' && email.toString().match(emailRegex)) {
            validEmail = true
            setBadEmail("")
        }
        //contact
        if (contact == '') {
            validContact = false
            setBadContact('Please Enter the contact')
        } else if (contact != '' && contact.length < 10) {
            validContact = false
            setBadContact("Please Enter Valid Contact")
        } else if (contact != '' && contact.length >= 10 && !contact.toString().match(contactRegex)) {
            validContact = false
            setBadContact("Please Enter Valid Contact")
        } else if (contact != '' && contact.length >= 10 && contact.toString().match(contactRegex)) {
            validContact = true
            setBadContact('')
        }
        //Company
        if (companyName == '') {
            validCompany = false
            setBadCompanyName('Please Enter Company Name')
        } else if (companyName != '') {
            validCompany = true
            setBadCompanyName('')
        }
        //Address
        if (address == '') {
            validAddress = false
            setBadAddress('Please Enter Valid Address')
        } else if (address != '') {
            validAddress = true
            setBadAddress('')
        }

        return validName && validEmail && validContact && validCompany && validAddress
    }

    const updateUser = async () => {
        const id = await AsyncStorage.getItem("USER_ID")
        setLoading(true);
        firestore().collection("job_posters").doc(id).update({
            name,
            email,
            contact,
            address,
            companyName,

        })
            .then(async() => {
                await AsyncStorage.setItem("NAME",name)
                navigation.goBack()
                // console.log('User registered successfully!');
            })
            .catch(error => {
                setLoading(false);
                console.error('Error adding user: ', error); // Use console.error for errors
            });
    };
    useEffect(()=>{
     getData()
    },[])
    const getData =async()=>{
    const anEmail = await AsyncStorage.getItem("EMAIL")
    firestore().collection("job_posters").where("email","==",anEmail)
    .get().then(res=>{
        res.docs.forEach(item=>{
            setName(item._data.name)
            setEmail(item._data.email)
            setCompanyName(item._data.companyName)
            setAddress(item._data.address)
            setContact(item._data.contact)
        })
    })
    }


    return (
        <View style={styles.container}>
            <CustomHeader title={'Edit Profile'} onBackPress={() =>
                navigation.goBack()
            } />
            <View>





                <CustomTextInput
                    title={'Name'}
                    value={name}
                    onChangeText={txt => {
                        setName(txt)
                    }}
                    placeholder={'Anurag Singh'}
                    bad={badName != '' ? true : false}
                />
                {badName != '' && <Text style={styles.errorMsg}>{badName}</Text>}
                <CustomTextInput
                    title={'Email'}
                    value={email}
                    onChangeText={txt => {
                        setEmail(txt)
                    }}
                    placeholder={'xyz@gmail.com'}
                    bad={badEmail != '' ? true : false}
                />
                {badEmail != '' && <Text style={styles.errorMsg}>{badEmail}</Text>}
                <CustomTextInput
                    title={'Contact No'}
                    value={contact}
                    onChangeText={txt => {
                        setContact(txt)
                    }}
                    placeholder={'913344****'}
                    bad={badContact != '' ? true : false}
                />
                {badContact != '' && <Text style={styles.errorMsg}>{badContact}</Text>}
                <CustomTextInput
                    title={'Company'}
                    value={companyName}
                    onChangeText={txt => {
                        setCompanyName(txt)
                    }}
                    placeholder={'Infosys'}
                    bad={badCompanyName != '' ? true : false}
                />
                {badCompanyName != '' && <Text style={styles.errorMsg}>{badCompanyName}</Text>}
                <CustomTextInput
                    title={'Address'}
                    value={address}
                    onChangeText={txt => {
                        setAddress(txt)
                    }}
                    placeholder={'Gurgaon'}
                    bad={badAddress != '' ? true : false}
                />
                {badAddress != '' && <Text style={styles.errorMsg}>{badAddress}</Text>}


                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    if (validate()) {
                        // Alert.alert('Ready to send data on Server')
                        updateUser()
                    }
                }} >
                    <Text style={styles.title2}>Update</Text>
                </TouchableOpacity>




            </View>

            <Loader visible={loading} />

        </View>
    )
}

export default UpdateProfileForCompany

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,

    },
    logo: {
        width: scale(80),
        height: scale(80),
        alignSelf: 'center',
        marginTop: moderateVerticalScale(40)
    },
    title: {
        fontSize: moderateScale(25),
        alignSelf: 'center',
        fontWeight: '600',
        marginTop: moderateVerticalScale(30),
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginRight: moderateScale(20),
        marginTop: moderateVerticalScale(10),
        fontWeight: '500',
        fontSize: moderateScale(15),
    },
    btn: {
        width: '90%',
        height: verticalScale(45),
        backgroundColor: TEXT_COLOR,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    title1: {
        color: TEXT_COLOR,
        fontWeight: '500',
        fontSize: moderateScale(16)
    },
    btn1: {
        width: '90%',
        height: verticalScale(45),
        borderColor: TEXT_COLOR,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    title2: {
        color: BG_COLOR,
        fontWeight: '500',
        fontSize: moderateScale(16)
    },
    errorMsg: {
        marginLeft: moderateScale(20),
        color: 'red'
    },
    doneView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }

})

