import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginForCompany from '../screens/jobposting/LoginForCompany'
import SignUpForCompany from '../screens/jobposting/SignUpForCompany'
const STACK = createNativeStackNavigator()
const JobPostingNavigator = () => {
  return (
    <STACK.Navigator>
       <STACK.Screen name='LoginForCompany' component={LoginForCompany} options={{ headerShown: false }} />
       <STACK.Screen name='SignUpForCompany' component={SignUpForCompany} options={{ headerShown: false }} />
     
     
    </STACK.Navigator>
  )
}

export default JobPostingNavigator