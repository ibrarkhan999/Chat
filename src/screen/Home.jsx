import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { getApp } from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigation = useNavigation();

  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setUserData(docSnap.data());
      } catch (e) {
        console.log('Error loading user:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [currentUser, db]);

const handleLogout = async () => {
  try {
    await signOut(auth); 
  } catch (e) {
    console.log("Logout error:", e);
  }
};

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4B7BE5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData?.imageUrl && (
        <Image source={{ uri: userData.imageUrl }} style={styles.avatar} />
      )}

      <Text style={styles.title}>Welcome Home, {userData?.username || 'User'} 😏</Text>
      <Text style={styles.subtitle}>Your journey starts here...</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4B7BE5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B7BE5',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  logoutBtn: {
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
