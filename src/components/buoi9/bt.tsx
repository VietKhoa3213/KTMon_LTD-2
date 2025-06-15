import { StyleSheet, Text, View, TextInput, Button,Image,TouchableOpacity, Alert, ScrollView,} from 'react-native'
import React, {useState} from 'react'

type Students={
    id: number;
    name: string;
    age: number;
    grade: number; 
}

const StudentList: Students[] = [
    {id: 1, name: 'Nguyễn Văn B', age: 18, grade: 7.8},
    {id: 2, name: 'Nguyễn Văn A', age: 17, grade: 10},
    {id: 3, name: 'Nguyễn Văn C', age: 16, grade: 9.5},
]

const test1 = () => {
    const [students, setStudent] = useState(StudentList);
    const [nameStudent, setNameStudent] = useState<string>('')
    const [ageStudent,  setAgeStudent] = useState<number>(0)
    const [gradeStudent, setGradeStudent] = useState<String>('')
    const [editingId, setEditingId] = useState<number | null> (null)

    const [chucnang,setChucnang] = useState<number | null> (null)
    const [minAge,setMinAge] = useState<number> (0)
    const [maxAge,setMaxAge] = useState<number> (0)
    const [mangLoc,setMangLoc] = useState(StudentList);

    const [findGradeStudent, setFindGradeStudent] = useState<String>('')
    const [GradeTF, setGradeTF] = useState<boolean>(false)

    const handleAddStudent = () =>{
        if(!nameStudent || !ageStudent || !gradeStudent){
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ')
            return
        }

        if (parseFloat(gradeStudent.toString()) < 0 || parseFloat(gradeStudent.toString()) >10){
            Alert.alert('Thông báo','Điểm nhập vào phải nằm trong khoản từ 0-10')
            return
        }
      

        if(editingId !== null){
            const updateStudent = students.map(item => item.id === editingId ? {...item, name: nameStudent, age: ageStudent, grade: parseFloat(gradeStudent.toString())} : item)
            setStudent(updateStudent)
            setMangLoc(updateStudent)
            setEditingId(0)

        }else{
            const newStudent : Students = {
            id: students.length + 1,
            name: nameStudent,
            age: ageStudent,
            grade: parseFloat(gradeStudent.toString()),
            }
            setStudent([...students,newStudent])
            setMangLoc([...students,newStudent])
            
        }

        setNameStudent('')
        setAgeStudent(0)
        setAgeStudent(0)
        setGradeStudent('')
    }

    const handleUpdateStudent = (students: Students) =>{
        setNameStudent(students.name)
        setAgeStudent(students.age)
        setEditingId(students.id)
        setGradeStudent(students.grade.toString())
    }

    const handleDeleteStudent = (id:number) =>{
        const deletestudent = students.filter(item => item.id !== id)
        setStudent(deletestudent)
        setMangLoc(deletestudent)
    }

    const handleHuyAddStudent = () =>{
        setEditingId(null)
        setNameStudent('')
        setAgeStudent(0)
        setGradeStudent('')
        setFindGradeStudent('')
    }

    const hanldeloctuoi = () => {
        if (parseInt(minAge.toString()) === 0 || parseInt(maxAge.toString())=== 0){
            Alert.alert("Thông báo", "vui lòng nhập tuổi")
            return
        }
        const loc = students.filter(student =>  student.age >= minAge && student.age <= maxAge)
        setMangLoc(loc)
       
    }

    const handlehuyloc = () =>{
        setChucnang(null)
        setMangLoc(students)
        setGradeTF(false)
        setFindGradeStudent('')
    }

    const sapxepgiamdan = () => {
        if(chucnang == 2){
            setMangLoc([...mangLoc].sort((a,b) => b.age - a.age))
        }else if (chucnang == 3){
             setMangLoc([...mangLoc].sort((a,b) => b.grade - a.grade))

        }
    }

    const sapxeptangdan = () =>{
        if(chucnang == 2){
            setMangLoc([...mangLoc].sort((a,b) => a.age - b.age))
        }else if (chucnang == 3){
            setMangLoc([...mangLoc].sort((a,b) => a.grade - b.grade))

        }
    }

    const thongkediem = () => {

        if(parseFloat(findGradeStudent.toString())<0 || parseFloat(findGradeStudent.toString()) > 10){
            Alert.alert("Điểm phải nằm trong khoảng từ 0-10")
            return
        }
        
        setMangLoc(students.filter(student => student.grade >= parseFloat(findGradeStudent.toString())))
        setGradeTF(true)
    }


  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.textheader}>Quản lí sinh viên</Text>
            </View>
        <View style={styles.containerAddProduct}>
            {chucnang === null ? 
                <>
                <View style={styles.containerInput}>
                    <TextInput 
                        placeholder='Nhập tên sinh viên'
                        value={nameStudent}
                        style={styles.textInput}
                        onChangeText={setNameStudent}
                    ></TextInput>
                    <TextInput 
                        placeholder='Nhập tuổi sinh viên'
                        style={styles.textInput}
                        value={ageStudent.toString()}
                        onChangeText={(text) => setAgeStudent(Number(text))}
                    ></TextInput>
                    <TextInput 
                        placeholder='Nhập điểm sinh viên (0-10)'
                        style={styles.textInput}
                        value={gradeStudent.toString()}
                        keyboardType='decimal-pad'
                        onChangeText={setGradeStudent}
                    />
                </View>
                <TouchableOpacity style={editingId ? styles.updatebutton : styles.Addbutton}>
                    <Text style= {styles.textAddbutton} onPress={handleAddStudent}>{editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}</Text>
                </TouchableOpacity>

                {editingId ?   
                <TouchableOpacity style={styles.huybutton}>
                    <Text style= {styles.textAddbutton} onPress={handleHuyAddStudent}>Hủy cập nhật</Text>
                </TouchableOpacity> : ""}


                    <TouchableOpacity style={styles.fitertuoi} onPress={() => setChucnang(1)}>
                        <Text style= {styles.textAddbutton} >Lọc theo tuổi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fitertuoi} onPress={() => setChucnang(2)}>
                         <Text style= {styles.textAddbutton} >Sắp xếp theo tuổi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fitertuoi} onPress={() => setChucnang(3)}>
                         <Text style= {styles.textAddbutton} >Sắp xếp theo điểm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fitertuoi} onPress={() => setChucnang(4)}>
                         <Text style= {styles.textAddbutton} >Số lượng học sinh theo điểm</Text>
                    </TouchableOpacity>
 

                </>
                
            : chucnang == 1? 

                <>
                <View style={styles.containerInput}>
                    <Text>Tuổi min</Text>
                    <TextInput 
                        placeholder='Nhập tuổi min'
                        style={styles.textInput}
                        value={minAge.toString()}
                        onChangeText={(text) => setMinAge(Number(text))}
                    ></TextInput>
                    <Text>Tuổi max</Text>

                    <TextInput 
                        placeholder='Nhập tuổi max'
                        style={styles.textInput}
                        value={maxAge.toString()}
                        onChangeText={(text) => setMaxAge(Number(text))}
                    ></TextInput>
                    
                </View>

                <TouchableOpacity style={styles.fitertuoi} onPress={hanldeloctuoi}>
                    <Text style= {styles.textAddbutton} >Lọc theo tuổi</Text>
                </TouchableOpacity>
                {chucnang ?   
                <TouchableOpacity style={styles.huybutton2}>
                    <Text style= {styles.textAddbutton} onPress={() => handlehuyloc()}>Hủy lọc tuổi</Text>
                </TouchableOpacity> : ""}
                </>

            : chucnang == 2? 

                <>
                    <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>Sắp xếp học sinh theo tuổi</Text>
                    <TouchableOpacity style={styles.fitertuoi} onPress={sapxepgiamdan}>
                        <Text style= {styles.textAddbutton} >Sắp xếp giảm dần</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fitertuoi} onPress={sapxeptangdan}>
                        <Text style= {styles.textAddbutton} >Sắp xếp tăng dần</Text>
                    </TouchableOpacity>

                    {chucnang ?   
                    <TouchableOpacity style={styles.huybutton2}>
                        <Text style= {styles.textAddbutton} onPress={() => handlehuyloc()}>Hủy sắp xếp theo tuổi</Text>
                    </TouchableOpacity> : ""}
                </>

                    : chucnang == 3? 

                 <>
                    <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>Sắp xếp học sinh theo điểm</Text>
                    <TouchableOpacity style={styles.fitertuoi} onPress={sapxepgiamdan}>
                        <Text style= {styles.textAddbutton} >Sắp xếp giảm dần</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fitertuoi} onPress={sapxeptangdan}>
                        <Text style= {styles.textAddbutton} >Sắp xếp tăng dần</Text>
                    </TouchableOpacity>

                    {chucnang ?   
                    <TouchableOpacity style={styles.huybutton2}>
                        <Text style= {styles.textAddbutton} onPress={() => handlehuyloc()}>Hủy sắp xếp theo tuổi</Text>
                    </TouchableOpacity> : ""}
                </> 

                : chucnang == 4?

                <>
                    <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                        Nhập Điểm để tìm những học sinh có điểm lớn hơn điểm vừa nhập {findGradeStudent}
                    </Text>
                    <TextInput 
                        placeholder='Nhập Điểm để tìm những học sinh có điểm lớn hơn điểm vừa nhập'
                        style={styles.textInput}
                        value={findGradeStudent.toString()}
                        onChangeText={setFindGradeStudent}
                    ></TextInput>
                    
                    {findGradeStudent !== "" && GradeTF == true?
                    <Text>Có {mangLoc.length} sinh viên có điểm bằng hoặc lớn hơn {findGradeStudent}</Text>
                        :
                        ""
                    }
                

                    <TouchableOpacity style={styles.fitertuoi} onPress={thongkediem}>
                        <Text style= {styles.textAddbutton} >Tìm kiếm và thống kê</Text>
                    </TouchableOpacity>


                    {chucnang ?   
                    <TouchableOpacity style={styles.huybutton2}>
                        <Text style= {styles.textAddbutton} onPress={() => handlehuyloc()}>Hủy</Text>
                    </TouchableOpacity> : ""}
                </> 

                : null
            }   
        </View>

        <View style={styles.containerAddProductInfo}>
            {chucnang === null ?
            <>
              {students.map((item) =>(
                <View key={item.id} style = {styles.productCard}>
                        <View style={styles.rightsite}>
                            <Text style={styles.nameProduct}>Tên sinh viên: {item.name}</Text>
                            <Text style={styles.priceProduct}>Tuổi: {item.age}</Text>
                            <Text style={styles.gradeStudent}>Điểm: {item.grade}</Text>
                            <View style={styles.containerButton}>
                                <TouchableOpacity onPress={() => handleUpdateStudent(item) }>
                                    <Text style={styles.icon} >✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteStudent(item.id)}>
                                    <Text style={styles.icon}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
            ))}
            </>
            : 
            <>
                {mangLoc.map((item) =>(
                <View key={item.id} style = {styles.productCard}>
                        <View style={styles.rightsite}>
                            <Text style={styles.nameProduct}>Tên sinh viên: {item.name}</Text>
                            <Text style={styles.priceProduct}>Tuổi: {item.age}</Text>
                            <Text style={styles.gradeStudent}>Điểm: {item.grade}</Text>
                            <View style={styles.containerButton}>
                                <TouchableOpacity onPress={() => handleUpdateStudent(item) }>
                                    <Text style={styles.icon} >✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteStudent(item.id)}>
                                    <Text style={styles.icon}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
            ))}
            </>
            }
        </View>
    </ScrollView>
  )
}

export default test1

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        backgroundColor: '#2980b9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textheader: {
        fontSize: 20,
        color: '#fff',
    },
    containerAddProduct: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    containerInput: {
        width: '96%',
        marginBottom: 20,

    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#2980b9',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    textButton: {
        fontSize: 20,
        color: '#fff',
    },

    textAddbutton: {
        fontSize: 20,
        color: '#fff',
    },

    productCard: {
        flexDirection: 'row',
        width: '96%',
        height: 110,
        borderWidth: 1,
        borderColor: '#2980b9',
        borderRadius: 10,
        marginLeft: 3,
        marginBottom: 10,
    },
    leftsite: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Addbutton: {
        backgroundColor: '#2980b9',
        width: '96%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -10,
    },

    fitertuoi:{
        backgroundColor: '#2980b9',
        width: '96%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },

    updatebutton: {
        backgroundColor: 'green',
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -10,
        marginLeft: -190,
    },

    huybutton: {
        backgroundColor: 'red',
        width: '44%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 210,
        marginTop: -50
    },

    huybutton2: {
        backgroundColor: 'red',
        width: '96%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
       marginTop: 10,
    },
    gradeStudent: {
        fontSize: 18,
        color: '#2980b9',
    },
    rightsite: {
        flex: 2,
        marginLeft: 10,
    },
    imageproducts: {
        marginLeft:-30,
        width: 80,
        height: 80,
    },
    nameProduct: {
        fontSize: 20,
        color: '#2980b9',
    },
    priceProduct: {
        fontSize: 18,
        color: '#2980b9',
    },
    containerAddProductInfo: {
        flex: 3.5,
        justifyContent: 'flex-start',
        marginTop: 10,
        alignItems: 'center',
    },
  
    icon: {
        fontSize: 20,
        color: '#fff',
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -10,
        marginRight: 10,
        gap: 20,
    },
    

 
})