import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const layout2 = () => {
  return (
        <View style={styles.container}>
            <View style={styles.logo_header}>
                <View style={styles.logo}>
                    <Image source={require('../asset/BONEST.jpg')} style={styles.logoImage}></Image>
                </View>
                <View style={styles.header}>
                    {/* <Text style={styles.text}>Header</Text> */}
                    <Image source={require('../asset/poster-8.jpg')} style={styles.bannerImage}></Image>
                </View>  
            </View>
            <View style = {styles.menu}>
                <View style={styles.home}>
                    <Text style={styles.text}>Trang chủ</Text>
                </View>
                <View style={styles.product}>
                    <Text style={styles.text}>Sản phẩm</Text>
                </View>
                <View style={styles.hotline}>
                    <Text style={styles.text}>Liên hệ</Text>
                </View>
            </View>
            <View style={styles.subbar_content}>
                <View style={styles.subbar}>
                    <Text style={styles.text}>subbar</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>content</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text}>footer</Text>
            </View>
        </View>
  )
}

export default layout2

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    logo_header: {
        flex: 1,
        flexDirection: 'row',
    },
    logo: {
        backgroundColor: '#34495e',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        backgroundColor: '#FF5733',
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subbar_content: {
        backgroundColor: '#33FF57',
        flex: 5,
        flexDirection: 'row',
    },

    subbar: {
        backgroundColor: '#33FF57',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: '#3357FF',
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        backgroundColor: '#FF33A1',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: 'black',
    },
    logoImage: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
      },
    bannerImage: {
        width: 340,
        height: 160,
        resizeMode: 'cover',
      },

    menu: {
        backgroundColor: '#FF5733',
        flex: .3,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    home: {
        backgroundColor: 'violet',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    product: {
        backgroundColor: '#D92525',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hotline: {
        backgroundColor: 'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})