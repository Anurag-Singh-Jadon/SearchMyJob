import { View, Text } from 'react-native'
import React from 'react'
import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from '../screens/jobSearching/Main'
const STACK = createNativeStackNavigator()
const JobSearchingNavigator = () => {
  return (
    <STACK.Navigator>
      <STACK.Screen name='Main' component={Main} options={{ headerShown: false }} />
    </STACK.Navigator>
  )
}

export default JobSearchingNavigator