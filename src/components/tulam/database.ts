import React from 'react'
import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage"

export type Product = {
    id: number
    name: string
    price: number
    image: string
    info: string
    category_id: number
}

export type Category = {
    id: number
    category_name: string
}

export type User = {
    id:number,
    name: string,
    password: string,
    avatar: string,
    role:number,
    email:string
}

export const ImageDefault: { [key: string]: any } = {
  'pro_x_superlight': require('../../asset/pro_x_superlight.jpg'),
};

SQLite.enablePromise(true)

export const getDBConnection = async () => {
    return SQLite.openDatabase({name: 'ShopLinhTinh.db', location: 'default'})
}

export const createDB = async (db: SQLite.SQLiteDatabase) => {

// role = 1 (admin), 2 (user), 3(other)
    const query3 = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            avatar TEXT NOT NULL,
            role INTEGER NOT NULL, 
            email TEXT NOT NULL UNIQUE
        )
    `;
     await db.executeSql(query3)

    const query2 = `
        CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
        )
    `
    await db.executeSql(query2)


    const query = `
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price INTEGER NOT NULL,
            image TEXT NOT NULL,
            info TEXT NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories (id)
        )
    `;
    await db.executeSql(query)


}

const categoriesinit : Category[] = [
    {id: 1, category_name: 'Chuột gaming'},
    {id: 2, category_name: 'Bàn phím gaming'},
    {id: 3, category_name: 'Tai nghe gaming'},
    {id: 4, category_name: 'Pad chuột' },
    {id: 5, category_name: 'Màn hình'}
]




export const addCategoriesinit = async (db: SQLite.SQLiteDatabase ) => {
    const result = await db.executeSql('SELECT COUNT(*) AS count FROM categories')
    const count = result[0].rows.item(0).count

    if(count === 0){
        for(const cate of categoriesinit){
            const query = `INSERT INTO categories (id, name) VALUES (${cate.id}, '${cate.category_name}')`
            await db.executeSql(query)
        }
    }
}

export const getCategory = async (db:SQLite.SQLiteDatabase) => {
    const categories :Category[] = []
    const result = await db.executeSql(`SELECT * FROM categories`)

    result.forEach((result) => {
        for(let i = 0; i < result.rows.length; i++){
            const item = result.rows.item(i)
            categories.push({
                id: item.id,
                category_name: item.name
            })
        }
    })

    return categories
}

export const getProducts = async (db: SQLite.SQLiteDatabase) => {
    const products : Product[] = []
    const result = await db.executeSql('SELECT * FROM products')

    result.forEach((result) => {
        for(let i = 0; i<result.rows.length; i++){
            products.push(result.rows.item(i))
        }
    })

    return products
}

export const getUser = async (db:SQLite.SQLiteDatabase) => {
    const user : User[] = []
    const result = await db.executeSql('SELECT * FROM users')
    
    result.forEach((item) =>{
        for (let i = 0; i< item.rows.length; i++){
            user.push(item.rows.item(i))
        }
    })
    return user
}

export const getUserAdmin = async (db:SQLite.SQLiteDatabase) => {
    const userAdmin : User[] = []
    const result = await db.executeSql('Select * from users where role = 1')

    result.forEach((item) => {
        for (let i =0; i< item.rows.length; i++ ){
            userAdmin.push(item.rows.item(i))
        }
    })
    return userAdmin
}

export const getUserNoRole = async (db:SQLite.SQLiteDatabase) =>{
    const UserNoRole : User[] = []
    const result =  await db.executeSql('Select * from users where role = 0')

    result.forEach((item) => {
        for(let i = 0; i < item.rows.length; i++){
            UserNoRole.push(item.rows.item(i))
        }
    })
    return UserNoRole
}


export const getUseruser = async (db:SQLite.SQLiteDatabase) => {
    const userAdmin : User[] = []
    const result = await db.executeSql('Select * from users where role = 2')

    result.forEach((item) => {
        for (let i =0; i< item.rows.length; i++ ){
            userAdmin.push(item.rows.item(i))
        }
    })
    return userAdmin
}

const userAdminInit: User[] = [
    {id: 1, name: 'admin', password: '123456', avatar: '', role: 1, email: 'admin123@gmail.com' }
]

export const addAdmininit = async (db: SQLite.SQLiteDatabase ) => {
    const result = await db.executeSql('SELECT COUNT(*) AS count FROM users')
    const count = result[0].rows.item(0).count

    if(count === 0){
        for(const user of userAdminInit){
            const query = `INSERT INTO users ( name, password, avatar, role, email) 
            VALUES ( '${user.name}', '${user.password}','${user.avatar}', ${user.role}, '${user.email}')`
            await db.executeSql(query)
        }
    }
}

export const addProduct = async (
    db: SQLite.SQLiteDatabase,
    name: string,
    price:number,
    image: string,
    info: string,
    category_id: number
) => {
    const query = `INSERT INTO products (name, price, image, info, category_id) VALUES ('${name}', ${price}, '${image}', '${info}', ${category_id})`
    await db.executeSql(query) 
}

export const updateProductDB = async (
    db:SQLite.SQLiteDatabase,
    id: number,
    name: string,
    price: number,
    image: string,
    info: string,
    category_id: number
) => {
        const query = `UPDATE products SET name = '${name}', price = ${price}, image = '${image}', info = '${info}', category_id= '${category_id}' WHERE id = ${id}`
        await db.executeSql(query)
}

export const deleteProduct = async (
    db: SQLite.SQLiteDatabase,
    id: number
)=>{
    const query = `DELETE FROM products WHERE id = ${id}`
    await db.executeSql(query)
}


export const findProductCategory = async (db:SQLite.SQLiteDatabase, id: number) => {
    const products : Product[] = []
    const query = await db.executeSql(`select * from products where category_id = ${id}`)
    query.forEach((result) => {
            for (let i = 0; i<result.rows.length; i++){
            products.push(result.rows.item(i))
        }
    })
    return products
}

export const checkUserRegister = async (
    db:SQLite.SQLiteDatabase,
    name:string,
    email:string
) => {
    const query = await db.executeSql(`select * from users where name = '${name}' or email = '${email}'`)

    return query[0].rows.length === 0
}

export const createUser = async (
    db:SQLite.SQLiteDatabase,
    name: string,
    password: string,
    avatar: string,
    role:number,
    email:string
) =>{
    try{
    await db.executeSql(`insert into users (name, password, avatar, role, email) 
        values ('${name}', '${password}','${avatar}', ${role}, '${email}')`)
    }
    catch (CreateUserError){
        console.log('Gặp lỗi khi đăng ký')
    }
}

export const updateUserS = async (
    db:SQLite.SQLiteDatabase,
    name: string,
    password: string,
    avatar: string,
    role:number,
    email:string,
    editingId: number
) =>{
    try{
    await db.executeSql(`update users set name = '${name}', password = '${password}', avatar = '${avatar}', role = ${role}, email = '${email}' where id = ${editingId}`)
    }
    catch (CreateUserError){
        console.log('Gặp lỗi khi sửa')
    }
}

export const deleteUser = async (
    db: SQLite.SQLiteDatabase,
    id: number
)=>{
    const query = `DELETE FROM users WHERE id = ${id}`
    await db.executeSql(query)
}



export const Login = async (
    db: SQLite.SQLiteDatabase,
    name: string,
    email:string,
    password: string,
    checkEmai:boolean
) =>{
   let query = null
   
   if(checkEmai === true){
        query = `Select * from users where email = '${email}' and password = '${password}'`
    }else{
        query = `Select * from users where name = '${name}' and password = '${password}'`
        
    }

    const result = await db.executeSql(query)
    const row = result[0].rows
    
    if(row.length > 0){

        const user = row.item(0) as {
            id:number,
            name: string,
            password: string,
            avatar: string,
            role:number,
            email:string
        }
    return user
    }

    return null
}

export const addCategory = async (
  db: SQLite.SQLiteDatabase,
  name: string
) => {
  const query = `INSERT INTO categories (name) VALUES ('${name}')`
  await db.executeSql(query)
}

export const updateCategory = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  name: string
) => {
  const query = `UPDATE categories SET name = '${name}' WHERE id = ${id}`
  await db.executeSql(query)
}

export const deleteCategory = async (
  db: SQLite.SQLiteDatabase,
  id: number
) => {
  const query = `DELETE FROM categories WHERE id = ${id}`
  await db.executeSql(query)
}

export const getUserById = async (
    db:SQLite.SQLiteDatabase,
    id:number
) => {
    const  query = `SELECT * FROM users where id = ${id}`
    const result = await db.executeSql(query)

    if(result[0].rows.length > 0){
        return result[0].rows.item(0)
    }
    return null
 }