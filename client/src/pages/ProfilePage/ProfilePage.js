import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer } from '../../components';
import useCookie, { getCookie } from 'react-use-cookie';
import { Spinner } from '../../components/block';
import { useState, useEffect } from 'react';

import apiClient from "../../services/apiClient"

export default function ProfilePage (props) {
    let navigate = useNavigate();
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    const [user, setUser] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authCheck();
    },[]);

    const authCheck = () => {
        if(tkn && tkn !== '0') {
            setUserToken(tkn);
            apiClient.get('user', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            })
                .then((res) => {
                    setUser(res.data.data.user);
                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setTkn('0');
                        setUserToken('0');
                        navigate("/login");
                    }
                });
        }
        else {
            setTkn('0');
            setUserToken('0');
            navigate("/login");
        }
    }

    return (
        <>
            <Navbar />
            { !isLoading ? 
            <main id={"profilePage"}>
                <p id={"profilePageTitle"}>Profile</p>
                <section id={"infoFieldsLeft"}>
                    <div className={"infoFields"}>
                        <span>Name</span>
                        <p className={"infoText"}>{`${user.first_name} ${user.last_name}`}</p>
                    </div>

                    <div className={"infoFields"}>
                        <span>E-mail</span>
                        <p className={"infoText"}>{`${user.email}`}</p>
                    </div>

                    <div className={"infoFields"}>
                        <span>Phone number</span>
                        <p className={"infoText"}>{`${user.phone}`}</p>
                    </div>

                    <div className={"infoFields"}>
                        <span>Address</span>
                        <p className={"infoText"}>
                             {`${user.address_line_1}`}
                            <br />{`${user.address_line_2}`}
                            <br />{`${user.postcode}`} {`${user.city}`}
                            <br />{`${user.country}`}
                        </p>
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
            : <Spinner /> }
            <Footer />
        </>
    )
}