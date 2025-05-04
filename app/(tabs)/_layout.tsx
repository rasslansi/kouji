import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, ImageSourcePropType } from 'react-native';
import { Image, View, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Custom TabIcon component
interface TabIconProps {
  icon: ImageSourcePropType;
  isActive: boolean;
  label: string;
  activeColor?: string;
  inactiveColor?: string;
}

function TabIcon({ 
  icon, 
  isActive, 
  label, 
  activeColor = '#222222', 
  inactiveColor = '#717171' 
}: TabIconProps) {
  return (
    <View style={styles.tabIconContainer}>
      <Image 
        source={icon} 
        style={[
          styles.tabIcon, 
          { tintColor: isActive ? activeColor : inactiveColor }
        ]} 
      />
      <Text style={[
        styles.tabLabel, 
        { 
          color: isActive ? activeColor : inactiveColor,
          fontWeight: isActive ? '800' : '400'
        }
      ]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon={require('../../assets/icons/learn_icon.svg')} 
              isActive={focused} 
              label="Learn"
            />
          ),
          tabBarLabel: () => null,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="cook"
        options={{
          title: 'Cook',
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon={require('../../assets/icons/cook_icon_active.svg')} 
              isActive={focused} 
              label="Cook"
              activeColor="#D28F38"
            />
          ),
          tabBarLabel: () => null,
          headerTitle: () => null,
          headerLeft: () => (
            <Image
              source={require('../../assets/icons/logo.svg')}
              style={styles.headerLogo}
            />
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <View style={styles.notificationContainer}>
                <Image
                  source={require('../../assets/icons/notification_icon.svg')}
                  style={styles.notificationIcon}
                />
              </View>
              <Image
                source={require('../../assets/icons/user_avatar.png')}
                style={styles.avatar}
              />
            </View>
          ),
          headerStyle: {
            height: 90,
          },
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerRightContainerStyle: {
            paddingRight: 20,
          },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon={require('../../assets/icons/explore_icon.svg')} 
              isActive={focused} 
              label="Explore"
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    width: 24,
    height: 24,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  notificationContainer: {
    backgroundColor: '#FCFCFC',
    borderRadius: 999,
    padding: 8,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F7F7F7',
  },
  tabBar: {
    height: 60,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Avenir',
  }
});
