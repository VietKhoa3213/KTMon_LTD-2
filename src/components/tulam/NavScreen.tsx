import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp  } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';
import { NotificationModalifLogout,NotificationModalifaddToCart } from './NotificationModal';
import AsyncStorage from "@react-native-async-storage/async-storage";


type homeUserScreenProp = RouteProp<RootStackParamList,'Home'>
type navigateProp = NativeStackNavigationProp<RootStackParamList,'Login'>
export const NavSrceen = () =>{
    const route = useRoute<homeUserScreenProp>();
    const navigate = useNavigation<navigateProp>();
    const [checkUserNull,setCheckUserNull] = useState<number >(route.params?.id ?? 0)
    const [check, setCheck] = useState<boolean>(false)
    const [message, setMessae] = useState<string>('')
    return (
        <>
           <NotificationModalifLogout
                    check={check}
                    message={message}
                    onClose={()=>setCheck(false)}
                    onLogin={ async ()=> { 
                        setCheckUserNull(0)                     
                        setCheck(false)
                        await AsyncStorage.removeItem('storeUser')
                    }}
                />

        <View style={styles.navStyle}>

            {checkUserNull !== 0? 
            <>
                <View style = {styles.TopNav}>
                    <Text style={styles.TopNavText}>Xin chào {route.params?.name}</Text>
                    <TouchableOpacity style={styles.button} 
                    onPress={()=> {
                                    setCheck(true)
                                    setMessae('Bạn có muốn đăng xuất không?')}}>
                        <Text style={styles.TopNavBtn}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </>
            :
             <>
                <View style = {styles.TopNav}>
                    <Text style={styles.TopNavText}>Có tài khoản? </Text>
                    <TouchableOpacity style={styles.button} 
                    onPress={()=> {navigate.navigate('Login')}}>
                        <Text style={styles.TopNavBtn}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </>
            }
            
            <View style={styles.BotNav}>
                <TouchableOpacity style={styles.button2} >
                    <Text style={styles.BotNavBtn}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => navigate.navigate('Category')}>
                    <Text style={styles.BotNavBtn}>Danh mục</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => navigate.navigate('UserInfo', { id: checkUserNull, name: route.params?.name ?? '' })}>
                    <Text style={styles.BotNavBtn}>Tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}


const styles = StyleSheet.create({

    TopNav: {
        flexDirection: 'row',
        justifyContent:'space-between',
        height: 30,
        alignItems: 'center',
        borderWidth: .17,
    },
    TopNavText: {
        fontSize: 17,
        marginLeft: '20%'
    },
    button: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
        marginRight: 3,
        backgroundColor: '#B4C0D9',
    },
    TopNavBtn: {
        fontSize: 15 ,
    },
    BotNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        marginStart: 10,
        marginEnd: 10,
    },
    button2: {
       
        borderWidth: 1,
        paddingRight:'9%',
        paddingLeft:'9%',
        paddingTop:'1%',
        paddingBottom:'1%',
        borderRadius: 15,
        backgroundColor: '#078C8C',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    BotNavBtn: {
        color: 'white',
        fontWeight: 700
    },
    productContainer: {
  paddingHorizontal: 10,
  marginTop: 20,
},
 navStyle: {

    },
})