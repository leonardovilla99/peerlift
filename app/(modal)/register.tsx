import { View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native'
import React, { useState } from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowse'
import { TextInput } from 'react-native-gesture-handler';

import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import styleGeneral from '@/constants/styleGeneral';
import Colors from '@/constants/Colors';



const register = () => {
    useWarmUpBrowser();
    const routerNav = useRouter();

    const { isLoaded, signUp, setActive } = useSignUp();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

    const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);
        if (password != password2){
            alert("Insert same password!");
            return;
        }
		try {
			// Create the user on Clerk
			await signUp.create({
				emailAddress,
				password
			});

			// Send verification Email
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			// change the UI to verify the email address
			setPendingVerification(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);

		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code
			});

			await setActive({ session: completeSignUp.createdSessionId });
            routerNav.push('/(tabs)/home')
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};
    
    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.safeContainer}>
                {!pendingVerification && (<>
                    <Text style={[styleGeneral.title]}>Join us!</Text>
                    <Text style={[styleGeneral.subTitle, {marginBottom:20}]}>Sign up to continue.</Text>
                    <TextInput style={[styleGeneral.textField, {marginTop:20}]} autoCapitalize='none' placeholder='Email' value={emailAddress} onChangeText={setEmailAddress} placeholderTextColor={Colors.almostWhite}/>
                    <TextInput style={[styleGeneral.textField, {marginTop:20}]} autoCapitalize='none' placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={Colors.almostWhite}/>
                    <TextInput style={[styleGeneral.textField, {marginTop:20}]} autoCapitalize='none' placeholder='Repeat password' value={password2} onChangeText={setPassword2} secureTextEntry placeholderTextColor={Colors.almostWhite}/>
                    <View style={styleGeneral.lowView}>
                        <TouchableOpacity style={styleGeneral.botton} onPress={onSignUpPress}>
                            <Text style={[styleGeneral.bottonText]}>REGISTER</Text>
                        </TouchableOpacity>
                        <Text style={[styleGeneral.textGrey]}>Already have an account? <Link href="/(modal)/login"> Sign in</Link></Text>
                    </View>
                </>)}
                {pendingVerification && (<>
					<View>
						<TextInput
							value={code}
							placeholder="Code..."
							onChangeText={setCode}
						/>
					</View>
					<Button onPress={onPressVerify} title="Verify Email" color={'#6c47ff'}></Button>
				</>)}
            </View>
        </View>
    )
}

export default register