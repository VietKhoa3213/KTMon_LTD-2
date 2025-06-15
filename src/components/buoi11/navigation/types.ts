export type RootStackParamList = {
  Home: undefined; 
  Detail: { id: number, category_id: number };   
  Category: {id:number, category_name: string}
};