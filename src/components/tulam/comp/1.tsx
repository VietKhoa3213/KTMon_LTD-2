import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export const SearchBar = ({ value, onChange }: Props) => (
  <View style={styles.container}>
    <TextInput
      placeholder="🔍 Tìm kiếm sản phẩm..."
      value={value}
      onChangeText={onChange}
      style={styles.input2}
    />
  </View>
);




type Props2 = {
  min: string;
  max: string;
  onMinChange: (text: string) => void;
  onMaxChange: (text: string) => void;
};

export const PriceFilter = ({ min, max, onMinChange, onMaxChange }: Props2) => (
  <View style={styles.row}>
    <Text style={styles.label}>Giá từ:</Text>
    <TextInput
      style={styles.input}
      value={min}
      onChangeText={onMinChange}
      keyboardType="numeric"
      placeholder="Min"
    />
    <Text style={styles.label}>đến</Text>
    <TextInput
      style={styles.input}
      value={max}
      onChangeText={onMaxChange}
      keyboardType="numeric"
      placeholder="Max"
    />
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10 },
  label: { fontSize: 14, marginHorizontal: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 70,
    backgroundColor: '#fff',
    fontSize: 14,
  },
   container: { paddingHorizontal: 10, marginTop: 10 },
  input2: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 15,
  }
});

export default PriceFilter;
