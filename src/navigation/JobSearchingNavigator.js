import { View, Text } from 'react-native'
import React from 'react'
import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from '../screens/jobSearching/Main'
import SearchJob from '../screens/jobSearching/SearchJob'
import JobDetails from '../screens/jobSearching/JobDetails'
import LoginForUser from '../screens/jobSearching/LoginForUser'
import SignupForUser from '../screens/jobSearching/SignupForUser'
const STACK = createNativeStackNavigator()
const JobSearchingNavigator = () => {
  return (
    <STACK.Navigator>
      <STACK.Screen name='Main' component={Main} options={{ headerShown: false }} />
      <STACK.Screen name='SearchJob' component={SearchJob} options={{ headerShown: true,title:'Search Jobs' }} />
      <STACK.Screen name='JobDetails' component={JobDetails} options={{ headerShown: true,title:'JobDetails' }} />
      <STACK.Screen name='LoginForUser' component={LoginForUser} options={{ headerShown: false,title:'' }} />
      <STACK.Screen name='SignupForUser' component={SignupForUser} options={{ headerShown:false,title:'' }} />
    </STACK.Navigator>
  )
}

export default JobSearchingNavigator