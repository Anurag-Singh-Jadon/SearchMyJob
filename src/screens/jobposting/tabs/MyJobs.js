import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ShimmerPlaceholder, { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const shimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const MyJobs = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getJobs()
  }, [isFocused])
  const getJobs = async () => {
    setLoading(true)
    let id = await AsyncStorage.getItem("USER_ID")
    firestore().collection("jobs").where("postedBy", "==", id).get().then(async (data) => {
      // console.log('data',data._docs[0]._data)
      setLoading(false)
      console.log('data', data._docs)
      let temp = []
      data._docs.forEach(item => {
        temp.push({ ...item._data, id: item.id })
      })
      // console.log('TEMP..',temp)  
      await AsyncStorage.setItem("JOBS", temp.length + "")
      setJobs(temp)
    })
  }
  const deleteJob = (id) => {
    firestore().collection("jobs").doc(id).delete().then(() => {
      getJobs()
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SearchMyJob</Text>
      {loading &&(
        <View>
        <FlatList data={[1,2,3]} renderItem={({item,index})=>{
          return(
            <View style={styles.loaderView}>
        <ShimmerPlaceholder style={styles.loaderTitle} />
        <ShimmerPlaceholder style={styles.loaderTitle} />
        <ShimmerPlaceholder style={styles.loaderTitle} />
        <ShimmerPlaceholder style={styles.loaderTitle} />
        <ShimmerPlaceholder style={styles.loaderTitle} />
        <View style={styles.loaderButtonView}>
          <ShimmerPlaceholder style={styles.loaderBtn} />
          <ShimmerPlaceholder style={styles.loaderBtn} />
        </View>
      </View>
          )
        }}/>
      </View>
      )}
      
      {jobs.length > 0 ? (<FlatList data={jobs} renderItem={({ item, index }) => {
        return (
          <View style={styles.jobItem}>
            <Text style={styles.title}>{item.jobTitle}</Text>
            <Text style={styles.desc}>{item.jobDesc}</Text>
            <Text style={styles.salary}>{`${item.packagee} L/year`}</Text>
            <Text style={styles.salary}>{`${item.category} `}</Text>
            <Text style={styles.salary}>{item.skill}</Text>
            <View style={styles.bottomView}>
              <TouchableOpacity style={styles.editBtn} onPress={() => {
                navigation.navigate('EditJob', { data: item })
              }}>
                <Text>Edit Job </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => {
                deleteJob(item.id)
              }}>
                <Text style={{ color: 'red' }}>Delete Job</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }} />) : (<View style={styles.emptyView}>
        <Text style={styles.title}>Empty Jobs</Text>
      </View>)}
    </View>
  )
}

export default MyJobs

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
    marginTop: moderateScale(20)
  },
  jobItem: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(20),
    padding: moderateScale(15)
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600'
  },
  desc: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginTop: moderateScale(5)
  },
  salary: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    marginTop: moderateScale(5)
  },
  bottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: moderateScale(20),
    alignItems: 'center',
    marginTop: moderateScale(15)
  },
  editBtn: {
    width: '40%',
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteBtn: {
    width: '40%',
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loaderView: {
    width: '90%',
    height: verticalScale(150),
    alignSelf: 'center',
    marginTop: moderateScale(30)
  },
  loaderTitle: {
    width: '70%',
    height: verticalScale(20),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10)
  },
  loaderButtonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10)
  },
  loaderBtn: {
    width: '45%',
    height: verticalScale(30),
    borderRadius: moderateScale(10)
  }
})