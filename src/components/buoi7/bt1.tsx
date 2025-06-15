import { StyleSheet, Text, View,Image,TouchableOpacity,Alert,ImageSourcePropType,SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

type ProductCardProps = {
    image: ImageSourcePropType;
    name: string;
    description: string;
    price: number;
}

//Logitech G Pro X Superlight 2 Dex Wireless Pink
//ASDASD
//(2560000)
const ProductCard = ({ image, name, description, price }: ProductCardProps) => {
    return(
        <View style={styles.productCard}>
            <Image 
                source={image} 
                style={styles.productImage}
                resizeMode="contain"
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productDescription}>{description}</Text>
                <Text style={styles.productPrice}>{(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
                <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={() => Alert.alert('Thông báo',`Đã thêm sản phẩm vào giỏ hàng`)}
                >
                    <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                                                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

const bt1 = () => {
  return (
          <SafeAreaView style={styles.container}>
            <ScrollView>
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
                            <View style={styles.productGrid}>
                                    <ProductCard image={require('../../asset/LogitechGProXSuperlight2DexWirelessPink.webp')} name='Logitech G Pro X Superlight 2 Dex Wireless Pink' description='Lonf' price = {2560000} />
                                     <ProductCard image={require('../../asset/pro_x_superlight.jpg')} name='Logitech Pro X Superlight' description='Lonf' price = {2560000} />
                                    <ProductCard image={require('../../asset/3fdbe255-9cfe-4400-9e5c-b895e2c43760.png')} name='Nano 68 Pro' description='ssss' price = {2100000} />
                                    <ProductCard image={require('../../asset/blackwidow_v3.jpg')} name='Razer Black Window v3' description='asd' price = {1800000} />
                                    <ProductCard image={require('../../asset/deathadder_v3_pro.webp')} name='Razer Deathadder V3 Pro' description='wee' price = {2560000} />
                                    <ProductCard image={require('../../asset/viper_v3_pro.webp')} name='Razer Viper V3 Pro' description='Lonf' price = {2560000} />
                                    <ProductCard image={require('../../asset/LogitechGProXSuperlight2DexWirelessPink.webp')} name='Logitech G Pro X Superlight 2 Dex Wireless Pink' description='123' price = {4860000} />
                                    <ProductCard image={require('../../asset/LogitechGProXSuperlight2DexWirelessPink.webp')} name='Logitech G Pro X Superlight 2 Dex Wireless Pink' description='ddd' price = {2560000} />
                                    <ProductCard image={require('../../asset/LogitechGProXSuperlight2DexWirelessPink.webp')} name='Logitech G Pro X Superlight 2 Dex Wireless Pink' description='ff' price = {2560000} />
                            
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
          </SafeAreaView>
    )
}

export default bt1

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
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
        flex: 0.3, 
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
        borderRadius: 10,
        borderWidth: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        height: 20,
    },
    productDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        height: 20,
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