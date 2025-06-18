import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in title & subtitle
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Bounce the icon
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();

    // Continuous spin for loader
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const bounceTranslate = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  const spinRotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#004D40', '#00796B', '#00ACC1']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#004D40" />

      {/* Bouncing Icon */}
      <Animated.View style={{ transform: [{ translateY: bounceTranslate }] }}>
        <Text style={styles.emoji}>🧍‍♂️</Text>
      </Animated.View>

      {/* Fade-in Texts */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        VisionSnap AI
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Sit. Stand. Correctly.
      </Animated.Text>

      {/* Spinning Loader */}
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spinRotate }] }]}>
        <Text style={styles.spinnerText}>⏳</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#E0F2F1',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#B2DFDB',
    marginBottom: 40,
  },
  spinner: {
    marginTop: 20,
  },
  spinnerText: {
    fontSize: 28,
  },
});
