import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, FlatList,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../../utils/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomTextInput from '../../../components/CustomTextInput'
import CustomDropdown from '../../../components/CustomDropDown'
import CustomSolidButton from '../../../components/CustomSolidButton'
import { useNavigation } from '@react-navigation/native'
import { profiles } from '../../../utils/Profiles'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../../components/Loader'

const AddJob = () => {
  const navigation = useNavigation()
  const [jobTitle, setJobTitle] = useState('')
  const [badJobTitle, setBadJobTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [badJobDesc, setBadJobDesc] = useState('')
  const [experience, setExperience] = useState('')
  const [badExp, setBadExp] = useState('')
  const [packagee, setPackagee] = useState('')
  const [badpackage, setBadPackage] = useState('')
  const [company, setCompany] = useState('')
  const [badCompany, setBadCompany] = useState('')
  const [openCategoryModal, setCategoryModal] = useState(false)
  const [openSkillsModal, setSkillModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Select Category')
  const [badJobCategory, setBadJobCategory] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('Select Skill')
  const [badJobSkill, setBadJobSkill] = useState('')
  const [loading, setLoading] = useState(false)

  const postJob = async () => {
    // console.log('tst',profiles.category)
    let id = await AsyncStorage.getItem("USER_ID")
    let name = await AsyncStorage.getItem("NAME")
    setLoading(true);
    firestore().collection("jobs").add({
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

  const validate = () => {
    let validJobTitle = true
    let validJobDesc = true
    let validCategory = true
    let validSkill = true
    let validExp = true
    let validPackage = true
    let validCompany = true
    //JobTitle
    if (jobTitle == '') {
      validJobTitle = false
      setBadJobTitle('Please Enter Job Title')
    } else if (jobTitle != '') {
      validJobTitle = true
      setBadJobTitle('')
    }
    //Job description
    if (jobDesc == '') {
      validJobDesc = false
      setBadJobDesc('Please Enter Job Description')
    } else if (jobDesc != '' && jobDesc.length < 50) {
      validJobDesc = false
      setBadJobDesc('Please Enter Description minimum 50 character')
    } else if (jobDesc != '' && jobDesc.length >= 50) {
      validJobDesc = true
      setBadJobDesc('')
    }
    //Category
    if (selectedCategory == 'Select Category') {
      validCategory = false
      setBadJobCategory('Please Select Job Category')
    } else if (selectedCategory != 'Select Category') {
      validCategory = true
      setBadJobCategory('')
    }
    //Skill

    if (selectedSkill == 'Select Skill') {
      validSkill = false
      setBadJobSkill('Please Select Job Skill')
    } else if (selectedSkill != 'Select Skill') {
      validSkill = true
      setBadJobSkill('')
    }
    let expRegex = /^\d+$/
    //Experience
    if (experience == '') {
      validExp = false
      setBadExp('Please Enter the Experience')
    } else if (experience != '' && experience.length > 2) {
      validExp = false
      setBadExp('Please Enter valid Experience')
    } else if (experience != '' && experience.length < 3 && !experience.match(expRegex)) {
      validExp = false
      setBadExp('Please Enter valid Experience')
    } else if (experience != '' && experience.length < 3 && experience.match(expRegex)) {
      validExp = true
      setBadExp('')
    }
    //Package

    if (packagee == '') {
      validPackage = false
      setBadPackage('Please Enter the Package')
    } else if (packagee != '' && !packagee.match(expRegex)) {
      validPackage = false
      setBadPackage('Please Enter valid Salary')
    } else if (packagee != '' && packagee.match(expRegex)) {
      validPackage = true
      setBadPackage('')
    }
    //Company
    if (company == '') {
      validCompany = false
      setBadCompany('Please Enter the company')
    } else if (company != '') {
      validCompany = true
      setBadCompany('')
    }
    return validJobTitle && validJobDesc && validCategory && validCompany && validSkill && validExp && validPackage
  }
  return (
    <View style={styles.container}>
      <ScrollView height={'50%'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assetsts/images/remove.png')} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Post Job</Text>
      </View>
      <CustomTextInput
        title={'Job title'}
        value={jobTitle}
        onChangeText={txt => {
          setJobTitle(txt)
        }}
        placeholder={'ex: software developer'}
        bad={badJobTitle != '' ? true : false}
      />
      {badJobTitle != '' && <Text style={styles.errorMsg}>{badJobTitle}</Text>}
      <CustomTextInput
        title={'Job Description'}
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt)
        }}
        placeholder={'ex: this is software developer job'}
         bad={badJobDesc != '' ? true : false}
      />
      {badJobDesc != '' && <Text style={styles.errorMsg}>{badJobDesc}</Text>}
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
         bad={badJobCategory != '' ? true : false}
      />
      {badJobCategory != '' && <Text style={styles.errorMsg}>{badJobCategory}</Text>}
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
         bad={badJobSkill != '' ? true : false}
      />
      {badJobSkill != '' && <Text style={styles.errorMsg}>{badJobSkill}</Text>}
      <CustomTextInput
        title={'Experience'}
        value={experience}
        onChangeText={txt => {
          setExperience(txt)
        }}
        keyboardType={'number-pad'}
        placeholder={'ex: required experience is 5 years'}
         bad={badExp != '' ? true : false}
      />
      {badExp != '' && <Text style={styles.errorMsg}>{badExp}</Text>}
      <CustomTextInput
        title={'Package'}
        value={packagee}
        onChangeText={txt => {
          setPackagee(txt)
        }}
        keyboardType={'number-pad'}
        placeholder={'ex: 10LPA'}
         bad={badpackage != '' ? true : false}
      />
      {badpackage != '' && <Text style={styles.errorMsg}>{badpackage}</Text>}
      <CustomTextInput
        title={'Company'}
        value={company}
        onChangeText={txt => {
          setCompany(txt)
        }}
        placeholder={'ex: Google'}
         bad={badpackage != '' ? true : false}
      />
     {badCompany != '' && <Text style={styles.errorMsg}>{badCompany}</Text>}
      <CustomSolidButton title={'Post Job'} onClick={() => {
        if (validate()) {
          postJob()
        }
      }} />
      </ScrollView>
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
      <Loader visible={loading} />
    </View>
  )
}

export default AddJob

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
  },
   errorMsg: {
    marginLeft: moderateScale(20),
    color: 'red'
  },
})