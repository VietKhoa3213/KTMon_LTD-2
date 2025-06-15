import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

type CategorySelectorProps = {
  categories: {
    id: number;
    category_name: string;
  }[];
  selectedId: number | undefined;
  onSelect: (id: number) => void;
};

const CategorySelector = ({ categories, selectedId, onSelect }: CategorySelectorProps) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryBtn,
            selectedId === category.id && styles.categoryBtnActive
          ]}
          onPress={() => onSelect(category.id)}
        >
          <Text 
            style={[
              styles.categoryBtnText,
              selectedId === category.id && styles.categoryBtnTextActive
            ]}
          >
            {category.category_name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryBtnActive: {
    backgroundColor: '#2980b9',
  },
  categoryBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  categoryBtnTextActive: {
    color: '#fff',
  },
});

export default CategorySelector;