import { StyleSheet, Image, View, Animated } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

    // const scaleAnim = useRef(new Animated.Value(0)).current;
    // const opacityAnim = useRef(new Animated.Value(0)).current;

    // useEffect(() => {
    //     Animated.parallel([
    //         Animated.timing(scaleAnim, {
    //             toValue: 1,
    //             duration: 1000,
    //             useNativeDriver: true,
    //         }),
    //         Animated.timing(opacityAnim, {
    //             toValue: 1,
    //             duration: 1000,
    //             useNativeDriver: true,
    //         }),
    //     ]).start();

    // }, []);

    const navigation = useNavigation();
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 1500);
    })




    return (
        <View style={styles.container}>
            {/* <Animated.Image source={require('../../assets/appSplash.png')} style={[styles.logoImage, {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
            },]} /> */}
            <Animated.Image
                source={require('../../assets/appSplash.png')}
                style={[
                    styles.logoImage,
                    { transform: [{ rotate }] },
                ]}
            />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    logoImage: { height: hp(15), width: hp(15), resizeMode: 'contain' }
})