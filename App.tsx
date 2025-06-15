import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';

import Giaodienthongbao from './src/components/Giaodienthongbao';
import Ptb1 from './src/components/Ptb1';
import Text1 from './src/components/text1';
import Cha from './src/components/Cha';
import Con_Cha from './src/components/Con_Cha';
import  Ptbac1 from './src/components/Ptbac1';
import Maytinh1 from './src/components/Maytinh1';
import Layout from './src/components/layout';
import Layout2 from './src/components/layout2';
import Layout_Product from './src/components/Layout_Product';
import Buoi7_bt1 from './src/components/buoi7/bt1';
import Buoi7_bt2 from './src/components/buoi7/bt2';
import Buoi8_bt3 from './src/components/buoi8/test1';
import Buoi9_bt1 from './src/components/buoi9/bt'
import Ktra_buoi10 from './src/components/ktra_buoi10/ktra'
import Test1sqlite from './src/components/buoi11/test1_sqlite';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DetailScreen from './src/components/buoi11/DetailScreen';
// import { RootStackParamList2 } from './src/components/buoi11/navigation/types';
import { createNativeStackNavigator,NativeStackNavigationProp } from '@react-navigation/native-stack';

import categoryproductSreen from './src/components/buoi11/categoryproductSreen';
import HomeProducts from './src/components/tulam/homeProducts';
import DetailScreen2 from './src/components/tulam/detailProduct';
import cateScreen2 from './src/components/tulam/cateScreen';
import HomeScreen from './src/components/tulam/home';
import RegisterScreen from './src/components/tulam/RegisterScreen';
import LoginScreen from './src/components/tulam/LoginScreen';
import { RootStackParamList } from './src/components/tulam/navigation/types';
import SplashScreen from './src/components/tulam/SplashScreen';
import userAdmin from './src/components/tulam/userAdmin';
import ComponentTab, { componentTab2 } from './src/components/tulam/componentTab';
import UserInfo from './src/components/tulam/UserInfo';

const Stack = createNativeStackNavigator<RootStackParamList>()


const App = () => {
  const defaultName = ""; 
  const defaultSoA = 0;
  const defaultSoB = 0;
  const name = 'tên', age = "tuổi";

     

  return (
    <View style={styles.container}>
      {/* <Text style = {styles.text}>Hello Viết Khoa</Text> */}
      {/* <Text1 name= {name} age = {age}/> */}
      {/* <Giaodienthongbao name={defaultName} /> */}
      {/* <Text></Text> */}
      {/* <Ptb1 soA={defaultSoA} soB={defaultSoB}/> */}
      {/* <Cha/>  */}
     
      {/* <Ptbac1/> */}
      {/* <Maytinh1/> */}
     
       {/* <Con_Cha/> */}
      {/* <Layout/> */}
      {/* <Layout2/> */}
      {/* <Layout_Product/> */}
      {/* <Buoi7_bt1/> */}
      {/* <Buoi7_bt2/> */}
      {/* <Buoi8_bt3/> */}
      {/* <Buoi9_bt1/> */}
      {/* <Ktra_buoi10/> */}

      {/* <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeAdmin"
          component={Test1sqlite}
          options={{ title: 'Danh sách Sản phẩm', headerShown: false }} 
          
        />
         <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Chi tiết Sản phẩm', headerShown: true }} 
        />
        <Stack.Screen
          name="Category"
          component={categoryproductSreen}
          options={{ title: 'Danh sách Danh mục', headerShown: true }}
          />
      </Stack.Navigator>
    </NavigationContainer> */}


     <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ title: 'bla', headerShown: false }}
          />
        <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Đăng ký', headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Đăng Nhập', headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={componentTab2}
            options={{ title: 'Home', headerShown: false }}
          />
           <Stack.Screen
          name="HomeAdmin"
          component={ComponentTab}
          options={{ title: 'Danh sách Sản phẩm', headerShown: false }} 
          
        />
        
         <Stack.Screen
          name="Detail"
          component={DetailScreen2}
          options={{ title: 'Chi tiết Sản phẩm', headerShown: true }} 
        />
        <Stack.Screen
          name="Category"
          component={cateScreen2}
          options={{ title: 'Danh sách Danh mục', headerShown: true }}
          />

        <Stack.Screen
          name="userAdmin"
          component={userAdmin}
          options={{ title: 'Danh sách Danh mục', headerShown: false }}
          />

        <Stack.Screen
              name="UserInfo"
              component={UserInfo}
              options={{ title: 'Thông tin người dùng', headerShown: true }}
            />
          
        </Stack.Navigator>

        
        
    </NavigationContainer>

    {/* <NavigationContainer>
     
    </NavigationContainer> */}

    {/* <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeAdmin"
          component={HomeProducts}
          options={{ title: 'Danh sách Sản phẩm', headerShown: false }} 
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen2}
          options={{ title: 'Chi tiết Sản phẩm', headerShown: true }} 
        />
        <Stack.Screen
          name="Category"
          component={cateScreen2}
          options={{ title: 'Danh sách Danh mục', headerShown: true }}
        />
      </Stack.Navigator>
    
    </NavigationContainer> */}
    {/* <HomeScreen/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize:50,
    color:"#D92525"
  }
});

export default App; 