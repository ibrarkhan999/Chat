import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ChatItem({ item, index }) {
  const navigation = useNavigation()
  const handleChat = () => {
    navigation.navigate("ChatScreen", { item: item });

  }
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleChat}>
      <Image source={{ uri: item.imageUrl.trim() }} style={styles.avatar} />


      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.username}</Text>
          <Text style={styles.time}>2:45 PM</Text>
        </View>

        <Text style={styles.message} numberOfLines={1}>
          Last message preview goes here…
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#4B7BE5',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  time: {
    fontSize: 12,
    color: '#8E8E93',
  },
  message: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
});
