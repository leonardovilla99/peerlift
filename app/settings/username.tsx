import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import styleGeneral from '@/constants/styleGeneral'
import { useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const username = () => {

    const { user } = useUser();

    const [username, setUsername] = useState(user?.firstName ?? '');

    const onUpdatePress = async () => {
        try {
          await user?.update({ firstName: username });
        } catch (err: any) {
          alert(err.errors[0].longMessage);
        } finally{
            router.push('/(tabs)/account');
        }
    };

    return (
        <SafeAreaView style={styleGeneral.container}>
            <View style={styleGeneral.safeContainer}>
                <View style={styleGeneral.spaceVerticalBetw}>
                    <View>
                        <Text style={[styleGeneral.settingDesc]}>In this page you can change your username, please maintain decency.</Text>
                        <TextInput style={[styleGeneral.textField, {marginTop:20}]} autoCapitalize='none' placeholder='Username' value={username} onChangeText={setUsername} placeholderTextColor={Colors.almostWhite}/>
                    </View>
                    <TouchableOpacity style={[styleGeneral.botton, {marginBottom:40}]} onPress={onUpdatePress}>
                        <Text style={[styleGeneral.bottonText]}>Change it</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default username