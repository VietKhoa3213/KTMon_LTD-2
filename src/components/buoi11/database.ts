import { Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category_id: number;
};

export type Category = {
    id:number;
    category_name: string;
}

const productImages = {
  'pro_x_superlight': require('../../asset/pro_x_superlight.jpg'),
};

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'Shop.db', location: 'default' });
};

export const createDB = async (db: SQLite.SQLiteDatabase) => {
const query2 = `
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        category_name TEXT NOT NULL
    )`
  await db.executeSql(query2)

  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      image TEXT NOT NULL,
      category_id INTEGER NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
  `;

  
  await db.executeSql(query);

  
};

export const getProducts = async (db: SQLite.SQLiteDatabase): Promise<Product[]> => {
  try {
    const products: Product[] = [];
    const result = await db.executeSql('SELECT * FROM products');

    result.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        products.push(result.rows.item(index));
      }
    });
    return products;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get products');
  }
};


const initialCategories : Category[] =[
    {id: 1, category_name: 'Chuột gaming'},                                                 
    {id: 2, category_name: 'Bàn phím gaming'},
    {id: 3, category_name: 'Tai nghe gaming'},
    {id: 4, category_name: 'Pad chuột'}
]



export const insertInitialCategories = async (db: SQLite.SQLiteDatabase) => {
    try {
        const result = await db.executeSql('SELECT COUNT(*) as count from categories')
        const count = result[0].rows.item(0).count;

        if(count === 0 ){

            for(const getCategory of initialCategories) {
                const insertQuery = `INSERT INTO categories (id, category_name) VALUES (${getCategory.id}, '${getCategory.category_name}')`
                await db.executeSql(insertQuery)
            }
        }
    }catch (error) {
        console.error(error);
    throw Error('Failed to insert categories');
    }
}


export const getCategory = async (db: SQLite.SQLiteDatabase): Promise<Category[]> =>  {
    try {
        const categories: Category[] = [];
        const result = await db.executeSql('SELECT * FROM categories')

        result.forEach((resultSet) => {
            for (let i = 0; i < resultSet.rows.length; i++) {
                const item = resultSet.rows.item(i);
                categories.push({
                    id: item.id,
                    category_name: item.category_name
                });
            }
        });
        return categories
    } catch (error) {
        console.error(error);
    throw Error('Failed to get categories');
    }
}




export const saveProduct = async (
  db: SQLite.SQLiteDatabase,
  name: string,
  price: number,
  category_id: number,
  image: string
) => {
  const insertQuery = `INSERT INTO products(name, price, image, category_id) VALUES ('${name}', ${price}, '${image}', ${category_id} )`;
  return db.executeSql(insertQuery);
};

export const updateProductDB = async (
  db: SQLite.SQLiteDatabase,
  name: string,
  price: number,
  category_id:number,
  image:string,
  editingId: number
) => {
  const updateQuery = `UPDATE products SET name = '${name}', price = ${price}, category_id = ${category_id}, image = '${image}' WHERE id = ${editingId}`;
  return db.executeSql(updateQuery);
};

export const deleteProduct = async (db: SQLite.SQLiteDatabase, editingId: number) => {
  const deleteQuery = `DELETE FROM products WHERE id = ${editingId}`;
  return db.executeSql(deleteQuery);
};

export const getImageSource = (imageName: string) => {
  if (!imageName) return require('../../asset/pro_x_superlight.jpg');
  if (productImages.hasOwnProperty(imageName)) {
    return productImages[imageName as keyof typeof productImages];
  }
  return require('../../asset/pro_x_superlight.jpg');
};

export const findProductCategory = async (db:SQLite.SQLiteDatabase, id:number): Promise<Product[]> => {
  const products :Product[] = []
  const findQuery = await db.executeSql(`SELECT * FROM products WHERE category_id = ${id}`);
   findQuery.forEach((resultSet) => {
      for (let index = 0; index < resultSet.rows.length; index++) {
        products.push(resultSet.rows.item(index));
      }
    });
    return products;
}