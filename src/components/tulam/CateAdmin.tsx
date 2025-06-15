import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { getDBConnection, Category, getCategory } from './database'
import { NotificationModalifLogout } from './NotificationModal'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from './navigation/types'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeAdmin'>

const CateAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryName, setCategoryName] = useState<string>('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [searchCategory, setSearchCategory] = useState<string>('')
  const navigation = useNavigation<NavigationProp>()
  const [check, setCheck] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const filteredCategories = categories.filter((item) => 
    item.category_name.toLowerCase().includes(searchCategory.toLowerCase())
  )

  React.useEffect(() => {
    initDB()
  }, [])

  const initDB = async () => {
    const db = await getDBConnection()
    const storedCategories = await getCategory(db)
    setCategories(storedCategories)
  }

  const handleAddCategory = async () => {
    if (!categoryName) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên danh mục')
      return
    }

    const db = await getDBConnection()
    
    if (editingId === null) {
      const query = `INSERT INTO categories (name) VALUES ('${categoryName}')`
      await db.executeSql(query)
    } else {
      const query = `UPDATE categories SET name = '${categoryName}' WHERE id = ${editingId}`
      await db.executeSql(query)
      setEditingId(null)
    }

    const updatedCategories = await getCategory(db)
    setCategories(updatedCategories)
    setCategoryName('')
  }

  const handleDeleteCategory = async (id: number, name: string) => {
    const db = await getDBConnection()
    const CheckCateProductIfDelete =  await db.executeSql(`select count (*) as count from products where category_id = ${id}`)
    const count = CheckCateProductIfDelete[0].rows.item(0).count

    if(count === 0){
        Alert.alert(
        'Thông báo',
        `Bạn có chắc chắn muốn xóa danh mục ${name}?`,
        [
            { text: 'Hủy', style: 'cancel' },
            {
            text: 'Xóa',
            onPress: async () => {
                await db.executeSql(`DELETE FROM categories WHERE id = ${id}`)
                const updatedCategories = await getCategory(db)
                setCategories(updatedCategories)
            }
            }
        ]
        )
    }else {
        Alert.alert('Thông báo', 'Vẫn còn sản phẩm thuộc danh mục này, hãy xóa sản phẩm trước')
    }
  }

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setCategoryName(category.category_name)
  }

  return (
    <View style={{ flex: 1 }}>
      <NotificationModalifLogout
        check={check}
        message={message}
        onClose={() => setCheck(false)}
        onLogin={() => navigation.navigate('Login')}
      />

      <View style={styles.headerComp}>
        <Text style={styles.textHeaderComp}>Quản lý danh mục</Text>
        <TouchableOpacity 
          onPress={() => {
            setCheck(true)
            setMessage('Bạn có muốn đăng xuất?')
          }}
        >
          <Text style={styles.textHeaderComp2}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingBottom: 60 }}>
        <View style={styles.containerInput}>
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: 14 }}>
            {editingId ? 'Cập nhật danh mục' : 'Thêm danh mục'}
          </Text>

          <View style={styles.InputComp}>
            <TextInput
              placeholder='Nhập tên danh mục'
              value={categoryName}
              style={styles.InputStyle}
              onChangeText={setCategoryName}
            />
          </View>

          <TouchableOpacity 
            style={editingId ? styles.buttonUpdateProduct : styles.buttonAddProduct} 
            onPress={handleAddCategory}
          >
            <Text style={styles.textAddButton}>
              {editingId ? 'Cập nhật' : 'Thêm danh mục'}
            </Text>
          </TouchableOpacity>

          {editingId && (
            <TouchableOpacity 
              style={styles.cancelUpdate} 
              onPress={() => {
                setEditingId(null)
                setCategoryName('')
              }}
            >
              <Text style={styles.textAddButton}>Hủy cập nhật</Text>
            </TouchableOpacity>
          )}

          <View style={styles.inputsearch}>
            <TextInput
              placeholder='Tìm danh mục'
              value={searchCategory}
              style={styles.InputStyle}
              onChangeText={setSearchCategory}
            />
          </View>
        </View>

        <View style={styles.ListProductsComp}>
          {filteredCategories.length === 0 ? (
            <Text style={styles.TextCantFindProduct}>Không có danh mục nào</Text>
          ) : (
            filteredCategories.map((item) => (
              <View key={item.id} style={styles.categoryCard}>
    <TouchableOpacity 
        style={styles.categoryButton}
        onPress={() => {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'HomeAdmin',
                        params: { categoryId: item.id }
                    }
                ]
            });
        }}
    >
        <Text style={styles.categoryName}>{item.category_name}</Text>
    </TouchableOpacity>
    <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEdit(item)}
        >
            <Text>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteCategory(item.id, item.category_name)}
        >
            <Text>🗑️</Text>
        </TouchableOpacity>
    </View>
</View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default CateAdmin

const styles = StyleSheet.create({
 headerComp : {
        height: 50,
        backgroundColor: "#F2E3D5",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textHeaderComp : {
        textAlign: "center",
        fontSize: 17,
        fontWeight: 500,
        marginEnd: 15,
        marginStart: 15,
        marginTop: 13
    },
    textHeaderComp2 : {
        textAlign: "center",
        fontSize: 17,
        fontWeight: 500,
        marginEnd: 15,
        marginStart: 15,
        marginTop: 5,
       
        padding: 8,
        borderRadius: 15,
        backgroundColor: '#D9D9D9'
    },


    InputStyle : {
        borderWidth: 1,
        width: "90%",
        borderRadius: 14,
        marginTop: 10,
        height: 50,
    },

    containerInput : {
        marginBottom: 30,
    },

    InputComp : {
        alignItems: "center",
    },

    ListProductsComp: {
        flex: 1,
        padding: 10,
    },

    buttonAddProduct : {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 15,
        width: "90%",
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        height: 35,
        backgroundColor: 'green',
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonUpdateProduct: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 15,
        width: "45%",
        alignItems: 'center',
        marginLeft: 15,
        justifyContent: 'center',
        height: 35,
        backgroundColor: 'green',
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
    },

    cancelUpdate : {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: -35,
        width: "45%",
        alignItems: 'center',
        alignSelf : "flex-end",   
        marginRight: 15,
        justifyContent: 'center',
        height: 35,
        backgroundColor: 'red',
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
        
    },

    textAddButton : {
        fontWeight:'600',
        color:"white",
        fontSize: 18,
    },
  categoryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    elevation: 2,
  },

  categoryButton: {
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    elevation: 2,
  },
   inputsearch : {
        alignItems: 'center'
    },
    TextCantFindProduct : {
        fontSize: 17,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center'
    },
})