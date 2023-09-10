import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Product} from "../models/product";
import {RootState} from "./store";
import {request} from "../api/request";


const productAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.id - b.id,
})

// { ids: [], entities: {} }
const productSelectors = productAdapter.getSelectors<RootState>(
    (state) => state.products.list
)


export const fetchData = createAsyncThunk(
    'products/fetch',
    request
)

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: productAdapter.getInitialState(),
        loading: false,
        total: 0,
        error: '',
        showError: false,
    },
    reducers: {

        productLoading(state, action) {
        },
        productReceived(state, action) {
            // if (state.loading === 'pending') {
            //     // Or, call them as "mutating" helpers in a case reducer
            //     productAdapter.setAll(state, action.payload)
            //     state.loading = 'idle'
            // }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.error=''
            productAdapter.addMany(state.list, action.payload.products)
            state.total= action.payload.total
        })

        builder.addCase(fetchData.pending, (state, action) => {
            state.loading = true
            state.error=''
        })

        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            //todo showError
        })
    },
})


export const {productLoading, productReceived} = productsSlice.actions

export default productsSlice.reducer
