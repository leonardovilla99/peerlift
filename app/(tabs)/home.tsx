import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, StatusBar, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import styleGeneral from '@/constants/styleGeneral';

const home = () => {

    useEffect(() => {
        // Set the status bar style
        StatusBar.setBarStyle('light-content'); // 'dark-content' for dark text on light background
      }, []);
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: Colors.superBlack}} bounces={false}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <SafeAreaView style={[styleGeneral.safeContainer]}>
                <Text style={[styleGeneral.title, {marginTop:20}]}>Meet your ride.</Text>
            </SafeAreaView>
        </ScrollView>
    )
}

export default home