import React from 'react'
import {StyleSheet,View} from 'react-native'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'


const _layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: Colors.superBlack, 
        tabBarInactiveTintColor: Colors.almostWhite,
        tabBarShowLabel: false,
        headerShown:false,
        tabBarStyle:{
            shadowOffset: { width: 0, height: -5 },
            shadowColor: '#000',
            shadowOpacity: 0.10,
            borderWidth:0,
        },
    }}>
        <Tabs.Screen name='home'/>
    </Tabs>
  )
}

export default _layout