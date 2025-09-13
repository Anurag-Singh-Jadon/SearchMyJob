import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'

const JobDetails = () => {
    const route = useRoute()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.params.data?.jobTitle}</Text>
            <View style={styles.detailsView}>
                <Text>{`Posted by: ${route.params.data.posterName}`}</Text>
            </View>
            <Text style={styles.desc}>{route.params.data?.jobDesc}</Text>
            <Text style={styles.subTitle}>{`Experience Required  ${route.params.data.experience}`}</Text>
            <Text style={styles.subTitle}>{`Skills Required     ${route.params.data.skill}`}</Text>
            <Text style={styles.subTitle}>{`Salary :                 ${route.params.data.packagee} LPA`}</Text>
            <Text style={styles.subTitle}>{`Category :            ${route.params.data.category} LPA`}</Text>
            <Text style={styles.subTitle}>{`Company :            ${route.params.data.company}`}</Text>
            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.saveBtn}>
                    <Image source={require('../../assetsts/images/star.png')} style={{ width: scale(12), height: scale(12), marginTop: moderateVerticalScale(5) }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.apply}>
                    <Text style={styles.btnText}>Apply Job</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default JobDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    title: {
        fontSize: moderateScale(30),
        fontWeight: '700',
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(30)
    },
    desc: {
        width: "90%",
        marginTop: moderateScale(20),
        fontSize: moderateScale(16),
        fontWeight: '500',
        alignSelf: 'center'
    },
    subTitle: {
        marginTop: moderateScale(20),
        fontWeight: '500',
        fontSize: moderateScale(16),
        marginLeft: moderateScale(20)
    },
    detailsView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(10)
    },
    bottomView: {
        width: "90%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: moderateScale(50)
    },
    saveBtn: {
        width: '25%',
        height: verticalScale(40),
        borderWidth: 0.5,
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    apply: {
        width: '70%',
        height: verticalScale(40),
        backgroundColor: TEXT_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10)
    },
    btnText: {
        color: BG_COLOR,
        fontSize: moderateScale(16),
    }
})