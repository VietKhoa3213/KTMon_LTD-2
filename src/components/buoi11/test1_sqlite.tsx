import { StyleSheet, Text, View, TextInput, Button,Image,TouchableOpacity, Alert,ImageSourcePropType, ScrollView} from 'react-native'
import React, {useState} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from './navigation/types'
import { NativeStackNavigationProp  } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import {
  getDBConnection,
  createDB,
  getProducts,
  saveProduct,
  updateProductDB,
  deleteProduct,
  getImageSource,
  getCategory,
  insertInitialCategories,
  findProductCategory
  
} from '../buoi11/database';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Category = {
    id:number;
    category_name: string;
}

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category_id: number;
};

const productImages = {
  'pro_x_superlight': require('../../asset/pro_x_superlight.jpg'),
};

// SQLite.enablePromise(true)

// export const getDBConnection = async () => {
//     return SQLite.openDatabase({ name: 'Shop.db', location: 'default'})
// }

// export const createDB = async (db: SQLite.SQLiteDatabase) => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS products (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT NOT NULL ,
//             price INTEGER NOT NULL,
//             image TEXT NOT NULL
//         )
//     `;
//     await db.executeSql(query)
// }

// export const getProducts = async(db: SQLite.SQLiteDatabase) => {
//     try {
//         const products:Product[] = [];
//         const result = await db.executeSql('Select * from products')
        
//         result.forEach(result => {
//             for(let index = 0; index < result.rows.length; index++ ){
//                 products.push(result.rows.item(index))
//             }
//         })
//         return products;
//     }catch(error){
//         console.error(error)
//         throw Error('Failed to get products')
//     }
// }


// export const saveProduct = async (db:SQLite.SQLiteDatabase, name:string, price: number) => {
//     const imageName = 'pro_x_superlight'; 
//     const insertQuery = `INSERT INTO products(name, price, image) VALUES ('${name}', ${price},'${imageName}') `;
//     return db.executeSql(insertQuery)
// }

// export const updateProductDB = async (db:SQLite.SQLiteDatabase, name:string, price:number, editingId:number) => {
//     const updateQuery = `Update products set name ='${name}', price = ${price} where id = ${editingId}` 
//     return db.executeSql(updateQuery)
// }

// export const deleteProduct = async (db:SQLite.SQLiteDatabase, editingId: number) => {
//     const deleteQuery = `delete from products where id = ${editingId}`
//     return db.executeSql(deleteQuery)
// }




const test1_sqlite = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [category, setCategory] = useState<Category[]>([])
    

    const [categoryId, setCategoryId] = useState<number>(0);
    const [activeCategory, setActiveCategory] = useState<number>(0)


    const [name,setName] = useState<string> ('')
    const [price, setPrice] = useState<string>('')

    const [editingId,setEditingId] = useState <number | null >(null)
    const [imageUri, setImageUri] = useState<string>('');

    const [searchProduct, setSearchProduct] = useState<string > ('')
    const filterProduct = products.filter((item) => item.name.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase()))

    const navigation = useNavigation<NavigationProp>();

    
   React.useEffect(() => {
    initDB();
}, []);

    const initDB = async () => {
        try {
            const db = await getDBConnection();
            await createDB(db);
            await insertInitialCategories(db);
            const categories = await getCategory(db);
            const storedProducts = await getProducts(db);

            
            if (categories && categories.length > 0) {
                setCategory(categories);
            } else {
                console.warn('No categories found');
            }
            
            setProducts(storedProducts);
        } catch (error) {
            console.error('Database initialization error:', error);
            Alert.alert('Lỗi', 'Không thể khởi tạo dữ liệu');
        }
    };


    const handleAddproduct = async () =>{
        if(!name || !price){
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }else if (!/^\d+$/.test(price)){
             Alert.alert("Lỗi", "Giá tiền chỉ được chứa số")
            return;
        }

        try {
            const db = await getDBConnection();
            if(editingId !==null){
                await updateProductDB (db, name, parseInt(price), categoryId,  imageUri, editingId,)
            }else{
                await saveProduct(db, name,parseInt(price), categoryId,imageUri)
            }
            const updateProduct = await getProducts(db)
            setProducts(updateProduct)
            setEditingId(null)
            setName('')
            setPrice('')
            setCategoryId(0);
            setImageUri('');
            setActiveCategory(0)

        }catch(error){
            console.error(error);
            Alert.alert('Lỗi', 'Không thể lưu sản phẩm');
        }
    }

    const handleUpdateProduct = (products: Product) => {
        setEditingId(products.id)
        setName(products.name)
        setPrice(products.price.toString())
        setCategoryId(products.category_id);
        setImageUri(products.image)
    }

    const handlehuycapnhat =()=>{
        setEditingId(null)
        setName('')
        setPrice('')
        setCategoryId(0)
        setImageUri('')
    }

    const handleDeleteProduct = async (id: number, products: Product) => {
        Alert.alert(
            "Xác nhận",
            `Bạn có chắc muốn xóa sản phẩm tên ${products.name} này?`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Xóa',
                    onPress: async () => {
                        const db = await getDBConnection()
                        await deleteProduct(db, id)
                        const updatedProducts = await getProducts(db)
                        setProducts(updatedProducts)
                        setActiveCategory(0)
                        setName('')
                        setPrice('')
                        setCategoryId(0)
                    }
                }
            ]
        )
    }

    const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  const handleFindProductWithCategory = async (id : number) => {
    const db = await getDBConnection()
    const FindProductWithCategory = await findProductCategory(db, id)
    setProducts(FindProductWithCategory)
    setActiveCategory(id)
    
  }

  const handleCancelFindProductWithCategory = async () =>{
    const db = await getDBConnection()
    const Product = await getProducts(db)
    setProducts(Product)
    setActiveCategory(0)
  }
  const pickerPlaceholder = {
        label: 'Chọn danh mục',
        value: 0,
        color: '#9EA0A4',
    };

    

  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.textheader}>Quản lí sản phẩm</Text>
            </View>
        <View style={styles.containerAddProduct}>
            <View style={styles.containerInput}>
                <TextInput 
                    placeholder='Nhập tên sản phẩm'
                    value={name}
                    style={styles.textInput}
                    onChangeText={setName}
                ></TextInput>
                <TextInput 
                    placeholder='Nhập giá sản phẩm'
                    keyboardType='decimal-pad'
                    style={styles.textInput}
                    value={price.toString()}
                    onChangeText={setPrice}
                ></TextInput>
            </View>

            <RNPickerSelect
                placeholder={pickerPlaceholder}
                onValueChange={(value) => setCategoryId(value || 0)}
                items={category.map((c) => ({
                      // Add unique key
                    label: c.category_name || 'Không có tên',  // Fallback for undefined name
                    value: c.id
                }
            )) }
                value={categoryId}
            />

            
            {/* Chọn hình ảnh */}

            <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
                <Text style={styles.buttonText}>{imageUri ? 'Chọn lại hình ảnh' : 'Chọn hình ảnh'}</Text>
            </TouchableOpacity>

            {imageUri && (
                <Image source={getImageSource(imageUri)} style={styles.selectedImage} />
            )}

        <TouchableOpacity style={editingId ? styles.updatebutton : styles.Addbutton}>
                        <Text style= {styles.textAddbutton} onPress={handleAddproduct}>{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</Text>
        </TouchableOpacity>

          {editingId ?   
            <TouchableOpacity style={styles.huybutton}>
               <Text style= {styles.textAddbutton} onPress={handlehuycapnhat} >Hủy cập nhật</Text>
           </TouchableOpacity> : ""
        }

            <View style = {styles.categories}>
                <TouchableOpacity key={null} style={activeCategory === 0? styles.activeCategoryCard:styles.categoryCard} onPress={() =>handleCancelFindProductWithCategory()}>
                        <Text style={activeCategory === 0? styles.activeCategoryText:styles.CategoryText}>Tất cả</Text>
                </TouchableOpacity>

                {category.map((categoryList) => (
                    <TouchableOpacity key={categoryList.id} style={activeCategory === categoryList.id? styles.activeCategoryCard:styles.categoryCard} onPress={() =>handleFindProductWithCategory(categoryList.id)}>
                        <Text style={activeCategory === categoryList.id? styles.activeCategoryText:styles.CategoryText}>{categoryList.category_name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

                <View style={styles.containerInput2}>
                    <TextInput 
                        placeholder='Tìm kiếm'
                        value={searchProduct}
                        style={styles.textInputSearch}
                        onChangeText={setSearchProduct}
                    ></TextInput>
                </View>

        </View>
        <View style={styles.containerAddProductInfo}>

            {searchProduct === ''? 
            <>
                {products.length === 0 ? 
                    <>
                    <View>
                        <Text>
                            Không có sản phẩm nào
                        </Text>         
                    </View>
                    </>
                    :
                    <>
                    {products.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.productCard}
                            onPress={() => navigation.navigate('Detail', { id: item.id, category_id: item.category_id })}>
                            <View  style={styles.leftsite}>
                                <Image source={getImageSource(item.image)} style={styles.imageproducts}/>
                            </View>
                            <View style={styles.rightsite}>
                                <Text style={styles.nameProduct}>{item.name}</Text>
                                <Text style={styles.priceProduct}>{formatPrice(item.price)} VND</Text>
                                <View style={styles.containerButton}>
                                    <TouchableOpacity onPress={() => handleUpdateProduct(item)}>
                                        <Text style={styles.icon}>✏️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteProduct(item.id, item)}>
                                        <Text style={styles.icon}>🗑️</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    </>
                }
            </>
            :
            <>
                {products.length === 0 ? 
                    <>
                    <View>
                        <Text>
                            Không có sản phẩm nào
                        </Text>         
                    </View>
                    </>
                    :
                    <>
                    {filterProduct.length === 0 ? 
                        <>
                            <Text>Không tìm thấy sản phẩm</Text>
                        </>
                        :
                    <>

                        {filterProduct.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.productCard}
                            onPress={() => navigation.navigate('Detail', { id: item.id,  category_id: item.category_id })}>
                                <View  style={styles.leftsite}>
                                    <Image source={getImageSource(item.image)} style={styles.imageproducts}/>
                                </View>
                                <View style={styles.rightsite}>
                                    <Text style={styles.nameProduct}>{item.name}</Text>
                                    <Text style={styles.priceProduct}>{formatPrice(item.price)} VND</Text>
                                    <View style={styles.containerButton}>
                                        <TouchableOpacity onPress={() => handleUpdateProduct(item)}>
                                            <Text style={styles.icon}>✏️</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDeleteProduct(item.id, item)}>
                                            <Text style={styles.icon}>🗑️</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
                    }
                    </>
                }
            </>
}
            </View>
    </ScrollView>
  )
}

export default test1_sqlite

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        backgroundColor: '#2980b9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textheader: {
        fontSize: 20,
        color: '#fff',
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
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#2980b9',
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
        borderWidth: 1,
        borderColor: '#2980b9',
        borderRadius: 10,
        marginLeft: 3,
        marginBottom: 10,
    },
    leftsite: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Addbutton: {
        backgroundColor: '#2980b9',
        width: '96%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -0,
    },

    updatebutton: {
        backgroundColor: 'green',
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -0,
        marginLeft: -190
    },

    huybutton: {
        backgroundColor: 'red',
        width: '44%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -50,
        marginLeft: 220
    },
    
    rightsite: {
        flex: 2,
    },
    imageproducts: {
        marginLeft:-30,
        width: 80,
        height: 80,
    },
    nameProduct: {
        fontSize: 20,
        color: '#2980b9',
    },
    priceProduct: {
        fontSize: 15,
        color: '#2980b9',
    },
    containerAddProductInfo: {
        flex: 3.5,
        justifyContent: 'flex-start',
        marginTop: 20,
        alignItems: 'center',
    },
  
    icon: {
        fontSize: 20,
        color: '#fff',
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        gap: 20,
    },
    input: {
    height: 40, borderWidth: 1, borderColor: '#aaa',
    borderRadius: 6, paddingHorizontal: 10, marginBottom: 10,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' 
    },
     imagePicker: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '96%',
        alignItems: 'center'
        
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 10,
        
        
    },
    categories: {
        flex:1,
        flexDirection: 'row',
        width: '96%',
        flexWrap: 'wrap',
        justifyContent:'center'
    },
    categoryCard: {
        padding: 10,
        margin: 5,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#2980b9',
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
    containerInput2:{
        width: '96%',
        marginTop: 10,
    },
    CategoryText: {
        
    },
    activeCategoryCard: {
        padding: 10,
        margin: 5,
        borderRadius: 8,
        backgroundColor: 'gray',
        borderWidth: 1,
        borderColor: '#2980b9',
    },
    activeCategoryText: {
        color: 'white',
    },
    
})

