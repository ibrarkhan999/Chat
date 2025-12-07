import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import FlashMessage, { showMessage } from "react-native-flash-message";


export default function App() {
  return (
    <NavigationContainer>
      <MainNavigation/>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
