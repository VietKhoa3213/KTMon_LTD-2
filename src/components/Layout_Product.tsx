import { StyleSheet, Text, View,TouchableOpacity, Alert, Image, Button, ScrollView} from 'react-native'
import React, { useState } from 'react'

type Products = {
    id: number,
    name: string,
    price: number,
    image: string,//Dùng ImageSourcePropType để lấy ảnh mà không cần ánh xạ
    description: string
}

type ImageMap = {
    [key: string]: any; 
}

const anhxaImage : ImageMap = {
    "Logitech G Pro X Superlight 2 Dex Wireless Pink": require('../asset/LogitechGProXSuperlight2DexWirelessPink.webp'),
    "Logitech Pro X Superlight": require('../asset/pro_x_superlight.jpg'),
    "Nano 68 Pro": require('../asset/3fdbe255-9cfe-4400-9e5c-b895e2c43760.png'),
    "Razer Black Window v3": require('../asset/blackwidow_v3.jpg'),
    "Razer Deathadder V3 Pro": require('../asset/deathadder_v3_pro.webp'),
    "Razer Viper V3 Pro": require('../asset/viper_v3_pro.webp'),
}

const products: Products[]= [
    {id: 1, name: "Logitech G Pro X Superlight 2 Dex Wireless Pink", price: 2560000, image: "Logitech G Pro X Superlight 2 Dex Wireless Pink", description: "Chuột gaming Logitech G Pro X Superlight 2 Dex Wireless Pink"},
    {id: 2, name: "Logitech Pro X Superlight", price: 2100000, image: "Logitech Pro X Superlight", description: "Chuột gaming Logitech Pro X Superlight"},
    {id: 3, name: "Nano 68 Pro", price: 1800000, image: "Nano 68 Pro", description: "bàn phím gaming Nano 68 Pro"},
    {id: 4, name: "Razer Black Window v3", price: 2560000, image: "Razer Black Window v3", description: "Bàn phím gaming Razer Black Window v3"},
    {id: 5, name: "Razer Deathadder V3 Pro", price: 2560000, image: "Razer Deathadder V3 Pro", description: "Chuột gaming Razer Deathadder V3 Pro"},
    {id: 6, name: "Razer Viper V3 Pro", price: 4860000, image: "Razer Viper V3 Pro", description: "Chuột gaming Razer Viper V3 Pro"},
]

const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Layout_Product = () => {

  return (
    <ScrollView style={styles.contentView}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon}>
                <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Cửa hàng của tôi</Text>

            <TouchableOpacity style={styles.headerIcon}>
                <Text style={styles.iconText}>🛒</Text> 
            </TouchableOpacity>
            </View>
        <View style={styles.menu}>
            <TouchableOpacity style={styles.all}>
                <Text style={styles.menuText}>Tất cả</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyboard}>
                <Text style={styles.menuText}>Bàn phím</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mouse}>
                <Text style={styles.menuText}>Chuột</Text>
            </TouchableOpacity>
        </View>
        
            <View style={styles.content}>
                <Text style={styles.contentTitle}>Sản Phẩm Nổi Bật</Text>
                <View style={styles.productGrid}>
                    {products.map((product => (
                        <View key={product.id} style={styles.productCard}>
                            <Image 
                                source={anhxaImage[product.image]} 
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productDescription}>{product.description}</Text>
                                <Text style={styles.productPrice}>{formatPrice(product.price)} VNĐ</Text>
                                <TouchableOpacity 
                                    style={styles.addToCartButton}
                                    onPress={() => Alert.alert('Thông báo',`Đã thêm sản phẩm ${product.name} vào giỏ hàng`)}
                                >
                                    <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                    )))}  
                </View>
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

export default Layout_Product

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FF5733',
        height: 80,
        paddingHorizontal: 16,
        paddingTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      },
      
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      
      headerIcon: {
        width: 30,
        alignItems: 'center',
      },
      
      iconText: {
        fontSize: 20,
        color: 'white',
      },
      
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    menu: {
        flex: 0.5, 
        backgroundColor: '#33FF57',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 30,
        borderRadius: 100,
        width: '98%',
        alignSelf: 'center',
       
    },
    all: {
        flex: 1, 
        backgroundColor: '#0FC2C0',
        alignItems: 'center',   
        justifyContent: 'center',
    },
    keyboard: {
        flex: 1, 
        backgroundColor: '#0FC2C0',
        alignItems: 'center',   
        justifyContent: 'center',
    },
    mouse: {
        flex: 1, 
        backgroundColor: '#0FC2C0',
        alignItems: 'center',   
        justifyContent: 'center',
       
    },
    menuText: {
        fontSize: 16,
        fontWeight: '800',
        color: 'white',
        
    },
    contentView: {
        flex: 1, 
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 10,
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    productImage: {
        width: '100%',
        height: 120,
        marginBottom: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        height: 40,
    },
    productDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        height: 40,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5733',
        marginBottom: 10,
    },
    addToCartButton: {
        backgroundColor: '#2ecc71',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        
       
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
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