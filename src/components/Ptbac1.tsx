import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'

const Ptbac1 = () => {
    const [a, setA] = useState<number>(0)
    const [b, setB] = useState<number>(0)
    const [result, setResult] = useState<string>("")

    const Clicked = () => {
        if (isNaN(a) || isNaN(b)) {
           Alert.alert('Error', 'Vui lòng nhập số hợp lệ.');
            return;
        }else{
           
            if (a === 0) {
                if (b === 0) {
                    setResult("Phương trình vô số nghiệm"); 
                } else {
                    setResult("Phương trình vô nghiệm"); 
                }
            }
            else {
                setResult(`Phương trình có nghiệm x = ${(-b / a).toFixed(2)}`);
            }
        }
    }

    return (
        <View style={styles.screen}>
            
            <Text style={styles.title}>Giải Phương Trình Bậc Nhất</Text>
            <Text style={styles.formula}>ax + b = 0</Text>
            
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Hệ số a:</Text>
                <TextInput 
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder='Nhập hệ số a'
                    value={a.toString()}
                    onChangeText={(text) => setA(Number(text))}
                />
            </View>
            
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Hệ số b:</Text>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder='Nhập hệ số b'
                    value={b.toString()}
                    onChangeText={(text) => setB(Number(text))}
                />
            </View>

            <Button 
                title='Giải Phương Trình' 
                onPress={Clicked}
                color="#2980b9"
            />

            {result !== "" && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultLabel}>Kết quả:</Text>
                    <Text style={styles.resultText}>{result}</Text>
                </View>
            )}
        </View>
    )
}

export default Ptbac1

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
        textAlign: 'center',
    },
    formula: {
        fontSize: 22,
        color: '#3498db',
        marginBottom: 25,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    inputGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#444',
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    resultContainer: {
        marginTop: 30,
        backgroundColor: '#e8f4f8',
        borderRadius: 10,
        padding: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#3498db',
    },
    resultLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495e',
        marginBottom: 5,
    },
    resultText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2980b9',
        textAlign: 'center',
    }
})