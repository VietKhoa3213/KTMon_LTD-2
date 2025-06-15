import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native'
import React, { useState,useRef } from 'react'

type Ptb1Props = {
    soA: number,
    soB: number,
}

const Ptb1 = (props: Ptb1Props) => {
    const inputRef = useRef(null);
    const [a, setA] = useState(props.soA.toString())
    const [b, setB] = useState(props.soB.toString())

    const [result, setResult] = useState('')

    const giaiptb1 = () => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            Alert.alert('Error', 'Vui lòng nhập số hợp lệ.');
            return;
        }
        
        if(numA !== 0 ){
            const result = -numB / numA;
            setResult(`Phương trình có nghiệm x = ${result}`);
        }else if(numB === 0){
            setResult('Phương trình vô số nghiệm');
        }else{
            setResult('Phương trình vô nghiệm');
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giải phương trình bậc một: ax + b = 0</Text>

        <TextInput 
            style={styles.input}
            placeholder='Nhập a'
            keyboardType='numeric'
            onChangeText={setA}
            value={a}
            />
        <TextInput
            style={styles.input}
            placeholder='Nhập b'
            keyboardType='numeric'
            onChangeText={setB}
            value={b}/>
        <Button title='Giải PT' onPress={giaiptb1}/>
        <Text style={styles.resultText}>{result}</Text>
    </View>
  )
}

export default Ptb1

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#b2ebf2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20, 
        textAlign: 'center',
      },
      input: {
        height: 45,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15, 
        paddingHorizontal: 10,
        width: '80%', 
        backgroundColor: '#ffffff', 
      },
      resultText: {
        marginTop: 20, 
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue', 
      },

})