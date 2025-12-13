import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';

export default function ChatList({ user }) {
  return (
    <View style={styles.container}>
      {user ? (
        <FlatList
          data={user}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => <ChatItem item={item} index={index} />}
        />
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#4B7BE5" />
        </View>
      )}
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
