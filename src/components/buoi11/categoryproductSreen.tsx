import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { use, useState,useEffect } from 'react'
import { useNavigation,RouteProp,useRoute } from '@react-navigation/native'
import { RootStackParamList } from './navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDBConnection } from './database';

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
    category_id: number;
}

const CategoryProductScreen = () => {
    const route = useRoute<CategoryScreenRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const [product, setProduct] = useState<ProductDetail[] | null>(null);  
    
    useEffect(() => {
        fetchProductWithCategory();
    }, []);

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

    const fetchProductWithCategory = async () => {
        try{
            const db = await getDBConnection();
            const result = await db.executeSql(
                `SELECT products.*, categories.category_name 
                 FROM products 
                 JOIN categories ON products.category_id = categories.id
                 where categories.id = ?`,
                [route.params.id]
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
                        category_id: item.category_id
                    });
                }
            });

            setProduct(products);
        }catch (error) {
            console.error('Error fetching products by category:', error);
        }
    }

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

return (
        <View style={styles.container}>
            <View style={styles.cateTilte}>
                <Text style={styles.cateTilteText}>{route.params.category_name}</Text>
            </View>

            <ScrollView style={styles.productList}>
                {product && product.length > 0 ? (
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
                )}
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
    }
});