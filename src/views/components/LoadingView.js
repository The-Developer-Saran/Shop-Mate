import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const LoadingView = () => (
    <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#9C27B0" />
        <Text style={styles.statusText}>Loading products...</Text>
    </View>
);

const styles = StyleSheet.create({
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, minHeight: 300 },
    statusText: { fontSize: 16, color: '#666', textAlign: 'center' },


})