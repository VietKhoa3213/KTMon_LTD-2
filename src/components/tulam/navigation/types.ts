export type RootStackParamList = {
  Splash: undefined;
  HomeAdmin:{categoryId?: number } ; 
  userAdmin: undefined;
  Detail: { id: number, category_id: number };   
  Category: |{id:number, category_name: string}| undefined;
  Login: undefined
  Register: undefined
  Home: 
  |
    { 
      id:number,
      name: string,
      password: string,
      avatar: string,
      role:number,
      email:string
    } 
  | undefined
  UserInfo: { id: number; name: string };
};

