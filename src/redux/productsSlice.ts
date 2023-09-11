import {createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter} from '@reduxjs/toolkit'
import {Product} from "../models/product";
import {RootState} from "./store";
import {postProduct, fetchProducts, searchProducts} from "../api/fetchProducts";
import {EntityState} from "@reduxjs/toolkit/src/entities/models";
import _ from "lodash";


const productAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.id - b.id,
})

export const productSelectors = productAdapter.getSelectors<RootState>(
    (state) => state.products.list
)


export const getProducts = createAsyncThunk(
    'products/fetch',
    fetchProducts
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData: Product) => {
        const product = await postProduct(productData)
        return product;
    }
)

export const searchProductsByQuery = createAsyncThunk(
    'products/search',
  (query: string) => searchProducts(query)
)

interface ProductsSliceState {
    list: EntityState<Product>,
    loading: boolean;
    deletedList: number[];
    total: number;
    error: string;
    sortBy: string;
    sortAsc: boolean;
    showError: boolean;
}

const initialState: ProductsSliceState = {
  list: productAdapter.getInitialState(),
  loading: false,
  deletedList: [0],
  total: 0,
  error: '',
  sortBy: 'id',
  sortAsc: true,
  showError: false,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSortSettings(state, action) {
            if (action.payload === state.sortBy) {
                state.sortAsc = !state.sortAsc
            } else {
                state.sortBy = action.payload
                state.sortAsc = true
            }
        },

        deleteProduct(state, action: { type: string, payload: number }) {
            state.deletedList = [...state.deletedList, action.payload]
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            productAdapter.addMany(state.list, action.payload.products)
            state.total = action.payload.total
        })

        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })

        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(searchProductsByQuery.fulfilled, (state, action) => {
            state.loading = false;
            productAdapter.setAll(state.list, action.payload.products)
        })

        builder.addCase(searchProductsByQuery.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })

        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            productAdapter.upsertOne(state.list, action.payload)
        })

        builder.addCase(createProduct.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
    },
})

export const productsSelector = (rootState: RootState) => rootState.products;

export const deletedProductsSelector = (rootState: RootState) => {
    const products = productsSelector(rootState);
    return products.deletedList;
}

export const productItemsSelector = (rootState: RootState) => {
    const state = rootState.products
    const deletedList = deletedProductsSelector(rootState);
    const entities = productSelectors.selectAll(rootState).filter(product => !deletedList.includes(product.id))
    const sorted = _.sortBy(entities, [state.sortBy, 'id'])

    if (!state.sortAsc) {
        return sorted.reverse()
    }
    return sorted
}

export const {setSortSettings, deleteProduct} = productsSlice.actions

export default productsSlice.reducer

