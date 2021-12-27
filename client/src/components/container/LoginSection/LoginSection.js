import { useState, useRef, useEffect } from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { Link, useNavigate } from "react-router-dom";

import apiClient from "../../../services/apiClient";

const LoginSection = () => {
    let navigate = useNavigate();
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    const [userId, setUserId] = useCookie('user','');
    const [error, setError] = useState({});

    const inputRefEmail = useRef();
    const inputRefPassword = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userId);
        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/login', {
                        email: inputRefEmail.current.value,
                        password: inputRefPassword.current.value
                    },
                    {
                        headers: {
                            Accept: 'application/json'
                        }
                    })
                    .then(res => {
                        if(res.data.data.error) {
                            setError(res.data.data.error);
                        }
                        if(res.data.data.token) {
                            setUserToken(res.data.data.token);
                            setUserId(res.data.data.user.id);
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
                        setUserId('');
                    }
                });
        }
    });

    return (
        <div id={"loginPage"}>
            <div id={"loginContainer"}>
                <p id={"loginLogo"}>G-bay</p>
                <p id={"loginLogoCropped"}>G-bay</p>
                <form id={"loginForm"} onSubmit={handleSubmit}>
                    <input
                        ref={inputRefEmail}
                        id={"loginEmail"}
                        type={"text"}
                        placeholder={"E-mail address"}
                    />
                    {error.email ? error.email : null}
                    <input
                        id={"loginPassword"}
                        ref={inputRefPassword}
                        type={"password"}
                        placeholder={"Password"}
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
    )
}

export default LoginSection;