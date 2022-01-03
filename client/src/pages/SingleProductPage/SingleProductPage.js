import { Footer, Navbar, SingleProductSection } from "../../components";
import {useParams} from "react-router-dom";
import apiClient from "../../services/apiClient";
import {useEffect, useState} from "react";
import {Spinner} from "../../components/block";

export default function SingleProductPage () {

    const [data, setData] = useState(null);
    let {id} = useParams()

    const getProduct = async () => {
        const res = await apiClient.get(`product/${id}`);
        setData(res.data.data)
        console.log(res.data.data);
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
            <Navbar/>
            {data !== null ?
                <SingleProductSection
                src={'https://m.media-amazon.com/images/I/61kocbtP2QL._AC_SL1000_.jpg'}
                name={data.product.title}
                price={data.product.price / 100}
                seller={data.product.user}
                description={data.product.description}
            /> : <Spinner/> }
            <Footer />
        </>
    )
}