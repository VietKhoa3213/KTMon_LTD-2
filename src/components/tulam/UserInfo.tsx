import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './navigation/types';
import { getDBConnection, getUserById } from './database';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type UserInfoRouteProp = RouteProp<RootStackParamList, 'UserInfo'>;

type User = {
  id: number;
  name: string;
  avatar: string;
  email?: string;
  phone?: string;
};

const getImageSource = (img: string) => {
  if (!img) return require('../../asset/blackwidow_v3.jpg');
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

const UserInfo = () => {
  const route = useRoute<UserInfoRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const { id } = route.params || {};
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const db = await getDBConnection();
      const userData = await getUserById(db, id);
      setUser(userData);
    };
    fetchUser();
  }, [id]);

    if (!id || id === 0 || !user) {
    return (
      <View style={styles.containerCenter}>
        {/* <Image 
          source={require('../../asset/login-img.png')} 
          style={styles.loginImage} 
        /> */}
        <Text style={styles.titleLarge}>Vui lòng đăng nhập</Text>
        <Text style={styles.subtitleText}>Đăng nhập để xem thông tin tài khoản của bạn</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Image
            source={getImageSource(user.avatar)}
          style={styles.avatarLarge}
        />
        <Text style={styles.nameText}>{user.name}</Text>
        <Text style={styles.idText}>ID: {user.id}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📧</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email || 'Chưa cập nhật'}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📱</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Số điện thoại</Text>
              <Text style={styles.infoValue}>{user.phone || '0123456789'}</Text>
            </View>
          </View>
        </View>

 
      </View>
    </ScrollView>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  titleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#2980b9',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#2980b9',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 15,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  idText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  infoContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f7ff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2980b9',
  },
  editButtonText: {
    color: '#2980b9',
    fontWeight: 'bold',
    fontSize: 16,
  },
});