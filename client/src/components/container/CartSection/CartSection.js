import { useState, useEffect, useRef } from 'react';

import { ProductRow } from '../../block';

import apiClient from "../../../services/apiClient";

const CartSection = () => {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState('00.00');
    const [totalQuantity, setTotalQuantity] = useState('0');
    const btnRef = useRef();
    useEffect(() => {
        apiClient.get("cart")
            .then(res => {
                setCart(res.data.data.cart.cartItems);
                setSubTotal(res.data.data.cart.subTotal);
                setTotalQuantity(res.data.data.cart.quantity);
                console.log(res.data.data.cart.cartItems);
             });
        btnRef.current.addEventListener('click', () => {
            localStorage.removeItem('cart');
            setCart([]);

            console.log(cart);
        })
    }, [])
    
    return (
        <>
            <main id={"cartSection"}>
                <div className={"titleSection"}>
                    <h1>Cart</h1>
                </div>
                <section className={"totalSection"}>
                    <header>
                        <p className={"itemsColumn"}>Items</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                    </header>
                    <section>
                        { totalQuantity > 0 ?
                           
                           Object.keys(cart).map((key) => 
                           <ProductRow
                                //    key={}
                                   title={cart[key].name}
                                   price={`$${cart[key].price}`}
                                   quantity={`${cart[key].qty}`}
                                   total={`$${(cart[key].subtotal)}`}
                                   rowId={cart[key].rowId}
                               />
                           )
                            :
                            <ProductRow
                                title={"There's no items"}
                                price={`$00.00`}
                                quantity={"0"}
                                total={`$00.00`}
                            />
                        }
                    </section>
    
                    <footer>
                        <p id={"bgText"}>G-bay</p>
                        <div>
                            <p>Subtotal</p>
                            <p>{`$${subTotal}`}</p>
                            <button ref={btnRef}>Proceed</button>
                        </div>
                    </footer>
                </section>
            </main>
        </>
    )
}

export default CartSection;