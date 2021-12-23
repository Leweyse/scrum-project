// Sign Up => "su"
const SignUpPage = () => {
    return (
        <main id={"suPage"}>
            <section className={"suContainer"}>
                <p className={"suLogoCropped"}>Sign Up</p>
                <form className={"suForm"}>
                    <span className={"suInput"}>
                        <label for={"suFirstName"}>First name <span>*</span></label>
                        <input id={"suFirstName"} type={"text"} placeholder={"First name"}/>
                    </span>
                    <span className={"suInput"}>
                        <label for={"suLastName"}>Last name <span>*</span></label>
                        <input id={"suLastName"} type={"text"} placeholder={"Last name"}/>
                    </span>
                    <span className={"suInput"}>
                        <label for={"suEmail"}>Email address <span>*</span></label>
                        <input id={"suEmail"} type={"email"} placeholder={"Email address"}/>
                    </span>
                    <span className={"suInput"}>
                        <label for={"suPassword"}>Password <span>*</span></label>
                        <input id={"suPassword"} type={"password"} placeholder={"Password"}/>
                    </span>
                    <button name={"signup"} className={"suBtn"}>Submit</button>
                </form>
            </section>
        </main>
    )
}

export default SignUpPage;