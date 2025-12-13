import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs } from '@react-native-firebase/firestore';

import Profile from '../components/Profile';
import ChatList from '../components/ChatList';

export default function Home() {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const navigation = useNavigation();
  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      setLoading(true);
      setUsers([]); // clear old users
      try {
        // Fetch current user
        const userSnap = await getDoc(doc(db, 'users', currentUser.uid));
        if (userSnap.exists()) setCurrentUserData(userSnap.data());

        // Fetch all users from server only
        const usersSnap = await getDocs(collection(db, 'users'), { source: 'server' });
        const usersList = usersSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(u => u.id !== currentUser.uid);

        setUsers(usersList);
      } catch (error) {
        console.log('Firebase Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4B7BE5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>

        <Menu>
          <MenuTrigger>
            {currentUserData?.imageUrl ? (
              <Image source={{ uri: currentUserData.imageUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>U</Text>
              </View>
            )}
          </MenuTrigger>

          <MenuOptions customStyles={menuStyles}>
            <MenuOption text="View Profile" onSelect={() => setShowProfile(true)} />
          </MenuOptions>
        </Menu>
      </View>

      {/* Body */}
      {showProfile ? (
        <Profile userData={currentUserData} backButton={() => setShowProfile(false)} />
      ) : users.length > 0 ? (
        <ChatList user={users} />
      ) : (
        <View style={styles.noUsers}>
          <Text style={styles.noUsersText}>No users found 😢</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const menuStyles = {
  optionsContainer: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 6,
  },
  optionText: {
    fontSize: 16,
    color: '#4B7BE5',
  },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F7' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#4B7BE5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#fff' },
  avatar: { width: 55, height: 55, borderRadius: 30, borderWidth: 2, borderColor: '#A6B1C9' },
  avatarPlaceholder: { backgroundColor: '#B0B0B0', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: 'white', fontWeight: '700', fontSize: 20 },
  noUsers: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noUsersText: { fontSize: 18, color: '#888' },
});
