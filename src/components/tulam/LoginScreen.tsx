import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp  } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getDBConnection,
  Login
} from './database'

import { NotificationModal } from './NotificationModal';

type navigateProp = NativeStackNavigationProp<RootStackParamList, 'Register'> 
type navigateGoHome = NativeStackNavigationProp<RootStackParamList, 'Home'>

const LoginScreen = () => {
    const [Usernameoremail, setUsernameoremail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [check, setCheck] = useState<boolean>(false)
    const [message,setMessae] = useState<string>('')

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const navigategoHome = useNavigation<navigateGoHome>()

    const handleLogin = async () => {
      const db = await getDBConnection()
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Usernameoremail)


      if(!Usernameoremail || !password){
        setCheck(true)
        setMessae('Vui lòng nhập đầy đủ')
        return
      }

        const user = await Login (db,Usernameoremail, Usernameoremail ,password, isEmail? true : false)
      
      if (user){
        setCheck(true)
        setMessae(`Đăng nhập thành công vai trò ${user.role === 1 ? 'admin' : 'user'}` )
        
        await AsyncStorage.setItem('storeUser', JSON.stringify(user) )
        
        setTimeout(() => {
          if (user.role === 2 )
            {navigate.navigate('Home', user)}
          else if (user.role === 1)
            {navigate.navigate('HomeAdmin', {categoryId: 0})}
        },1000) 
      }else{
        setCheck(true)
        setMessae('Mật khẩu hoặc tên đăng nhập (email) không đúng')
      }

   
    
      setUsernameoremail('')
      setPassword('')

      


    }
  return (
    <ScrollView style={styles.container}>
         <View style={styles.header}>
            <Image 
              source={require('../../asset/flat-cartoon-style-shop-facade-front-view-modern-flat-storefront-or-supermarket-design-png.webp')}
              style = {styles.imageStyle}
              ></Image>
              <Text style= {styles.loginText}>Đăng nhập</Text>
          </View> 

          <NotificationModal
            check = {check}
            message={message}
            onClose={() => setCheck(false)}
          />

          <View style={styles.LoginBox}>
              <View style={styles.LoginInputBox}>
                <Text style = {styles.inputText}>Tên đăng nhập hoặc email</Text>
                <TextInput
                  style={styles.inputStyle}
                  value={Usernameoremail}
                  onChangeText={setUsernameoremail}
                >
                  </TextInput>  

                  <Text style = {styles.inputText}>Mật khẩu</Text>
                <TextInput
                  style={styles.inputStyle}
                  value={password}
                  secureTextEntry
                  onChangeText={setPassword}
                >
                  </TextInput> 
              </View>

            <View style={styles.btnbox}>
                <TouchableOpacity style={styles.btnRegister} onPress={handleLogin}> 
                  <Text style={styles.btnRegisterText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
          </View>

        <View style={styles.registerNavigatebox}>
            <Text style={styles.registerNavigateText}>Chưa có tài khoản?</Text>
            <TouchableOpacity style={styles.registerNavigatebtn} onPress={() => navigate.navigate('Register')}>
                <Text style={styles.registerNavigateText2}> Đăng ký</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },

  registerNavigatebox: {
    flexDirection: 'row',
    justifyContent:'center'   
  },
  registerNavigateText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },

  registerNavigatebtn: {
    
  },
  registerNavigateText2: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 16,
    fontStyle:'italic',
    textDecorationLine:'underline'
  },
  header: {
    height: 400,
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  loginText : {
    textAlign : 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold'
  },
  LoginBox: {
    height: 300,
    alignItems:'center',
    marginBottom: 150
  },
  LoginInputBox: {
    width: '85%',
    height: '80%',

  },
  inputText: {
    color: '#A6A6A6',
    fontWeight: '500',
  },
  TextInputBox2: {
    color: '#A6A6A6',
    fontWeight: '500',
   

    display:"flex",

  },
  inputStyle: {
    borderWidth: .5,
    width: '100%',
    height: '18%',
    borderRadius: 15,
  },
  btnRegister : {
    borderWidth: 1,
    padding: 10,
    paddingEnd: 100,
    paddingStart: 100,
    borderRadius: 15,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  btnRegisterText : {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  btnbox:{
  marginTop: 150
},
})