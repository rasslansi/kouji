import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, ImageSourcePropType, Image, View } from 'react-native';
import 'nativewind';

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
    <View className="items-center justify-center gap-0.5">
      <Image 
        source={icon} 
        className="w-6 h-6"
        style={{ tintColor: isActive ? activeColor : inactiveColor }}
      />
      <Text className={`text-xs font-['Avenir'] ${isActive ? 'font-extrabold' : 'font-normal'}`}
        style={{ color: isActive ? activeColor : inactiveColor }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: 60,
          paddingVertical: 8,
          borderTopWidth: 1,
          borderTopColor: '#EBEBEB',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
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
          tabBarIcon: ({ focused }: { focused: boolean }) => (
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
              className="w-6 h-6"
            />
          ),
          headerRight: () => (
            <View className="flex-row items-center gap-6">
              <View className="bg-[#FCFCFC] rounded-full p-2">
                <Image
                  source={require('../../assets/icons/notification_icon.svg')}
                  className="w-6 h-6"
                />
              </View>
              <Image
                source={require('../../assets/icons/user_avatar.png')}
                className="w-8 h-8 rounded-full border border-[#F7F7F7]"
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
          tabBarIcon: ({ focused }: { focused: boolean }) => (
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
