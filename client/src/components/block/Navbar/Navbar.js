import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { gsap } from "gsap";

import { UserIconSVG } from "../SVGs";
import { LogoutButton } from "../";

export default function Navbar () {
    const userToken = getCookie('token');

    const [clicked, setClicked] = useState(false);

    const navDropdownButton = useRef(null);
    const userIconSvg = useRef(null);
    const navDropdownContent = useRef(null);
    const navDropdownContentAnimation = useRef(null);
    const userIconSvgAnimation = useRef(null);
    const navDropdownButtonAnimation = useRef(null);

    useEffect(() => {
        navDropdownContentAnimation.current = gsap.to(
            navDropdownContent.current, 
            {
                display: "grid", 
                gap: "1rem",
                opacity: 1, 
                duration: 0.2, 
                paused: true
            });
        navDropdownButtonAnimation.current = gsap.to(
            navDropdownButton.current, 
            {
                scale: 2, 
                rotateY: 180, 
                duration: 0.5, 
                paused: true
            });
        userIconSvgAnimation.current = gsap.to(
            userIconSvg.current, 
            {
                fill: "url(#userIconFillGradient)", 
                duration: 0.5, 
                paused: true
            });
    }, [])

    const expand = () => {
        setClicked(true);
        navDropdownContentAnimation.current.play();
        navDropdownButtonAnimation.current.play();
        userIconSvgAnimation.current.play();
    }

    const retract = () => {
        setClicked(false);
        navDropdownContentAnimation.current.reverse();
        navDropdownButtonAnimation.current.reverse();
        userIconSvgAnimation.current.reverse();
    }

    return (
        <nav id={"navbar"}>
            <div id={"navLeft"}>
                <Link id={"navHome"} to={"/"}>G-bay</Link>
            </div>
            <div id={"navRight"}>
                <form className={"navRight"} id={"navSearch"}>
                    <input 
                        id={"navSearchInput"} 
                        type={"text"} 
                        placeholder={"Search..."} 
                        name={"navSearch"}
                    />
                </form>

                <Link id={"productsLink"} to={"/products"}>Products</Link>
                
                <div id={"navDropdown"} className={"navRight"}>
                    <button 
                        id={"navDropdownButton"} 
                        ref={navDropdownButton} 
                        onClick={!clicked ? expand : retract}
                    >
                        <UserIconSVG fill={"#474044"} ref={userIconSvg}/>
                    </button>
                    <div id={"navDropdownContent"} ref={navDropdownContent}>
                        { userToken && userToken !== "0" ? (
                            <>
                                <Link className={"navRight"} to={"/profile"}>Profile</Link>
                                <Link className={"navRight"} to={"/cart"}>Cart</Link>
                                <Link className={"navRight"} to={"/product/add"}>Sell</Link>
                                <LogoutButton className={"navRight"}/>
                            </>) : (
                            <>
                                <Link className={"navRight"} to={"/login"}>Login</Link>
                                <Link className={"navRight"} to={"/sign-up"}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
