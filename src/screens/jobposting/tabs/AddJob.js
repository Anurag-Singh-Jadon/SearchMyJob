import { StyleSheet, Text, View,TouchableOpacity,Image, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../../utils/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomTextInput from '../../../components/CustomTextInput'
import CustomDropdown from '../../../components/CustomDropDown'
import CustomSolidButton from '../../../components/CustomSolidButton'
import { useNavigation } from '@react-navigation/native'
import profiles from '../../../utils/Profiles'
const AddJob = () => {
  const navigation = useNavigation()
  const [jobTitle,setJobTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [experience,setExperience] = useState('')
  const [packagee,setPackagee] = useState('')
  const [company,setCompany] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../../assetsts/images/remove.png')} style={styles.back}/>
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
        title={'Select Skills'}
        value={jobDesc}
        onChangeText={txt => {
          setJobDesc(txt)
        }}
       placeholder={'Select Skill'}
      onClick1={()=>{

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
      
<CustomSolidButton title={'Post Job'} onClick={()=> navigation.navigate('DashboardForCompany')}/>
      <Modal visible transparent style={{flex:1}}>
       <View style={styles.modalMainView}>
         <View style={styles.listingView}>
         <FlatList
         data={profiles}
         renderItem={({item,index})=>{
          return(
            <TouchableOpacity style={styles.profileItem}>
           <Text>{item.category}</Text>
            </TouchableOpacity>
          )
         }}/>
         </View>
       </View>
      </Modal>
    </View>
  )
}

export default AddJob

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_COLOR
  },
  header:{
   width:'100%',
   height:verticalScale(45),
   flexDirection:'row',
   alignItems:'center',
   paddingLeft:moderateScale(20)
  },
  back:{
    width:scale(20),
    height:scale(20)
  },
  title:{
    fontSize:moderateScale(20),
    marginLeft:moderateScale(15),
    fontWeight:'600'
  },
  modalMainView:{
  backgroundColor:'rgba(0,0,0,.3)',
  width:'100%',
  height:'100%',
  justifyContent:'center',
  alignItems:'center'
  },
  listingView:{
    width:'90%',
    height:'80%',
    borderRadius: moderateScale(10),
    backgroundColor:BG_COLOR
  },
  profileItem:{
    width:'90%',
    height:verticalScale(40),
    justifyContent:"center"
  }
})