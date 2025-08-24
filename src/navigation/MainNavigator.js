import { Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import JobPostingNavigator from './JobPostingNavigator'
import JobSearchingNavigator from './JobSearchingNavigator'
import SelectUser from '../screens/onboarding/SelectUser'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import splash from '../screens/onboarding/Splash'
import DashboardForCompany from '../screens/jobposting/DashboardForCompany'
const STACK = createNativeStackNavigator()
const MainNavigator = () => {
  return (
    <NavigationContainer>
    <STACK.Navigator screenOptions={{ headerShown: false }}initialRouteName='splash'>
        <STACK.Screen name='splash' component={splash} options={{ headerShown: false }} />
         <STACK.Screen name='SelectUser' component={SelectUser} options={{ headerShown: false }} />
        <STACK.Screen name='JobPostingNavigator' component={JobPostingNavigator} options={{ headerShown: false }} />
        <STACK.Screen name='JobSearchingNavigator' component={JobSearchingNavigator} options={{ headerShown: false }} />
        <STACK.Screen name='DashboardForCompany' component={DashboardForCompany} options={{ headerShown: false }} />
      </STACK.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator

