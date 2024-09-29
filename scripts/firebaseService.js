import { getDatabase, ref, set, push, get, onValue } from "firebase/database";
import { database } from "@/firebase/firebase";

export function sendMessage(fromUserId, toUserId, message) {
    // Sort user IDs alphabetically to form the chatroom ID
    const chatId = [fromUserId, toUserId].sort().join("_");

    // Reference to the chat in Firebase
    const chatRef = ref(database, 'messages/' + chatId);

    // Push a new message to the chatroom
    const newMessageRef = push(chatRef);
    set(newMessageRef, {
        from: fromUserId,
        to: toUserId,
        message: message,
        timestamp: new Date().toISOString()
    });
}

export function getMessages(fromUserId, toUserId, setMessages) {
  // Sort user IDs alphabetically to form the chatroom ID
  const chatId = [fromUserId, toUserId].sort().join("_");

  // Reference to the chat in Firebase
  const chatRef = ref(database, 'messages/' + chatId);

  // Listen for changes to the messages in real-time
  onValue(chatRef, (snapshot) => {
    const messages = snapshot.val();
    const messagesArray = messages ? Object.values(messages) : [];
    setMessages(messagesArray);
  });
}
