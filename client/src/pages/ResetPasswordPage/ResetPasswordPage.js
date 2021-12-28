// import { useState, useRef, useEffect } from 'react';
// import useCookie, { getCookie } from 'react-use-cookie';
// import { Link, useNavigate } from "react-router-dom";

// import apiClient from "../../../services/apiClient";
import {Navbar} from "../../components";
import {Footer} from "../../components";


const ResetPasswordPage = () => {
    return (
        <>
        <Navbar />
        <h1 id={"title"}>Password reset</h1>
        <div id={"resetPasswordPage"}>

            <div id={"resetPasswordContainer"}>

                <form id={"resetPasswordForm"}>
                    <label id={"resetPassword"}>New password <span>*</span></label>
                    <input
                        id={"resetPassword"}
                        type={"password"}
                    />

                    <label id={"repeatPassword"}>Confirm password <span>*</span></label>
                    <input
                        id={"repeatPassword"}
                        type={"password"}
                    />
                    <button type={'submit'} id={"resetPasswordSubmit"}>Submit</button>
                </form>
            </div>
        </div>
        <Footer />
        </>
    )
}
export default ResetPasswordPage;

