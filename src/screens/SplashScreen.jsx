import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // After 3 seconds, move to Home
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Posture App
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({  
  container: {flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'teal'},
  title:{fontSize:32,color:'white',fontWeight:'bold'}
});
