import React from 'react';
import {
  StyleSheet, View, Text, Image, Dimensions,
} from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';

const { width, height } = Dimensions.get('window');

const DATA = [
  {
    coverImageUri: 'https://i.pinimg.com/564x/50/db/c6/50dbc630710c7b0d0e81a8b7a2a85628.jpg',
    cornerLabelColor: '#FF0000', // Alterado para vermelho
    cornerLabelText: 'Hambúrguer',
  },
  {
    coverImageUri: 'https://i.pinimg.com/564x/25/1e/6e/251e6e605f5b1a93f179a560592b050f.jpg',
    cornerLabelColor: '#FF0000', // Alterado para vermelho
    cornerLabelText: 'x-Búrguer',
  },
  {
    coverImageUri: 'https://i.pinimg.com/564x/e5/74/fe/e574fe52034805bc43e7fa5aaedf7d74.jpg',
    cornerLabelColor: '#FF0000', // Alterado para vermelho
    cornerLabelText: 'x-Bacon',
  },
  {
    coverImageUri: 'https://i.pinimg.com/564x/22/5e/50/225e50e9f2c555bf5db4822319e43a18.jpg',
    cornerLabelColor: '#FF0000', // Alterado para vermelho
    cornerLabelText: 'X-Tudo',
  },
  {
    coverImageUri: 'https://i.pinimg.com/564x/e6/b8/f8/e6b8f8c516a80440cac570cefddc175f.jpg',
    cornerLabelColor: '#FF0000', // Alterado para vermelho
    cornerLabelText: 'Coca-Cola 350ml',
  },
  {
    coverImageUri: 'https://i.pinimg.com/564x/b3/d0/36/b3d036ded186d1435361cd007164e501.jpg',
    cornerLabelColor: '#FF0000', // Alterado para vermelho
    cornerLabelText: 'Coca-Cola 600ml',
  }
];

// ... (seu código anterior)

const App = () => {
  const renderItem = data => (
    <View
      key={data.coverImageUri}
      style={styles.cardContainer}
    >
      <Image
        style={styles.card}
        source={{ uri: data.coverImageUri }}
      />
      <View
        style={[
          styles.cornerLabel,
          { backgroundColor: data.cornerLabelColor },
        ]}
      >
        <Text style={styles.cornerLabelText}>
          {data.cornerLabelText}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={DATA}
          loop
          autoplay
          direction="vertical"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cardContainer: {
    marginBottom: 20,
    shadowColor: '#000', // Cor da sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 2, // Raio da sombra
    elevation: 3, // Sombra para dispositivos Android
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
});

export default App;
