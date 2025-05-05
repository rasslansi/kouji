import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Image,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import { router } from 'expo-router';

const loadingSteps = [
  'analyzing ingredients...',
  'evaluating steps...',
  'checking equipment...',
  'preparing final touches...',
  'Ready!'
];

export default function LoadingScreen() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const durationPerStep = 1000; // milliseconds
    const totalDuration = durationPerStep * (loadingSteps.length - 1);

    Animated.timing(progress, {
      toValue: 1,
      duration: totalDuration,
      useNativeDriver: false, // width animation not supported by native driver
    }).start(() => {
      // Optional: Automatically navigate away when loading is complete
      // setTimeout(() => router.replace('/recipe'), 500);
    });

    const interval = setInterval(() => {
      setCurrentStepIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= loadingSteps.length - 1) {
          clearInterval(interval);
          return loadingSteps.length - 1; // Stay on Ready!
        }
        return nextIndex;
      });
    }, durationPerStep);

    return () => clearInterval(interval);
  }, [progress]);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        {/* Mascot Image */}
        <Image 
          source={require('../assets/icons/chef_image.png')} // Use downloaded chef image as mascot
          style={styles.mascotImage}
        />

        {/* Loading Text */}
        <Text style={styles.title}>Preparing your recipe</Text>
        <Text style={styles.subtitle}>{loadingSteps[currentStepIndex]}</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()} // Go back to previous screen
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  mascotImage: ImageStyle;
  title: TextStyle;
  subtitle: TextStyle;
  progressBarContainer: ViewStyle;
  progressBarFill: ViewStyle;
  footer: ViewStyle;
  cancelButton: ViewStyle;
  cancelButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mascotImage: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
    marginBottom: 40,
    // Placeholder style, replace with actual mascot if needed
    // backgroundColor: '#eee', 
    // borderRadius: 75, 
  },
  title: {
    fontFamily: 'Avenir',
    fontWeight: '500',
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 16,
    color: '#717171',
    marginBottom: 24,
  },
  progressBarContainer: {
    width: '60%', // Match Figma width relative to screen
    height: 6,
    backgroundColor: '#DDDDDD',
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#222222',
    borderRadius: 100,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    padding: 16,
    backgroundColor: '#FFF',
  },
  cancelButton: {
    backgroundColor: '#FBF8FF',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1B23',
    fontFamily: 'Inter',
  },
}); 