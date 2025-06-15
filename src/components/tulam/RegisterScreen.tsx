import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity,ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import { 
  getDBConnection,
  checkUserRegister,
  createUser

 } from './database';
//component thong bao
import {
  NotificationModal, 
  NotificationModalifCreate} from './NotificationModal';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp  } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';

type navigateProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export type User = {
    id:number,
    name: string,
    password: string,
    avatar: string,
    role:number,
    email:string
}

const RegisterScreen = () => {
    const [username,setUsername] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string> ('')
    const [avatar,setAvatar] = useState<string>('')
    const [role, setRole] = useState<number>(2)
    const [email, setEmail] = useState<string>('')


    const [check, setCheck] = useState<boolean>(false)
    const [message, setMessae] = useState<string>('')
    const [ifCreateSucces, setIfCreateSucces]= useState<number | null> (null)

    const navigate = useNavigation<navigateProp>()
  React.useEffect(()=>{
      init()
  }, [])

  const init = async () =>{
      const db = getDBConnection()
  }

 const getImageSource = (img: string) => {
        if (img.startsWith('file://')) {
          return { uri: img }; // Ảnh từ thư viện
        }
     
        // Ảnh tĩnh từ assets
        switch (img) {
          case 'hinh1.jpg':
            return require('../../asset/user-icon-on-transparent-background-free-png.webp');
          case 'hinh2.jpg':
            return require('../../asset/user-icon-on-transparent-background-free-png.webp');
          // Thêm các ảnh khác nếu cần
          default:
            return require('../../asset/user-icon-on-transparent-background-free-png.webp'); // fallback nếu ảnh không tồn tại
        }
      };
    
      
      const handlePickImage = () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.error('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets[0]) {
            setAvatar(response.assets[0].uri ?? '');  // Nếu uri là undefined, thay thế bằng null
          }
        });
      };    

      const hanldeCreateUser = async () => {
        if(!username || !email || !password || !passwordConfirm){
          setMessae('Vui lòng nhập đầy đủ thông tin')
          setCheck(true)
          return
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
          setMessae('Email không hợp lệ')
          setCheck(true)
          return
        }

        if(passwordConfirm !== password){
          setMessae('Mật khẩu không trùng khớp')
          setCheck(true)
          return
        }
        
        const db = await getDBConnection()
        if(await checkUserRegister(db, username,email) !== true){
          setMessae('Email hoặc tên đăng nhập đã được sử dụng.')
          setCheck(true)
          return
        }
        
        await createUser(db, username,password,avatar,role,email)
        setMessae('Đăng ký thành công. Quay trở lại trang đăng nhập')
        setCheck(true)
        setIfCreateSucces(1)
        setAvatar('')
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setUsername('')


      }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
            <Image 
            source={require('../../asset/flat-cartoon-style-shop-facade-front-view-modern-flat-storefront-or-supermarket-design-png.webp')}
            style = {styles.imageStyle}
            ></Image>
            <Text style= {styles.registerText}>Đăng ký</Text>
      </View>

      {ifCreateSucces === null? 
      <>
        <NotificationModal
          check={check}
          message={message}
          onClose={() => setCheck(false)}
        />
      </>
      :
      <>
        <NotificationModalifCreate
          check={check}
          message={message}
          onClose={() => {
            setCheck(false),
            setIfCreateSucces(null)}}
          onLogin={() => {
            setCheck(false),
            setIfCreateSucces(null),
            navigate.navigate('Login')
          }}
        />
      </>
    }

    

      <View style={styles.RegisterBox}>
            <View style={styles.inputBox}>
                <Text style={styles.TextInputBox}>Tên đăng nhập: </Text>
                <TextInput
                    value={username}
                    style={styles.styleInputBox}
                    onChangeText={setUsername}
                >
              </TextInput>

              <Text style={styles.TextInputBox}>Emai: </Text>
                <TextInput
                    value={email}
                    style={styles.styleInputBox}
                    onChangeText={setEmail}
                >
              </TextInput>

              <Text style={styles.TextInputBox}>Mật khẩu: </Text>
                <TextInput
                    value={password}
                    style={styles.styleInputBox}
                    secureTextEntry 
                    onChangeText={setPassword}
                >
              </TextInput>

              <Text style={styles.TextInputBox}>Xác nhận mật khẩu: </Text>
                <TextInput
                    value={passwordConfirm}
                    style={styles.styleInputBox}
                    secureTextEntry 
                    onChangeText={setPasswordConfirm}
                >
              </TextInput>

              
              <View style={styles.imageBox2}>
                <Text style={styles.TextInputBox2}>Chọn ảnh đại diện: </Text>
                <View style={styles.imageBox}>
                  <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
                    <Text style={styles.buttonText}>{avatar ? 'Chọn lại hình ảnh' : 'Chọn hình ảnh'}</Text>
                  </TouchableOpacity>
                              
                    {avatar && (
                        <Image source={getImageSource(avatar)} style={styles.selectedImage} />
                    )}
                </View>
              </View>
            </View>
            
            
            <View style={styles.btnbox}>
              <TouchableOpacity style={styles.btnRegister} onPress={hanldeCreateUser}> 
                <Text style={styles.btnRegisterText}>Tạo tài khoản</Text>
              </TouchableOpacity>
          </View>
      </View>
      <View style={styles.loginNavigatebox}>
          <Text style={styles.loginNavigateText}>Đã có tài khoản?</Text>
          <TouchableOpacity style={styles.loginNavigatebtn} onPress={() => navigate.navigate('Login')}>
            <Text style={styles.loginNavigateText2}> Đăng nhập</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container : {
    height: 'auto',
  },
  header: {
    height: 300,
    justifyContent: 'center'
  },
  imageStyle: {
    resizeMode: 'cover',
    width: 200,
    height: 200,
    alignSelf: 'center'
  },

  registerText : {
    textAlign : 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold'
  },
  RegisterBox: {
    height: 400,
    alignItems:'center',
    marginBottom: 150
  },
  inputBox: {
    width: '85%',
    height: '80%',

  },
  TextInputBox: {
    color: '#A6A6A6',
    fontWeight: '500',
  },
  TextInputBox2: {
    color: '#A6A6A6',
    fontWeight: '500',
   

    display:"flex",

  },
  styleInputBox: {
    borderWidth: .5,
    width: '100%',
    height: '13%',
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
  buttonText : {
    color: '#fff',
  },
imageBox: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  


},

imageBox2: {
  backgroundColor: '#D9D9D9',
  marginTop: 15,
  padding: 10,
  borderRadius: 15
},

btnbox:{
  marginTop: 150
},

  imagePicker: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 15,
        marginVertical: 10,
        width: '40%',
        alignItems: 'center',
        height: 40,
        alignSelf:'center'
    },
    selectedImage: {
        width: 150,
        height: 150,
        marginVertical: 10,
        resizeMode: 'contain',
        borderRadius: 15
    },

  loginNavigatebox: {
    flexDirection: 'row',
    justifyContent:'center'   
  },
  loginNavigateText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },

  loginNavigatebtn: {
    
  },
  loginNavigateText2: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 16,
    fontStyle:'italic',
    textDecorationLine:'underline'
  }
})