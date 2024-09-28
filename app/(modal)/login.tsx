import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowse'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

import { useAuth, useOAuth, useSignIn } from '@clerk/clerk-expo';
import { Link, router} from 'expo-router';
import styleGeneral from '@/constants/styleGeneral';
import Colors from '@/constants/Colors';

const login = () => {
    useWarmUpBrowser();

    const { signIn, setActive, isLoaded} = useSignIn();
    const { isSignedIn } = useAuth();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);


    const onSignInPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);
		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password
			});
			// This indicates the user is signed in
			await setActive({ session: completeSignIn.createdSessionId });
            router.back()
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};
    
    return (
        <View style={styleGeneral.container}>
            <View style={[styleGeneral.safeContainer, {flexDirection:'column'}]}>
                <Text style={[styleGeneral.title]}>Welcome back!</Text>
                <Text style={[styleGeneral.subTitle, {marginBottom:20}]}>Sign in to continue.</Text>
                <TextInput style={[styleGeneral.textField, {marginTop:20}]} autoCapitalize='none' placeholder='Email' value={emailAddress} onChangeText={setEmailAddress} placeholderTextColor={Colors.almostWhite}/>
                <TextInput style={[styleGeneral.textField, {marginTop:20}]} autoCapitalize='none' placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={Colors.almostWhite}/>
                <View style={styleGeneral.lowView}>
                    <TouchableOpacity style={styleGeneral.botton} onPress={onSignInPress}>
                        <Text style={[styleGeneral.bottonText]}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={[styleGeneral.textGrey]}>Don't have an account? <Link href="/(modal)/register" style={{color:Colors.yellow}}> Sign up</Link></Text>
                </View>
            </View>
        </View>
    )
}

export default login