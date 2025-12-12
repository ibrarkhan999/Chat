import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function ChatList({ user }) {
  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.text}>LOL 😏</Text>
      ) : (
        <ActivityIndicator size="large" color="#4B7BE5" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',


  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B7BE5',
  },
});
