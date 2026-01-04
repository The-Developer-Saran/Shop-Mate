import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsFromApi } from '../models/ProductModel';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchProductsFromApi();
            return data;
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to load products');
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export default productsSlice.reducer;