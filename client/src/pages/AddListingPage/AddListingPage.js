import {ListingSection, Navbar, Footer} from '../../components';
import { Spinner } from '../../components/block';
import { useState, useEffect } from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function AddListingPage () {

    let navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');

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
                    setUserId(res.data.data.user.id);
                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setTkn('0');
                        setUserToken('0');
                        navigate("/login");
                    }
                });
        }
        else {
            setTkn('0');
            setUserToken('0');
            navigate("/login");
        }
    }

    return (
        <>
            <Navbar/>
            { !isLoading ? 
                <ListingSection type={"create"} userId={userId}/>
            : 
                <Spinner /> 
            }
            <Footer/>
        </>
    )
};