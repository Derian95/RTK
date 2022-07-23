import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import  type {Product} from '../../app/api'

export interface ProductsState{
    products:{[id:string]:Product}
}


const initialState:ProductsState={
    products:{

    }
}
const productSlice= createSlice({
    name:"products",
    initialState,
    reducers:{
        receivedProduct(state:any, action:PayloadAction<Product[]>): void{
            const products= action.payload
            products.forEach(product=>{
                state.products[product.id] = product
            })
        }
    }
}) 

export const {receivedProduct} = productSlice.actions
export default productSlice.reducer