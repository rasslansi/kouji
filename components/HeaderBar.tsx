import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Image, 
  StatusBar,
  ViewStyle
} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rem, em, typography, spacing, scale } from '../utils/responsive';

type HeaderBarProps = {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  showSearch?: boolean;
  showProfile?: boolean;
  showShare?: boolean;
  onBackPress?: () => void;
  onSharePress?: () => void;
  rightContent?: React.ReactNode;
  style?: ViewStyle;
};

const HeaderBar = ({
  title,
  showLogo = false,
  showBackButton = false,
  showSearch = false,
  showProfile = false,
  showShare = false,
  onBackPress,
  onSharePress,
  rightContent,
  style
}: HeaderBarProps) => {
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };
  
  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, style]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Left section */}
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons name="arrow-back" size={rem(1.5)} color="#222222" />
            </TouchableOpacity>
          )}
          
          {showLogo && (
            <Image
              source={require('../assets/icons/logo.svg')}
              style={styles.logo}
            />
          )}
          
          {title && (
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
          )}
        </View>
        
        {/* Right section */}
        <View style={styles.rightContainer}>
          {showSearch && (
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="search" size={rem(1.5)} color="#666666" />
            </TouchableOpacity>
          )}
          
          {showShare && (
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={onSharePress}
            >
              <MaterialIcons name="share" size={rem(1.5)} color="#222222" />
            </TouchableOpacity>
          )}
          
          {rightContent}
          
          {showProfile && (
            <Image
              source={require('../assets/icons/user_avatar.png')}
              style={styles.avatar}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    color: '#222222',
    flex: 1,
  },
  logo: {
    width: scale(24),
    height: scale(24),
    marginRight: spacing.sm,
  },
  iconButton: {
    padding: spacing.xs,
  },
  avatar: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#F7F7F7',
  },
});

export default HeaderBar; 