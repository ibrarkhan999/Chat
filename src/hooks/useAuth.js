// hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // modular instances
  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser ?? null);
      setIsLogin(!!currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  /**
   * signUp(email, password, username, imageUrl?)
   * - creates auth user
   * - updates displayName
   * - writes users/{uid} doc with optional imageUrl
   * - if Firestore write fails, deletes the created auth user to avoid orphan accounts
   */
  const signUp = useCallback(
    async (email, password, username, imageUrl = null) => {
      try {
        // 1) create auth user
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const createdUser = cred.user;

        // 2) update auth profile (displayName + photoURL if provided)
        try {
          const profileUpdate = { displayName: username };
          if (imageUrl) profileUpdate.photoURL = imageUrl;
          await updateProfile(createdUser, profileUpdate);
        } catch (updErr) {
          console.warn('updateProfile failed:', updErr);
        }

        // 3) write user document to Firestore
        try {
          await setDoc(
            doc(db, 'users', createdUser.uid),
            {
              uid: createdUser.uid,
              email,
              username,
              imageUrl: imageUrl ?? null,
              createdAt: serverTimestamp(),
            }
          );
        } catch (fireErr) {
          // remove auth user if Firestore write fails
          try {
            await createdUser.delete();
          } catch (delErr) {
            console.error('Failed to delete auth user after Firestore error:', delErr);
          }
          throw fireErr;
        }

        return createdUser;
      } catch (e) {
        throw e;
      }
    },
    [auth, db]
  );

  const signIn = useCallback(
    async (email, password) => {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        return cred.user;
      } catch (e) {
        throw e;
      }
    },
    [auth]
  );

  const logout = useCallback(async () => {
    await signOut(auth);
  }, [auth]);

  return { user, isLogin, loading, signUp, signIn, logout };
}
