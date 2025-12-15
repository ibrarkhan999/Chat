import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import ChatHeader from '../components/ChatHeader'
import useAuth from '../hooks/useAuth'

export default function ChatScreen({ route }) {
  const { item } = route.params
  const { user } = useAuth()
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const flatListRef = useRef()

  // Always call hooks first
  const chatId = user
    ? user.uid > item.uid
      ? `${user.uid}_${item.uid}`
      : `${item.uid}_${user.uid}`
    : null

  // Firestore real-time listener
  useEffect(() => {
    if (!chatId) return // wait until user is ready

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc')
    )

    const unsub = onSnapshot(q, snap => {
      setMessages(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
      flatListRef.current?.scrollToEnd({ animated: true })
    })

    return unsub
  }, [chatId])

  const sendMessage = async () => {
    if (!text.trim() || !user || !chatId) return

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text,
      senderId: user.uid,
      createdAt: serverTimestamp(),
    })
    setText('')
  }

  // Loading state
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Loading user...</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ChatHeader item={item} />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item: msg }) => (
          <View
            style={[
              styles.bubble,
              msg.senderId === user.uid
                ? styles.myBubble
                : styles.otherBubble,
            ]}
          >
            <Text style={styles.msgText}>{msg.text}</Text>
          </View>
        )}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View style={styles.inputBox}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Message..."
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  list: {
    padding: 12,
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 14,
    marginVertical: 4,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e293b',
  },
  msgText: {
    color: '#fff',
    fontSize: 15,
  },
  inputBox: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#1e293b',
  },
  input: {
    flex: 1,
    backgroundColor: '#0f172a',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#2563eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
})
