import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, StatusBar, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

const home = () => {

    useEffect(() => {
        // Set the status bar style
        StatusBar.setBarStyle('light-content'); // 'dark-content' for dark text on light background
      }, []);

    const {signOut, isSignedIn} = useAuth();
    
    const onLogin = () => {
        router.push('/(modal)/login')
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: Colors.superBlack}} bounces={false}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <SafeAreaView>
                <View>
                    {!isSignedIn && 
                        <Button title='Login' color={Colors.almostWhite} onPress={() => {onLogin()}}/>
                        }
                        {isSignedIn && 
                        <Button title='Logout' onPress={() => {signOut()}} color={'red'}/>
                        }
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default home