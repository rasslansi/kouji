import * as React from 'react';
import {
  View,
  Text,
  Image,
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
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import 'nativewind';

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
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-medium text-gray-800">Loading recipe...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Progress bar at top */}
      <View className="h-1.5 bg-gray-200 w-full">
        <View className="h-full bg-amber-400" style={{ width: `${stepProgress}%` }} />
      </View>
      
      <View className="flex-1 py-4">
        {/* Current Step Card */}
        <View className="bg-white rounded-xl mx-4 p-5 shadow-md border border-gray-100">
          <View className="mb-2">
            <Text className="text-lg font-bold text-gray-800">{currentStep.title}</Text>
            <Text className="text-xs text-gray-500 mt-1">
              Step {currentStepIndex + 1} of {recipe.steps.length}
            </Text>
          </View>
          
          <ScrollView className="mb-3 max-h-[200px]">
            <Text className="text-base text-gray-700 leading-5">
              {currentStep.description}
            </Text>
          </ScrollView>
          
          {currentStep.imageUrl && (
            <Image 
              source={{ uri: currentStep.imageUrl }}
              className="w-full h-36 rounded-lg mt-2"
              resizeMode="cover"
            />
          )}
        </View>
        
        {/* Next Step Preview */}
        {nextStep && (
          <View className="bg-gray-50 rounded-xl mx-4 mt-4 p-4 border border-gray-200">
            <View className="mb-1">
              <Text className="text-sm font-medium text-gray-600">Next: {nextStep.title}</Text>
            </View>
            <Text className="text-sm text-gray-500" numberOfLines={2}>
              {nextStep.description}
            </Text>
          </View>
        )}
        
        {/* Voice Assistant Button */}
        <View className="items-center justify-center mt-6">
          <TouchableOpacity 
            onPress={toggleListening}
            className="relative items-center justify-center"
          >
            {/* Animated Voice Waves */}
            {isListening && (
              <>
                <Animated.View 
                  className="absolute w-28 h-28 rounded-full bg-amber-100"
                  style={{
                    opacity: wave1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 0]
                    }),
                    transform: [
                      { scale: wave1.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.6]
                        })
                      }
                    ]
                  }}
                />
                <Animated.View 
                  className="absolute w-24 h-24 rounded-full bg-amber-200"
                  style={{
                    opacity: wave2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 0]
                    }),
                    transform: [
                      { scale: wave2.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.5]
                        })
                      }
                    ]
                  }}
                />
                <Animated.View 
                  className="absolute w-20 h-20 rounded-full bg-amber-300"
                  style={{
                    opacity: wave3.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 0]
                    }),
                    transform: [
                      { scale: wave3.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.4]
                        })
                      }
                    ]
                  }}
                />
              </>
            )}
            
            {/* Mic Button */}
            <Animated.View
              className="w-16 h-16 rounded-full bg-amber-400 items-center justify-center"
              style={{
                transform: [{ scale: micScale }]
              }}
            >
              <MaterialIcons 
                name={isListening ? "mic" : "mic-none"} 
                size={28} 
                color="#775A00" 
              />
            </Animated.View>
            
            <Text className="text-sm font-medium text-gray-700 mt-2">
              {isListening ? "Listening..." : "Tap to speak"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Navigation bar at bottom */}
      <View className="flex-row border-t border-gray-200 p-4">
        <TouchableOpacity
          className={`flex-1 py-3 rounded-full border items-center justify-center mr-2 ${
            currentStepIndex === 0 ? 'border-gray-300 bg-gray-100' : 'border-amber-400'
          }`}
          onPress={handlePreviousStep}
          disabled={currentStepIndex === 0}
        >
          <Text className={`font-medium ${
            currentStepIndex === 0 ? 'text-gray-400' : 'text-amber-600'
          }`}>
            Previous
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-1 py-3 rounded-full items-center justify-center ml-2 ${
            currentStepIndex === recipe.steps.length - 1 
              ? 'bg-green-500' 
              : 'bg-amber-400'
          }`}
          onPress={currentStepIndex === recipe.steps.length - 1 
            ? () => router.push('/recipe')
            : handleNextStep}
        >
          <Text className={`font-medium ${
            currentStepIndex === recipe.steps.length - 1 
              ? 'text-white' 
              : 'text-amber-900'
          }`}>
            {currentStepIndex === recipe.steps.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 