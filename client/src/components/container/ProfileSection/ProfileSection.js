import { Link } from "react-router-dom";

export default function ProfileSection (props) {
    return (
        <>
            <main id={"profileSection"}>
                <p id={"profileSectionTitle"}>Profile</p>
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
                </section>

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