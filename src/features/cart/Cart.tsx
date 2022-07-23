import React from "react";
import styles from "./Cart.module.css";
import { getTotalPrice , removeFromCart, updateQuantity} from "./CartSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
export function Cart() {
  const dispatch=useAppDispatch()
  const produtcs = useAppSelector(state=>state.products.products)
  const items = useAppSelector(state=>state.cart.items)
  const totalPrice= useAppSelector(getTotalPrice)

  function onQuantityChange(e:React.FocusEvent<HTMLInputElement>, id:string){
    const quantity = Number(e.target.value) || 0
    dispatch(updateQuantity({id, quantity}))
  }
  
  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(items).map(([id, quanty])=>
              (
                <tr>
            <td>{produtcs[id].name}</td>
            <td>
              <input type="text" className={styles.input} defaultValue={quanty} 
                onBlur={(e)=>onQuantityChange(e,id)}
              />
            </td>
            <td>${produtcs[id].price}</td>
            <td>
              <button aria-label={`Remove ${produtcs[id].name}Glass from Shopping Cart`}
              onClick={()=>dispatch(removeFromCart(id))}
              >
                X
              </button>
            </td>
          </tr>
          )
        )
        
      }
         
              
</tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form>
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
