import { StyleSheet, Text, View,TextInput, TouchableOpacity,Button } from 'react-native'
import React, { useState } from 'react'

type Pheptinh = {
  label: string, value: "cong" | "tru" | "nhan" | "chia"
};
const pheptinh: Pheptinh[] = [
    {label: "Cộng", value: "cong"},
    {label: "Trừ", value: "tru"},
    {label: "Nhân", value: "nhan"},
    {label: "Chia", value: "chia"}
]


const Maytinh1 = () => {
    const [numA, setNumA] = useState<number>(0);
    const [numB, setNumB] = useState<number>(0);
    const [phepTinh, setPhepTinh] = useState<"cong" | "tru" | "nhan" | "chia">("cong");
    const [result, setResult] = useState<number | String>('');

    const calculateResult = () => {
        switch (phepTinh) {
            case "cong":
                setResult(numA + numB);
                break;
            case "tru":
                setResult(numA - numB);
                break;
            case "nhan":
                setResult(numA * numB);
                break;
            case "chia":
                if (numB !== 0) {
                    setResult (`${(numA / numB).toFixed(2)}`);
                } else {
                    setResult("Không thể chia cho 0");
                }
                break;
        }
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Máy tính </Text>
    
          <Text style={styles.label}>Nhập số a:</Text>
          <TextInput
            style={styles.input}
            placeholder='Nhập số a'
            keyboardType='numeric'
            value={numA.toString()}
            onChangeText={(text) => setNumA(Number(text) || 0)}
          />
    
          <Text style={styles.label}>🔢 Nhập số b:</Text>
          <TextInput
            style={styles.input}
            placeholder='Nhập số b'
            keyboardType='numeric'
            value={numB.toString()}
            onChangeText={(text) => setNumB(Number(text) || 0)}
          />
    
          <Text style={styles.label}>Chọn phép tính:</Text>
          <View style={styles.radioGroup}>
            {pheptinh.map(pt => (
              <TouchableOpacity
                key={pt.value}
                style={styles.radioContainer}
                onPress={() => setPhepTinh(pt.value)}
              >
                <View style={styles.outerCircle}>
                  {phepTinh === pt.value && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioLabel}>{pt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
            
            <Button title='Tính' onPress={calculateResult} color="#2980b9" />

          <Text style={styles.result}>✅ Kết quả: {result}</Text>
        </View>
      )
    }
    
    export default Maytinh1
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#2E86C1',
      },
      label: {
        fontSize: 18,
        marginTop: 12,
        color: '#333',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 6,
        backgroundColor: '#fff',
      },
      radioGroup: {
        marginTop: 10,
        marginBottom: 10,
      },
      radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
      },
      outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      },
      innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007AFF',
      },
      radioLabel: {
        fontSize: 16,
        color: '#333',
      },
      result: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 30,
        textAlign: 'center',
        color: '#D92525',
      },
    });
    