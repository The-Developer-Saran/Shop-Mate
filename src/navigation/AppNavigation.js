import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab'
import SplashScreen from '../views/screens/SplashScreen'

const RootStack = createNativeStackNavigator({
    screens: {
        SplashScreen: SplashScreen,
        Home: BottomTab,
    },
    screenOptions: {
        headerShown: false,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function AppNavigation() {
    return <Navigation />;
}