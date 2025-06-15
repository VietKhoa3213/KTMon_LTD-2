import { StyleSheet, Text, View, TextInput, Button,Image,TouchableOpacity, Alert,ImageSourcePropType, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {
  getDBConnection,
  createDB,
  getProducts,
  saveProduct,
  updateProductDB,
  deleteProduct,
  getImageSource,
  
} from '../buoi11/database';
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
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
    const [name,setName] = useState<string> ('')
    const [price, setPrice] = useState<string>('')
    const [editingId,setEditingId] = useState <number | null >(null)

    React.useEffect(() => {
        initDB();
    });


    const initDB = async () => {
        try{
            const db = await getDBConnection();
            await createDB(db)
            const storedProducts = await getProducts(db)
            setProducts(storedProducts)
        }catch (error){
            console.error(error)
        }
    }


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
                await updateProductDB (db, name, parseInt(price),editingId)
            }else{
                await saveProduct(db, name,parseInt(price))
            }
            const updateProduct = await getProducts(db)
            setProducts(updateProduct)
            setEditingId(null)
            setName('')
            setPrice('')
        }catch(error){
            console.error(error);
            Alert.alert('Lỗi', 'Không thể lưu sản phẩm');
        }
    }

    const handleUpdateProduct = (products: Product) => {
        setEditingId(products.id)
        setName(products.name)
        setPrice(products.price.toString())
    }

    const handlehuycapnhat =()=>{
        setEditingId(null)
        setName('')
        setPrice('')
    }

    const handleDeleteProduct = async (id: number) => {
        const db = await getDBConnection();
        await deleteProduct (db, id)
    }

    const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getImageSource = (imageName: string): ImageSourcePropType => {
    if (!imageName) return require('../../asset/pro_x_superlight.jpg'); 
    if (productImages.hasOwnProperty(imageName)) {
      return productImages[imageName as keyof typeof productImages];
    }
    
    return require('../../asset/pro_x_superlight.jpg');
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

        <TouchableOpacity style={editingId ? styles.updatebutton : styles.Addbutton}>
                        <Text style= {styles.textAddbutton} onPress={handleAddproduct}>{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</Text>
        </TouchableOpacity>

          {editingId ?   
            <TouchableOpacity style={styles.huybutton}>
               <Text style= {styles.textAddbutton} onPress={handlehuycapnhat} >Hủy cập nhật</Text>
           </TouchableOpacity> : ""
        }

        </View>
        <View style={styles.containerAddProductInfo}>
                {products.map((item) => (
                    <View key={item.id} style={styles.productCard}>
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
                                <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
                                    <Text style={styles.icon}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
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
    

 
})