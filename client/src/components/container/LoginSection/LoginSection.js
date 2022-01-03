import { useState, useEffect } from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from '../../block';

import apiClient from "../../../services/apiClient";

const LoginSection = () => {
    let navigate = useNavigate();

    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');

    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [info, setInfo] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/login', 
                {
                    email: info.email,
                    password: info.password
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        if(res.data.data.error) {
                            setError(res.data.data.error);
                            setIsLoading(false);
                        }
                        if(res.data.data.token) {
                            setUserToken(res.data.data.token);
                            navigate("/products");
                        }
                    });
            });
    }

    useEffect(() => {
        if(tkn && tkn !== '0') {
            setUserToken(tkn);
            apiClient.get('check/sanctum/token', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            })
                .then((res) => {
                    navigate("/products");
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setTkn('0');
                        setUserToken('0');
                        setIsLoading(false);
                    }
                });
        }
        else {
            setIsLoading(false);
        }
    }, []);
     
    return (
        <>
        { !isLoading ?
            <div id={"loginPage"}>
                <div id={"loginContainer"}>
                    <p id={"loginLogo"}>G-bay</p>
                    <p id={"loginLogoCropped"}>G-bay</p>
                    <form id={"loginForm"} onSubmit={handleSubmit}>
                        <input
                            id={"loginEmail"}
                            type={"text"}
                            placeholder={"E-mail address"}

                            value={info.email}
                            onChange={e => setInfo((prevState) => ({
                                ...prevState,
                                email: e.target.value
                            }))}
                        />
                        {error.email ? error.email : null}
                        <input
                            id={"loginPassword"}
                            type={"password"}
                            placeholder={"Password"}

                            value={info.password}
                            onChange={e => setInfo((prevState) => ({
                                ...prevState,
                                password: e.target.value
                            }))}
                        />
                        {error.password ? error.password : null}
                        <div id={"loginFormButtonContainer"}>
                            <button type={'submit'} id={"loginSubmit"}>Submit</button>
                        </div>
                    </form>
                    <div id={"loginLinks"}>
                        <Link id={"signUp"} to={'/sign-up'}>Sign up</Link>
                        <Link id={"passwordReset"} to={'/reset-password'}>Forgot password?</Link>
                    </div>
                </div>
            </div>
            :
            <Spinner /> 
        }
    </>
    )
}

export default LoginSection;