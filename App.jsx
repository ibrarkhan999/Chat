import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // ✅ correct import
import { MenuProvider } from 'react-native-popup-menu';
import FlashMessage from 'react-native-flash-message';

import MainNavigation from './src/navigation/MainNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <MainNavigation />
          <FlashMessage position="top" />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}
