import { StyleSheet, Text, View, Image, TouchableOpacity,FlatList} from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'

const CustomDrawer = () => {
    const data1 = [
     {title:"Rate us",icon:require('../../assetsts/images/products.png')},
     {title:"Theme",icon:require('../../assetsts/images/products.png')}
    ]
    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Image source={require('../../assetsts/images/products.png')} style={styles.profile} />
                <View>
                    <Text style={styles.heading}>Build Your Profile</Text>
                    <Text style={styles.subHeading}>Job Opportunity waiting for you at SearchMyJob</Text>
                </View>
            </View>
            <View style={styles.btnsView}>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={[styles.btnText,{color:BG_COLOR}]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpBtn}>
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator}>

            </View>
            <FlatList 
            data={data1}
            contentContainerStyle={{marginTop:moderateScale(50)}}
            renderItem={({item,index})=>{
                return(
                    <TouchableOpacity style={styles.menuItem}>
                      <View style={styles.menuItemLeftView}>
                       <Image source={item.icon} style={styles.menuItemIcon}/>
                       <Text style={styles.heading}>{item.title}</Text>
                      </View>
                      <Image source={require('../../assetsts/images/products.png')} style={styles.menuItemIcon}/>
                    </TouchableOpacity>
                )
            }}/>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        width: scale(50),
        height: scale(50),
        marginLeft: moderateScale(10)
    },
    topView: {
        flexDirection: 'row',
        marginTop: moderateScale(40)
    },
    heading: {
        fontSize: scale(18),
        width: '70%',
        fontWeight: '700',
        marginLeft: moderateScale(10)
    },
    subHeading: {
        fontSize: moderateScale(12),
        width: '60%',
        marginLeft: moderateScale(10),
        marginTop: moderateScale(2)
    },
    btnsView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        marginTop: moderateVerticalScale(20)
    },
    loginBtn: {
        width: '40%',
        height: verticalScale(30),
        backgroundColor: TEXT_COLOR,
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpBtn: {
        width: '40%',
        height: verticalScale(30),
        borderWidth: 1,
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
      fontWeight:'500',
      fontSize:moderateScale(15)
    },
    separator:{
        width:'90%',
        height:verticalScale(0.5),
        backgroundColor:'#9e9e9e',
        alignSelf:'center',
        marginTop:moderateVerticalScale(20),
        opacity:0.5
    },
    menuItem:{
        width:'90%',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:verticalScale(50)
    },
    menuItemLeftView:{
    flexDirection:'row',
    alignItems:'center', 
    },
    menuItemIcon:{
        width:scale(24),
        height:scale(24),  
    }
})