import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
    StatusBar,
    PanResponder,
    Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@react-native-vector-icons/ant-design';
import Ionicons from '@react-native-vector-icons/ionicons';

import { useProductsViewModel } from '../../viewmodels/ProductsViewModel';
import { BannerItem } from '../components/BannerItem';
import { ProductCard } from '../components/ProductCard';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { EmptyView } from '../components/EmptyView';

const { width: screenWidth } = Dimensions.get('window');

const getItemsPerPage = (pageIndex) => (pageIndex === 0 ? 6 : 5);

const PageIndicator = ({ current, total }) => (
    <Text style={styles.pageText}>
        Page {current} of {total}
    </Text>
);

const ProductScreen = () => {
    const { products, loading, error, retry } = useProductsViewModel();

    const [pageIndex, setPageIndex] = useState(0);

    const itemsPerPage = getItemsPerPage(pageIndex);

    const totalPages = useMemo(() => {
        if (products.length === 0) return 1;
        let remaining = products.length;
        let pages = 0;
        if (remaining > 0) {
            remaining -= 6;
            pages += 1;
        }
        pages += Math.ceil(Math.max(0, remaining) / 5);
        return Math.max(1, pages);
    }, [products.length]);


    const visibleProducts = useMemo(() => {
        if (products.length === 0) return [];
        let start = 0;
        if (pageIndex === 0) {
            start = 0;
        } else {
            start = 6 + (pageIndex - 1) * 5;
        }
        const count = pageIndex === 0 ? 6 : 5;
        return products.slice(start, start + count);
    }, [products, pageIndex]);


    useMemo(() => setPageIndex(0), [products]);

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 30,
                onPanResponderRelease: (_, gesture) => {
                    if (gesture.dx < -50 && pageIndex < totalPages - 1) {
                        setPageIndex(prev => prev + 1);
                    } else if (gesture.dx > 50 && pageIndex > 0) {
                        setPageIndex(prev => prev - 1);
                    }
                },
            }),
        [pageIndex, totalPages]
    );

    const bannerData = [{ id: '1' }];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <AntDesign name="left" size={25} color="#000" />
                <Ionicons name="notifications-outline" size={25} color="#000" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Carousel
                    data={bannerData}
                    renderItem={() => <BannerItem />}
                    width={wp(100)}
                    height={hp(22)}
                    loop
                    autoPlay
                    autoPlayInterval={3000}
                />

                {loading ? (
                    <LoadingView />
                ) : error ? (
                    <ErrorView onRetry={retry} />
                ) : products.length === 0 ? (
                    <EmptyView />
                ) : (
                    <>
                        <View {...panResponder.panHandlers}>
                            <FlatList
                                data={visibleProducts}
                                renderItem={({ item, index }) => <ProductCard item={item} index={index} />}
                                keyExtractor={item => item.id.toString()}
                                numColumns={2}
                                columnWrapperStyle={styles.dressRow}
                                contentContainerStyle={styles.dressList}
                                scrollEnabled={false}
                                ListFooterComponent={<PageIndicator current={pageIndex + 1} total={totalPages} />}
                            />
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        height: hp(4),
        width: wp(95),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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
    pageText: { textAlign: 'center', marginVertical: 20, color: '#555', fontSize: 16, marginBottom: hp(10) },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, minHeight: 300 },
    statusText: { fontSize: 16, color: '#666', textAlign: 'center' },

});