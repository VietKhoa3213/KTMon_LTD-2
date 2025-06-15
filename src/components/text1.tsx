import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'

type text1Props = {
  name: string,
  age: number,
}


const text1 = (props : text1Props) => {

    //state
    const [name, setName] = useState(props.name)
    const [age, setAge] = useState(props.age)

    const clickBtn = () => {
        setName("Nguyễn Văn Khoa")
        setAge(18)
    }

  return (
    <View>
        {/* state */}
      <Text>{name}</Text>
      <Text>{age}</Text>
        {/* props */}
      <Text>{props.name} va {props.age}</Text>
      <Button title='Click' onPress={clickBtn}/>
    </View>
  )
}

export default text1

const styles = StyleSheet.create({})