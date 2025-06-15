import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react';

const Maydem = () => {
    const [count, setCount] = useState(0);
    
    const nhannut = () => {
        setCount(count + 1);
    }
    
  return (
    <View style={styles.container}>
      <Text>Maydem</Text>
      <Text style={styles.header}> Welcome <br /> Máy Đếm</Text>
             <Text style={styles.countText}>Sô lượt nhất:  {count}</Text>
        <Button title = 'Nhấn vào đây!' onPress={nhannut} ></Button>
    </View>
  )
}

export default Maydem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', 
  },
  content: {
    alignItems: 'center',
  },
  countText: {
        fontSize: 30,
        marginBottom: 20, 
        color: '#333', 
      },
      header: {
        top:-250,
        display:'flex',
        fontSize: 50,
        color: '#D92525', 
      },
    
})