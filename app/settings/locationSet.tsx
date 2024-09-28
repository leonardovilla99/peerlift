import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styleGeneral from '@/constants/styleGeneral'

import { getDatabase, ref, set, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig} from '@/firebase/firebase'
import { useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';

const post = () => {
    // Initialization
    const app = initializeApp(firebaseConfig);
    const database = getDatabase();

    // User
    const { user } = useUser();
    const userId = user?.id as string
    const userName = user?.firstName as string

    const [destination, setDestination] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    
    const PostDestination = () => {
        // Get a reference to the "posts" collection and use push to generate a unique post ID
        const userRef = ref(database, 'users/');
        const newUserRef = push(userRef);
        
        const data = { 
            'name' : userName,
            'latitude' : latitude,
            'longitude' : longitude,
            'destination' : destination,
        }

        set(ref(database, 'users/' + userId), data).then( () => {
            router.push('/(tabs)/home')
        } ).catch( (error) => {
        console.log(error);
        } );
    }

    return (
        <ScrollView style={{backgroundColor: Colors.superBlack}}>
            <SafeAreaView style={styleGeneral.container}>
                {user != null &&
                <>
                <View style={styleGeneral.safeContainer}>
                    <Text style={[styleGeneral.title, {textAlign:'center'}]}>One more thing.</Text>
                    <Text style={[styleGeneral.settingDesc, {marginBottom:10}]}>Before starting enter your college destination.</Text>
                    <TextInput placeholder='Destination' style={[styleGeneral.textField, {marginVertical:10, textAlign:'center'}]} value={destination} onChangeText={setDestination} placeholderTextColor={Colors.almostWhite}></TextInput>
                    <Text style={[styleGeneral.settingDesc, {marginBottom:10}]}>This destination can always be changed inside your account.</Text>
                </View>
                <View style={styleGeneral.safeContainer}>
                    <TouchableOpacity style={[styleGeneral.botton]} onPress={PostDestination}>
                        <Text style={[styleGeneral.bottonText]}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                </>
                }
                {user == null && 
                <>
                    <Text>Log in pls!</Text>
                </>
                }
            </SafeAreaView>
        </ScrollView>
    )
}

export default post