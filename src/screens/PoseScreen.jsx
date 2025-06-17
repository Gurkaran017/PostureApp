
// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {useCameraDevice, Camera} from 'react-native-vision-camera';
// import {useNavigation} from '@react-navigation/native';

// export default function PoseScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const device = useCameraDevice('front'); // back or front
//   const navigation = useNavigation();

//   useEffect(() => {
//     (async () => {
//       const permission = await Camera.requestCameraPermission();
//       setHasPermission(permission === 'authorized');
//     })();
//   }, []);

//   useEffect(() => {
//     // if (hasPermission && device) {
//     //   // Navigate once we have permission and a camera
//     //   navigation.navigate('CameraScreen'); 
//     //   console.log("entered")
//     // }
//     if (hasPermission) {
//       // Navigate once we have permission and a camera
//       navigation.navigate('CameraScreen'); 
//       console.log("entered")
//     }
//   }, [hasPermission]);

//   if (hasPermission === null) {
//     return <View style={styles.container}><Text>Checking for camera...</Text></View>;
//   }
//   // if (!device) {
//   //   return <View style={styles.container}>
//   //     <Text>Device not found</Text>
//   //   </View>;
//   // }
  
//   if (hasPermission === false) {
    
//     return <View style={styles.container}>
//       <Text>Camera permission denied</Text>
//     </View>;
//   }

  
//   return (
//     <View style={styles.container}>
//       <Text>Setting up camera...</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({  
//   container:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'darkcyan'}
// });

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Platform} from 'react-native';
import {useCameraDevice, Camera} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

export default function PoseScreen() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [deviceError, setDeviceError] = useState(null);
  const device = useCameraDevice('front', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (cameraPermission === 'granted' && device) {
      navigation.navigate('CameraScreen');
    }
  }, [cameraPermission, device, navigation]);

  const requestPermission = async () => {
    try {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission);
      
      if (permission === 'authorized' && !device) {
        setDeviceError('No compatible camera found');
      }
    } catch (error) {
      console.error('Permission error:', error);
      setCameraPermission('denied');
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const currentPermission = await Camera.getCameraPermissionStatus();
        console.log("Permission status:", currentPermission);
        setCameraPermission(currentPermission);
        
        if (currentPermission === 'not-determined') {
          requestPermission();
        } else if (currentPermission === 'authorized' && !device) {
          setDeviceError('Camera not detected');
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

  if (!device || deviceError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{deviceError || 'No camera device available'}</Text>
        <Text 
          style={styles.retryText}
          onPress={() => {
            setDeviceError(null);
            if (cameraPermission === 'authorized') {
              navigation.replace('PoseScreen'); // Use replace instead of navigate
            }
          }}
        >
          Tap to retry
        </Text>
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
  }
});