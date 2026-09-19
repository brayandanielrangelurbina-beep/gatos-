import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [catUrl, setCatUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRandomCat = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      if (response.data && response.data.length > 0) {
        setCatUrl(response.data[0].url);
      }
    } catch (error) {
      console.error("Error al buscar el gato:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCat();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App de Gatos</Text>

      <View style={styles.box}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          catUrl && <Image source={{ uri: catUrl }} style={styles.image} />
        )}
      </View>

      <Button title="Ver Gato" onPress={fetchRandomCat} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  box: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});