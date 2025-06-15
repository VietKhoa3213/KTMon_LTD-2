import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { use, useState,useEffect } from 'react'
import { useNavigation,RouteProp,useRoute } from '@react-navigation/native'
import { RootStackParamList } from './navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { findProductCategory, getDBConnection } from './database';
import CategorySelector from './CategorySelector';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

type Category ={
    id: number;
    category_name: string;
}

type ProductDetail = {
    id: number;
    name: string;
    price: number;
    image: string;
    info: string;
    category_id: number;
}

const CategoryProductScreen = () => {
    const route = useRoute<CategoryScreenRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const [product, setProduct] = useState<ProductDetail[] | null>(null);  
    const [categories, setCategories] = useState<Category[]>([])
    const [nameCate, setNameCate] = useState<string | null> ('Danh mục')
    const [product2, setProduct2]= useState<ProductDetail[] | null>(null); 

    const [cateID, setCateID] = useState<number>(0)
    useEffect(() => {
        fetchCategory()
        fetchProductSIfnull()
               if (route.params?.id) {
            setCateID(route.params.id);
            fetchProductWithCategory(route.params.id);
            const selected = categories.find(c => c.id === route.params?.id);
            setNameCate(selected?.category_name || 'Danh mục');
        }
    }, [route.params?.id]);


       useEffect(() => {
        if (cateID !== 0) {
            const selected = categories.find(c => c.id === cateID);
            setNameCate(selected?.category_name || 'Danh mục');
        }
    }, [categories, cateID]);
      
    const getDetailImageSource = (img: string) => {
        if (img.startsWith('file://')) {
        return { uri: img }; 
        }
    
        switch (img) {
        case 'hinh1.jpg':
            return require('../../asset/pro_x_superlight.jpg');
        case 'hinh2.jpg':
            return require('../../asset/blackwidow_v3.jpg');
        default:
            return require('../../asset/blackwidow_v3.jpg');
        }
    };

    const fetchProductWithCategory = async (categoryId: number) => {
        try{
            const db = await getDBConnection();
            const result = await db.executeSql(
                `SELECT products.*, categories.name as category_name
                 FROM products 
                 JOIN categories ON products.category_id = categories.id
                 where categories.id = ?`,
                [categoryId]
            );

            const products: ProductDetail[] = [];
            result.forEach((result) => {
                for (let i = 0; i< result.rows.length;i++){
                    const item = result.rows.item(i);
                    products.push({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        info: item.info,
                        category_id: item.category_id
                    });
                }
            });
            setProduct(products);
        }catch (error) {
            console.error('Error fetching products by category:', error);
        }
    }

    const fetchProductSIfnull = async () =>{
        const db =await getDBConnection()
        const result = await db.executeSql(
                `SELECT products.*, categories.name as category_name
                 FROM products 
                 JOIN categories ON products.category_id = categories.id
                 `
                )
        const products: ProductDetail[] = [];
            result.forEach((result) => {
                for (let i = 0; i< result.rows.length;i++){
                    const item = result.rows.item(i);
                    products.push({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        info: item.info,
                        category_id: item.category_id
                    });
                }
            });
            setProduct2(products);
    }

    const fetchCategory = async () => {
        const db = await getDBConnection()
        const result = await db.executeSql('select * from categories')
        const category : Category[] = [] 

        result.forEach((result) => {
            for (let i = 0; i< result.rows.length; i++ ){
                const item = result.rows.item(i)
                category.push({
                    id: item.id,
                    category_name: item.name
                })
            }
        })
        setCategories(category)
    }

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const hanldefindProductCategory = async (id: number,name: string) =>{
        setCateID(id)
        setNameCate(name)
        const db = await getDBConnection()
        const getcateFind = await findProductCategory(db, id)

        setProduct(getcateFind)
    }

    const handleSelectCategory = (id: number) => {
        const select = categories.find(c => c.id === id)
        if (select){
            hanldefindProductCategory(select.id, select.category_name)
        }
    }

return (
        <View style={styles.container}>
            <View style={styles.cateTilte}>
                <Text style={styles.cateTilteText}>{nameCate === null ? route.params?.category_name : nameCate}</Text>
            </View>
            <View>
           
               <CategorySelector
                categories={categories}
                selectedId={cateID === 0 ? route.params?.id : cateID}
                onSelect={handleSelectCategory}
                />
            </View>

            <ScrollView style={styles.productList}>

            {nameCate == 'Danh mục'  && product2 !== null? 
                product2.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.productCard}
                            onPress={() => navigation.navigate('Detail', { id: item.id, category_id: item.category_id })}
                        >
                            <Image 
                                source={getDetailImageSource(item.image)} 
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>
                                    {formatPrice(item.price)} VND
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))

                    :
                    product && product.length > 0 ? (
                    product.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.productCard}
                            onPress={() => navigation.navigate('Detail', { id: item.id, category_id: item.category_id })}
                        >
                            <Image 
                                source={getDetailImageSource(item.image)} 
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>
                                    {formatPrice(item.price)} VND
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                            Không có sản phẩm nào trong danh mục này
                        </Text>
                    </View>
                )
                }

                
                
            </ScrollView>
        </View>
    );
};

export default CategoryProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#2980b9',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        color: '#fff',
        fontSize: 16,
        marginRight: 15,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
    productList: {
        flex: 1,
        padding: 10,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 15,
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    cateTilte: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cateTilteText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
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
        backgroundColor: '#2980b9',
    },
    
    categoryBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    categoryContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    
    categoryBtnTextActive: {
        color: '#fff',
    },
    
    categoryWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    }
});