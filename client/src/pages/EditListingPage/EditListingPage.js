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

    useEffect(() => {
        authCheck();
    });

    const authCheck = () => {
        if(tkn && tkn !== '0') {
            setUserToken(tkn);
            apiClient.get('user', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            })
                .then((res) => {
                    apiClient.get(`product/${id}`, {
                        headers: {
                            Accept: 'application/json'
                        }
                    })
                    .then((resp) => {
                        if(resp.data.data.product) {
                            if(res.data.data.user.id !== resp.data.data.product.users_id) {
                                navigate("/profile");
                            }
                            else{
                                setUserId(res.data.data.user.id);
                                setProduct(resp.data.data.product);
                                setIsLoading(false);
                            }
                        }
                        else {
                            navigate("/products");
                        }
                        
                    });
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setUserId(null);
                        setTkn('0');
                        setUserToken('0');
                        navigate("/login");
                    }
                });
        }
        else {
            setUserId(null);
            setTkn('0');
            setUserToken('0');
            navigate("/login");
        }
    }

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