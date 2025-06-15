import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../buoi11/navigation/types';
import { getDBConnection, getImageSource } from './database';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ProductDetail = {
  id: number;
  name: string;
  price: number;
  image: string;
  category_name: string;
  category_id : number;
};

type Category = {
    id:number;
    category_name: string;
}

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation();
  const navigation2 = useNavigation<DetailScreenNavigationProp>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [getCategory, setGetCategory] = useState<Category[]>([]); 

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

  useEffect(() => {
    fetchProductDetails();
    fetchCategory();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const db = await getDBConnection();
      const result = await db.executeSql(
        `SELECT products.*, categories.category_name 
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
    try {
      const db = await getDBConnection();
      const result = await db.executeSql(`SELECT * FROM categories`);
      const categories: Category[] = [];

      result.forEach((resultSet) => {
      for (let i = 0; i < resultSet.rows.length; i++) {
        const item = resultSet.rows.item(i);
        categories.push({
          id: item.id,
          category_name: item.category_name
        });
      }
    });

      setGetCategory(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!product) {
    return (
      <View style={styles.loading}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={getDetailImageSource(product.image)} 
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)} VND</Text>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Danh mục:</Text>
          <TouchableOpacity onPress={() => navigation2.navigate('Category', { id: product.category_id, category_name: product.category_name })}> 
            <Text style={styles.categoryValue}>
              {product.category_name}
              </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.descriptionText}>
            Sản phẩm chính hãng, bảo hành 24 tháng.
            {'\n'}- Thiết kế hiện đại
            {'\n'}- Chất lượng cao cấp
            {'\n'}- Độ bền cao
          </Text>
        </View>
      </View>

      <View style={styles.categoryContainer2}>
        <Text style={styles.categoryListTitle}>Danh sách danh mục</Text>
        {getCategory.map((category) => (
          <TouchableOpacity key={category.id} style = {styles.categoryItem2} onPress={() => navigation2.navigate('Category', { id: category.id, category_name: category.category_name})}>
            <Text style={styles.categoryItem}>{category.category_name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
  imageContainer: {
    height: 300,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    marginTop:20,
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#2980b9',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryContainer2: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    margin: 20,
  },
  
  categoryListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  categoryItem: {
    fontSize: 16,
    color: '#2980b9',
    marginBottom: 5,
  },

  categoryItem2: {
    fontSize: 16,
    color: '#2980b9',
    marginBottom: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }
});