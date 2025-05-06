import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import 'nativewind'; // Use className prop directly without styled
import { useColorScheme } from '@/components/useColorScheme';

export default function CookScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            
            {/* Main Content */}
            <View className="flex-1 p-4 justify-center items-center space-y-8">
                {/* Welcome Section */}
                <View className="items-center space-y-6 w-full">
                    <Text className={`text-2xl font-extrabold ${isDark ? 'text-text-dark' : 'text-text-light'} font-['Avenir']`}>
                        Welcome, Chef Rass!
                    </Text>
                    <Image
                        source={require('../../assets/icons/chef_image.png')}
                        className="w-60 h-60"
                        resizeMode="contain"
                    />
                </View>

                {/* Description & Buttons */}
                <View className="w-full items-center space-y-5">
                    <Text className={`text-lg font-medium text-center ${isDark ? 'text-text-dark' : 'text-text-light'} leading-6 font-['Avenir']`}>
                        Ready to turn fresh ingredients into happy bites?
                    </Text>
                    
                    <View className="w-full space-y-3">
                        <TouchableOpacity 
                            className="bg-primary rounded-full py-2.5 px-4 items-center justify-center h-12"
                            onPress={() => router.push('/recipe')}
                        >
                            <View className="flex-row items-center space-x-2">
                                <Image 
                                    source={require('../../assets/icons/link_icon.svg')}
                                    className="w-4 h-4"
                                />
                                <Text className="text-base font-medium text-secondary font-['Inter']">
                                    Import a recipe
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="border border-border rounded-full py-2.5 px-4 items-center justify-center h-12">
                            <Text className="text-base font-medium text-accent font-['Inter']">
                                Brainstorm Together
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
