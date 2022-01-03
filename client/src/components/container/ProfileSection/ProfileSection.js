import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProfileSection (props) {
    const [clicked, setClicked] = useState(false);

    const toForm = () => {
        setClicked(true);
    }

    const sendForm = () => {
        setClicked(false);
        //logic for submitting form
    }

    return (
        <>
            <main id={"profileSection"}>
                <p id={"profileSectionTitle"}>Profile</p>
                {!clicked ?
                    <section id={"infoFieldsLeft"}>
                        <div className={"infoFields"}>
                            <span>Name</span>
                            <p className={"infoText"}>{`${props.user.first_name} ${props.user.last_name}`}</p>
                        </div>

                        <div className={"infoFields"}>
                            <span>E-mail</span>
                            <p className={"infoText"}>{`${props.user.email}`}</p>
                        </div>

                        <div className={"infoFields"}>
                            <span>Phone number</span>
                            <p className={"infoText"}>{`${props.user.phone}`}</p>
                        </div>

                        <div className={"infoFields"}>
                            <span>Address</span>
                            <p className={"infoText"}>Address</p>
                        </div>

                        <button onClick={toForm}>Edit</button>
                    </section>
                    :
                    <form id={"infoFieldsLeft"}>
                        <div className={"infoFields profileFormInput"}>
                            <label>First name</label>
                            <input name={"profileEditFirstName"} className={"infoText"} value={`${props.user.first_name}`}/>
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Last name</label>
                            <input name={"profileEditLastName"} className={"infoText"} value={`${props.user.last_name}`}/>
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>E-mail</label>
                            <input name={"profileEditEmail"} className={"infoText"} value={`${props.user.email}`}/>
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Phone number</label>
                            <input name={"profileEditPhone"} className={"infoText"} value={`${props.user.phone}`}/>
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Address</label>
                            <input name={"profileEditAddress"} className={"infoText"} value={`Address`}/>
                        </div>

                        <button name={"profileChangesSubmit"} onClick={sendForm}>Submit</button>
                    </form>
            }
                <section id={"infoFieldsRight"}>
                    <div className={"infoFields"}>
                        <Link className={"link"}  to={'/order-history'}>Order history</Link>
                        <p className={"infoText"}>Little Description</p>
                    </div>
                    <div className={"infoFields"}>
                        <Link className={"link"}  to={'/sales-history'}>Sales history</Link>
                        <p className={"infoText"}>Little Description</p>
                    </div>
                </section>
            </main>
        </>
    )
}