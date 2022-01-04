import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {StatsChart} from "../../block";

import apiClient from "../../../services/apiClient";

import { Spinner } from "../../block";

export default function SingleProductSection() {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const stats = [{name: "Pizza", price: 50, date: 1000}, {name: "Pizza", price: 90, date: 5000}, {name: "Pizza", price: 40, date: 5000}, {name: "Pizza", price: 40, date: 5000}]

    const getProduct = async () => {
        const res = await apiClient.get(`product/${id}`);
        setData(res.data.data)
    }

    useEffect(() => {
        const abortController = new AbortController();

        getProduct();

        return () => {
            abortController.abort();
        }
    })
    
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
                            {`${(data.product.price / 100).toFixed(2)} $`}
                        </p>
                        <p className={"productRightElements"}>
                            <span className={"productPageBold"}>Seller: </span>
                            {data.product.user}
                        </p>
                        <p className={"productRightElements"}>
                            <span className={"productPageBold"}>Description: </span>
                            {data.product.description}
                        </p>
                        <div className={"productRightElements productPriceStatistics"}>
                            <StatsChart data={stats}/>
                        </div>
                        <button className={"productPageAddToCart"}>Add to Cart</button>
                    </div>
                </main>
            : 
                <Spinner/> 
            }
        </>

    )
}