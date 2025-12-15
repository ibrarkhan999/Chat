import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MenuProvider } from 'react-native-popup-menu';
import FlashMessage from 'react-native-flash-message';

import MainNavigation from './src/navigation/MainNavigation';

export default function App() {
  return (
    <>
      <MenuProvider>
        <NavigationContainer>
          <MainNavigation />
          <FlashMessage position="top" />
        </NavigationContainer>
      </MenuProvider>
    </>
  );
}
