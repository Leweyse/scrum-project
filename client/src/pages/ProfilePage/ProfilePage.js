import { Link } from "react-router-dom";
import { Navbar, Footer } from '../../components';

export default function ProfilePage (props) {
    return (
        <>
            <Navbar />
            <main id={"profilePage"}>
                <p id={"profilePageTitle"}>Profile</p>
                <section id={"infoFieldsLeft"}>
                    <div className={"infoFields"}>
                        <span id={"profilePageName"}>Name</span>
                        <p className={"infoText"}>{`${props.name} Test`}</p>
                    </div>

                    <div className={"infoFields"}>
                        <span>E-mail</span>
                        <p className={"infoText"}>{`${props.email} Test`}</p>
                    </div>

                    <div className={"infoFields"}>
                        <span>Phone number</span>
                        <p className={"infoText"}>{`${props.phone} Test`}</p>
                    </div>

                    <div className={"infoFields"}>
                        <span>Address</span>
                        <p className={"infoText"}>{`${props.address} Test`}</p>
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
            <Footer />
        </>
    )
}