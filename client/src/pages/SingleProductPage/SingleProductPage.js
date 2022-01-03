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
                src={data.product.image}
                name={data.product.title}
                price={`$ ${(data.product.price / 100).toFixed(2)}`}
                seller={data.product.user}
                description={data.product.description}
                chart={"hello moto"}
            /> : <Spinner/> }
            <Footer />
        </>
    )
}