import { Navbar, Footer, ProfileSection } from '../../components';
import { useNavigate } from "react-router-dom";
import useCookie, { getCookie } from 'react-use-cookie';
import { Spinner } from '../../components/block';
import { useState, useEffect } from 'react';

import apiClient from "../../services/apiClient";

export default function ProfilePage () {
    let navigate = useNavigate();
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    const [user, setUser] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authCheck();
    },[]);

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
                    setUser(res.data.data.user);
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
        { !isLoading ? 
          <>
             <Navbar />
             <ProfileSection  user={user} />
             <Footer />
          </> 
        : 
          <Spinner /> 
        }
        </>
       
    )
}
