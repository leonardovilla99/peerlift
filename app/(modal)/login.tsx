import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowse'
import { TextInput } from 'react-native-gesture-handler';

import { useAuth, useOAuth, useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter, router } from 'expo-router';

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
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
            router.push("/(tabs)/home",);
		}
	};
    
    return (
        <View>
            <View >
                <Text>Welcome back!</Text>
                <Text>Sign in to continue.</Text>
                <TextInput autoCapitalize='none' placeholder='Email' value={emailAddress} onChangeText={setEmailAddress}/>
                <TextInput autoCapitalize='none' placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry/>
                <View>
                    <TouchableOpacity onPress={onSignInPress}>
                        <Text>LOGIN</Text>
                    </TouchableOpacity>
                    <Text>Don't have an account?</Text>
                </View>
            </View>
        </View>
    )
}

export default login