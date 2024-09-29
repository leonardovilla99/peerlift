import React, { useState, useEffect } from "react";
import { sendMessage, getMessages } from "@/scripts/firebaseService"; // Assuming the functions above are in firebaseService.js
import { useAuth } from "@clerk/clerk-expo";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import styleGeneral from "@/constants/styleGeneral";
import { Ionicons } from "@expo/vector-icons";
import { onValue, ref } from "firebase/database";
import { database } from "@/firebase/firebase";

interface Message {
    from: string;
    to: string;
    message: string;
    timestamp: string;
  }

const MessagingPage = () => {
    const { userId } = useAuth();
    const {id} = useLocalSearchParams<{ id:string }>();
    const [receiverName, setReceiverName] = useState();
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    // Fetch messages when the component mounts
    useEffect(() => {
        getMessages(userId, id, setMessages);
    }, [userId, id]);

    useEffect(() => {
        const postsRef = ref(database, "users/" + id);
        const unsubscribe = onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            setReceiverName(data.name);
        });
    },[]);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
        sendMessage(userId, id, messageInput);
        setMessageInput(""); // Clear the input after sending the message
        }
    };

    return (
        <SafeAreaView style={{backgroundColor: Colors.superBlack, flex:1}}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='chevron-back' size={28} color={Colors.almostWhite}></Ionicons>
            </TouchableOpacity>
            <Text style={[styleGeneral.titleMessages]}>{receiverName}</Text>
            <ScrollView>
                {messages.map((msg, index) => (
                    <View key={index} style={[msg.from === userId ? styleGeneral.myMessage : styleGeneral.otherMessage, styleGeneral.generalMessage]}>
                        <Text style={{color:Colors.superBlack, fontSize:15}}>{msg.message}</Text>
                        <Text style={{color:Colors.superBlack, fontSize:10}}>{new Date(msg.timestamp).toLocaleTimeString()}</Text>
                    </View>
                ))}
            </ScrollView>
            <View>
                <TextInput
                    value={messageInput}
                    onChangeText={setMessageInput}
                    placeholder="Type a message..."
                    placeholderTextColor={Colors.almostWhite}
                    style={{color:Colors.almostWhite}}
                />
                <TouchableOpacity style={[styleGeneral.botton, {marginBottom:40}]} onPress={handleSendMessage}>
                    <Text style={[styleGeneral.bottonText]}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MessagingPage;
