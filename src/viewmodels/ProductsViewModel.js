import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchProducts } from '../store/productsSlice';

export const useProductsViewModel = () => {
    const dispatch = useAppDispatch();

    const { items: products, loading, error } = useAppSelector(
        (state) => state.products
    );
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    const retry = () => {
        dispatch(fetchProducts());
    };
    return {
        products,
        loading,
        error,
        retry,
    };
};