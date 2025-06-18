// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
// import { useNavigation } from '@react-navigation/native';

// export default function CameraScreen() {
//   const device = useCameraDevice('front');
//   const cameraRef = useRef(null);
//   const navigation = useNavigation();

//   const { hasPermission, requestPermission } = useCameraPermission();
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!hasPermission) {
//       requestPermission();
//     }
//   }, [hasPermission]);

//   const takePhoto = async () => {
//     if (cameraRef.current) { //check error
//       try {
//         const photo = await cameraRef.current.takePhoto({ flash: 'off' });
//         const path = `file://${photo.path}`;
//         setCapturedPhoto(path);
//         uploadToServer(path);
//       } catch (error) {
//         console.log('Photo capture error:', error);
//       }
//     }
//   };

//   const uploadToServer = async (uri) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('image', {
//       uri,
//       name: 'photo.jpg',
//       type: 'image/jpeg',
//     });

//     try {
//       const response = await fetch('http://192.168.4.202:3001/analyze-photo', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const data = await response.json();
//       setAnalysis(data.result);
//     } catch (error) {
//       console.error('Upload error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetCamera = () => {
//     setCapturedPhoto(null);
//     setAnalysis(null);
//   };

//   if (!device || !hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Loading camera or permissions...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="black" />

//       {capturedPhoto ? (
//         <Image source={{ uri: capturedPhoto }} style={styles.camera} />
//       ) : (
//         <Camera
//           ref={cameraRef}
//           style={styles.camera}
//           device={device}
//           isActive={true}
//           photo={true}
//         />
//       )}

//       {loading && <ActivityIndicator size="large" color="#FFD700" style={styles.loading} />}

//       <View style={styles.buttonContainer}>
//         {capturedPhoto ? (
//           <TouchableOpacity style={styles.button} onPress={resetCamera}>
//             <Text style={styles.buttonText}>🔄 Retake</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={takePhoto}>
//             <Text style={styles.buttonText}>📸 Capture</Text>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
//           <Text style={styles.buttonText}>🏠 Home</Text>
//         </TouchableOpacity>
//       </View>

//       {analysis && (
//         <View style={styles.analysisCard}>
//           <Text style={styles.analysisTitle}>🧠 Gemini AI Analysis</Text>
//           <ScrollView style={styles.analysisScroll}>
//             <Text style={styles.analysisText}>{analysis}</Text>
//           </ScrollView>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   loading: {
//     position: 'absolute',
//     top: '50%',
//     alignSelf: 'center',
//   },
//   loadingText: {
//     color: 'white',
//     fontSize: 18,
//     marginTop: '50%',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 15,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   button: {
//   backgroundColor: '#00BFA5',
//   paddingVertical: 14,
//   paddingHorizontal: 32,
//   borderRadius: 50,
//   elevation: 6,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 3 },
//   shadowOpacity: 0.25,
//   shadowRadius: 5,
//   marginHorizontal: 6,
//   alignItems: 'center',
//   minWidth: 130,
// },
// buttonText: {
//   color: 'white',
//   fontWeight: '700',
//   fontSize: 16,
//   textTransform: 'uppercase',
//   letterSpacing: 0.5,
// },

//   analysisCard: {
//     backgroundColor: '#1E1E1E',
//     padding: 16,
//     margin: 10,
//     borderRadius: 16,
//     maxHeight: 200,
//     elevation: 5,
//     shadowColor: '#fff',
//   },
//   analysisTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#00E5FF',
//     marginBottom: 10,
//   },
//   analysisScroll: {
//     maxHeight: 150,
//   },
//   analysisText: {
//     color: '#E0F7FA',
//     fontSize: 16,
//     lineHeight: 22,
//   },
// });

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   StatusBar,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
// } from 'react-native-vision-camera';
// import { useNavigation } from '@react-navigation/native';

// export default function CameraScreen() {
//   const cameraRef = useRef(null);
//   const device = useCameraDevice('front');
//   const navigation = useNavigation();

//   const { hasPermission, requestPermission } = useCameraPermission();
//   const [cameraReady, setCameraReady] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 📸 Request camera + storage permission (especially for Android)
//   useEffect(() => {
//     const getPermissions = async () => {
//       await requestPermission();
//       if (Platform.OS === 'android') {
//         await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
//             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         );
//       }
//       setTimeout(() => setCameraReady(true), 1000); // Delay to ensure camera is ready
//     };
//     getPermissions();
//   }, []);

//   const takePhoto = async () => {
//     if (cameraRef.current) {
//       try {
//         const photo = await cameraRef.current.takePhoto({
//           flash: 'off',
//         });

//         const path = Platform.OS === 'android' ? `file://${photo.path}` : photo.path;
//         setCapturedPhoto(path);
//         uploadToServer(path);
//       } catch (error) {
//         console.log('Photo capture error:', error);
//       }
//     } else {
//       console.log('Camera ref not available');
//     }
//   };

//   const uploadToServer = async (uri) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('image', {
//       uri,
//       name: 'photo.jpg',
//       type: 'image/jpeg',
//     });

//     try {
//       const response = await fetch('http://192.168.4.202:3001/analyze-photo', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const data = await response.json();
//       setAnalysis(data.result);
//     } catch (error) {
//       console.error('Upload error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetCamera = () => {
//     setCapturedPhoto(null);
//     setAnalysis(null);
//   };

//   if (!device || !cameraReady || !hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Initializing camera...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="black" />

//       {capturedPhoto ? (
//         <Image source={{ uri: capturedPhoto }} style={styles.camera} />
//       ) : (
//         <Camera
//           ref={cameraRef}
//           style={styles.camera}
//           device={device}
//           isActive={true}
//           photo={true}
//           preset="photo" // ✅ important for capture mode
//           enableZoomGesture={true}
//         />
//       )}

//       {loading && <ActivityIndicator size="large" color="#FFD700" style={styles.loading} />}

//       <View style={styles.buttonContainer}>
//         {capturedPhoto ? (
//           <TouchableOpacity style={styles.button} onPress={resetCamera}>
//             <Text style={styles.buttonText}>🔄 Retake</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={takePhoto}>
//             <Text style={styles.buttonText}>📸 Capture</Text>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
//           <Text style={styles.buttonText}>🏠 Home</Text>
//         </TouchableOpacity>
//       </View>

//       {analysis && (
//         <View style={styles.analysisCard}>
//           <Text style={styles.analysisTitle}>🧠 Gemini AI Analysis</Text>
//           <ScrollView style={styles.analysisScroll}>
//             <Text style={styles.analysisText}>{analysis}</Text>
//           </ScrollView>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   loading: {
//     position: 'absolute',
//     top: '50%',
//     alignSelf: 'center',
//   },
//   loadingText: {
//     color: 'white',
//     fontSize: 18,
//     marginTop: '50%',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 15,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   button: {
//     backgroundColor: '#00BFA5',
//     paddingVertical: 14,
//     paddingHorizontal: 32,
//     borderRadius: 50,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.25,
//     shadowRadius: 5,
//     marginHorizontal: 6,
//     alignItems: 'center',
//     minWidth: 130,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   analysisCard: {
//     backgroundColor: '#1E1E1E',
//     padding: 16,
//     margin: 10,
//     borderRadius: 16,
//     maxHeight: 200,
//     elevation: 5,
//     shadowColor: '#fff',
//   },
//   analysisTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#00E5FF',
//     marginBottom: 10,
//   },
//   analysisScroll: {
//     maxHeight: 150,
//   },
//   analysisText: {
//     color: '#E0F7FA',
//     fontSize: 16,
//     lineHeight: 22,
//   },
// });

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
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const device = useCameraDevice('front');
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const { hasPermission, requestPermission } = useCameraPermission();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const getBaseURL = () => {
    return 'http://192.168.4.202:3001'; // ⬅️ Replace with your Mac IP
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

  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading camera or permissions...</Text>
      </View>
    );
  }

  return (
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
          <Text style={styles.analysisTitle}>🧠 Gemini AI Analysis</Text>
          <ScrollView style={styles.analysisScroll}>
            <Text style={styles.analysisText}>{analysis}</Text>
          </ScrollView>
        </View>
      )}
    </View>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  button: {
    backgroundColor: '#00BFA5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
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
