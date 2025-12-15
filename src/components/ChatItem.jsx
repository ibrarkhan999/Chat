import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase/firebase'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'

export default function ChatItem({ item, currentUserId }) {
  const navigation = useNavigation()
  const [lastMessage, setLastMessage] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    if (!currentUserId) return

    const chatId =
      currentUserId > item.uid
        ? `${currentUserId}_${item.uid}`
        : `${item.uid}_${currentUserId}`

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(1)
    )

    const unsub = onSnapshot(q, snapshot => {
      if (!snapshot.empty) {
        const msg = snapshot.docs[0].data()
        setLastMessage(msg.text)

        // Safely handle timestamp
        if (msg.createdAt) {
          const date = msg.createdAt.toDate?.() || new Date()
          const hours = date.getHours().toString().padStart(2, '0')
          const minutes = date.getMinutes().toString().padStart(2, '0')
          setTime(`${hours}:${minutes}`)
        } else {
          setTime('')
        }
      } else {
        setLastMessage('')
        setTime('')
      }
    })

    return unsub
  }, [item, currentUserId])

  const handleChat = () => {
    navigation.navigate('ChatScreen', { item: item })
  }

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleChat}>
      <Image source={{ uri: item.imageUrl.trim() }} style={styles.avatar} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.username}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <Text style={[styles.message, !lastMessage && { fontStyle: 'italic' }]} numberOfLines={1}>
          {lastMessage || 'No messages yet...'}
        </Text>
      </View>
    </TouchableOpacity>
  )
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
    marginVertical: 4,
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
})
