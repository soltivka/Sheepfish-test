import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Product} from "../models/product";
import {RootState} from "./store";
import {postProduct, request} from "../api/request";


const productAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.id - b.id,
})

// { ids: [], entities: {} }
export const productSelectors = productAdapter.getSelectors<RootState>(
    (state) => state.products.list
)


export const fetchData = createAsyncThunk(
    'products/fetch',
    request
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
  async (productData: Product) => {
      const product = await postProduct(productData)
      return product;
  }
)

export const searchData = createAsyncThunk(
    'products/search',
    request
)

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: productAdapter.getInitialState(),
        loading: false,
        deletedList:[0],
        total: 0,
        error: '',
        sortBy: 'id',
        sortAsc:true,
        showError: false,
    },
    reducers: {
        setSortSettings(state, action) {
            if(action.payload === state.sortBy){
                state.sortAsc = !state.sortAsc
            }else{
                state.sortBy=action.payload
                state.sortAsc = true
            }
        },

        deleteProduct(state,action:{type:string, payload:number}){
            state.deletedList = [...state.deletedList, action.payload]
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            productAdapter.addMany(state.list, action.payload.products)
            state.total = action.payload.total
        })

        builder.addCase(fetchData.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })

        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            //todo showError
        })

        builder.addCase(searchData.fulfilled, (state, action) => {
            state.loading = false;
            productAdapter.setAll(state.list, action.payload.products)
        })

        builder.addCase(searchData.pending, (state, action) => {
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


export const { setSortSettings,  deleteProduct } = productsSlice.actions

export default productsSlice.reducer

