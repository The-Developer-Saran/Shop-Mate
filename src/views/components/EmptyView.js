import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const EmptyView = () => (
    <View style={styles.centerContainer}>
        <Text style={styles.statusText}>No products available</Text>
    </View>
);


const styles = StyleSheet.create({
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, minHeight: 300 },
    statusText: { fontSize: 16, color: '#666', textAlign: 'center' },
})