import React from 'react'
import {StyleSheet,View} from 'react-native'
import { Tabs } from 'expo-router'


const _layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarShowLabel: true,
        headerShown:true,
    }}>
        <Tabs.Screen name='home'/>
    </Tabs>
  )
}

export default _layout