import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Posture App
      </Text>

      <Text style={styles.description}>
        This application uses your phone's camera to track your body's posture in real time and lets you know whether you are sitting or standing correctly.
      </Text>

      <Text style={styles.description}>
        To use it, simply press "Try It" and allow camera permissions. Position yourself in view and watch it track you instantly.
      </Text>

      <View style={styles.button}>
        <Button
          title="Try It"
          color="#fff"
          onPress={() => navigation.navigate('Pose')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({  
  container:{flex:1,alignItems:'center',justifyContent:'center',padding:20,backgroundColor:'teal'},
  title:{fontSize:28,color:'white',fontWeight:'bold',marginBottom:20},
  description:{fontSize:18,color:'white',marginBottom:15,textAlign:'center'},
  button:{marginTop:30,padding:10,borderRadius:10,backgroundColor:'darkcyan'}
});
