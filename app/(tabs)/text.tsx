import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import styleGeneral from '@/constants/styleGeneral'
import { onValue, ref } from 'firebase/database'
import { database } from '@/firebase/firebase'
import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface User {
    userId: string;
    name: string;
  }

const text = () => {
    // User
    const { userId } = useAuth();
    const [users, setUsers] = useState<User[]>([]);

    // Nav initialization
    const routerNav = useRouter();

    async function fetchData() {
        try {
            const extractedUsers = [];
            const postsRef = ref(database, `users/${userId}/messages`);
            const unsubscribe = onValue(postsRef, async (snapshot) => {
                const data = await snapshot.val();
                console.log('Data received:', data);
            });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    const extractedUsers: { name: string; userId: string}[]  = [];
    useEffect(() => {
        
        const postsRef = ref(database, `users/${userId}/messages`);
        const unsubscribe = onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if(data){
                Object.keys(data).forEach((userIdT) => {
                    const user = data[userIdT];
                    const { name } = user;
                    extractedUsers.push({
                        name,
                        userId: userIdT
                    })
                });
                setUsers(extractedUsers);
            }
        });
        
        return () => unsubscribe();
    }, [extractedUsers]);

    const openMsg = (id: string) => {
        routerNav.push(`/message/${id}`);
    }

    return (
        <ScrollView style={{backgroundColor: Colors.superBlack}} bounces={false}>
            <SafeAreaView style={[styleGeneral.safeContainer]}>
                <Text style={[styleGeneral.title, {marginTop:20, marginBottom:20}]}>Your messages.</Text>
                    {users.map((user) => (
                            <TouchableOpacity key={user.userId} onPress={()=>{openMsg(user.userId)}}>
                                <View style={[styleGeneral.cardView,{flexDirection:'row', justifyContent: 'space-between'}]}>
                                    <Text style={{color:Colors.almostWhite, fontWeight: 600, fontSize:16}}>{user.name}</Text>
                                    <Ionicons name='chevron-forward' size={28} color={Colors.almostWhite}></Ionicons>
                                </View>
                            </TouchableOpacity>
                    ))}
            </SafeAreaView>
        </ScrollView>
    )
}

export default text