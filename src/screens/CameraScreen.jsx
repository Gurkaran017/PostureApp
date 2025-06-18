import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CameraScreen() {
  const [cameraPosition, setCameraPosition] = useState('front');
  const [isEmulator, setIsEmulator] = useState(null);
  const device = useCameraDevice(cameraPosition);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const { hasPermission, requestPermission } = useCameraPermission();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if running on emulator
    DeviceInfo.isEmulator().then(result => {
      setIsEmulator(result);
    });
    
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const flipCamera = () => {
    setCameraPosition(prev => (prev === 'front' ? 'back' : 'front'));
  };

  // const getBaseURL = () => {
  //   return 'http://192.168.4.202:3001'; // ⬅️ Replace with your Mac IP //Office Ip
  // };

  const getBaseURL = () => {
    return 'http://192.168.1.22:3001'; // ⬅️ Replace with your Mac IP // Home Ip
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto({ flash: 'off' });
      const path = Platform.OS === 'android' ? `file://${photo.path}` : photo.path;
      setCapturedPhoto(path);
      await uploadToServer(path);
    } catch (error) {
      console.log('❌ takePhoto() error:', error);
    }
  };

  const uploadToServer = async (uri) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch(`${getBaseURL()}/analyze-photo`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (data.result) {
        setAnalysis(data.result);
      } else {
        console.warn('⚠️ No result:', data);
      }
    } catch (error) {
      console.error('❌ Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetCamera = () => {
    setCapturedPhoto(null);
    setAnalysis(null);
  };

  if (!device || !hasPermission || isEmulator === null) { //taking permission
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          {!hasPermission ? 'Waiting for camera permission...' : 'Loading camera...'}
        </Text>
        {!hasPermission && (
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      {capturedPhoto ? (
        <Image source={{ uri: capturedPhoto }} style={styles.camera} />
      ) : (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
      )}

      {loading && <ActivityIndicator size="large" color="#FFD700" style={styles.loading} />}

      <View style={styles.buttonContainer}>
        {!capturedPhoto && !isEmulator && (
          <TouchableOpacity style={styles.button} onPress={flipCamera}>
            <Text style={styles.buttonText}>🔁 Flip</Text>
          </TouchableOpacity>
        )}

        {capturedPhoto ? (
          <TouchableOpacity style={styles.button} onPress={resetCamera}>
            <Text style={styles.buttonText}>🔄 Retake</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>📸 Capture</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>🏠 Home</Text>
        </TouchableOpacity>
      </View>

      {analysis && (
        <View style={styles.analysisCard}>
          <Text style={styles.analysisTitle}>🧠 AI Analysis</Text>
          <ScrollView style={styles.analysisScroll}>
            <Text style={styles.analysisText}>{analysis}</Text>
          </ScrollView>
        </View>
      )}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1, width: '100%' },
  loading: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginTop: '50%',
    textAlign: 'center',
  },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 15,
  paddingBottom: Platform.OS === 'ios' ? 30 : 20, // 👈 Safe padding
  backgroundColor: 'rgba(0,0,0,0.7)',
},

  button: {
    backgroundColor: '#00BFA5',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginHorizontal: 6,
    alignItems: 'center',
    minWidth: 100,
  },
  disabledButton: {
    backgroundColor: '#555',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginHorizontal: 6,
    alignItems: 'center',
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  analysisCard: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    margin: 10,
    borderRadius: 16,
    maxHeight: 200,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00E5FF',
    marginBottom: 10,
  },
  analysisScroll: {
    maxHeight: 150,
  },
  analysisText: {
    color: '#E0F7FA',
    fontSize: 16,
    lineHeight: 22,
  },
});