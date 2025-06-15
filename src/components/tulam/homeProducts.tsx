import { StyleSheet, Text, View,ScrollView,TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from './navigation/types';
import { NativeStackNavigationProp  } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { 
    getDBConnection,
    getProducts,
    addProduct,
    createDB,
    updateProductDB,
    deleteProduct,
    addCategoriesinit,
    getCategory,
    findProductCategory,
    addAdmininit

} from './database'
import ComponentTab from './componentTab';

import { NotificationModalifLogout} from './NotificationModal';


type homeCateProp = RouteProp<RootStackParamList,'HomeAdmin'>
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeAdmin'>;

type Product = {
    id: number,
    name: string,
    price: number,
    image: string,
    info: string;
    category_id:number
}

type Category ={
    id: number
    category_name: string
}


const homeProducts = () => {
    const [products, setProduct] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]> ([])
    const route = useRoute<homeCateProp>()

    const [name, setName] = useState<string>('')
    const [price,setPrice] = useState<string>('')
    const [infoProduct,setInfoProduct] = useState<string> ('')
    const [imageUri, setImageUri] = useState<string>('');
    
    const [editingId, setEditingId] = useState<number | null>(null)
    const [categoryId, setCategoryId] = useState<number > ( 0 )
    const [cateActive, setCateActive] = useState<Number>(0)

    const [searchProduct, setSearchProduct] = useState<string> ('')
    const seachproductLN = products.filter((item) => item.name.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase()))

    const navigation = useNavigation<NavigationProp>();

    const [check, setCheck] = useState<boolean>(false)
    const [message, setMessae] = useState<string>('')


    React.useEffect(() => {
    if (route.params?.categoryId) {
        setCategoryId(route.params.categoryId);
    }
    }, [route.params?.categoryId]);

    React.useEffect(() => {
        initDB();
        }, []);

    useFocusEffect(
        React.useCallback(() => {
            initDB();
        }, [])
    );

    const initDB = async () =>{
        const db = await getDBConnection()
        await createDB(db)

        try {
            await addAdmininit(db)
        }catch (adminError){
            console.log('Lỗi thêm tài khoản admin')
        }

       try {
            await addCategoriesinit(db)
       }catch (categoryError){
        console.log('Lỗi thêm danh mục')
       }
        
        const storedProducts = await getProducts(db)
        const cate = await getCategory(db)

        setCategories(cate)
        setProduct(storedProducts)
    }

    const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleAddProduct = async () => {
        if(name == '' || price == '' ) {
            Alert.alert('Thông báo','Vui lòng nhập đầy đủ thông tin sản phẩm cần thêm')
        }else if (!/^\d+$/.test(price)){
            Alert.alert("Lỗi", "Giá tiền chỉ được chứa số")
            return;
        }

            const db = await getDBConnection()

            if(editingId === null){
                await addProduct(db, name, parseInt(price), imageUri, infoProduct, categoryId)
            }else if(editingId !== null){
                await updateProductDB(db, editingId, name, parseInt(price), imageUri, infoProduct, categoryId)
                setEditingId(null)
            }
            const updateProduct = await getProducts(db)
            setProduct(updateProduct)
            setInfoProduct('')
            setName('')
            setPrice('')
            setImageUri('')
            setCategoryId(0)
        
    }

    const getImageSource = (img: string) => {
        if (img.startsWith('file://')) {
          return { uri: img }; // Ảnh từ thư viện
        }
     
        // Ảnh tĩnh từ assets
        switch (img) {
          case 'hinh1.jpg':
            return require('../../asset/pro_x_superlight.jpg');
          case 'hinh2.jpg':
            return require('../../asset/blackwidow_v3.jpg');
          // Thêm các ảnh khác nếu cần
          default:
            return require('../../asset/blackwidow_v3.jpg'); // fallback nếu ảnh không tồn tại
        }
      };
    
      
      const handlePickImage = () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.error('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets[0]) {
            setImageUri(response.assets[0].uri ?? '');  // Nếu uri là undefined, thay thế bằng null
          }
        });
      };

      const handleGetEditting = (products : Product) => {
        setEditingId(products.id)
        setName(products.name)
        setPrice(products.price.toString())
        setImageUri(products.image)
        setCategoryId(products.category_id)
        setInfoProduct(products.info)
      }

      const handleCancelUpdateProduct = () =>{
        setEditingId(null)
        setName('')
        setPrice('')
        setImageUri('')
        setCategoryId(0)
        setInfoProduct('')
      }

      const handleDeleteProduct = async (id : number, name: string) => {
        Alert.alert(
            'Thông báo',
            `Bạn có chắc chắn muốn xóa sản phẩm tên ${name} này? `,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text:"Xóa",
                    onPress: async () => {
                        const db = await getDBConnection()
                        await deleteProduct (db, id)
                        const updateProduct = await getProducts(db)
                        setProduct(updateProduct)
                        setName('')
                        setPrice('')
                        setImageUri('')
                        setEditingId(null)
                        setCategoryId(0)
                        setInfoProduct('')
                    }
                    
                }
            ]
        )
      }

      const pickerPlaceholder = {
        label: 'Chọn danh mục',
        value: 0,
        color: '#9EA0A4',
    };

    const handleFindProductWithCate = async (id:number) =>{
        setCateActive(id)
        const db = await getDBConnection()
        const find = await findProductCategory(db, id)
        setProduct(find)
    }

    const handleCancelFindProductWithCategory = async () => {
        setCateActive(0)
        const db = await getDBConnection()
        const Prodct = await getProducts(db)
        setProduct(Prodct)
    }

   

  return (
    

    <View style ={{flex: 1}}>
        <NotificationModalifLogout
            check = {check}
            message={message}
            onClose={() => setCheck(false)}
            onLogin={() => navigation.navigate('Login')}
        />
        <View style={styles.headerComp}>
                <Text style = {styles.textHeaderComp}>Admin Dashboard</Text>
                <TouchableOpacity 
                onPress={() => {setCheck(true)
                                setMessae('Bạn có muốn đăng xuất?')
                }}>
                    <Text style = {styles.textHeaderComp2}>Đăng xuất</Text>
                </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={styles.containerInput}>
            <Text style = {{textAlign: "center", fontSize: 20, marginTop: 14}}>
                Thêm sản phẩm
            </Text>

            <View style={styles.InputComp}>
                <TextInput
                    placeholder='Nhập tên sản phẩm'
                    value={name}
                    style = {styles.InputStyle}
                    onChangeText={setName}
                >
                </TextInput>

                <TextInput
                    placeholder='Nhập giá sản phẩm'
                    value={price}
                    style = {styles.InputStyle}
                    onChangeText={setPrice}
                ></TextInput>

                <TextInput
                    placeholder='Nhập thông tin sản phẩm'
                    value={infoProduct}
                    style = {styles.InputStyle}
                    onChangeText={setInfoProduct}
                ></TextInput>
            </View>

              <RNPickerSelect
                placeholder={pickerPlaceholder}
                onValueChange={(value) => setCategoryId(value || 0)}
                items={categories.map((c) => ({
                    label: c.category_name || 'Không có tên',
                    value: c.id
                }))}
                value={categoryId}
            />
    
             <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
                <Text style={styles.buttonText}>{imageUri ? 'Chọn lại hình ảnh' : 'Chọn hình ảnh'}</Text>
            </TouchableOpacity>
            
            {imageUri && (
                <Image source={getImageSource(imageUri)} style={styles.selectedImage} />
            )}
            
           
                <TouchableOpacity style={editingId == null? styles.buttonAddProduct : styles.buttonUpdateProduct} onPress={handleAddProduct}>
                    <Text style = {styles.textAddButton}>{editingId == null ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}</Text>
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
                    placeholder='Tìm sản phẩm'
                    value={searchProduct}
                    style = {styles.InputStyle}
                    onChangeText={setSearchProduct}
                    ></TextInput>
                </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.cateContainer}>
                <TouchableOpacity style= {cateActive !== 0?  styles.categoryBtn : styles.categoryBtnActive} onPress={()=> handleCancelFindProductWithCategory()}>
                    <Text style={cateActive !== 0? styles.categoryBtnText : styles.categoryBtnTextActive}> All</Text>
                </TouchableOpacity>
                {categories.map((cate) => (
                    <TouchableOpacity key={cate.id} style= {cateActive !== cate.id?  styles.categoryBtn : styles.categoryBtnActive} onPress={()=> handleFindProductWithCate (cate.id)}>
                        <Text style={cateActive !== cate.id? styles.categoryBtnText : styles.categoryBtnTextActive}>{cate.category_name}</Text>
                    </TouchableOpacity>
                ))}
        </ScrollView>


        <View style={styles.ListProductsComp}>

            {searchProduct === ''? 
            <>
            {products.length === 0? 
                <>
                    <Text style={styles.TextCantFindProduct}>Không có sản phẩm nào</Text>
                </>

                :

                <>

                    {products.map((item) => (
                        <TouchableOpacity key={item.id} style = {styles.ProductCard} onPress={() => navigation.navigate('Detail', { id: item.id, category_id: item.category_id })}>
                            <View style={styles.leftsite}>
                                <Image source={getImageSource(item.image)} style={styles.imageproducts}/>
                            </View>

                            <View style={styles.rightsite}>
                                <Text style = {styles.textNameProduct}>
                                    {item.name}
                                </Text>
                                <Text style={styles.textPrice}>
                                    {formatPrice(item.price)} VND
                                </Text>
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity >
                                    <Text style={styles.icon} onPress={() => handleGetEditting (item)}>✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.icon} onPress={() => handleDeleteProduct (item.id, item.name)}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </>
            }
            </>
            :
            <>
            {seachproductLN.length === 0? 
                <>
                    <Text style={styles.TextCantFindProduct}>Không có sản phẩm nào</Text>
                </>

                :

                <>

                    {seachproductLN.map((item) => (
                        <TouchableOpacity key={item.id} style = {styles.ProductCard} onPress={() => navigation.navigate('Detail', { id: item.id, category_id: item.category_id })}>
                            <View style={styles.leftsite}>
                                <Image source={getImageSource(item.image)} style={styles.imageproducts}/>
                            </View>

                            <View style={styles.rightsite}>
                                <Text style = {styles.textNameProduct}>
                                    {item.name}
                                </Text>
                                <Text style={styles.textPrice}>
                                    {formatPrice(item.price)} VND
                                </Text>
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity >
                                    <Text style={styles.icon} onPress={() => handleGetEditting (item)}>✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.icon} onPress={() => handleDeleteProduct (item.id, item.name)}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
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

export default homeProducts

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
    }
})