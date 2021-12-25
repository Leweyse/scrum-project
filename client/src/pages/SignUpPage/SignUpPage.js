import {useState, useRef, useEffect} from 'react';
import apiClient from '../../services/apiClient';
import useCookie from 'react-use-cookie';
import { getCookie, setCookie } from 'react-use-cookie';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

    let navigate = useNavigate();
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    const [userId, setUserId] = useCookie('user','');
    const [error,setError] = useState({})
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const inputRefFirstname = useRef();
    const inputRefLastname = useRef();
    const inputRefEmail = useRef();
    const inputRefPhone = useRef();
    const inputRefPassword = useRef();


    useEffect(() => {
        if(tkn && tkn != '0') {
            setUserToken(tkn);
                apiClient.get( 'check/sanctum/token',
                    {
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${userToken}`,
                        }}
                )
                    .then((res) => {
                        navigate("/checkout");
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

    const handleSubmit = (event) => {
        event.preventDefault();
        apiClient.get("http://scrum-api.test/sanctum/csrf-cookie").then(response => {
            apiClient.post( '/register', {
                    first_name: inputRefFirstname.current.value,
                    last_name: inputRefLastname.current.value,
                    email: inputRefEmail.current.value,
                    phone: inputRefPhone.current.value,
                    password: inputRefPassword.current.value
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }}
            )
                .then((res) => {
                    if(res.data.data.error) {
                        setError(res.data.data.error);
                    }
                    if(res.data.data.token) {
                        setUserToken(res.data.data.token);
                        setUserId(res.data.data.user.id);
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
                            ref={inputRefFirstname}
                            id={"suFirstName"}
                            type={"text"}
                            placeholder={"First name"}
                        />
                        {error.first_name ? error.first_name : null}
                    </span>
                    <span className={"suInput"}>
                        <label htmlFor={"suLastName"}>Last name <span>*</span></label>
                        <input
                            ref={inputRefLastname}
                            id={"suLastName"}
                            type={"text"}
                            placeholder={"Last name"}
                        />
                        {error.last_name ? error.last_name : null}
                    </span>
                    <span className={"suInput"}>
                        <label htmlFor={"suEmail"}>Email address <span>*</span></label>
                        <input
                            ref={inputRefEmail}
                            id={"suEmail"}
                            type={"email"}
                            placeholder={"Email address"}
                        />
                        {error.email ? error.email : null}
                    </span>
                    <span className={"suInput"}>
                        <label htmlFor={"suPhone"}>Phone Number <span>*</span></label>
                        <input
                            ref={inputRefPhone}
                            id={"suPhone"}
                            type={"text"}
                            placeholder={"Phone Number"}
                        />
                        {error.phone ? error.phone : null}
                    </span>
                    <span className={"suInput"}>
                        <label htmlFor={"suPassword"}>Password <span>*</span></label>
                        <input
                            ref={inputRefPassword}
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