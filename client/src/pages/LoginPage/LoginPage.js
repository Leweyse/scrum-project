import {useState, useRef} from 'react';

// class LoginPage extends  React.Component {
//
//     constructor(props) {
//         this.state = {
//             email: '',
//             password: ''
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(event) {
//         this.setState({value: event.target.value});
//     }
//
//     handleSubmit(event) {
//         alert('Email' + this.state.email);
//         event.preventDefault();
//     }
//
//     render() {
//     return (
//         <div id={"loginPage"}>
//             <div id={"loginContainer"}>
//                 <p id={"loginLogo"}>B-bay</p>
//                 <p id={"loginLogoCropped"}>B-bay</p>
//                 <form id={"loginForm"} onSubmit={this.handleSubmit}>
//                     <input
//                         id={"loginEmail"}
//                         value={this.state.email}
//                         onChange={this.handleChange}
//                         placeholder={"E-mail address"}
//                     />
//                     <input
//                         id={"loginPassword"}
//                         value={this.state.password}
//                         onChange={this.handleChange}
//                         placeholder={"Password"}
//                     />
//                     <div id={"loginFormButtonContainer"}>
//                         <button id={"signUp"}>Sign up</button>
//                         <button id={"loginSubmit"}>Submit</button>
//                     </div>
//                 </form>
//                 <a id={"passwordReset"}>Forgot password?</a>
//             </div>
//         </div>
//     )
//     }
// }
//
// export default LoginPage;

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputRefEmail = useRef();
    const inputRefPassword = useRef();

    const handleSubmit = (event) => {
        console.log(inputRefEmail.current);
        alert('Email : ' + email);
        event.preventDefault();
    }
    // const handleChange = (input) => {
    //     setEmail(input);
    // }

    return (
        <div id={"loginPage"}>
                       <div id={"loginContainer"}>
                             <p id={"loginLogo"}>B-bay</p>
                              <p id={"loginLogoCropped"}>B-bay</p>
                             <form id={"loginForm"} onSubmit={handleSubmit}>
                                 <input
                                    ref={inputRefEmail}
                                    id={"loginEmail"}
                                    placeholder={"E-mail address"}
                                />
                                <input
                                    ref={inputRefPassword}
                                    id={"loginPassword"}
                                    placeholder={"Password"}
                                />
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