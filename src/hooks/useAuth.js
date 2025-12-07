// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutRNF,
} from '@react-native-firebase/auth';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // create native auth instance from native app
  const nativeApp = getApp();
  const auth = getAuth(nativeApp);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser ?? null);
      setIsLogin(!!currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, [auth]);

  const signUp = async (email, password, username) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      return cred.user;
    } catch (e) {
      throw e;
    }
  };

  const signIn = async (email, password) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    await signOutRNF(auth);
  };

  return { user, isLogin, loading, signUp, signIn, logout };
}
