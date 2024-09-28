import { Button, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import styleGeneral from '@/constants/styleGeneral'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'

const account = () => {
    const {signOut, isSignedIn} = useAuth();
    const {user} = useUser();
    
    const onLogin = () => {
        router.push('/(modal)/login')
    }

    const onCaptureImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.75,
            base64: true
        });
    
        if (!result.canceled) {
            const assets = result.assets;
            if (assets && assets.length > 0) {
                const base64 = `data:image/png;base64,${assets[0].base64}`;
                user?.setProfileImage({
                    file: base64
                })
            }
        }
        router.push('/(tabs)/account')
    };

    return (
        <ScrollView style={{backgroundColor: Colors.superBlack}}>
            <SafeAreaView style={[styleGeneral.safeContainer]}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
                        {user?.firstName != null && (
                            <View style={{flexDirection:'column', width:'90%'}}>
                                <Image source={{uri: user?.imageUrl}} style={styleGeneral.avatar}/>
                                <Text style={[styleGeneral.title]}  ellipsizeMode="tail" numberOfLines={1}>{user.firstName}.</Text>
                            </View>
                        )}
                        {user?.firstName == null && (
                            <View style={{flexDirection:'column', width:'90%'}}>
                                <Image source={{uri: user?.imageUrl}} style={styleGeneral.avatar}/>
                                <Text style={[styleGeneral.title]}  ellipsizeMode="tail" numberOfLines={1}>Me.</Text>
                            </View>
                        )}
                        <Link href={'/'} style={{marginTop:20}}>
                            <Ionicons name='settings-sharp' color={Colors.almostWhite} size={20}/>
                        </Link>
                    </View>
                <View>
                    {user != null &&
                        <>
                        <View style={styleGeneral.settingBlock}>
                            <Text>Profile</Text>
                            <TouchableOpacity style={styleGeneral.settingLine} onPress={() => onCaptureImage()}>
                                <Text style={[styleGeneral.settingsCateg]}>Profile Image</Text>
                                <View style={styleGeneral.settingLine}>
                                    <Text style={[styleGeneral.settingsSub]}>change your profile pic.</Text>
                                    <Ionicons name='chevron-forward' size={20} color={Colors.almostWhite}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styleGeneral.settingLine} onPress={() => null}>
                                <Text style={[styleGeneral.settingsCateg]}>Username</Text>
                                <View style={styleGeneral.settingLine}>
                                    <Text style={[styleGeneral.settingsSub]}>change your username</Text>
                                    <Ionicons name='chevron-forward' size={20} color={Colors.almostWhite}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </>
                    }
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