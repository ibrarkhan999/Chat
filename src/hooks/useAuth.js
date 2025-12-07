import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export default function useAuth() {
  const [user, setUser] = useState(null);



const signUp = async (email, password) => {
  try {
    // Create user with email and password
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!', userCredential.user);
    return userCredential.user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }
    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    if (error.code === 'auth/weak-password') {
      console.log('Password should be at least 6 characters!');
    }
    console.error(error);
  }
};






  return { user ,signUp};
}
