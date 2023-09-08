import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {Product} from "../models/product";
import {RootState} from "./store";


const productAdapter = createEntityAdapter<Product>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (product) => product.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.id - b.id,
})

// { ids: [], entities: {} }
const productSelectors = productAdapter.getSelectors<RootState>(
    (state) => state.products
)


export const fetchProductsAll = createAsyncThunk(
    'products/fetch',
    async (arg: number, thunkAPI) => {
        const response = await axios.get('https://dummyjson.com/products/search?q=phone')
        console.log(response.data.products)
        return response.data.products
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState: productAdapter.getInitialState(),
    reducers: {
        productAdded: productAdapter.addOne,
        productLoading(state, action) {
            // if (state.loading === 'idle') {
            //     state.loading = 'pending'
            // }
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
        builder.addCase(fetchProductsAll.fulfilled, (state, action) => {
           productAdapter.addMany(state, action.payload)
        })
    },
})



export const {productAdded, productLoading, productReceived} = productsSlice.actions

export default productsSlice.reducer

