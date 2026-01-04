import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchProducts } from '../store/productsSlice';
import {checkInternet} from '../services/networkService';
import {showToast} from '../utils/toast'

export const useProductsViewModel = () => {
  const dispatch = useAppDispatch();

  const { items: products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const isOnline = await checkInternet();

    if (!isOnline) {
      showToast('No Internet Connection');
      return;
    }

    dispatch(fetchProducts());
  };

  const retry = () => {
    loadProducts();
  };

  return {
    products,
    loading,
    error,
    retry,
  };
};
