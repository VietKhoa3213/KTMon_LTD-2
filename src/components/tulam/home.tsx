import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';
import { NotificationModalifLogout, NotificationModalifaddToCart } from './NotificationModal';
import { NavSrceen } from './NavScreen';
import {PriceFilter, SearchBar} from './comp/1';

import { getDBConnection, getProducts } from './database';
import AsyncStorage from '@react-native-async-storage/async-storage';

type homeUserScreenProp = RouteProp<RootStackParamList, 'Home'>
type navigateProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

type Product = {
    id: number,
    name: string,
    price: number,
    image: string,
    category_id: number
}

type Category = {
    id: number
    category_name: string
}

const HomeScreen = () => {
    const route = useRoute<homeUserScreenProp>();
    const navigate = useNavigation<navigateProp>();
    const [check, setCheck] = useState<boolean>(false)
    const [message, setMessae] = useState<string>('')

    const [products, setProduct] = useState<Product[]>([])
    const [checkAddToCart, setCheckAddToCart] = useState<Boolean>(false)
    const [checkUserNull, setCheckUserNull] = useState<number>(route.params?.id ?? 0)
    const [loading, setLoading] = useState<boolean>(true);
    const [cartCount, setCartCount] = useState<number>(0);

    const [search, setSearch] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    React.useEffect(() => {
        initDBProduct()
    }, [])

    const initDBProduct = async () => {
        setLoading(true);
        const db = await getDBConnection()
        const getProduct = await getProducts(db)
        setProduct(getProduct)
        setLoading(false);
    }

    const getImageSource = (img: string) => {
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

    const handleAddTocart = (name: string) => {
        setCheck(true)
        setCheckAddToCart(true)
        if (checkUserNull !== 0) {
            setMessae(`🎆 Đã thêm sản phẩm tên ${name} vào giỏ hàng 🎆`)
            setCartCount(cartCount + 1);
        } else {
            setMessae(`Phải đăng nhập mới được thêm sản phẩm vào giỏ hàng`)
        }
        setTimeout(() => {
            setCheck(false)
            setCheckAddToCart(false)
        }, 1500)
    }

    const filteredProducts = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchMin = minPrice ? p.price >= parseInt(minPrice) : true;
    const matchMax = maxPrice ? p.price <= parseInt(maxPrice) : true;
        return matchName && matchMin && matchMax;
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={styles.headerTitle}>🛒 Trang chủ</Text>
                <TouchableOpacity style={styles.cartIcon}>
                    <Text style={{ fontSize: 22 }}>🛍️</Text>
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cartCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.imageBanner}>
                <Image source={require('../../asset/OIP.jpg')} style={styles.imageBannerStyle} />
                <View style={styles.bannerOverlay}>
                    <Text style={styles.bannerText}>Chào mừng bạn đến với GearVn!</Text>
                </View>
            </View>

          
            <NotificationModalifaddToCart
                check={check}
                message={message}
            />

            <NavSrceen />
            <SearchBar value={search} onChange={setSearch} />
            <PriceFilter min={minPrice} max={maxPrice} onMinChange={setMinPrice} onMaxChange={setMaxPrice} />
            <View style={styles.productContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>✨ Sản phẩm </Text>
                    {/* <TouchableOpacity>
                        <Text style={styles.seeAllText}>Xem tất cả</Text>
                    </TouchableOpacity> */}
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color="#2980b9" style={{ marginTop: 30 }} />
                ) : (
                    <View style={styles.productGrid}>
                        {filteredProducts.length === 0 ? (
                            <Text style={{ color: '#888', textAlign: 'center', width: '100%', marginTop: 30 }}>Không tìm thấy sản phẩm nào.</Text>
                        ) : (
                            filteredProducts.map((product, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.productCard}
                                    activeOpacity={0.8}
                                    onPress={() => navigate.navigate('Detail', { id: product.id, category_id: product.category_id })}
                                >
                                    {index % 2 === 0 && (
                                        <View style={styles.saleTag}>
                                            <Text style={styles.saleTagText}>SALE</Text>
                                        </View>
                                    )}
                                    <Image source={getImageSource(product.image)} style={styles.productImage} resizeMode='contain' />
                                    <Text style={styles.productName}>{product.name}</Text>
                                    <Text style={styles.productPrice}>{product.price.toLocaleString()} VND</Text>
                                    <TouchableOpacity style={styles.cartButton}
                                        onPress={() => handleAddTocart(product.name)}>
                                        <Text style={{ fontSize: 18, color: '#fff' }}>🛒</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                )}
            </View>
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
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f7fa',
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 8,
        backgroundColor: '#2980b9',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginBottom: 5,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    cartIcon: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6,
        elevation: 2,
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 1,
        minWidth: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    imageBanner: {
        height: 160,
        marginBottom: 8,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBannerStyle: {
        width: '100%',
        height: 160,
        borderRadius: 18,
    },
    bannerOverlay: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    bannerText: {
        backgroundColor: 'rgba(41,128,185,0.85)',
        color: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    searchBox: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 15,
    },
    productContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2980b9',
    },
    seeAllText: {
        color: '#2980b9',
        fontWeight: '600',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 12,
        marginBottom: 15,
        shadowColor: '#2980b9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.13,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
        position: 'relative',
    },
    saleTag: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#e74c3c',
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 2,
    },
    saleTagText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    productImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
    },
    productName: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
        color: '#222',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 15,
        color: '#e74c3c',
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
        cartButton: {
        marginTop: 8, 
        backgroundColor: '#2980b9',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
        alignSelf: 'center',
        elevation: 2,
    },
  
    footerText: {
        color: '#aaa',
        fontSize: 13,
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
});