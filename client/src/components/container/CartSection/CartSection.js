import { useEffect } from 'react';
import { ProductRow } from '../../block';

// Comments maybe will be use to display data in this cart

// import apiClient from "../../../services/apiClient";

// import { Spinner } from '../../block';

const CartSection = () => {
    // const [data, setData] = useState(null);

    useEffect(() => {
        // const getProductsInCart = async () => {
        //     const res = await apiClient.get('products');
        //     setData(res.data.data);
        // }

        // getProductsInCart();
    }, []);

    return (
        <>
            {/* { data !== null ? 
                <main id={"cartSection"}>
                    
                </main>
            : <Spinner /> } */}

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
                        { Array.from(Array(5)).map((row, idx) =>
                            <ProductRow
                                key={idx}
                                title={"Title Product"}
                                price={`34.00 $`}
                                quantity={"2"}
                                total={`68.00 $`}
                            />
                        )}
                    </section>
                    <footer>
                        <p id={"bgText"}>G-bay</p>
                        <div>
                            <p>Subtotal</p>
                            <p>68.00 $</p>
                            <button>Proceed</button>
                        </div>
                    </footer>
                </section>
            </main>
        </>
    )
}

export default CartSection;