import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BTN({ title, onPress, bgColor = '#4CAF50', textColor = '#fff' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
