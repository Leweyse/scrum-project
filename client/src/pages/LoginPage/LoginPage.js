export default function LoginPage () {
    return (
        <div id={"loginPage"}>
            <div id={"loginContainer"}>
                <p id={"loginLogo"}>B-bay</p>
                <p id={"loginLogoCropped"}>B-bay</p>
                <form id={"loginForm"}>
                    <input id={"loginEmail"} type={"email"} placeholder={"E-mail address"}/>
                    <input id={"loginPassword"} type={"password"} placeholder={"Password"}/>
                    <div id={"loginFormButtonContainer"}>
                        <button id={"signUp"}>Sign up</button>
                        <button id={"loginSubmit"}>Submit</button>
                    </div>
                </form>
                <a id={"passwordReset"} href={""}>Forgot password?</a>
            </div>
        </div>
    )
}