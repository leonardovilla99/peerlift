import React from 'react'
import {StyleSheet,View} from 'react-native'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'

import { FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'


const _layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: Colors.yellow, 
        tabBarInactiveTintColor: Colors.almostWhite,
        tabBarShowLabel: false,
        headerShown:false,
        tabBarStyle:{
            shadowOpacity: 0,
            borderWidth:0,
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: Colors.superBlack
        },
    }}>
        <Tabs.Screen name='text' options={{
            tabBarIcon: ({color,size}) => 
                <MaterialCommunityIcons name='message-reply' color={color} size={size}/>
        }}/>
        <Tabs.Screen name='home' options={{
            tabBarIcon: ({color,size}) => 
                <FontAwesome5 name='car-side' color={color} size={size}/>
        }}/>
        <Tabs.Screen name='account' options={{
            tabBarIcon: ({color,size}) => 
                <MaterialCommunityIcons name='account' color={color} size={size}/>
        }}/>
    </Tabs>
  )
}

export default _layout