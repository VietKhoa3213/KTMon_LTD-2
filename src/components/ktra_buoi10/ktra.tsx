import { StyleSheet, Text, View, TextInput, Button,Image,TouchableOpacity, Alert,ImageSourcePropType, ScrollView} from 'react-native'
import React, {useState} from 'react'

type Danhba={
    id: number;
    name: string;
    phone: string;
    image: ImageSourcePropType; 
}

const DanhbaList: Danhba[] = [
    {id: 1, name: 'Nguyễn Trần Viết Khoa', phone: '0123456789', image: require('../../asset/user-icon-on-transparent-background-free-png.webp')},
    {id: 2, name: 'Trần Phước Huy', phone: '0987654321', image: require('../../asset/user-icon-on-transparent-background-free-png.webp')},
    {id: 3, name: 'Huỳnh Tấn An', phone: '0999999999', image: require('../../asset/user-icon-on-transparent-background-free-png.webp')},
    {id: 4, name: 'Lê Thành', phone: '0123451234', image: require('../../asset/user-icon-on-transparent-background-free-png.webp')},
]

const ktra = () => {
    const [danhba, setDanhba] = useState(DanhbaList);
    const [name, setName] = useState<string>('')
    const [phoneNumber,  setPhoneNumber] = useState<string>('')

    const [timkiemlienhe, setTimkiemlienhe] = useState<string>('')
    const filteredContacts = danhba.filter(item => item.name.toLocaleLowerCase().includes(timkiemlienhe.toLocaleLowerCase()))

    const [editingId, setEditingId] = useState<number | null>(null)

    const ButtonAddUser = () => {
        if(!name || !phoneNumber){
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin")
            return
        }else if (!/^\d+$/.test(phoneNumber)) {
            Alert.alert("Lỗi", "Số điện thoại chỉ được chứa số")
            return;
        }else if (!/^[0-9]{10}$/.test(phoneNumber)){
            Alert.alert("Lỗi", "Số điện thoại phải là 10 số")
            return
        }

        if(editingId !== null){
            const suaUser = danhba.map(item => item.id === editingId? {...item,name: name, phone: phoneNumber } : item)
            setDanhba(suaUser)
            setEditingId(null)
        }else{
            const newAddUser : Danhba = {
                id: danhba.length+1,
                name: name,
                phone: phoneNumber,
                image: require('../../asset/user-icon-on-transparent-background-free-png.webp')
            }
            setDanhba([...danhba,newAddUser])

        }

        setName('')
        setPhoneNumber('')
    }

    const Sualienhe = (danhba : Danhba) =>{
        setName(danhba.name),
        setPhoneNumber(danhba.phone)
        setEditingId(danhba.id)
    }

    const XoaLienhe = (id:Number, danhbas : Danhba) => {
        setDanhba(danhba.filter(item => item.id !== id))
        Alert.alert("Thông báo", `Xóa người liên hệ tên ${danhbas.name} thành công` )
    }

    const handleHuyAddStudent =() => {
       
        setEditingId(null)
        setName('')
        setPhoneNumber('')
    }
  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.textheader}>Danh bạ</Text>
            </View>
        <View style={styles.containerAddProduct}>
            <View style={styles.containerInput}>
                <TextInput 
                    placeholder='Nhập tên liên hệ'
                    value={name}
                    style={styles.textInput}
                    onChangeText={setName}
                ></TextInput>
                <TextInput 
                    placeholder='Nhập số điện thoại'
                    style={styles.textInput}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                ></TextInput>
            </View>
            <TouchableOpacity style={editingId ? styles.updatebutton : styles.Addbutton}>
                <Text style= {styles.textAddbutton} onPress={ButtonAddUser}>{editingId === null?  "Thêm liên hệ" : "Sửa liên hệ"}</Text>
            </TouchableOpacity>

            {editingId ?   
                <TouchableOpacity style={styles.huybutton}>
                    <Text style= {styles.textAddbutton} onPress={handleHuyAddStudent}>Hủy cập nhật</Text>
                </TouchableOpacity> : ""}

            <View style={styles.containerInput2}>
                <TextInput 
                    placeholder='Tìm kiếm'
                    value={timkiemlienhe}
                    style={styles.textInputSearch}
                    onChangeText={setTimkiemlienhe}
                ></TextInput>
            </View>
        </View>
        <View style={styles.containerAddProductInfo}>

            {timkiemlienhe === '' ? 
            <>
              {danhba.map((item) =>(
                <View key={item.id} style = {styles.productCard}>
                        <View  style={styles.leftsite}>
                            <Image source={item.image} style={styles.imageproducts}/>
                        </View>
                        <View style={styles.rightsite}>
                            <Text style={styles.nameProduct}>{item.name}</Text>
                            <Text style={styles.priceProduct}>{item.phone}</Text>
                            
                        </View>
                        <View style={styles.containerButton}>
                            <TouchableOpacity >
                                <Text style={styles.icon} onPress={() =>Sualienhe(item)}>✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Text style={styles.icon} onPress={() => XoaLienhe(item.id, item)}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            ))}

            </>   :  
            <>
            {filteredContacts.length==0?  
            <>
                <View style={styles.header}>
                    <Text style={styles.textheader}>Không tìm thấy liên hệ</Text>
                </View>            
            </>
            :
            <>
                 {filteredContacts.map((item) =>(
                <View key={item.id} style = {styles.productCard}>
                        <View  style={styles.leftsite}>
                            <Image source={item.image} style={styles.imageproducts}/>
                        </View>
                        <View style={styles.rightsite}>
                            <Text style={styles.nameProduct}>{item.name}</Text>
                            <Text style={styles.priceProduct}>{item.phone}</Text>
                            
                        </View>
                        <View style={styles.containerButton}>
                            <TouchableOpacity >
                                <Text style={styles.icon} onPress={() =>Sualienhe(item)}>✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Text style={styles.icon} onPress={() => XoaLienhe(item.id, item)}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                </View>
                ))}
            </>
            }
            </>      
            } 
        </View>
    </ScrollView>
  )
}

export default ktra

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30

    },
    textheader: {
        fontSize: 25,
        color: '#D41478',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    containerAddProduct: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    containerInput: {
        width: '96%',
        marginBottom: 20,

    },

    containerInput2:{
        width: '96%',
        marginTop: 10,
    },

    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D41478',
        backgroundColor: '#FFDADA',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },

    textInputSearch: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D41478',
        backgroundColor: '#FFF2F4',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },

    textButton: {
        fontSize: 20,
        color: '#fff',
    },

    textAddbutton: {
        fontSize: 20,
        color: '#fff',
    },

    productCard: {
        flexDirection: 'row',
        width: '96%',
        height: 100,
        backgroundColor: '#FFF2F4',
        borderRadius: 10,
        marginLeft: 3,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    leftsite: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10
    },

    Addbutton: {
        backgroundColor: '#D41478',
        width: '96%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: -10,
    },
    updatebutton: {
        backgroundColor: 'green',
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -10,
        marginLeft: -190,
    },
     huybutton: {
        backgroundColor: 'red',
        width: '44%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 210,
        marginTop: -50
    },
    
    rightsite: {
        flex: 2,
        marginLeft: -19,
        marginTop:25,
    },
    imageproducts: {
        marginLeft:-30,
        width: 80,
        height: 80,
    },
    nameProduct: {
        fontSize: 20,
        color: '#D41478',
        fontWeight: '500'
    },
    priceProduct: {
        fontSize: 15,
        color: '#2980b9',
    },
    containerAddProductInfo: {
        flex: 3.5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
  
    icon: {
        fontSize: 20,
        color: '#fff',
    },
    containerButton: {
        flex:.7,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 30,
        gap: 15,
    },
    

 
})
