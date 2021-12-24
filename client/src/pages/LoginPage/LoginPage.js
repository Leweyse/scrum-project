import {useState, useRef} from 'react';
import axios from 'axios';

const LoginPage = () => {
    const initialValue = {
        error: {
            email: '',
            password: ''
        },
        token: '',
        user: {}
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(initialValue);

    const inputRefEmail = useRef();
    const inputRefPassword = useRef();
    const api_url = process.env.REACT_APP_API_ROOT+'/login';


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.get("http://scrum-api.test/sanctum/csrf-cookie").then(response => {
                axios.post( api_url, {
                    email: inputRefEmail.current.value,
                    password: inputRefPassword.current.value
                },
                    {
                    headers: {
                        Accept: 'application/json'
                        }}
                )
                    .then((res) => {
                        setResponse(res.data)
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
                {response.token ? response.token : null}
                <form id={"loginForm"} onSubmit={handleSubmit}>
                    <input
                        ref={inputRefEmail}
                        id={"loginEmail"}
                        type={"text"}
                        placeholder={"E-mail address"}
                    />
                    {response.error.email ? response.error.email : null}
                    <input
                        id={"loginPassword"}
                        ref={inputRefPassword}
                        type={"password"}
                        placeholder={"Password"}
                    />
                    {response.error.password ? response.error.password : null}
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