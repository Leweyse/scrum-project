import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import defaultProductImageUpload from "../../../assets/images/default_product.jpg";

import apiClient from "../../../services/apiClient";

import { Spinner, StatsChart,  AddToCartBtn } from "../../block";

export default function SingleProductSection(props) {
    let { id } = useParams();
    const [data, setData] = useState(null);

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
    })
    
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

                        <AddToCartBtn 
                            id={data.product.id}
                            quantity={1}    
                        />
                        { props.user && (props.user.id === data.product.users_id) ? 
                            <Link to={`/user/product/update/${data.product.id}`}>Edit</Link> 
                            : 
                            null
                        }
                    </div>
                </main>
            : 
                <Spinner/> 
            }
        </>

    )
}