import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeProducts from './homeProducts';
import userAdmin from './userAdmin';
import HomeScreen from './home';
import CategoryProductScreen from './cateScreen';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './navigation/types';
import CateAdmin from './CateAdmin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


const Tab  = createBottomTabNavigator()

type Props = {
  route: RouteProp<RootStackParamList, 'Home'>;
};

type Props2 =  NativeStackScreenProps<RootStackParamList, 'HomeAdmin'>;

const componentTab= ({route , navigation} : Props2) => {
  const cateID = route?.params?.categoryId ?? 0
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#2980b9',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Products" 
        component={homeProducts}
        initialParams={{ categoryId: cateID }}
        options={{
          title: 'Sản phẩm',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Text style={{fontSize: 24, color}}>🛍️</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Users" 
        component={userAdmin}
        options={{
          title: 'Người dùng',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Text style={{fontSize: 24, color}}>👥</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Danh mục" 
        component={CateAdmin}
        options={{
          title: 'Danh mục',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Text style={{fontSize: 24, color}}>©️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const componentTab2 = ({route} : Props) => {
  const userParams = route.params

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#2980b9',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        initialParams={userParams}
        options={{
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Text style={{fontSize: 24, color}}>🛍️</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Danh mục" 
        component={CategoryProductScreen}
        options={{
          title: 'Danh mục',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Text style={{fontSize: 24, color}}>👥</Text>
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Other" 
        component={}
        options={{
          title: 'Khác',
          tabBarIcon: ({ color }) => (
            <Text style={{fontSize: 24, color}}>⚙️</Text>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default componentTab

const styles = StyleSheet.create({
    tabContainer: {
        paddingVertical: 12,
        backgroundColor: '#fff',
        
        width: '33%'
    },
    selectedTab: {
        backgroundColor: '#2980b9',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center'
    },
    selectedText: {
        color: '#fff',
    }
})