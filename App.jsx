import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <MenuProvider>
    <NavigationContainer>
      <MainNavigation/>
      <FlashMessage position="top" />
    </NavigationContainer>
    </MenuProvider>

  );
}
