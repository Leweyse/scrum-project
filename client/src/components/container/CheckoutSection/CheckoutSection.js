import {useState, useEffect} from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { Link, useNavigate } from "react-router-dom";

import apiClient from "../../../services/apiClient";

import { Spinner } from '../../block';

export default function CheckoutSection() {

    let navigate = useNavigate();

    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');

    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [user, setUser] = useState({
        'first_name': '',
        'last_name': '',
        'email': '',
        'phone': '',
        'address_line_1': '',
        'address_line_2': '',
        'city': '',
        'postcode': '',
        'country': ''
    });
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        cartCheck();
        authCheck();
    },[]);

    const cartCheck = () => {
        apiClient.get("cart")
            .then(res => {

                if(res.data.data.cart.quantity < 1) {
                    navigate("/products"); 
                }
                
             });
        }   

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsProcessing(true);
        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/order', {
                    full_name: `${user.last_name} ${user.first_name}`,
                    email: `${user.email}`,
                    phone: `${user.phone}`,
                    address_line_1: `${user.address_line_1}`,
                    address_line_2: `${user.address_line_2}`,
                    postcode: `${user.postcode}`,
                    city: `${user.city}`,
                    country: `${user.country}`
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(resp => {
                    setIsProcessing(false);

                    if(resp.data.status === 'success') {
                        setIsRedirecting(true);
                        setTimeout(
                            function(){
                                navigate("/"); 
                            },
                        5000);
                    } 

                    if(resp.data.status === 'fail') {
                        setError(res.data.data.error);
                    }
                });
            });
    }

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
                if(res.data.status === 'success') {
                    setUser(res.data.data.user);
                    setIsLoading(false);
                }
            })
        }
    }


    return (
        <>
        { isRedirecting ? 
            <>
            Order submitted successfully.You are being redirected to home page. Have some patience
            </> : null
        }
        { isLoading || isRedirecting ? 
            <>
            <Spinner />
            </> : null
        }
        { !isRedirecting && !isLoading ? 
        <>
            <main id={"checkoutSection"}>
        <p id={"checkoutTitle"}>Checkout</p>
        <form id={"checkoutForm"} onSubmit={handleSubmit}>

            <div className={"checkoutFormRow"}>
                <label className={"checkoutFormUnit"}>
                    First name *
                    <input 
                        name={"firstName"} 
                        type={"text"} 
                        placeholder={"First name"}
                        value={`${user.first_name}`}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            first_name: e.target.value
                        }))}
                    />
                    {error.first_name ? error.first_name : null}
                </label>
                <label className={"checkoutFormUnit"}>
                    Last name *
                    <input 
                        name={"lastName"} 
                        type={"text"} 
                        placeholder={"Last name"}
                        value={`${user.last_name}`}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            last_name: e.target.value
                        }))}
                    />
                    {error.last_name ? error.last_name : null}
                </label>
               
            </div>
            <div className={"checkoutFormRow"}>

                <label className={"checkoutFormUnit"}>
                    Email *
                    <input 
                        name={"email"} 
                        type={"text"}
                        placeholder={"email address"}
                        value={user.email}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            email: e.target.value
                        }))}
                    />
                    {error.email ? error.email : null}
                </label>
                <label className={"checkoutFormUnit"}>
                    Phone *
                    <input 
                        name={"phoneNumber"} 
                        type={"text"}
                        placeholder={"phone number"}
                        value={user.phone}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            phone: e.target.value
                        }))}
                    />
                    {error.phone ? error.phone : null}
                </label>
                
            </div>
            <div className={"checkoutFormRow"}>
                <label className={"checkoutFormUnit"}>
                    Address line 1 *
                    <input 
                        name={"addressLine1"} 
                        type={"text"}
                        placeholder={"Street, house"}
                        value={user.address_line_1}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            address_line_1: e.target.value
                        }))}
                    />
                    {error.address_country ? error.address_line_1 : null}
                </label>
                <label className={"checkoutFormUnit"}>
                    Address line 2 *
                    <input 
                        name={"addressLine2"} 
                        type={"text"}
                        placeholder={"App. suite."}
                        value={user.address_line_2}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            address_line_2: e.target.value
                        }))}
                    />
                    {error.address_line_2 ? error.address_line_2 : null}
                </label>
                
            </div>
            <div className={"checkoutFormRow"}>
                <label className={"checkoutFormUnit"}>
                    Postcode *
                    <input 
                        name={"postcode"} 
                        type={"text"}
                        placeholder={"postcode"}
                        value={user.postcode}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            postcode: e.target.value
                        }))}
                    />
                    {error.postcode ? error.postcode : null}
                </label>
                <label className={"checkoutFormUnit"}>
                    City *
                    <input 
                        name={"city"} 
                        type={"text"}
                        placeholder={"city"}
                        value={user.city}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            city: e.target.value
                        }))}
                    />
                    {error.city ? error.city : null}
                </label>
            </div>
            <div className={"checkoutFormRow"}>
                <label className={"checkoutFormUnit"}>
                    Country *
                    <input 
                        name={"country"} 
                        type={"text"}
                        placeholder={"Country"}
                        value={user.country}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            country: e.target.value
                        }))}
                    />
                    {error.country ? error.country : null}
                </label>
                <label className={"checkoutFormUnit"}>
                    Payment method *
                    <span id={"checkoutRadio"}>
                        <input name={"paymentMethod"} type={"radio"} value={"Cash on delivery"}/> Cash on delivery
                    </span>
                </label>
            </div>
            <div className={"checkoutFormRow"}>
            <button id={"checkoutSectionConfirmButton"}>{ isProcessing ? <Spinner size={20}/>: 'Confirm' }</button>
            </div>
        </form>
    </main>
    </> : null
}
        </>
    )
}