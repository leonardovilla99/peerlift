import { ref, get, set } from "firebase/database";
import { database } from "@/firebase/firebase";

// Function to add user to the database if not exists
export async function addUserToDatabase(myUserId, myName, userId, name) {
    // Check on their side
    const userRef = ref(database, `users/${userId}/messages/${myUserId}`);

    // Check if the user already exists
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
        // If the user does not exist, add them to the database
        set(userRef, {
            name: myName
        });
    }
}
