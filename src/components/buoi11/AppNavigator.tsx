import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../buoi11/test1_sqlite';
// import DetailScreen from './screens/DetailScreen';
import { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Trang chủ' }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Chi tiết' }} 
      />
    </Stack.Navigator>
  );
}