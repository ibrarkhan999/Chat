import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { getApp } from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import Profile from '../components/Profile';
import ChatList from '../components/ChatList';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isShownProfile, setIsShownProfile] = useState(false);
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

  const backButton = async () => {
    setIsShownProfile(false);
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
      <View style={styles.chatView}>
        <Text style={styles.chattxt}>Chats</Text>

        <Menu>
          <MenuTrigger>
            <Image
              source={{ uri: userData?.imageUrl }}
              style={styles.chatimg}
            />
          </MenuTrigger>

          <MenuOptions customStyles={menuOptionsStyles}>
            <MenuOption
              onSelect={() => setIsShownProfile(true)}
              text="View Profile"
            />
          </MenuOptions>
        </Menu>
      </View>

      {isShownProfile ? (
        <Profile backButton={backButton} userData={userData} />
      ) : (
        <ChatList user={user} />
      )}
    </View>
  );
}

const menuOptionsStyles = {
  optionsContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#4B7BE5',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', // soft background
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatimg: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#a6b1c9',
  },
  chatView: {
    backgroundColor: '#4B7BE5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
  },
  chattxt: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
});
