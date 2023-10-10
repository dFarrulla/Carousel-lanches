import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Carousel, { PaginationLight } from 'react-native-x-carousel';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [legend, setLegend] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      const data = response.data;
      if (data) {
        setProducts(data.produtos);
        handleProductChange(data.produtos[0].id);
      } else {
        console.error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLegend = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3000/produtos/${productId}`);
      const data = response.data;
      if (data) {
        setLegend(data.descricao);
        setSelectedCategory(data.categoria_id);
      } else {
        console.error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProductChange = (productId) => {
    fetchLegend(productId);
    const selectedProduct = products.find((product) => product.id === productId);
    setSelectedProduct(selectedProduct);
  };

  const handlePageChange = (index) => {
    handleProductChange(products[index].id);
  };

  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <Image style={styles.card} source={{ uri: data.coverImageUri }} />
      <View style={[styles.cornerLabel, { backgroundColor: data.cornerLabelColor }]}>
        <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu de Produtos</Text>

      <Picker
        selectedValue={selectedProduct ? selectedProduct.id : null}
        onValueChange={(value) => handleProductChange(value)}
        style={styles.picker}>
        <Picker.Item label="Selecione um produto" value={null} />
        {products.map((product) => (
          <Picker.Item key={product.id} label={product.nome} value={product.id} />
        ))}
      </Picker>

      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={products}
        loop
        autoplay
        direction="vertical"
        onPageChange={(index) => handlePageChange(index)}
      />

      {selectedProduct && (
        <View style={styles.productDetailContainer}>
          <Text style={styles.productDetailText}>Categoria: {selectedCategory}</Text>
          <Text style={styles.productDetailText}>Descrição: {legend}</Text>
          <Text style={styles.productDetailText}>Preço: {selectedProduct.preco}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  card: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  productDetailContainer: {
    marginTop: 16,
  },
  productDetailText: {
    fontSize: 16,
  },
});
