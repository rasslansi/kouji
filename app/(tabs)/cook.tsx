import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';

export default function CookScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            
            {/* Main Content */}
            <View style={styles.contentContainer}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>Welcome, Chef Rass!</Text>
                    <Image
                        source={require('../../assets/icons/chef_image.png')}
                        style={styles.chefImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Description & Buttons */}
                <View style={styles.actionSection}>
                    <Text style={styles.subtitle}>
                        Ready to turn fresh ingredients into happy bites?
                    </Text>
                    
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity 
                            style={styles.primaryButton}
                            onPress={() => router.push('/recipe')}
                        >
                            <View style={styles.buttonContent}>
                                <Image 
                                    source={require('../../assets/icons/link_icon.svg')}
                                    style={styles.linkIcon}
                                />
                                <Text style={styles.primaryButtonText}>Import a recipe</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Brainstorm Together</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
    },
    welcomeSection: {
        alignItems: 'center',
        gap: 23,
        width: '100%',
    },
    welcomeText: {
        fontSize: 23,
        fontWeight: '800',
        fontFamily: 'Avenir',
        color: '#222222',
    },
    chefImage: {
        width: 240,
        height: 240,
    },
    actionSection: {
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Avenir',
        color: '#000000',
        lineHeight: 23,
    },
    buttonsContainer: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#FFCD4F',
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },
    linkIcon: {
        width: 16,
        height: 16,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#503C00',
        fontFamily: 'Inter',
    },
    secondaryButton: {
        borderColor: '#C5C5D7',
        borderWidth: 1,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#775A00',
        fontFamily: 'Inter',
    },
});
