import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR } from '../../../utils/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomTextInput from '../../../components/CustomTextInput'
import CustomDropdown from '../../../components/CustomDropDown'
import CustomSolidButton from '../../../components/CustomSolidButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import { profiles } from '../../../utils/Profiles'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../../components/Loader'
const EditJob = () => {
  const route = useRoute()
  console.log('Route',route)
  const navigation = useNavigation()
  const [jobTitle, setJobTitle] = useState(route.params.data.jobTitle)
  const [jobDesc, setJobDesc] = useState(route.params.data.jobDesc)
  const [experience, setExperience] = useState(route.params.data.experience)
  const [packagee, setPackagee] = useState(route.params.data.packagee)
  const [company, setCompany] = useState(route.params.data.company)
  const [openCategoryModal, setCategoryModal] = useState(false)
  const [openSkillsModal, setSkillModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Select Category')
  const [selectedSkill, setSelectedSkill] = useState('Select Skill')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
   profiles.map((item,index)=>{
    if(item.category ==route.params.data.category)
        setSelectedCategory(index)
        profiles[index].keywords.map((x,y)=>{
           
            if(x[0]==route.params.data.skill){
                 console.log('x---',x)
                setSelectedSkill(x[0])
            }
        })
   })
  },[])

  const EditJob = async () => {
    let id = await AsyncStorage.getItem("USER_ID")
    let name = await AsyncStorage.getItem("NAME")
    setLoading(true);
    firestore().collection("jobs").doc(route.params.data.id).update({
      postedBy: id,
      posterName: name,
      jobTitle: jobTitle,
      jobDesc,
      experience, packagee,
      company, skill: selectedSkill, category: profiles[selectedCategory].category
    })
      .then(() => {
        setLoading(false)
        navigation.goBack()
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assetsts/images/remove.png')} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Job</Text>
      </View>
      <CustomTextInput
        title={'Job title'}
        value={jobTitle}
        onChangeText={txt => {
          setJobTitle(txt)
        }}
        placeholder={'ex: software developer'}

      />
      <CustomTextInput
        title={'Job Description'}
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt)
        }}
        placeholder={'ex: this is software developer job'}

      />
      <CustomDropdown
        title={'Category'}
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt)
        }}
        placeholder={selectedCategory == 'Select Category' ? 'Select Category' : profiles[selectedCategory].category}
        onClick1={() => {
          setCategoryModal(true)
        }}
      />
      <CustomDropdown
        title={'Skills'}
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt)
        }}
        placeholder={selectedSkill}
        onClick1={() => {
          setSkillModal(true)
        }}
      />
      <CustomTextInput
        title={'Experience'}
        value={experience}
        onChangeText={txt => {
          setExperience(txt)
        }}
        keyboardType={'number-pad'}
        placeholder={'ex: required experience is 5 years'}
      />
      <CustomTextInput
        title={'Package'}
        value={packagee}
        onChangeText={txt => {
          setPackagee(txt)
        }}
        keyboardType={'number-pad'}
        placeholder={'ex: 10LPA'}

      />
      <CustomTextInput
        title={'Company'}
        value={company}
        onChangeText={txt => {
          setCompany(txt)
        }}
        placeholder={'ex: Google'}

      />

      <CustomSolidButton title={'Edit Job'} onClick={() => {
        EditJob()
      }} />
      <Modal visible={openCategoryModal} transparent style={{ flex: 1 }}>
        <View style={styles.modalMainView}>
          <View style={styles.listingView}>
            <Text style={[styles.title, { marginTop: moderateScale(20) }]}>Select Category</Text>
            <View style={{ height: '85%' }}>
              <FlatList
                data={profiles}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity style={styles.profileItem} onPress={() => {
                      setSelectedCategory(index)
                      setCategoryModal(false)
                    }}>
                      <Text>{item.category}</Text>
                    </TouchableOpacity>
                  )
                }} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={openSkillsModal} transparent style={{ flex: 1 }}>
        <View style={styles.modalMainView}>
          <View style={styles.listingView}>
            <Text style={[styles.title, { marginTop: moderateScale(20) }]}>Select Skills</Text>
            <View style={{ height: '85%' }}>
              <FlatList
                data={selectedCategory == 'Select Category'
                  ? profiles[0].keywords
                  : profiles[selectedCategory].keywords
                }
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity style={styles.profileItem} onPress={() => {
                      setSelectedSkill(item[0])
                      setSkillModal(false)
                    }}>
                      <Text>{item[0]}</Text>
                    </TouchableOpacity>
                  )
                }} />
            </View>
          </View>
        </View>
      </Modal>
      <Loader visible={loading}/>
    </View>
  )
}

export default EditJob

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },
  header: {
    width: '100%',
    height: verticalScale(45),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20)
  },
  back: {
    width: scale(20),
    height: scale(20)
  },
  title: {
    fontSize: moderateScale(20),
    marginLeft: moderateScale(15),
    fontWeight: '600'
  },
  modalMainView: {
    backgroundColor: 'rgba(0,0,0,.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listingView: {
    width: '90%',
    height: '80%',
    borderRadius: moderateScale(10),
    backgroundColor: BG_COLOR
  },
  profileItem: {
    width: '90%',
    height: verticalScale(40),
    justifyContent: "center",
    paddingLeft: moderateScale(20),
    borderBottomWidth: 0.4,
    alignSelf: 'center'
  }
})