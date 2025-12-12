import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
import Home from '../screen/Home';
import Login from '../screen/Login';
import Register from '../screen/Register';
import LDNG from '../components/LDNG';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const { isLogin, loading } = useAuth();

  if (loading) return <LDNG />; 

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogin ? (
        <Stack.Screen name="Home" component={Home} />
        
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}
