import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ProductRow } from '../../block';

import apiClient from "../../../services/apiClient";

const CartSection = () => {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState('00.00');
    const [totalQuantity, setTotalQuantity] = useState('0');
    
    useEffect(() => {
        apiClient.get("cart")
            .then(res => {
                setCart(res.data.data.cart.cartItems);
                setSubTotal(res.data.data.cart.subTotal);
                setTotalQuantity(res.data.data.cart.quantity);
             });
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
                                    key={key}
                                    title={cart[key].name}
                                    price={`$${cart[key].price}`}
                                    quantity={`${cart[key].qty}`}
                                    total={`$${(cart[key].subtotal)}`}
                                    rowId={cart[key].rowId}
                                />
                            )
                        :
                            <ProductRow
                                title={"No items in cart"}
                                price={null}
                                quantity={null}
                                total={null}
                                visibility={"invisible"}
                            />
                        }
                    </section>
    
                    <footer>
                        <p id={"bgText"}>G-bay</p>
                        <div>
                            <p>Subtotal</p>
                            <p>{ totalQuantity > 0 ? `$${subTotal}`: '$00.00' }</p>
                            <button>Proceed</button>
                            {/* <Link id={"productsLink"} to={"/checkout"}><button>Proceed</button></Link> */}
                        </div>
                    </footer>
                </section>
            </main>
        </>
    )
}

export default CartSection;