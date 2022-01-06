import { useContext } from 'react';

import { Context } from '../../services/Context';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ListingSection, Navbar, Footer } from "../../components";
import { Spinner } from '../../components/block';
import apiClient from '../../services/apiClient';

export default function EditListingPage () {
    const props = useContext(Context);

    let { id } = useParams();
    let navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getProduct = async () => {
        const res = await apiClient.get(`product/${id}`, {
            headers: {
                Accept: 'application/json'
            }
        })

        if (res.data.data.product) {
            if (props.user.id !== res.data.data.product.users_id) {
                navigate("/profile");
            } else {
                setUser(props.user.id);
                setProduct(res.data.data.product);
                setIsLoading(false);
            }
        } else {
            navigate("/products");
        }
    }

    useEffect(() => {
        getProduct();
    });

    return (
        <>
            <Navbar/>
            { !isLoading ? 
                <ListingSection type={"update"} user={user} product={product}/>
            : 
                <Spinner /> 
            }
            <Footer/>
        </>
    )
}