import { Navbar, Footer } from '../../components';
import {Link} from "react-router-dom";

export default function ProfilePage () {
     return (
        <>
        <Navbar />
            <main id={"profilePage"}>
                <p id={"profilePageTitle"}>Profile</p>
        <div id={"infoFieldsLeft"}>
            <p className={"infoFields"}>Name</p>
            <span id={"targetName"}>___________________</span>

            <p className={"infoFields"}>E-mail</p>
            <span id={"targetEmail"}>___________________</span>

            <p className={"infoFields"}>Phone number</p>
            <span id={"targetPhoneNumber"}>___________________</span>

            <p className={"infoFields"}>Address</p>
            <span id={"targetAddress"}>___________________</span>
        </div>

        <div className={"infoFieldsRight"}>
            <Link id={"orderHistoryLink"}  to={'/order-history'}>Order history</Link>
            <Link id={"salesHistoryLink"}  to={'/sales-history'}>Sales history</Link>
        </div>

            </main>
        <Footer />
        </>
        )
    }








