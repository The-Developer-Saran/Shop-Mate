import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../views/screens/ProductScreen';
import WalletScreen from '../views/screens/WalletScreen';
import MenuScreen from '../views/screens/ProductScreen';
import ShareScreen from '../views/screens/ShareScreen';
import ProfileScreen from '../views/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }) {
  const { width } = Dimensions.get('window');
const tabWidth = width / 5;
  const insets = useSafeAreaInsets();

  const [menuOpen, setMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    Animated.spring(animation, {
      toValue: menuOpen ? 0 : 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { icon: 'cart', screen: 'Home' },
    { icon: 'heart', screen: 'Wallet' },
    { icon: 'gift', screen: 'Share' },
  ];

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar} />
      {menuOpen && (
        <Pressable style={StyleSheet.absoluteFill} onPress={toggleMenu} />
      )}

      <View style={styles.popupContainer}>
        {menuItems.map((item, index) => {
          const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          });

          const translateX = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 70 * (index + 1)],
          });

          const scale = animation;

          return (
            <Animated.View
              style={[
                styles.popupRow,
                {
                  transform: [{ translateY }, { scale }],
                },
              ]}
            >
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.popupButton}
                  onPress={() => {
                    toggleMenu();
                  }}
                >
                  <Ionicons name={item.icon} size={22} color="#6B46C1" />
                </TouchableOpacity>
              ))}
            </Animated.View>
          );
        })}
      </View>

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (index === 2) {
          return (
            <TouchableOpacity
              key={index}
              onPress={toggleMenu}
              style={[styles.centerButton, { left: tabWidth * 2 }]}
            >
              <View style={styles.centerButtonInner}>
                <MaterialIcons name="menu" size={32} color="#6B46C1" />
              </View>
            </TouchableOpacity>
          );
        }

        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Wallet') iconName = 'wallet';
        else if (route.name === 'Share') iconName = 'share';
        else if (route.name === 'Profile') iconName = 'person';

        const extraStyle =
  route.name === 'Wallet'
    ? { transform: [{ translateX: -20 }] }
    : null;
    const extraStyle1 =
  route.name === 'Share'
    ? { transform: [{ translateX: 20 }] }
    : null;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabButton, { width: tabWidth}, extraStyle, extraStyle1]}
          >
            <Ionicons
              name={isFocused ? iconName : `${iconName}-outline`}
              size={26}
              color={isFocused ? '#fff' : '#bbb'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomTab() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Share" component={ShareScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
  },
  tabBar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#6B46C1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    position: 'absolute',
    top: -40,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  popupContainer: {
    position: 'absolute',
    bottom: 90,
    left: '50%',
    marginLeft: -25,
    alignItems: 'center',
  },
  popupRow: {
    position: 'absolute',
    bottom: -30,
    left: -80,
    transform: [{ translateX: -1 }],
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
  popupButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 12,
  },
});
