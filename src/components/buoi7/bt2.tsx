import { StyleSheet, Text, View, ImageSourcePropType, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView, ScrollView,Alert} from 'react-native'
import React, { useState } from 'react'

type Products = {
    id: number
    name: string
    price: number
    image: ImageSourcePropType
    description: string
    category: string
}

const products: Products[] = [
    {id: 1, name: "Logitech G Pro X Superlight 2 Dex Wireless Pink", price: 2560000, image: require('../../asset/LogitechGProXSuperlight2DexWirelessPink.webp'), description: "Chuột gaming Logitech G Pro X Superlight 2 Dex Wireless Pink", category: "mouse"},
    {id: 2, name: "Logitech Pro X Superlight", price: 2100000, image: require('../../asset/pro_x_superlight.jpg'), description: "Chuột gaming Logitech Pro X Superlight", category: "mouse"},
    {id: 3, name: "Nano 68 Pro", price: 1800000, image: require('../../asset/3fdbe255-9cfe-4400-9e5c-b895e2c43760.png'), description: "Bàn phím gaming Nano 68 Pro", category: "keyboard"},
    {id: 4, name: "Razer Black Window v3", price: 2560000, image: require('../../asset/blackwidow_v3.jpg'), description: "Bàn phím gaming Razer Black Window v3", category: "keyboard"},
    {id: 5, name: "Razer Deathadder V3 Pro", price: 2560000, image: require('../../asset/deathadder_v3_pro.webp'), description: "Chuột gaming Razer Deathadder V3 Pro", category: "mouse"},
    {id: 6, name: "Razer Viper V3 Pro", price: 4860000, image: require('../../asset/viper_v3_pro.webp'), description: "Chuột gaming Razer Viper V3 Pro", category: "mouse"},
    
]

const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const renderItem = ({item}: {item: Products}) => {
    return (
        <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productDescription} numberOfLines={1}>{item.description}</Text>
                <View style={styles.priceActionContainer}>
                    <Text style={styles.productPrice}>{formatPrice(item.price)} VNĐ</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Thông báo',`Đã thêm ${item.name} vào giỏ hàng`)}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>  
                </View>
            </View>
        </View>
    )
  }

const Bt2 = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4A66AC" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerIcon}>☰</Text>
        <Text style={styles.headerTitle}>Gaming Gear Shop</Text>
        <Text style={styles.headerIcon}>🛒</Text>
      </View>
      
      <View style={styles.categoryContainer}>
        <TouchableOpacity 
          style={[styles.categoryButton, selectedCategory === null && styles.categoryActive]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.categoryText, selectedCategory === null && styles.categoryTextActive]}>Tất cả</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.categoryButton, selectedCategory === 'keyboard' && styles.categoryActive]}
          onPress={() => setSelectedCategory('keyboard')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'keyboard' && styles.categoryTextActive]}>Bàn phím</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.categoryButton, selectedCategory === 'mouse' && styles.categoryActive]}
          onPress={() => setSelectedCategory('mouse')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'mouse' && styles.categoryTextActive]}>Chuột</Text>
        </TouchableOpacity>
      </View>
      

          <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.gridContainer}
                ListFooterComponent={
                      <View style={styles.footer}>
                      <View style={styles.footerContent}>
                          <View>
                              <View style={styles.footerSection}>
                                  <Text style={styles.footerTitle}>HỖ TRỢ KHÁCH HÀNG</Text>
                                  <Text style={styles.footerItem}>Trung tâm trợ giúp</Text>
                                  <Text style={styles.footerItem}>Hướng dẫn mua hàng</Text>
                              </View>
      
                              <View style={styles.footerSection}>
                                  <Text style={styles.footerTitle}>CHÍNH SÁCH</Text>
                                  <Text style={styles.footerItem}>Chính sách bảo mật</Text>
                                  <Text style={styles.footerItem}>Chính sách hoàn trả</Text>
                              </View>
                          </View>
                          <View>
                              <View style={styles.footerSection}>
                                  <Text style={styles.footerTitle}>DANH MỤC SẢN PHẨM</Text>
                                  <Text style={styles.footerItem}>Chuột</Text>
                                  <Text style={styles.footerItem}>Bàn phím</Text>
                              </View>
      
                              <View style={styles.footerSection}>
                                  <Text style={styles.footerTitle}>GIỚI THIỆU</Text>
                                  <Text style={styles.footerItem}>Về chúng tôi</Text>
                                  <Text style={styles.footerItem}>Liên hệ</Text>
                              </View>
                          </View>
                      </View>
                          <View style={styles.footerhotline}>
                              <Text style={styles.footerTitle}>THEO DÕI CHÚNG TÔI</Text>
                              <View style={styles.socialIcons}>
                              <Text style={styles.icon}>ⓕ</Text>
                              <Text style={styles.icon}>🅾</Text>
                              <Text style={styles.icon}>𝕏</Text>
                              <Text style={styles.icon}>📞</Text>
                              <Text style={styles.icon}>🌐</Text>
                              </View>
                          </View>
                      
      
                      <View style={styles.footerCompany}>
                          <Text style={styles.companyText}>Công ty TNHH Công Nghệ Số 123</Text>
                          <Text style={styles.companyText}>Địa chỉ đăng ký: 2C Bạch Đằng, P. Chương Dương, Q. Hoàn Kiếm, TP. Hà Nội</Text>
                          <Text style={styles.companyText}>MST: 0109900432 - Cấp ngày 28/01/2022</Text>
                          <Text style={styles.companyText}>Showroom: Số 3 Ngõ 117 Thái Hà, Q. Đống Đa, Hà Nội</Text>
                          <Text style={styles.companyText}>Hotline: 093.669.33.88</Text>
                          <Text style={styles.companyText}>Mail:test.vn@gmail.com</Text>
                      </View>
                      </View>
                }
            />
    </SafeAreaView>
  )
}

export default Bt2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4A66AC',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcon: {
    fontSize: 22,
    color: 'white',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    elevation: 2,
    marginBottom: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  categoryActive: {
    backgroundColor: '#4A66AC',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  categoryTextActive: {
    color: 'white',
  },

  gridContainer: {

  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#f9f9f9',
    padding: 5,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  priceActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
  },
  addButton: {
    backgroundColor: '#4A66AC',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
footer: {
        backgroundColor: '#004AAD',
        padding: 16,
      },
      
      footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

      footerSection: {
        marginBottom: 16,
        
      },

      footerhotline: {
        marginTop: 16,
        marginBottom: 16,
        alignItems: 'center',
      },
      
      footerTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 6,
      },
      
      footerItem: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10,
        marginBottom: 2,
      },
      
      socialIcons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 6,
      },
      
      icon: {
        fontSize: 22,
        color: '#fff',
      },
      
      footerCompany: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 12,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      companyText: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 2,
      },


})