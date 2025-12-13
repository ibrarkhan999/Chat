import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatHeader from '../components/ChatHeader';

export default function ChatScreen({route}) {
      const { item } = route.params; 
      console.log(item,"got it")
  return (
    <View>
        <ChatHeader item={item}  />


    </View>
  )
}

const styles = StyleSheet.create({})