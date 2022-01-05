import { useState, useEffect, useRef } from 'react';

import { ProductRow } from '../../block';

const CartSection = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
    const btnRef = useRef();

    // How to use this function
    // To add one item: updateItem(1, 1)
    // To delete one item: updateItem(1, -1)
    const updateItem = (itemID, amount) => {
        setCart(JSON.parse(localStorage.getItem("cart")));

        //create a copy of our cart
        let cartCopy;

        if (cart !== null && Array.isArray(cart)) {
            cartCopy = [...cart];
        } else {
            cartCopy = [];
        }

        //find if item exists, just in case
        let existentItem = cartCopy.find(cartItem => cartItem.product.id === itemID);

        //if it doesnt exist simply return
        if (!existentItem) return

        //continue and update quantity
        existentItem.quantity += amount;

        //validate result
        if (existentItem.quantity <= 0) {
            //remove cartItem  by filtering it from cart array
            cartCopy = cartCopy.filter(cartItem => cartItem.product.id !== itemID)
        }

        //again, update state and localState
        setCart(cartCopy);

        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem('cart', cartString);
    }

    // // This function Remove
    // const removeItem = (itemID) => {
    //     //create cartCopy
    //     let cartCopy;

    //     if (cart !== null && Array.isArray(cart)) {
    //         cartCopy = [...cart];
    //     } else {
    //         cartCopy = [];
    //     }

    //     cartCopy = cartCopy.filter(cartItem => cartItem.product.id !== itemID);

    //     //update cart and local
    //     cart = cartCopy;

    //     let cartString = JSON.stringify(cartCopy)
    //     localStorage.setItem('cart', cartString)
    // }

    useEffect(() => {
        btnRef.current.addEventListener('click', () => {
            localStorage.removeItem('cart');
            setCart([]);

            console.log(cart);
        })
    }, [cart])

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
                        { cart !== [] && cart !== null ?
                            cart.map((cartItem, idx) =>
                                <ProductRow
                                    key={idx}
                                    title={cartItem.product.title}
                                    price={`$${(cartItem.product.price / 100).toFixed(2)}`}
                                    quantity={cartItem.quantity}
                                    total={`$${((cartItem.product.price / 100) * cartItem.quantity).toFixed(2)}`}
                                    onClickAdd={() => updateItem(cartItem.product.id, 1)}
                                    onClickRemove={() => updateItem(cartItem.product.id, -1)}
                                />
                            ) :
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
                            <p>68.00 $</p>
                            <button ref={btnRef}>Proceed</button>
                        </div>
                    </footer>
                </section>
            </main>
        </>
    )
}

export default CartSection;