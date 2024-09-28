import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, StatusBar, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

const home = () => {

    const {signOut, isSignedIn} = useAuth();
    
    const onLogin = () => {
        router.push('/(modal)/login')
    }
    
    return (
        <View>
            {!isSignedIn && 
                <Button title='Login' onPress={() => {onLogin()}}/>
                }
                {isSignedIn && 
                <Button title='Logout' onPress={() => {signOut()}} color={'red'}/>
                }
        </View>
    )
}

export default home