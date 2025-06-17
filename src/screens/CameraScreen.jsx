import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const device = useCameraDevice('front');
  const navigation = useNavigation();

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Device not found by camerascreen</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
      />
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: 'darkcyan',
    position: 'relative' // Needed for absolute positioning of button
  },
  camera: {
    flex: 1,
    width: '100%'
  },
  backButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    alignItems: 'center'
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});