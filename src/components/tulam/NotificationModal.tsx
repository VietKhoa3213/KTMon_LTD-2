import { Modal, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

interface NotificationModalProp {
    check : boolean,
    message: string,
    onClose: () => void,
}



export const NotificationModal:React.FC<NotificationModalProp> = ({check,message,onClose}) => {
  return (
   <Modal
      transparent
      visible={check}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}


interface NotificationModalPropifaddToCart {
    check : boolean,
    message: string,
}

export const NotificationModalifaddToCart:React.FC<NotificationModalPropifaddToCart> = ({check,message}) => {
  return (
   <Modal
      transparent
      visible={check}
      animationType="fade"
    >
      <View style={styles.overlay}>
        
        <View style={styles.modalContent2}>
          <View style={styles.NotificatioTitle}>
            <Text style={styles.text}>Thông báo</Text>
        </View>
          <Text style={styles.message2}>{message}</Text>
        </View>
      </View>
    </Modal>
  )
}

interface NotificationModalPropifCreate {
    check : boolean,
    message: string,
    onClose: () => void,
    onLogin: () =>void

}

export const NotificationModalifCreate:React.FC<NotificationModalPropifCreate> = ({check,message,onClose, onLogin}) => {
  return (
   <Modal
      transparent
      visible={check}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>{message}</Text>

           <View style={styles.buttonRow}>
              <TouchableOpacity onPress={onClose} style={styles.button}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogin} style={[styles.button, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  )
}


export const NotificationModalifLogout:React.FC<NotificationModalPropifCreate> = ({check,message,onClose, onLogin}) => {
  return (
   <Modal
      transparent
      visible={check}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>{message}</Text>

           <View style={styles.buttonRow}>
              <TouchableOpacity onPress={onClose} style={styles.button}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogin} style={[styles.button, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.buttonText}>Đồng ý</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  )
}



const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalContent2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  NotificatioTitle: {
    marginLeft: -100,
    fontSize: 50,
   
  },
  text: {
    fontSize: 21,
    marginLeft: 100,
    fontWeight: 600
  },
  message2: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 30
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
    buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});