import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00796B" />

      <Text style={styles.title}>🧠 AI Image Analyzer</Text>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4333/4333609.png' }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Discover What Your Photo Reveals
      </Text>

      <Text style={styles.description}>
        This app uses advanced AI to analyze images captured by your camera. It can detect human faces, expressions, objects, and more.
      </Text>

      <View style={styles.examplesBox}>
        <Text style={styles.examplesTitle}>✨ What it can tell you:</Text>
        <Text style={styles.bullet}>• Number of people in the image</Text>
        <Text style={styles.bullet}>• Facial expressions: Happy, Sad, Neutral</Text>
        <Text style={styles.bullet}>• Eyes open or closed</Text>
        <Text style={styles.bullet}>• Glasses detected or not</Text>
        <Text style={styles.bullet}>• If no face is found, it tells what object is visible (e.g., phone, bottle)</Text>
        <Text style={styles.bullet}>• Natural explanation of the photo</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pose')}>
  <Text style={styles.buttonText}>🧐 Analyze My Photo</Text>
</TouchableOpacity>

      <Text style={styles.footer}>No data is stored. Your photo is analyzed temporarily and privately.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#00695C',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 160,
    height: 160,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#E0F2F1',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#E0F2F1',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  examplesBox: {
    backgroundColor: '#004D40',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B2DFDB',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 15,
    color: '#E0F2F1',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#00BFA5',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 30,
    color: '#B2DFDB',
    fontSize: 12,
    textAlign: 'center',
  },
});
