import {useState, useRef, useEffect} from 'react';
import apiClient from '../../services/apiClient';
import useCookie from 'react-use-cookie';
import { getCookie, setCookie } from 'react-use-cookie';

const LoginPage = () => {

    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    const [userId, setUserId] = useCookie('user','');
    const [error,setError] = useState({})
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [response, setResponse] = useState(initialApiResponseValue);

    const inputRefEmail = useRef();
    const inputRefPassword = useRef();
    const api_url = process.env.REACT_APP_API_ROOT+'/login';

    useEffect(() => {
        if(tkn && tkn != '0') {
            setUserToken(tkn);

            // check validate token
            apiClient.get("http://scrum-api.test/sanctum/csrf-cookie").then(response => {
                apiClient.get( 'check/sanctum/token',
                    {
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${userToken}`,
                        }}
                )
                    .then((res) => {
                        console.log('yes loged in');
                    })
                    .catch((err) => {
                        if (err.response && err.response.status === 401) {
                            setTkn('0');
                            setUserToken('0');
                            console.log('unauthorized token');
                        }
                    });
            });
        }

    });

    const handleSubmit = (event) => {
        event.preventDefault();
        apiClient.get("http://scrum-api.test/sanctum/csrf-cookie").then(response => {
            apiClient.post( '/login', {
                    email: inputRefEmail.current.value,
                    password: inputRefPassword.current.value
                },
                    {
                    headers: {
                        Accept: 'application/json'
                        }}
                )
                    .then((res) => {
                        if(res.data.error) {
                            setError(res.data.error);
                        }
                        if(res.data.token) {
                            setUserToken(res.data.token);
                            setUserId(res.data.user.id);
                            console.log('yes login successful');
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            });
        }

    return (
        <div id={"loginPage"}>
            <div id={"loginContainer"}>
                <p id={"loginLogo"}>B-bay</p>
                <p id={"loginLogoCropped"}>B-bay</p>

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
                        <button id={"signUp"}>Sign up</button>
                        <button id={"loginSubmit"}>Submit</button>
                    </div>
                </form>
                <a id={"passwordReset"}>Forgot password?</a>
            </div>
        </div>
    )
}

export default LoginPage;