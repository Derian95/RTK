import { Action, createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CarState{
    items:{[productID:string]:number}
}

const initialState:CarState={
    items:{}
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addCart(state:any, action:PayloadAction<string>){
            const id = action.payload
            if(state.items[id]){
            state.items[id]++
            }
            else{
                state.items[id]=1
            }
        },
        removeFromCart(state:any, action:PayloadAction<string>){
            delete state.items[action.payload]
        },
        updateQuantity(state:any, action:PayloadAction<{ id:string, quantity:number}>){
            const {id, quantity}= action.payload
            state.items[id]=quantity
        }
    }
})

export const {addCart, removeFromCart, updateQuantity} =cartSlice.actions
export default cartSlice.reducer



export function getNumItems(state:RootState){
    let numItems=0
    console.log('prescart')
    for(let id in state.cart.items){
        numItems+=state.cart.items[id]
    }
    return numItems
}


export const getMemoizedNumItems=createSelector(
    (state:RootState)=>state.cart.items,
    (items)=>{

        console.log('getMemo')
        let numItems=0
        for(let id in items){
            numItems+=items[id]
        }
        return numItems
    }
)

export const getTotalPrice = createSelector(
    (state:RootState)=>state.cart.items,
    (state:RootState)=>state.products.products,
    (items, products)=>{
        let total=0
        for(let id in items){
        total+=products[id].price *items[id]
    }
    return total.toFixed(2)

}
)