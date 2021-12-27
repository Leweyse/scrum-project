import {useState, useRef, useEffect} from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router-dom";

import apiClient from '../../services/apiClient';

const SignUpPage = () => {
    let navigate = useNavigate();
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    // const [userId, setUserId] = useCookie('user','');
    const [error, setError] = useState({});

    const inputFistNameRef = useRef();
    const inputLastnameRef = useRef();
    const inputEmailRef = useRef();
    const inputPhoneRef = useRef();
    const inputPasswordRef = useRef();

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
                    navigate("/checkout");
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setTkn('0');
                        setUserToken('0');
                        // setUserId('');
                    }
                });
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/register', {
                    first_name: inputFistNameRef.current.value,
                    last_name: inputLastnameRef.current.value,
                    email: inputEmailRef.current.value,
                    phone: inputPhoneRef.current.value,
                    password: inputPasswordRef.current.value
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(res => {
                    const response = res.data;

                    if(response.data.error) {
                        setError(response.data.error);
                    } else if(response.data.token) {
                        setUserToken(response.data.token);
                        // setUserId(res.data.data.user.id);
                        navigate("/checkout");
                    }
                });
            });
    }

    return (
        <main id={"suPage"}>
            <section className={"suContainer"}>
                <p className={"suLogoCropped"}>Sign Up</p>
                <form className={"suForm"} onSubmit={handleSubmit}>
                    <span className={"suInput"}>
                        <label htmlFor={"suFirstName"}>First name <span>*</span></label>
                        <input
                            ref={inputFistNameRef}
                            id={"suFirstName"}
                            type={"text"}
                            placeholder={"First name"}
                        />
                        {error.first_name ? error.first_name : null}
                    </span>
                    <span className={"suInput"}>
                        <label htmlFor={"suLastName"}>Last name <span>*</span></label>
                        <input
                            ref={inputLastnameRef}
                            id={"suLastName"}
                            type={"text"}
                            placeholder={"Last name"}
                        />
                        {error.last_name ? error.last_name : null}
                    </span>
                    <span className={"suInput"}>
                        <label htmlFor={"suEmail"}>Email address <span>*</span></label>
                        <input
                            ref={inputEmailRef}
                            id={"suEmail"}
                            type={"email"}
                            placeholder={"Email address"}
                        />
                        {error.email ? error.email : null}
                    </span>
                    <span className={"suInput"}>
                        <label htmlFor={"suPhone"}>Phone Number <span>*</span></label>
                        <input
                            ref={inputPhoneRef}
                            id={"suPhone"}
                            type={"text"}
                            placeholder={"Phone Number"}
                        />
                        {error.phone ? error.phone : null}
                    </span>
                    <span className={"suInput"}>
                        <label htmlFor={"suPassword"}>Password <span>*</span></label>
                        <input
                            ref={inputPasswordRef}
                            id={"suPassword"}
                            type={"password"}
                            placeholder={"Password"}
                        />
                        {error.password ? error.password : null}
                    </span>
                    <button name={"signup"} className={"suBtn"}>Submit</button>
                </form>
            </section>
        </main>
    )
}

export default SignUpPage;