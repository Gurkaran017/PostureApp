import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function PoseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Here you will implement camera + pose detection
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({  
  container:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'darkcyan'},
  text:{fontSize:18,color:'white'}
});
