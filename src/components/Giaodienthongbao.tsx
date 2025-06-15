import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

type HienthongbaoProp = {
  name: string,
};

const Giaodienthongbao = (props: HienthongbaoProp) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(props.name);

  const handlePress = () => {
    if (inputValue.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập tên của bạn');
    } else {
      Alert.alert(`Xin chào ${inputValue}`, `Hello, ${inputValue}`);
    }
  };

  return (
    <View style={styles.messageContainer}>
      <Text style={styles.titleText}>Nhập tên của bạn:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn"
        value={inputValue}
        onChangeText={setInputValue}
        ref={inputRef}
      />
      <Text style={styles.messageText}>Hello, {inputValue || '...'}</Text>
      <Button title="Nhấn vào tôi" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b2ebf2',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  titleText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#00796b',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 24,
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default Giaodienthongbao;