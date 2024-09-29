/* eslint-disable react/no-direct-mutation-state */
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, StatusBar, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import Colors from '@/constants/Colors';
import styleGeneral from '@/constants/styleGeneral';

import { getDatabase, ref, set, push, get, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig} from '@/firebase/firebase'
import { convertDistance } from 'geolib';
import sortUsersByDistance from '@/scripts/getDistance'

interface UserDistance {
    latitude: number,
    longitude: number,
    userId: string;
    name: string;
    distance: number
}

const home = () => {
    const { userId } = useAuth();
    // Initialization
    const app = initializeApp(firebaseConfig);
    const database = getDatabase();

    // Create states
    const [existFirebase, setFirebase] = useState(false);
    const [myLat, setMyLat] = useState(0);
    const [myLng, setMyLng] = useState(0);
    const [userDistances, setUserDistances] = useState<UserDistance[]>([]);

    useEffect(() => {
        // Set the status bar style
        StatusBar.setBarStyle('light-content'); // 'dark-content' for dark text on light background
    }, []);
    
    const userRef = ref(database, 'users/' + userId);
    get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
        setFirebase(true);
        const usersData = snapshot.val();
        setMyLat(usersData.latitude);
        setMyLng(usersData.longitude)
    }
    }).catch((error) => {
        console.error("Error checking or writing user data:", error);
    });

    const tempUserDistances: { latitude: number; longitude: number; userId: string; name: string;}[] = [];


    useEffect(() => {
        const postsRef = ref(database, "users/");
        const unsubscribe = onValue(postsRef, (snapshot) => {
          const data = snapshot.val();
          Object.keys(data).forEach((userId) => {
            const user = data[userId];
            const { latitude, longitude, name } = user;

            // Check if latitude and longitude exist
            if (latitude && longitude) {
                // Calculate driving distance using your distance calculation function
                

                // Add the processed user data to the temporary array
                tempUserDistances.push({
                    latitude,
                    longitude,
                    userId,
                    name
                });
                
            } else {
                console.error(`User ${userId} has missing latitude or longitude`);
            }
            });
            setUserDistances(sortUsersByDistance(tempUserDistances, myLat, myLng));
        });
        
        return () => unsubscribe();
    }, [tempUserDistances]);

    // useEffect(() => {
    //     for (let i = 0; i < userDistances.length; i++) {
    //         const user = userDistances[i]
            
    //         //console.log(drivingDistance);
    //     }
    // },[]);
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: Colors.superBlack}} bounces={false}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <SafeAreaView style={[styleGeneral.safeContainer]}>
                <Text style={[styleGeneral.title, {marginTop:20}]}>Meet your ride.</Text>
                {!existFirebase && <>
                    <Text style={[styleGeneral.settingDesc, {textAlign:'left'}]}>Please add a destination to your travel <Link href="/settings/locationSet" style={{color:Colors.yellow}}>here!</Link></Text>
                </>}
                {existFirebase && <View style={{paddingTop:20}}>
                    {userDistances.map((user) => (
                        <TouchableOpacity key={user.userId}>
                            <View style={styleGeneral.cardView}>
                                <Text style={{color:Colors.almostWhite, fontWeight: 600, fontSize:16}}>{user.name}</Text>
                                <Text style={{color:Colors.yellow}}>Distance: {user.distance.toFixed(1)} miles</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>}
            </SafeAreaView>
        </ScrollView>
    )
}

export default home