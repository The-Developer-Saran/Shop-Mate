import { StyleSheet, View, Image, ActivityIndicator, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const BannerItem = () => (
    <View style={styles.bannerContainer}>
        <Image source={require('../../assets/OfferBanner.jpg')} style={styles.BannerImage} />
    </View>
);

const styles = StyleSheet.create({
    bannerContainer: { margin: 20, height: 180, borderRadius: 20, overflow: 'hidden' },
    BannerImage: { height: hp(18), borderRadius: hp(2), width: wp(90), resizeMode: 'cover' }
})