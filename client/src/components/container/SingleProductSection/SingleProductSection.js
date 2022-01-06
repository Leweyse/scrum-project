import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import apiClient from "../../../services/apiClient";

import { Spinner, StatsChart } from "../../block";

export default function SingleProductSection(props) {

    let { id } = useParams();
    const [data, setData] = useState(null);
    const [stats, setStats] = useState(null);

    const cart = useRef(JSON.parse(localStorage.getItem("cart")));
    const addRef = useRef();

    // This function will be added to Single Product Page
    const addItem = (item)  =>   {
        cart.current = JSON.parse(localStorage.getItem("cart"));

        //create a copy of our cart
        let cartCopy;

        if (cart.current !== null && Array.isArray(cart.current)) {
            cartCopy = [...cart.current];
        } else {
            cartCopy = [];
        }

        //assuming we have an ID field in our item
        let { id } = item.product;

        //look for item in cart array
        let existingItem = cartCopy.find(cartItem => cartItem.product.id === id);

        //if item already exists
        if (existingItem) {
            existingItem.quantity += item.quantity //update item
        } else { //if item doesn't exist, simply add it
            cartCopy.push(item)
        }

        //update app state
        cart.current = cartCopy;

        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart)
    }

    const getProduct = async () => {
        const res = await apiClient.get(`product/${id}`);
        const __data = res.data.data;
        setData(__data)
        console.log(__data)

        if (__data.product.stats.length > 0) {
            setStats(__data.product.stats)
        }

        addRef.current.addEventListener('click', () => {
            addItem({ product: __data.product, quantity: 1 });
            console.log(cart.current);
        })
    }

    useEffect(() => {
        const abortController = new AbortController();

        getProduct();

        return () => {
            abortController.abort();
        }
    }, [])
    
    return (
        <>
            { data !== null ?
                <main id={"productPage"}>
                    <div className={"productPageLeft"}>
                        <img 
                            className={"productImage"} 
                            src={'https://m.media-amazon.com/images/I/61kocbtP2QL._AC_SL1000_.jpg'} 
                            alt={"Product"}
                        />
                    </div>
                    <div className={"productPageRight"}>
                        <p className={"productRightElements"}>
                            <span className={"productPageBold"}>Product: </span>
                            {data.product.title}
                        </p>
                        <p className={"productRightElements"}>
                            <span className={"productPageBold"}>Price: </span>
                            {`$${(data.product.price / 100).toFixed(2)}`}
                        </p>
                        <p className={"productRightElements"}>
                            <span className={"productPageBold"}>Seller: </span>
                            {data.product.user}
                        </p>
                        <p className={"productRightElements"}>
                            <span className={"productPageBold"}>Description: </span>
                            {data.product.description}
                        </p>
                        { data.product.stats.length > 0 ?
                            <div className={"productRightElements productPriceStatistics"}>
                                <StatsChart data={data.product.stats}/>
                            </div>
                            :
                            null
                        }
                        <button ref={addRef} className={"productPageAddToCart"}>Add to Cart</button>
                        {props.user && (props.user.id === data.product.users_id) ? <Link to={`/user/product/update/${data.product.id}`}>Edit</Link> : null}
                    </div>
                </main>
            : 
                <Spinner/> 
            }
        </>

    )
}