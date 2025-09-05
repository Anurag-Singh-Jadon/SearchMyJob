import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Drawer from './Drawer'
const DRAWER = createDrawerNavigator()
import CustomDrawer from './CustomDrawer'
import { TEXT_COLOR } from '../../utils/Colors'
const Main = () => {
    
  return (
   <DRAWER.Navigator screenOptions={{headerTintColor:TEXT_COLOR}} drawerContent={(props)=><CustomDrawer {...props}/>}>
    <DRAWER.Screen name='Drawer' component={Drawer} options={{title:'SearchMyJob'}}/>
   </DRAWER.Navigator>
  )
}

export default Main

const styles = StyleSheet.create({})