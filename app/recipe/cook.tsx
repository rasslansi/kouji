import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Animated,
  Platform,
  Alert,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import { chickenPiccataRecipe, RecipeStep, Recipe, getRecipeById } from '../../mocks/recipeSteps';
import { 
  scale, 
  verticalScale, 
  moderateScale, 
  fontScale, 
  spacing, 
  typography, 
  screenDimensions, 
  rem,
  em,
  BASE_FONT_SIZE
} from '../../utils/responsive';

// Comment out Voice implementation
// let Voice: any = null;
// let isVoiceAvailable = false;

// try {
//   Voice = require('@react-native-voice/voice').default;
//   isVoiceAvailable = true;
// } catch (e) {
//   console.log('Voice module not available in this environment');
// }

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CookingScreen() {
  const params = useLocalSearchParams();
  const recipeId = params.id as string || 'chicken-piccata-1'; // default recipe
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [stepProgress, setStepProgress] = useState(0); // 0-100 for progress bar
  
  // Animation values
  const circleScale = new Animated.Value(1);
  const outerCircleScale = new Animated.Value(1);
  const pulseOpacity = new Animated.Value(0);
  const wavesAnimation = useRef(new Animated.Value(0)).current;
  
  // Microphone animation refs
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;
  const micScale = useRef(new Animated.Value(1)).current;

  // Load recipe data
  useEffect(() => {
    const recipeData = getRecipeById(recipeId);
    if (recipeData) {
      setRecipe(recipeData);
    } else {
      // Fallback to default recipe if ID not found
      setRecipe(chickenPiccataRecipe);
    }
  }, [recipeId]);

  // Modern microphone animation effect
  useEffect(() => {
    if (isListening) {
      // Scale animation for the mic button
      Animated.loop(
        Animated.sequence([
          Animated.timing(micScale, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(micScale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Wave animations
      const createWaveAnimation = (wave: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(wave, {
              toValue: 1,
              duration: 1500,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(wave, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        );
      };
      
      // Start wave animations with different delays for a more dynamic effect
      Animated.parallel([
        createWaveAnimation(wave1, 0),
        createWaveAnimation(wave2, 500),
        createWaveAnimation(wave3, 1000),
      ]).start();
      
      // Pulse opacity animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0.8,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

    } else {
      // Reset animations
      micScale.setValue(1);
      wave1.setValue(0);
      wave2.setValue(0);
      wave3.setValue(0);
      pulseOpacity.setValue(0);
    }
  }, [isListening]);

  const toggleListening = () => {
    // Simple toggle for demo animation purposes
    setIsListening(!isListening);
  };

  const handleNextStep = () => {
    if (!recipe) return;
    
    // Only proceed if there's a next step
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      // Calculate progress based on current step
      const newProgress = ((currentStepIndex + 1) / (recipe.steps.length - 1)) * 100;
      setStepProgress(newProgress);
    }
  };

  const handlePreviousStep = () => {
    if (!recipe) return;
    
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      // Calculate progress based on current step
      const newProgress = (currentStepIndex - 1) / (recipe.steps.length - 1) * 100;
      setStepProgress(Math.max(0, newProgress));
    }
  };

  // Get current and next step
  const currentStep = recipe?.steps[currentStepIndex];
  const nextStep = currentStepIndex < (recipe?.steps.length || 0) - 1 
    ? recipe?.steps[currentStepIndex + 1] 
    : null;

  if (!recipe || !currentStep) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading recipe...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Step indicator and progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepIndicatorText}>
            Step {currentStepIndex + 1}/{recipe.steps.length}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View 
            style={[styles.progressBar, { width: `${stepProgress}%` }]} 
          />
        </View>
      </View>
      
      {/* Step Instructions */}
      <ScrollView 
        style={styles.stepContainer}
        contentContainerStyle={styles.stepContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Current step card */}
        <View style={styles.currentStepCard}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepCounter}>Step {currentStepIndex + 1}</Text>
            <Text style={styles.stepTitle}>{currentStep.title}</Text>
          </View>
          <Text style={styles.stepDescription}>
            {currentStep.description}
          </Text>
        </View>
        
        {/* Next step card (faded) */}
        {nextStep && (
          <View style={styles.nextStepCard}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepCounter}>Next Step</Text>
              <Text style={styles.stepTitle}>{nextStep.title}</Text>
            </View>
            <Text style={styles.stepDescription}>
              {nextStep.description}
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.micContainer}>
        <View style={styles.micButtonContainer}>
          {/* Voice wave animations */}
          {isListening && (
            <>
              <Animated.View 
                style={[
                  styles.voiceWave,
                  {
                    transform: [
                      { scale: wave1.interpolate({ inputRange: [0, 1], outputRange: [1, 2] }) }
                    ],
                    opacity: wave1.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] })
                  }
                ]} 
              />
              <Animated.View 
                style={[
                  styles.voiceWave,
                  {
                    transform: [
                      { scale: wave2.interpolate({ inputRange: [0, 1], outputRange: [1, 1.7] }) }
                    ],
                    opacity: wave2.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] })
                  }
                ]} 
              />
              <Animated.View 
                style={[
                  styles.voiceWave,
                  {
                    transform: [
                      { scale: wave3.interpolate({ inputRange: [0, 1], outputRange: [1, 1.4] }) }
                    ],
                    opacity: wave3.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] })
                  }
                ]} 
              />
            </>
          )}
          
          {/* Outer circle (transparent with border) */}
          <Animated.View 
            style={[
              styles.outerCircle3, 
              { transform: [{ scale: isListening ? outerCircleScale : 1 }] }
            ]} 
          />
          
          {/* Middle circle (light gray with border) */}
          <Animated.View 
            style={[
              styles.outerCircle2, 
              { transform: [{ scale: isListening ? circleScale : 1 }] }
            ]} 
          />
          
          {/* Mic button with gradient */}
          <LinearGradient
            colors={['#F1F1F1', '#F7F7F7', '#FAFAFA']}
            style={styles.micButton}
          >
            <TouchableOpacity 
              onPress={toggleListening}
              style={styles.micTouchArea}
              activeOpacity={0.8}
            >
              <Animated.View 
                style={[
                  styles.micIconContainer,
                  { transform: [{ scale: micScale }] }
                ]}
              >
                {isListening ? (
                  <Animated.View style={[styles.listeningIndicator, { opacity: pulseOpacity }]}>
                    <MaterialIcons name="mic" size={24} color="#D19511" />
                  </Animated.View>
                ) : (
                  <Image 
                    source={require('../../assets/icons/mic_icon_1.svg')}
                    style={styles.micIcon}
                  />
                )}
              </Animated.View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      
      {/* Bottom navigation bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity 
          style={[
            styles.navButton,
            currentStepIndex === 0 && styles.disabledButton
          ]}
          onPress={handlePreviousStep}
          disabled={currentStepIndex === 0}
        >
          <View style={styles.buttonContentContainer}>
            <MaterialIcons 
              name="chevron-left" 
              size={24} 
              color={currentStepIndex === 0 ? "#C5C5D7" : "#775A00"} 
            />
            <Text style={[
              styles.navButtonText,
              currentStepIndex === 0 && styles.disabledButtonText
            ]}>Previous Step</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.navButton,
            styles.primaryButton,
            currentStepIndex === recipe.steps.length - 1 && styles.finishButton
          ]}
          onPress={currentStepIndex === recipe.steps.length - 1 ? () => router.push('/cook') : handleNextStep}
        >
          <View style={styles.buttonContentContainer}>
            <Text style={styles.primaryButtonText}>
              {currentStepIndex === recipe.steps.length - 1 ? "Finish" : "Next Step"}
            </Text>
            <MaterialIcons 
              name={currentStepIndex === recipe.steps.length - 1 ? "check" : "chevron-right"} 
              size={24} 
              color="#503C00" 
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

interface Styles {
  container: ViewStyle;
  progressContainer: ViewStyle;
  progressBarContainer: ViewStyle;
  progressBar: ViewStyle;
  micButtonContainer: ViewStyle;
  micContainer: ViewStyle;
  outerCircle3: ViewStyle;
  outerCircle2: ViewStyle;
  micButton: ViewStyle;
  micTouchArea: ViewStyle;
  micIcon: ImageStyle;
  micIconContainer: ViewStyle;
  listeningIndicator: ViewStyle;
  voiceWave: ViewStyle;
  stepContainer: ViewStyle;
  stepContentContainer: ViewStyle;
  currentStepCard: ViewStyle;
  nextStepCard: ViewStyle;
  stepHeader: ViewStyle;
  stepTitle: TextStyle;
  stepDescription: TextStyle;
  stepCounter: TextStyle;
  navigationBar: ViewStyle;
  navButton: ViewStyle;
  buttonContentContainer: ViewStyle;
  navButtonText: TextStyle;
  primaryButton: ViewStyle;
  primaryButtonText: TextStyle;
  disabledButton: ViewStyle;
  disabledButtonText: TextStyle;
  finishButton: ViewStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  stepIndicator: ViewStyle;
  stepIndicatorText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222222',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFCD4F',
    borderRadius: 100,
  },
  stepIndicator: {
    backgroundColor: '#FFF9E5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  stepIndicatorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D19511',
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
  },
  micButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    aspectRatio: 1,
    maxWidth: SCREEN_WIDTH * 0.4,
    maxHeight: SCREEN_WIDTH * 0.4,
  },
  voiceWave: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FFCD4F',
    opacity: 0.3,
  },
  outerCircle3: {
    position: 'absolute',
    width: '100%',
    height: '100%', 
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: 'rgba(192, 192, 192, 0.1)',
  },
  outerCircle2: {
    position: 'absolute',
    width: '85%',
    height: '85%',
    borderRadius: 999,
    backgroundColor: 'rgba(246, 246, 246, 0.66)',
    borderWidth: 1.5,
    borderColor: 'rgba(196, 196, 196, 0.08)',
    shadowColor: '#BFBFBF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  micButton: {
    width: '70%',
    height: '70%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(225, 225, 225, 0.19)',
    shadowColor: '#BABABA',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 8,
  },
  micTouchArea: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    width: 32,
    height: 32,
    tintColor: '#D19511',
  },
  micIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listeningIndicator: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    height: '50%',
    width: '100%',
    paddingHorizontal: 16,
  },
  stepContentContainer: {
    paddingTop: 16,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  currentStepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nextStepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    opacity: 0.4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  stepCounter: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8F8F8F',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    color: '#222222',
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    fontWeight: '300',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    color: '#222222',
    textAlign: 'center',
    lineHeight: 22,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 100,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#F5F5F5',
  },
  disabledButtonText: {
    color: '#AAAAAA',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#775A00',
    marginLeft: 4,
  },
  primaryButton: {
    backgroundColor: '#FBD259',
  },
  finishButton: {
    backgroundColor: '#4CAF50',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#503C00',
    marginRight: 4,
  },
}); 