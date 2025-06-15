import { StyleSheet, Text, TextInput, View,Button } from 'react-native'
import React, { useEffect, useState } from 'react'



const Cha = () => {
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const changeData = (newName: string, newAge: number) => {
        setName(newName);
        setAge(newAge);
    }
  return (
    <View style={styles.container}>
      <Text>Component Cha</Text>
        <TextInput
            placeholder='Nhập tên của bạn'
            value={name}
            onChangeText={setName}
            ></TextInput>
        <TextInput
            placeholder='Nhập tuổi của bạn'
            value={age.toString()}
            onChangeText={(text) => setAge(parseInt(text))}
            ></TextInput>

        <Text>Xin chào {name} và bạn {age} tuổi</Text>
        <Con name = {name} age={age} handleDataChange = {changeData}/>
    </View>
  )
}


type ConProps = {
    name: string,
    age: number,
    handleDataChange: (newName: string, newAge: number) => void,
}

const Con = (props : ConProps) => {
    const [newName,setNewName] = useState<string>(props.name);
    const [newAge,setNewAge] = useState<number>(props.age);

  useEffect(() => {
    setNewName(props.name);
    setNewAge(props.age);
  }, [props.name, props.age]);

    const Clicked = () => {
        props.handleDataChange(newName, newAge);
    }
    
  return (
    <View style={styles.containercon}>
      <Text>Component Con</Text>
      <Text>Tên từ cha : {props.name}</Text>
      <Text>Tuổi từ cha : {props.age}</Text>
     <TextInput
            placeholder='Nhập tên của bạn'
            value={newName}
            onChangeText={setNewName}
            ></TextInput>
        <TextInput
            placeholder='Nhập tuổi của bạn'
            value={newAge.toString()}
            onChangeText={(text) => setNewAge(Number(text))}
            ></TextInput>

        <Text>Xin chào {newName} và bạn {newAge} tuổi</Text>
        <Button title='Truyền thông tin mới lên cha' onPress={Clicked}></Button>
    </View>
  )
}



export default Cha

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFE5B4', 
        padding: 20,
        marginBottom: 20,
        borderRadius: 12,
        elevation: 5, 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    containercon: {
        backgroundColor: '#B4D8FF', 
        padding: 20,
        borderRadius: 12,
        elevation: 5,
    }

  });
  