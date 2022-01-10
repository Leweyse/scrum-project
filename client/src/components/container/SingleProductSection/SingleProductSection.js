import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import defaultProductImageUpload from "../../../assets/images/default_product.jpg";

import apiClient from "../../../services/apiClient";

import { Spinner, StatsChart,  AddToCartBtn } from "../../block";
import useCookie, { getCookie } from 'react-use-cookie';

export default function SingleProductSection(props) {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [bid, setBid] = useState(0);

    const [successMsg, setSuccessMsg] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState({});
    const [userToken, setUserToken] = useCookie('token','0');

    const getProduct = async () => {
        const res = await apiClient.get(`product/${id}`);
        const __data = res.data.data;
        setData(__data);
    }

    useEffect(() => {
        const abortController = new AbortController();

        getProduct();

        return () => {
            abortController.abort();
        }
    }, []);

    const placeBid = (event) => {
        event.preventDefault();

        setIsProcessing(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/bid', 
                {
                   bid: (bid * 100),
                   products_id: data.product.id
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    }
                })
                    .then(res => {
                        setIsProcessing(false)
                        if(res.data.status === 'success') {
                            setSuccessMsg("Bidding Placed successfully");
                            setError({});
                        }
                        if(res.data.data.error) {
                            setError(res.data.data.error);
                        }
                    });
            });
    }

    
    return (
        <>
            { data !== null ?
                <main id={"productPage"}>
                    <div className={"productPageLeft"}>
                        <img 
                            className={"productImage"} 
                            src={ data.product.image !== 'default.jpg' ? 
                                    `http://localhost:8000/storage/images/products/thumb/${data.product.image}` 
                                : 
                                    defaultProductImageUpload
                                }
                            alt={"Product"}
                        />
                    </div>
                    <div className={"productPageRight"}>
                        <p className={"productRightElements"}>
                            <span className={"productPageBold"}>Product: </span>
                            {data.product.title}
                        </p>
                        
                        <p className={"productRightElements"}>
                            <span className={"productPageBold"}>{ data.product.type === 'sell' ?
                         'Price' : 'Bidding Starts at'} </span>
                         { data.product.type === 'sell' ?
                         <>{`$${(data.product.price / 100).toFixed(2)}`}</> : <>{`$${(data.product.min_bid / 100).toFixed(2)}`}</>
                            }</p>
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
                        
                        { props.user && (props.user.id === data.product.users_id) ? 
                            <Link className={"btn"} to={`/user/product/update/${data.product.id}`}>Edit</Link> 
                            :
                        <>
                        {data.product.type === 'sell' ?
                            <AddToCartBtn 
                                id={data.product.id}
                                className={"cartButton"}
                                quantity={1}    
                            /> : 
                            <>
                            { successMsg ? successMsg : null}
                            <br></br>
                            <input 
                                type={"text"}
                                placeholder={"bid amount"}
                                value={bid}
                                onChange={e => setBid(e.target.value)}
                            /><br></br>
                            <button
                            className={"cartButton"}
                            onClick={placeBid}
                            >
                                Bid
                            </button>
                            <br></br>
                            { error.bid ? <span className={"error"}>{error.bid}</span> : null }
                            </>
                        }
                        
                        </>
                           
                        }
                    </div>
                </main>
            : 
                <Spinner/> 
            }
        </>

    )
}