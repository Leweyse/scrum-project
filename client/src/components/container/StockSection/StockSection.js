import { useState, useEffect, useRef } from 'react';

import apiClient from "../../../services/apiClient";

import { ProductCard, Spinner } from '../../block';

import {useLocation} from "react-router-dom";

const StockSection = (props) => {
    const location = useLocation();
    
    const [data, setData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState("");

    const PATH = useRef(null);
    const pageNumber = useRef(1);

    const ITEMS_PER_PAGE = 32;

    const getProducts = async () => {
        if (location.pathname === '/products') {
            PATH.current = '/products'
            const res = await apiClient.get(`products/page/${pageNumber.current}/${ITEMS_PER_PAGE}`);
            setData(res.data.data);
            setIsProcessing(false);
            setError(null);
        } else if (location.pathname === '/user/listings') {
            const res = await apiClient.get(`product/user/${props.user.id}`)

            if (res.data.data.products.length > 0) {
                PATH.current = '/user/products'
                setData(res.data.data);
                setIsProcessing(false);
                setError(null);
            } else {
                setIsProcessing(false);
                setError("You do not have any listings in our database");

            }
        }
        else if (location.pathname === '/search/') {
            PATH.current = '/products'
            const res = await apiClient.get(`product/search/test`)

            setData(res.data.data);
            setIsProcessing(false);
            setError(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsProcessing(true);

        let value = e.target.value;
        pageNumber.current = parseInt(value) + 1;

        getProducts();
    }

    useEffect(() => {
        // Cleanup issue in useEffect: https://dev.to/pallymore/clean-up-async-requests-in-useeffect-hooks-90h
        const abortController = new AbortController();

        getProducts();

        // Cleanup issue in useEffect
        return () => {
            abortController.abort();
        }
    }, []);


    return (
        <>
        { isProcessing === false ?
            <main id={"stockSection"}>
                { error === null ?
                <>
                    <section className={"paginationContainer"}>
                        { Array.from(Array(Math.ceil(data.totalLength / ITEMS_PER_PAGE))).map((page, idx) => {
                                if ((pageNumber.current - 1) === idx) {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleSubmit}
                                            value={idx}
                                            className={"currentPage"}
                                        >
                                            {idx + 1}
                                        </button>
                                    )
                                } else {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleSubmit}
                                            value={idx}
                                        >
                                            {idx + 1}
                                        </button>
                                    )}
                            }
                        )}
                    </section>
                    <section className={'stockContainer'}>
                        { data.products.map((product, idx) => {
                            return (
                                <ProductCard
                                    key={idx}
                                    to={`${PATH.current}/${product.id}`}
                                    src={product.image}
                                    title={product.title}
                                    price={`$${(product.price / 100).toFixed(2)}`}
                                    seller={product.user}
                                />
                            )}
                        )}
                    </section>
                    <section className={"paginationContainer"}>
                        { Array.from(Array(Math.ceil(data.totalLength / ITEMS_PER_PAGE))).map((page, idx) => {
                                if ((pageNumber.current - 1) === idx) {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleSubmit}
                                            value={idx}
                                            className={"currentPage"}
                                        >
                                            {idx + 1}
                                        </button>
                                    )
                                } else {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleSubmit}
                                            value={idx}
                                        >
                                            {idx + 1}
                                        </button>
                                    )}
                            }
                        )}
                    </section>
                </>
                : error }
            </main>
            :
            <Spinner/>
        }
        </>
    )
}

export default StockSection;