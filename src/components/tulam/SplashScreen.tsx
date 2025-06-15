import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';
import { useNavigation } from '@react-navigation/native';

type navigateProp = NativeStackScreenProps<RootStackParamList, 'Splash'> 



const SplashScreen = ({navigation} : navigateProp) => {


    useEffect (() => {
        const CheckLogin = async () =>{
            const data = await AsyncStorage.getItem('storeUser');
    
            if(data){
                const user = JSON.parse(data)
        
                if(user.role === 1){
                    navigation.replace('HomeAdmin')
                }else if(user.role === 2){
                    navigation.replace('Home', user)
                }
            }else{
                navigation.replace('Home')
            }
        }
        CheckLogin()
    }, [])

    return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
})