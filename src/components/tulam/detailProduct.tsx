import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDBConnection } from './database';
import CategorySelector from './CategorySelector';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ProductDetail = {
  id: number;
  name: string;
  price: number;
  image: string;
  info: string;
  category_name: string;
  category_id : number;
};

type Category = {
    id: number;
    category_name: string;
}

const DetailProduct = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [getCategory, setGetCategory] = useState<Category[]>([]);
  
  useEffect(() => {
    fetchProductDetails();
    fetchCategory()
  }, []);



  const getImageSource = (img: string) => {
    if (img.startsWith('file://')) {
      return { uri: img };
    }
    switch (img) {
      case 'hinh1.jpg':
        return require('../../asset/pro_x_superlight.jpg');
      default:
        return require('../../asset/blackwidow_v3.jpg');
    }
  };

  const fetchProductDetails = async () => {
    try {
      const db = await getDBConnection();
      const result = await db.executeSql(
        `SELECT products.*, categories.name as category_name
         FROM products 
         JOIN categories ON products.category_id = categories.id 
         WHERE products.id = ?`,
        [route.params.id]
      );
      
      if (result[0].rows.length > 0) {
        setProduct(result[0].rows.item(0));
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchCategory = async () => {
    const db = await getDBConnection()
    const result = await db.executeSql(`Select * from categories`)
    const category : Category[]= []

    result.forEach((result) => {
        for (let i = 0; i< result.rows.length; i++){
            const item = result.rows.item(i)
            category.push({
                id: item.id,
                category_name: item.name
            })
        }
    })

    setGetCategory(category)
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!product) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleSelectCategory = (id: number) => {
    const selected = getCategory.find((c) => c.id === id);
    if (selected) {
      navigation.navigate('Category', {
        id: selected.id,
        category_name: selected.category_name,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={getImageSource(product.image)} 
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)} VND</Text>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Category:</Text>
          <Text style={styles.categoryValue} onPress={() => navigation.navigate('Category', { id: product.category_id, category_name: product.name })}>{product.category_name}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Thông tin sản phẩm</Text>
          <Text style={styles.descriptionText}>
              {product.info}
          </Text>
        </View>
        
         <CategorySelector
          categories={getCategory}
          selectedId={product?.category_id || 0}
          onSelect={handleSelectCategory}
        />
      </View>
    </ScrollView>
  );
}

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 15,
    backgroundColor: '#2980b9',
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    color: '#e74c3c',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  categoryValue: {
    fontSize: 16,
    color: '#2980b9',
    fontWeight: '500',
  },
  descriptionContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
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
    sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
});