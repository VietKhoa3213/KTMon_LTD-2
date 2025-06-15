import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const layout = () => {
  return (
    <View style = {styles.container}>
      <View style = {styles.vung1}>
        <Text style = {styles.text}>Vùng 1</Text>
      </View>  
      <View style = {styles.vung2}>
        <Text style = {styles.text}>Vùng 2</Text>
      </View>
      <View style = {styles.vung3}>
        <Text style = {styles.text}>Vùng 3</Text>
      </View>
    </View>
  )
}

export default layout

const styles = StyleSheet.create({
    //Cân đều theo chiều dọc
    // container: {
    //     flex:1,
    // },
    // vung1: {
    //     backgroundColor: '#FF5733',
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // vung2: {
    //     backgroundColor: '#33FF57',
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // vung3: {
    //     backgroundColor: '#3357FF',
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // text: {
        
    //     fontSize: 30,
    //     color: '#fff',
    // }
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },

    vung1: {
        backgroundColor: '#FF5733',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vung2:{
        backgroundColor: '#33FF57',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vung3: {
        backgroundColor: '#3357FF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 20,
        color: 'black',
        padding: 30,
    }



})