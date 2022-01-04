import { useState, useEffect, useRef } from 'react';

import apiClient from "../../../services/apiClient";

import { ProductCard, Spinner } from '../../block';

const StockSection = () => {
    const [data, setData] = useState(null);
    const pageNumber = useRef(1);

    const ITEMS_PER_PAGE = 32;

    const getProducts = async () => {
        const res = await apiClient.get(`products/page/${pageNumber.current}/${ITEMS_PER_PAGE}`);
        setData(res.data.data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setData(null);

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
        { data !== null ?
            <main id={"stockSection"}>
                <section className={"paginationContainer"}>
                    { Array.from(Array(Math.round(data.totalLength / ITEMS_PER_PAGE))).map((page, idx) => {
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
                                toId={product.id}
                                src={product.image}
                                title={product.title}
                                price={`$ ${(product.price / 100).toFixed(2)}`}
                                seller={product.user}
                            />
                        )}
                    )}
                </section>
                <section className={"paginationContainer"}>
                    { Array.from(Array(Math.round(data.totalLength / ITEMS_PER_PAGE))).map((page, idx) => {
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
            </main>
            :
            <Spinner />
        }
        </>
    )
}

export default StockSection;