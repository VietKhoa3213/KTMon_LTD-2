import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Con_Cha = () => {
  const [name, setName] = useState<string>("")
  const [age, setAge] = useState<number>(0)

  const ChangeData = (newName : string , newAge : number ) =>{
    setName(newName)
    setAge(newAge)
  }
  
  return (
    <View style={styles.container}>
      <Text>Component cha</Text>
      <TextInput 
        placeholder='Nhập tên của bạn'
        value={name}
        onChangeText={setName}
      ></TextInput>
      <TextInput 
        placeholder="Nhập tuổi của bạn"
        value={age.toString()}
        onChangeText={(text) => setAge(Number(text))}
      ></TextInput>

      <Text>Họ tên của bạn là {name} và tuổi là {age}</Text>
     <Cha_Con name={name} age={age} ChangeData = {ChangeData}/> 
    </View>
  )
}

type Props = {
  name:string,
  age:number,
  ChangeData: (newName: string, newAge: number) => void,
}

const Cha_Con = (props : Props) =>{
  const [newName, setNewName] = useState<string>(props.name)
  const [newAge, setNewAge] = useState<number>(props.age)

  const clicked = () => {
      props.ChangeData(newName, newAge)
    }

    useEffect(() => {
      setNewName(props.name)
      setNewAge(props.age)
    }, [props.name, props.age])

  return (
    <View style={styles.containerCon}>
      <Text>Component con</Text>
      <Text>Tên từ cha : {props.name}</Text>
      <Text>Tuổi từ cha : {props.age}</Text>

      <TextInput 
        placeholder='Nhập tên mới của bạn'
        value={newName}
        onChangeText={setNewName}
      ></TextInput>
      <TextInput
        placeholder='Nhập tuổi mới của bạn'
        value={newAge.toString()}
        onChangeText = {(text) => setNewAge(Number(text))}
        ></TextInput>

      <Text>Tên mới của bạn là: {newName}, tuổi mới của bạn là {newAge}</Text>
      <Button title = "truyền thông tin sang cha" onPress={clicked}></Button>
    </View>
  )
}

export default Con_Cha

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#FFE5B4', 
        padding: 20,
        marginBottom: 20,
        borderRadius: 12,
        elevation: 7, 
  },

  containerCon : {
    backgroundColor: '#B2DFDB',
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  }
})