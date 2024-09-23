import { auth } from "./config.js"; // Import auth correctly

// Example function to sign in a user
function authenticateUser(email, password) {
  const authInstance = auth;
  signInWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in:", user);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
}

// Call the function to test authentication
authenticateUser("mrityunjoypanday@gmail.com", "Mrityunjoy@123");
