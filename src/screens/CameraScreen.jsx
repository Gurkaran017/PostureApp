// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Camera, useCameraDevice } from 'react-native-vision-camera';
// import { useNavigation } from '@react-navigation/native';

// export default function CameraScreen() {
//   const device = useCameraDevice('front');
//   const navigation = useNavigation();

//   if (!device) {
//     return (
//       <View style={styles.container}>
//         <Text>Device not found by camerascreen</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         device={device}
//         isActive={true}
//       />
//       <TouchableOpacity 
//         style={styles.backButton}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Text style={styles.backButtonText}>Go Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({  
//   container: {
//     flex: 1,
//     backgroundColor: 'darkcyan',
//     position: 'relative' // Needed for absolute positioning of button
//   },
//   camera: {
//     flex: 1,
//     width: '100%'
//   },
//   backButton: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 15,
//     alignItems: 'center'
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold'
//   }
// });



import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const device = useCameraDevice('front');
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const { hasPermission, requestPermission } = useCameraPermission();
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        setCapturedPhoto(`file://${photo.path}`);
      } catch (error) {
        console.log('Photo capture error:', error);
      }
    }
  };

  const resetCamera = () => {
    setCapturedPhoto(null);
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Loading camera or permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

      <View style={styles.buttonContainer}>
        {capturedPhoto ? (
          <>
            <TouchableOpacity style={styles.button} onPress={resetCamera}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>Capture</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  button: {
    padding: 15,
    backgroundColor: 'teal',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
