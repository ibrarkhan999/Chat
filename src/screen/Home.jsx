import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home, Honey! 😏</Text>
      <Text style={styles.subtitle}>Your journey starts here...</Text>
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
  },
});
