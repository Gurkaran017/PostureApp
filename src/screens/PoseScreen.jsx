
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Platform, TouchableOpacity} from 'react-native';
import {useCameraDevice, Camera} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

export default function PoseScreen() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [deviceError, setDeviceError] = useState(false);
  const [isEmulator, setIsEmulator] = useState(false);
  const device = useCameraDevice('front');
  const navigation = useNavigation();

  // Check if running on emulator
  useEffect(() => {
    const checkIfEmulator = async () => {
      if (Platform.OS === 'android') {
        try {
          const result = await DeviceInfo.isEmulator();
          setIsEmulator(result);
        } catch (e) {
          console.log('Could not check if emulator', e);
        }
      }
    };
    checkIfEmulator();
  }, []);

  useEffect(() => {
    if (cameraPermission === 'granted') {
      if (device) {
        navigation.navigate('CameraScreen');
      } else if (!isEmulator) { // Only show error if not on emulator
        setDeviceError('No camera device found ji');
      }
    }
  }, [cameraPermission, device, isEmulator, navigation]);

  const requestPermission = async () => {
    try {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission);
    } catch (error) {
      console.error('Permission error:', error);
      setCameraPermission('denied');
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const currentPermission = await Camera.getCameraPermissionStatus();
        setCameraPermission(currentPermission);
        
        if (currentPermission === 'not-determined') {
          requestPermission();
        }
      } catch (error) {
        console.error('Check permission error:', error);
      }
    };
    
    checkPermission();
  }, []);

  if (cameraPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Checking camera permissions...</Text>
      </View>
    );
  }

  if (cameraPermission === 'denied' || cameraPermission === 'restricted') {
    return (
      <View style={styles.container}>
        <Text>Camera access is required for this feature</Text>
        <Text 
          style={styles.permissionText}
          onPress={requestPermission}
        >
          Tap to request camera permission again
        </Text>
      </View>
    );
  }

  if ((!device || deviceError) && !isEmulator) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{deviceError || 'No camera device available'}</Text>
        <Text 
          style={styles.retryText}
          onPress={() => {
            setDeviceError(null);
            if (cameraPermission === 'authorized') {
              navigation.replace('PoseScreen');
            }
          }}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  // Special emulator view
  if (isEmulator) {
    return (
      <View style={styles.container}>
        <Text style={styles.emulatorText}>Camera not available in emulator</Text>
        <TouchableOpacity
          style={styles.emulatorButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.emulatorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Preparing camera...</Text>
    </View>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkcyan'
  },
  permissionText: {
    marginTop: 20,
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  retryText: {
    marginTop: 20,
    color: 'white',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5
  },
  emulatorText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20
  },
  emulatorButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center'
  },
  emulatorButtonText: {
    color: 'white',
    fontSize: 16
  }
});