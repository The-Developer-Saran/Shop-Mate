import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import Animated, { FadeInUp, FadeInDown, SlideInUp, ZoomIn, BounceIn, LightSpeedInRight, FadeInLeft, BounceInDown } from 'react-native-reanimated';



export const ProductCard = ({ item, index }) => (
    <Animated.View entering={BounceIn.delay(index * 100).duration(200)} >
        <View style={styles.dressCard}>
            <Image source={{ uri: item.image }} style={styles.dressImage} />
            <Text style={styles.dressLabel} numberOfLines={2}>
                {item.product_name}
            </Text>
            <View style={styles.priceTag}>
                <Text style={styles.dressPrice}>₹ {item.amount}.00</Text>
            </View>
        </View>
    </Animated.View>
);

const { width: screenWidth } = Dimensions.get('window');


const styles = StyleSheet.create({
    dressList: { paddingHorizontal: 10, paddingBottom: 20 },
    dressRow: { justifyContent: 'space-between', marginBottom: 16 },
    dressCard: {
        width: (screenWidth - 35) / 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dressImage: { width: '100%', height: 200, resizeMode: 'contain' },
    dressLabel: { fontWeight: 'bold', color: '#000', marginTop: 8 },
    priceTag: { backgroundColor: '#9C27B0', borderRadius: 30, padding: 8, marginTop: 8 },
    dressPrice: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
})