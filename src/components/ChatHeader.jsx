import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ChatHeader({ item }) {
  if (!item) return null; // safe check

  const avatar = item.imageUrl
    ? <Image source={{ uri: item.imageUrl.trim() }} style={styles.avatar} />

    : <View style={[styles.avatar, styles.placeholder]} />; // no string here

  const username = item.username ? item.username : 'Unknown';

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {avatar}
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>🎥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fefefe',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  placeholder: {
    // just a gray circle
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  icon: {
    fontSize: 22,
  },
});
