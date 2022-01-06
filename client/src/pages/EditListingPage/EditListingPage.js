import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useCookie, { getCookie } from 'react-use-cookie';
import { ListingSection, Navbar, Footer } from "../../components";
import { Spinner } from '../../components/block';
import apiClient from '../../services/apiClient';

export default function EditListingPage () {
    let navigate = useNavigate();
    let { id } = useParams();
    
    const [product, setProduct] = useState(null);
    const [userId, setUserId] = useState(null);
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
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
                <ListingSection type={"update"} userId={userId} product={product}/>
            : 
                <Spinner /> 
            }
            <Footer/>
        </>
    )
}