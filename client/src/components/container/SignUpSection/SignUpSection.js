import {useState, useEffect} from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { Link, useNavigate } from "react-router-dom";

import apiClient from "../../../services/apiClient";

import { Spinner } from '../../block';

const SignUpSection = () => {
    let navigate = useNavigate();

    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');

    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [info, setInfo] = useState({
        terms: false,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    })

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
                    navigate("/profile");
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
        setIsProcessing(true);
        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/register', {
                    first_name: info.firstName,
                    last_name: info.lastName,
                    email: info.email,
                    phone: info.phone,
                    password: info.password,
                    agree: info.terms
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(res => {
                    setIsProcessing(false);
                    const response = res.data;

                    if(response.data.error) {
                        setError(response.data.error);
                    } else if(response.data.token) {
                        setUserToken(response.data.token);
                        navigate("/");
                    }
                });
            });
    }

    return (
        <>
            { !isLoading ? 
                // Sign-Up = su
                <main id={"suSection"}>
                    <section className={"suContainer"}>
                        <p className={"suLogoCropped"}>Sign Up</p>
                        <form className={"suForm"} onSubmit={handleSubmit}>
                            <span className={"suInput"}>
                                <label htmlFor={"suFirstName"}>First name <span>*</span></label>
                                <input
                                    id={"suFirstName"}
                                    type={"text"}
                                    placeholder={"First name"}
        
                                    value={info.firstName}
                                    onChange={e => setInfo((prevState) => ({
                                        ...prevState,
                                        firstName: e.target.value
                                    }))}
                                />
                                {error.first_name ? <div className={"error"}>{error.first_name}</div> : null}
                            </span>
                            <span className={"suInput"}>
                                <label htmlFor={"suLastName"}>Last name <span>*</span></label>
                                <input
                                    id={"suLastName"}
                                    type={"text"}
                                    placeholder={"Last name"}
        
                                    value={info.lastName}
                                    onChange={e => setInfo((prevState) => ({
                                        ...prevState,
                                        lastName: e.target.value
                                    }))}
                                />
                                {error.last_name ? <div className={"error"}>{error.last_name}</div> : null}
                            </span>
                            <span className={"suInput"}>
                                <label htmlFor={"suEmail"}>Email address <span>*</span></label>
                                <input
                                    id={"suEmail"}
                                    type={"email"}
                                    placeholder={"Email address"}
        
                                    value={info.email}
                                    onChange={e => setInfo((prevState) => ({
                                        ...prevState,
                                        email: e.target.value
                                    }))}
                                />
                                {error.email ? <div className={"error"}>{error.email}</div> : null}
                            </span>
                            <span className={"suInput"}>
                                <label htmlFor={"suPhone"}>Phone Number <span>*</span></label>
                                <input
                                    id={"suPhone"}
                                    type={"text"}
                                    placeholder={"Phone Number"}
        
                                    value={info.phone}
                                    onChange={e => setInfo((prevState) => ({
                                        ...prevState,
                                        phone: e.target.value
                                    }))}
                                />
                                {error.phone ? <div className={"error"}>{error.phone}</div> : null}
                            </span>
                            <span className={"suInput"}>
                                <label htmlFor={"suPassword"}>Password <span>*</span></label>
                                <input
                                    id={"suPassword"}
                                    type={"password"}
                                    placeholder={"Password"}
        
                                    value={info.password}
                                    onChange={e => setInfo((prevState) => ({
                                        ...prevState,
                                        password: e.target.value
                                    }))}
                                />
                                {error.password ? <div className={"error"}>{error.password}</div> : null}
                            </span>
                            <span className={"suCheckbox"}>
                                <div id={"suRadio"} >
                                    <Link id={"tAC"} to={'/terms-and-conditions'} target={"_blank"}> Terms and conditions <span>*</span></Link>
                                    <input 
                                        type={"checkbox"} 
                                        id={"suTerms"}
                                        value={info.terms}
                                        checked={info.terms}
                                        onChange={e => setInfo((prevState) => ({
                                            ...prevState,
                                            terms: !info.terms
                                }))}/>
                                </div>
                                <div id={"tACText"}>
                                    <label  htmlFor={"suTerms"}>By clicking this checkbox you agree to our terms and conditions</label>
                                </div>
                                {error.agree ? <div className={"error"}>{error.agree}</div> : null}
                            </span>
                            <button name={"signup"} className={"suBtn"}>{isProcessing ? <Spinner size={20}/>: "Submit"}</button>
                        </form>
                    </section>
                </main>
            :
                <Spinner /> 
            }
        </>
    )
}

export default SignUpSection;