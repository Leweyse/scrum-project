import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {StatsChart} from "../../block";

import apiClient from "../../../services/apiClient";

import { Spinner } from "../../block";

export default function SingleProductSection() {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [stats, setStats] = useState(null);


    const getProduct = async () => {
        const res = await apiClient.get(`product/${id}`);
        setData(res.data.data)
        if(res.data.data.product.stats.length > 0) {
            setStats(res.data.data.product.stats)
        }
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
                        {data.product.stats.length > 0 ?
                        <div className={"productRightElements productPriceStatistics"}>
                            <StatsChart data={data.product.stats}/>
                        </div>
                            :
                            null
                        }
                        <button className={"productPageAddToCart"}>Add to Cart</button>
                    </div>
                </main>
            : 
                <Spinner/> 
            }
        </>

    )
}