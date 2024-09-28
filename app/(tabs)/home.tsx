import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, StatusBar, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import Colors from '@/constants/Colors';
import styleGeneral from '@/constants/styleGeneral';

import { getDatabase, ref, set, push, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig} from '@/firebase/firebase'

const home = () => {
    const { userId } = useAuth();
    // Initialization
    const app = initializeApp(firebaseConfig);
    const database = getDatabase();

    // Create states
    const [existFirebase, setFirebase] = useState(false);

    useEffect(() => {
        // Set the status bar style
        StatusBar.setBarStyle('light-content'); // 'dark-content' for dark text on light background
    }, []);
    
    const userRef = ref(database, 'users/' + userId);
    get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
        setFirebase(true);
    }
    }).catch((error) => {
        console.error("Error checking or writing user data:", error);
    });
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: Colors.superBlack}} bounces={false}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <SafeAreaView style={[styleGeneral.safeContainer]}>
                <Text style={[styleGeneral.title, {marginTop:20}]}>Meet your ride.</Text>
                {!existFirebase && <>
                    <Text style={[styleGeneral.settingDesc, {textAlign:'left'}]}>Please add a destination to your travel <Link href="/settings/locationSet" style={{color:Colors.yellow}}>here!</Link></Text>
                </>}
                {existFirebase && <>
                    <Text style={[styleGeneral.settingDesc, {textAlign:'left'}]}>Congrats, you exist!</Text>
                </>}
            </SafeAreaView>
        </ScrollView>
    )
}

export default home