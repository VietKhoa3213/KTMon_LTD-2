import { StyleSheet, Text, View,ScrollView,TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from './navigation/types';
import { NativeStackNavigationProp  } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { 
    getDBConnection,

    deleteProduct,

    getUser,
    checkUserRegister,
    createUser,
    updateUserS,
    deleteUser,
    getUserAdmin,
    getUseruser,
    getUserNoRole

} from './database'

import { NotificationModalifLogout, NotificationModal} from './NotificationModal';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeAdmin'>;

type User = {
    id:number,
    name: string,
    password: string,
    avatar: string,
    role:number,
    email:string
    
}




const userAdmin = () => {
    const [users, setUsers] = useState<User[]>([])

    const [username,setUsername] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string> ('')
    const [avatar,setAvatar] = useState<string>('')
    const [role, setRole] = useState<number >(0)
    const [email, setEmail] = useState<string>('')
    const [rolecheck, setRolecheck] = useState <boolean> (false)
   
    
    const [editingId, setEditingId] = useState<number | null>(null)

    const [searchUser, setSearchUser] = useState<string> ('')
    const seatchUserLN = users.filter((item) => item.name.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()))

    const navigation = useNavigation<NavigationProp>();

    const [check, setCheck] = useState<boolean>(false)
    const [message, setMessae] = useState<string>('')
    const [logoutCheck, setLogoutCheck] = useState<number>(0)

    const [adminUser, setAdminuser] = useState<User[]> ([])
    const [User, setuser] = useState<User[]> ([])
    const [UsernoRole, setUsernoRole] = useState<User[]>([])
    
    React.useEffect(() => {
        initDB();
    },[])

    const initDB = async () =>{
        const db = await getDBConnection()

        const userstored = await getUser(db)
        setUsers(userstored)

        const userAdmin = await getUserAdmin(db)
        setAdminuser(userAdmin)

        const usernoRole = await getUserNoRole(db)
        setUsernoRole(usernoRole)

        const useruser = await getUseruser(db)
        setuser(useruser)
    }


    const handleUser = async () => {
        if(!username || !email || !password || !passwordConfirm || !role) {
            Alert.alert('Thông báo','Vui lòng nhập đầy đủ thông tin User cần thêm')
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setMessae('Email không hợp lệ')
            setCheck(true)
            setLogoutCheck(1)
            return
        }
        
        if(passwordConfirm !== password){
            setMessae('Mật khẩu không trùng khớp')
            setCheck(true)
            setLogoutCheck(1)
            return
        }
                
        const db = await getDBConnection()

        if(editingId === null){
            if(await checkUserRegister(db, username,email) !== true){
                    setMessae('Email hoặc tên đăng nhập đã được sử dụng.')
                    setCheck(true)
                    setLogoutCheck(1)
                return
            }
        }

        if(editingId === null) {
            await createUser (db, username, password,avatar,role,email)
        }else if (editingId !== null){
            if(role == 1 && rolecheck == false){
                 Alert.alert(
                'Thông báo',
                `Bạn có chắc chắn muốn cấp quyền Admin cho User tên ${username} này? `,
                    [
                        {
                            text: 'Hủy',
                            style: 'cancel'
                        },
                        {
                            text:"Đồng ý",
                            onPress: async () => {
                                const db = await getDBConnection()
                                await updateUserS (db, username, password,avatar,role,email,editingId)
                                const updateUser = await getUserAdmin(db) 
                                const updateUser2 = await getUseruser(db)
                                const updateUser3 = await getUserNoRole(db)
                                setuser(updateUser2)
                                setEditingId(null)
                                setAdminuser(updateUser)
                                setUsernoRole(updateUser3)
                                setUsername('')
                                setAvatar('')
                                setEmail('')
                                setRole(0)
                                setPassword('')
                                setPasswordConfirm('')       
                            }
                            
                        }
                    ]
                )
                return
            }else {
                await updateUserS (db, username, password,avatar,role,email,editingId)
            }
           
        }
        const updateUser = await getUseruser(db)
        const UpdataUserAdmin = await getUserAdmin(db)
        const updateUser3 = await getUserNoRole(db)
        setUsernoRole(updateUser3)
        setAdminuser(UpdataUserAdmin)
        setuser(updateUser)
        setEditingId(null)
        setUsername('')
        setAvatar('')
        setEmail('')
        setRole(0)
        setPassword('')
        setPasswordConfirm('')
        
      

    }



    const getImageSource = (img: string) => {
        if (img.startsWith('file://')) {
          return { uri: img }; // Ảnh từ thư viện
        }
     
        // Ảnh tĩnh từ assets
        switch (img) {
          case 'hinh1.jpg':
            return require('../../asset/user-icon-on-transparent-background-free-png.webp');
          case 'hinh2.jpg':
            return require('../../asset/user-icon-on-transparent-background-free-png.webp');
          // Thêm các ảnh khác nếu cần
          default:
            return require('../../asset/user-icon-on-transparent-background-free-png.webp'); // fallback nếu ảnh không tồn tại
        }
      };
    
      
      const handlePickImage = () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.error('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets[0]) {
            setAvatar(response.assets[0].uri ?? '');  // Nếu uri là undefined, thay thế bằng null
          }
        });
      };

      const handleGetEditting = (user : User) => {
        setEditingId(user.id)
        setUsername(user.name)
        setAvatar(user.avatar)
        setEmail(user.email)
        setRole(user.role)
        setPassword(user.password)
        setPasswordConfirm(user.password)
        setRolecheck(role === 1? true : false )
      }

      const handleCancelUpdateProduct = () =>{
        setEditingId(null)
        setUsername('')
        setAvatar('')
        setEmail('')
        setRole(0)
        setPassword('')
        setPasswordConfirm('')
      }

      const handleDeleteProduct = async (id : number, name: string, role: number) => {
        if(role !== 1){
            Alert.alert(
                'Thông báo',
                `Bạn có chắc chắn muốn xóa User tên ${name} này? `,
                [
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    },
                    {
                        text:"Xóa",
                        onPress: async () => {
                            const db = await getDBConnection()
                            await deleteUser (db, id)
                            const updateUser = await getUserAdmin(db)
                            const updateUser2 = await getUseruser(db)
                            const updateUser3 = await getUserNoRole(db)
                            setUsernoRole(updateUser3)
                            setAdminuser(updateUser)
                            setuser(updateUser2)    
                            setUsername('')
                            setPasswordConfirm('')
                            setAvatar('')
                            setEmail('')
                            setRole(0)
                            setPassword('')
                        }
                        
                    }
                ]
            )
        } else {
            Alert.alert('Thông báo', `Không thể xóa User tên ${name} này vì User này đang có quyền admin`)
        }

      }

      const pickerPlaceholder = {
        label: 'Chọn Vai trò cho user',
        value: 0,
        color: '#9EA0A4',
    };

   

  return (
    

    <View style ={{flex: 1}}>
        {logoutCheck === 0 ? 
            <NotificationModalifLogout
                check = {check}
                message={message}
                onClose={() => setCheck(false)}
                onLogin={() => navigation.navigate('Login')}
            />
            :
                <NotificationModal
                    check = {check}
                    message={message}
                    onClose={() => {setCheck(false),setLogoutCheck(0)}}
                />
        }
        
        <View style={styles.headerComp}>
                <Text style = {styles.textHeaderComp}>Admin Dashboard</Text>
                <TouchableOpacity 
                onPress={() => {setCheck(true)
                                setMessae('Bạn có muốn đăng xuất?')
                }}>
                    <Text style = {styles.textHeaderComp2}>Đăng xuất</Text>
                </TouchableOpacity>
        </View>
        <ScrollView style={{ paddingBottom: 60 }}>
        <View style={styles.containerInput}>
            <Text style = {{textAlign: "center", fontSize: 20, marginTop: 14}}>
                Thêm Người dùng
            </Text>

            <View style={styles.InputComp}>
                <TextInput
                    placeholder='Nhập tên người dùng'
                    value={username}
                    style = {styles.InputStyle}
                    onChangeText={setUsername}
                >
                </TextInput>

                <TextInput
                    placeholder='Nhập mật khẩu'
                    value={password}
                    style = {styles.InputStyle}
                    onChangeText={setPassword}
                ></TextInput>

                <TextInput
                    placeholder='Nhập lại mật khẩu'
                    value={passwordConfirm}
                    style = {styles.InputStyle}
                    onChangeText={setPasswordConfirm}
                ></TextInput>
                 <TextInput
                    placeholder='Nhập email'
                    value={email}
                    style = {styles.InputStyle}
                    onChangeText={setEmail}
                ></TextInput>
            </View>

                <RNPickerSelect

                    placeholder={pickerPlaceholder}
                    onValueChange={(value) => setRole(value || 0)}
                    items={[
                        {
                        label: 'Admin',  
                        value: 1
                        },
                         {
                        label: 'User',  
                        value: 2
                        }
                    ]}
                    value={role}
                />

             <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
                <Text style={styles.buttonText}>{avatar ? 'Chọn lại hình ảnh' : 'Chọn hình ảnh'}</Text>
            </TouchableOpacity>
            
            {avatar && (
                <Image source={getImageSource(avatar)} style={styles.selectedImage} />
            )}
            
           
                <TouchableOpacity style={editingId == null? styles.buttonAddProduct : styles.buttonUpdateProduct} onPress={handleUser}>
                    <Text style = {styles.textAddButton}>{editingId == null ? 'Thêm User' : 'Cập nhật User'}</Text>
                </TouchableOpacity>
                {editingId !== null? 
                    <>
                        <TouchableOpacity style={styles.cancelUpdate} onPress={handleCancelUpdateProduct}>
                            <Text style= {styles.textAddButton}>Hủy cập nhật</Text>
                        </TouchableOpacity>
                    </>
                    :
                    ''
                }

                <View style={styles.inputsearch}>
                    <TextInput
                    placeholder='Tìm User'
                    value={searchUser}
                    style = {styles.InputStyle}
                    onChangeText={setSearchUser}
                    ></TextInput>
                </View>
        </View>

       


        <View style={styles.ListProductsComp}>

            {searchUser === ''? 
            <>
                {adminUser.length === 0? 
                    <>
                        <Text style={styles.TextCantFindProduct}>Không có Admin nào</Text>
                    </>

                    :

                    <>
                        <Text style={styles.textRole}>Admin Role</Text>

                        {adminUser.map((item) => (
                            <TouchableOpacity key={item.id} style = {styles.ProductCard} >
                                <View style={styles.leftsite}>
                                    <Image source={getImageSource(item.avatar)} style={styles.imageproducts}/>
                                </View>

                                <View style={styles.rightsite}>
                                    <Text style = {styles.textNameProduct}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.textPrice}>
                                        {item.email}
                                    </Text>
                                </View>
                                {item.name == 'admin'? 
                                <View style={styles.disabledContainer}>
                                    <Text style={styles.disabledText}>User này không thể dộng đến</Text>
                                </View>
                                : 
                                <View style={styles.containerButton}>
                                    <TouchableOpacity >
                                        <Text style={styles.icon} onPress={() => handleGetEditting (item)}>✏️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity >
                                        <Text style={styles.icon} onPress={() => handleDeleteProduct (item.id, item.name, item.role)}>🗑️</Text>
                                    </TouchableOpacity>
                                </View>
                                }
                            </TouchableOpacity>
                        ))}
                    </>
                }
                {User.length === 0? 
                    <>
                        <Text style={styles.TextCantFindProduct}>Không có User nào</Text>
                    </>

                    :

                    <>
                        <Text style={styles.textRole}>User Role</Text>

                        {User.map((item) => (
                            <TouchableOpacity key={item.id} style = {styles.ProductCard} >
                                <View style={styles.leftsite}>
                                    <Image source={getImageSource(item.avatar)} style={styles.imageproducts}/>
                                </View>

                                <View style={styles.rightsite}>
                                    <Text style = {styles.textNameProduct}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.textPrice}>
                                        {item.email}
                                    </Text>
                                </View>
                                {item.name == 'admin'? 
                                <View style={styles.disabledContainer}>
                                    <Text style={styles.disabledText}>User này không thể dộng đến</Text>
                                </View>
                                : 
                                <View style={styles.containerButton}>
                                    <TouchableOpacity >
                                        <Text style={styles.icon} onPress={() => handleGetEditting (item)}>✏️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity >
                                        <Text style={styles.icon} onPress={() => handleDeleteProduct (item.id, item.name,item.role)}>🗑️</Text>
                                    </TouchableOpacity>
                                </View>
                                }
                            </TouchableOpacity>
                        ))}
                    </>
                }
                {UsernoRole.length === 0? 
                    <>
                        
                    </>

                    :

                    <>
                        <Text style={styles.textRole}>User không có Role</Text>

                        {UsernoRole.map((item) => (
                            <TouchableOpacity key={item.id} style = {styles.ProductCard} >
                                <View style={styles.leftsite}>
                                    <Image source={getImageSource(item.avatar)} style={styles.imageproducts}/>
                                </View>

                                <View style={styles.rightsite}>
                                    <Text style = {styles.textNameProduct}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.textPrice}>
                                        {item.email}
                                    </Text>
                                </View>
                                {item.name == 'admin'? 
                                <View style={styles.disabledContainer}>
                                    <Text style={styles.disabledText}>User này không thể dộng đến</Text>
                                </View>
                                : 
                                <View style={styles.containerButton}>
                                    <TouchableOpacity >
                                        <Text style={styles.icon} onPress={() => handleGetEditting (item)}>✏️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity >
                                        <Text style={styles.icon} onPress={() => handleDeleteProduct (item.id, item.name,item.role)}>🗑️</Text>
                                    </TouchableOpacity>
                                </View>
                                }
                            </TouchableOpacity>
                        ))}
                    </>
                }

            </>
            :
            <>
            {seatchUserLN.length === 0? 
                <>
                    <Text style={styles.TextCantFindProduct}>Không Người dùng nào</Text>
                </>

                :

                <>

                    {seatchUserLN.map((item) => (
                        <TouchableOpacity key={item.id} style = {styles.ProductCard} >
                            <View style={styles.leftsite}>
                                <Image source={getImageSource(item.avatar)} style={styles.imageproducts}/>
                            </View>

                            <View style={styles.rightsite}>
                                <Text style = {styles.textNameProduct}>
                                    {item.name}
                                </Text>
                                <Text style={styles.textPrice}>
                                    {item.email}
                                </Text>
                            </View>
                            {item.name == 'admin'? 
                            <View style={styles.disabledContainer}>
                                <Text style={styles.disabledText}>User này không thể dộng đến</Text>
                            </View>
                             : 
                            <View style={styles.containerButton}>
                                <TouchableOpacity >
                                    <Text style={styles.icon} onPress={() => handleGetEditting (item)}>✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.icon} onPress={() => handleDeleteProduct (item.id, item.name, item.role)}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        </TouchableOpacity>
                    ))}
                </>
            }
            </>
        }

        </View>
         
         </ScrollView>
   
    </View>
  
  )
}

export default userAdmin

const styles = StyleSheet.create({
    headerComp : {
        height: 50,
        backgroundColor: "#F2E3D5",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textHeaderComp : {
        textAlign: "center",
        fontSize: 17,
        fontWeight: 500,
        marginEnd: 15,
        marginStart: 15,
        marginTop: 13
    },
    textHeaderComp2 : {
        textAlign: "center",
        fontSize: 17,
        fontWeight: 500,
        marginEnd: 15,
        marginStart: 15,
        marginTop: 5,
       
        padding: 8,
        borderRadius: 15,
        backgroundColor: '#D9D9D9'
    },


    InputStyle : {
        borderWidth: 1,
        width: "90%",
        borderRadius: 14,
        marginTop: 10,
        height: 50,
    },

    containerInput : {
        marginBottom: 30,
    },

    InputComp : {
        alignItems: "center",
    },

    ListProductsComp: {
        flex: 1,
        padding: 10,
    },

    buttonAddProduct : {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 15,
        width: "90%",
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        height: 35,
        backgroundColor: 'green',
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonUpdateProduct: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 15,
        width: "45%",
        alignItems: 'center',
        marginLeft: 15,
        justifyContent: 'center',
        height: 35,
        backgroundColor: 'green',
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
    },

    cancelUpdate : {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: -35,
        width: "45%",
        alignItems: 'center',
        alignSelf : "flex-end",   
        marginRight: 15,
        justifyContent: 'center',
        height: 35,
        backgroundColor: 'red',
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
        
    },

    textAddButton : {
        fontWeight:'600',
        color:"white",
        fontSize: 18,
    },
    

    ProductCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 12,
        padding: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    leftsite: {
        width: 100,
        height: 100,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageproducts: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        resizeMode: 'contain',
    },

    rightsite: {
        flex: 1,
        justifyContent: 'center',
    },

    textNameProduct: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
    },

    textPrice: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: '500',
    },
     containerButton: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 10,
        gap: 12,
    },

    icon: {
        fontSize: 20,
        backgroundColor: '#f8f9fa',
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
     imagePicker: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 15,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        marginLeft: 20,
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 10,
        marginLeft: 100
    },
    buttonText: { color: '#fff', fontWeight: 'bold' 
    },
    cateContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    
    categoryBtn: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 25,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    
    categoryBtnActive: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'gray',
        marginRight: 25,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    
    categoryBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    categoryBtnTextActive: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
    },
    TextCantFindProduct : {
        fontSize: 17,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center'
    },
    inputsearch : {
        alignItems: 'center'
    },
    ComponentTab: {
        flexDirection:'row',
        justifyContent:'space-between',
        height: '5%'
    },

    disabledContainer: {
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: '#f5c6cb',
    width: '20%',
    borderRadius: 15
  },
  disabledText: {
    color: '#721c24',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '25%'
  },
   textRole: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',       
    backgroundColor: '#fdecea', 
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 6,
    alignSelf: 'flex-start', 
  },
})