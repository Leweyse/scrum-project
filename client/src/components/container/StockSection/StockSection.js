import { useState, useEffect } from 'react';

import apiClient from "../../../services/apiClient";

import { ProductCard, Spinner } from '../../block';

const StockSection = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            const res = await apiClient.get('products');
            setData(res.data.data);
        }

        getProducts();
    }, []);

    return (
        <>
            { data !== null ? 
                <main id={'stockSection'}>
                {data.products.map((product, idx) => {
                    return (
                        <ProductCard
                            key={idx}
                            toId={product.id}
                            // src={product.image}
                            src={'https://m.media-amazon.com/images/I/61kocbtP2QL._AC_SL1000_.jpg'}
                            // title={product.title}
                            title={'Vinyl Ex:Re'}
                            price={`${product.price / 100}`}
                            // seller={product.users_id}
                            seller={product.users_id}
                        />
                    )}
                )}
                </main>
            : <Spinner /> }
        </>
    )
}

export default StockSection;