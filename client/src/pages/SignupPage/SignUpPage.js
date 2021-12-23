const SignUpPage = () => {
    return (
        <main id={"signUpPage"}>
            <section id={"signUpContainer"}>
                <p id={"signUpLogo"}>B-bay</p>
                <p id={"signUpLogoCropped"}>B-bay</p>
                <form id={"signUpForm"}>
                    <input className={"signUpEmail"} type={"email"} placeholder={"E-mail address"}/>
                    <input className={"signUpPassword"} type={"password"} placeholder={"Password"}/>
                    <button name={"signup"}>Submit</button>
                </form>
            </section>
        </main>
    )
}

export default SignUpPage;