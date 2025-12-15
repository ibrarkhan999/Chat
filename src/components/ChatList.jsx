import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';
import useAuth from '../hooks/useAuth';

export default function ChatList({ user }) {
  const { user: currentUser } = useAuth(); // get logged-in user

  if (!currentUser) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4B7BE5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={user}
        keyExtractor={(item) => item.uid}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <ChatItem item={item} currentUserId={currentUser.uid} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  list: {
    paddingBottom: 20,
  },
  separator: {
    height: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
