import { StyleSheet, Text, View, TextInput, Button,Image,TouchableOpacity, Alert,ImageSourcePropType} from 'react-native'
import React, {useState} from 'react'

type Products={
    id: number;
    name: string;
    price: number;
    image: ImageSourcePropType; 
}

const ProductList: Products[] = [
    {id: 1, name: 'Tung Tung Tung Sahur 1', price: 230000, image: require('../../asset/pro_x_superlight.jpg')},
    {id: 2, name: 'Tung Tung Tung Sahur 2', price: 230000, image: require('../../asset/pro_x_superlight.jpg')},
    {id: 3, name: 'Tung Tung Tung Sahur 3', price: 230000, image: require('../../asset/pro_x_superlight.jpg')},
]

const test1 = () => {
    const [products, setProducts] = useState(ProductList);
    const [nameProduct, setNameProduct] = useState<string>('')
    const [productPrice,  setProductPrice] = useState<number>(0)
    const [editingId, setEditingId] = useState<number | null> (null)

    const handleAddproduct = () =>{
        if(!nameProduct || !productPrice){
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ')
            return
        }

        if(editingId !== null){
            const updateProduct = products.map(item => item.id === editingId ? {...item, name: nameProduct, price: productPrice} : item)
            setProducts(updateProduct)
            setEditingId(0)

        }else{
            const newProduct : Products = {
            id: products.length + 1,
            name: nameProduct,
            price: productPrice,
            image: require('../../asset/pro_x_superlight.jpg')
            }
            setProducts([...products,newProduct])
        }

        
        setNameProduct('')
        setProductPrice(0)
    }

    const handleUpdateProduct = (product: Products) =>{
        setNameProduct(product.name)
        setProductPrice(product.price)
        setEditingId(product.id)
    }

    const handleDeleteProduct = (id:number) =>{
        setProducts(products.filter(item => item.id !== id))
    }

    const handleHuyAddproduct = () =>{
        setEditingId(null)
        setNameProduct('')
        setProductPrice(0)
    }


  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.textheader}>Quản lí sản phẩm</Text>
            </View>
        <View style={styles.containerAddProduct}>
            <View style={styles.containerInput}>
                <TextInput 
                    placeholder='Nhập tên sản phẩm'
                    value={nameProduct}
                    style={styles.textInput}
                    onChangeText={setNameProduct}
                ></TextInput>
                <TextInput 
                    placeholder='Nhập giá sản phẩm'
                    style={styles.textInput}
                    value={productPrice.toString()}
                    onChangeText={(text) => setProductPrice(Number(text))}
                ></TextInput>
            </View>
            <TouchableOpacity style={editingId ? styles.updatebutton : styles.Addbutton}>
                <Text style= {styles.textAddbutton} onPress={handleAddproduct}>{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</Text>
            </TouchableOpacity>

            {editingId ?   
            <TouchableOpacity style={styles.huybutton}>
                <Text style= {styles.textAddbutton} onPress={handleHuyAddproduct}>Hủy cập nhật</Text>
            </TouchableOpacity> : ""}

            <Text>{nameProduct} và  {productPrice} và {editingId}</Text>
        </View>
        <View style={styles.containerAddProductInfo}>
              {products.map((item) =>(
            <View key={item.id} style = {styles.productCard}>
                    <View  style={styles.leftsite}>
                        <Image source={item.image} style={styles.imageproducts}/>
                    </View>
                    <View style={styles.rightsite}>
                        <Text style={styles.nameProduct}>{item.name}</Text>
                        <Text style={styles.priceProduct}>{item.price}</Text>
                        <View style={styles.containerButton}>
                            <TouchableOpacity onPress={() => handleUpdateProduct(item) }>
                                <Text style={styles.icon} >✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
                                <Text style={styles.icon}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
            ))}
        </View>
    </View>
  )
}

export default test1

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
        marginLeft: -210
    },

    huybutton: {
        backgroundColor: 'red',
        width: '44%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -50,
        marginLeft: 230
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