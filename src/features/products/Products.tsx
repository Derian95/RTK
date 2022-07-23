import React, { useEffect } from "react";
import { getProducts } from "../../app/api";
import { addCart } from "../cart/CartSlice";
import { receivedProduct } from "./productsSlice";
import styles from "./Products.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

export function Products() {
  const dispatch = useAppDispatch()

  useEffect(() => {

    getProducts().then((products) => {
      //setProducts(products);
      dispatch(receivedProduct(products))
    });
  }, []);

  const products=useAppSelector((state)=>state.products.products)

  return (
    <main className="page">
      <ul className={styles.products}>
        {Object.values(products).map((product) => (
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                <figcaption className={styles.caption}>
                  {product.imageCredit}
                </figcaption>
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={()=>dispatch(addCart(product.id))} >Add to Cart 🛒</button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
