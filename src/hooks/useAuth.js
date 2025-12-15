// hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react'
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth'
import { 
  getFirestore, 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore'
import { auth, db } from '../firebase/firebase' 

export default function useAuth() {
  const [user, setUser] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser ?? null)
      setIsLogin(!!currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signUp = useCallback(
    async (email, password, username, imageUrl = null) => {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        const createdUser = cred.user

        // update profile
        await updateProfile(createdUser, {
          displayName: username,
          photoURL: imageUrl ?? null,
        })

        // write to Firestore
        await setDoc(doc(db, 'users', createdUser.uid), {
          uid: createdUser.uid,
          email,
          username,
          imageUrl: imageUrl ?? null,
          createdAt: serverTimestamp(),
        })

        return createdUser
      } catch (e) {
        throw e
      }
    },
    []
  )

  const signIn = useCallback(async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return cred.user
  }, [])

  const logout = useCallback(async () => {
    await signOut(auth)
  }, [])

  return { user, isLogin, loading, signUp, signIn, logout }
}
