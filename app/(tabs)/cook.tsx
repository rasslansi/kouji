import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CookScreen() {

    return (
        <View style={styles.container}>


            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome, Chef Rass!</Text>

            {/* Dish Image */}
            <Image
                source={require('../../assets/jelly.png')}
                style={styles.dishImage}
                resizeMode="contain"
            />

            {/* Description */}
            <Text style={styles.subtitle}>
                Ready to turn fresh ingredients into{'\n'}happy bites?
            </Text>

            {/* Buttons */}
            <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>🔗 Import a recipe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Brainstorm Together</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    topBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 36,
        height: 36,
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 12,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 20,
    },
    dishImage: {
        width: 240,
        height: 240,
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    primaryButton: {
        backgroundColor: '#FFCC42',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    secondaryButton: {
        borderColor: '#ccc',
        borderWidth: 1,
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#5a4400',
    },
});
