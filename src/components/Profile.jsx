import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import BTN from './BTN';

export default function Profile({ userData, backButton }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log('Logout error:', e);
    }
  };

  return (
    <View style={styles.container}>
      {userData?.imageUrl && (
        <Image source={{ uri: userData.imageUrl }} style={styles.avatar} />
      )}

      <Text style={styles.title}>
        Welcome Home, {userData?.username || 'User'} 😏
      </Text>
      <Text style={styles.email}>
        Login Email : {userData?.email || ''} 
      </Text>

      <Text style={styles.subtitle}>Your journey starts here...</Text>

      <View style={styles.btnBox}>
        <BTN title="Logout" bgColor="#ff4d4d" textColor="#fff" onPress={handleLogout} />
        <BTN title="Back" bgColor="#fff" textColor="#4CAF50" onPress={backButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f0f4f7', // soft background
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    margin: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50', // elegant green border
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center',
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
});
