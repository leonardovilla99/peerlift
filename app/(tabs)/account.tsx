import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import styleGeneral from '@/constants/styleGeneral'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router'

const account = () => {
    const {signOut, isSignedIn} = useAuth();
    
    const onLogin = () => {
        router.push('/(modal)/login')
    }

    return (
        <ScrollView style={{backgroundColor: Colors.superBlack}}>
            <SafeAreaView style={[styleGeneral.safeContainer]}>
                <Text style={[styleGeneral.title, {marginTop:20}]}>Account.</Text>
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

export default account