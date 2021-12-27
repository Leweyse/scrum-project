import { Link } from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import {gsap} from "gsap";
import UserIconSVG from "../SVGs/UserIconSVG/UserIconSVG";

export default function Navbar () {
    const navDropdownButton = useRef(null);
    const userIconSvg = useRef(null);
    const navDropdownContent = useRef(null);
    const navDropdownContentAnimation = useRef(null);
    const userIconSvgAnimation = useRef(null);
    const navDropdownButtonAnimation = useRef(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        navDropdownContentAnimation.current = gsap.to(navDropdownContent.current, {display: "flex", duration: 0.2, opacity: 1, flexDirection: "column", textAlign: "center", justifyContent: "space-evenly", paused: true});
        navDropdownButtonAnimation.current = gsap.to(navDropdownButton.current, {scale: 2, rotateY: 180, duration: 0.5, paused: true});
        userIconSvgAnimation.current = gsap.to(userIconSvg.current, {fill: "url(#userIconFillGradient)", duration: 0.5, paused: true});
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

                <Link className={"navRight"} to={"/products"}>Products</Link>
                <div id={"navDropdown"} className={"navRight"}>
                    <button id={"navDropdownButton"} ref={navDropdownButton} onClick={!clicked ? expand : retract}>
                        <UserIconSVG fill={"#474044"} ref={userIconSvg}/>
                    </button>
                    <div id={"navDropdownContent"} ref={navDropdownContent}>
                        <Link className={"navRight"} to={"/login"}>Login</Link>
                        <Link className={"navRight"} to={"/cart"}>Cart</Link>
                    </div>
                </div>
                {/* 
                    If user is logged, display Profile Route
                        <Link className={"navRight"} to={"/profile"}>{props.username}</Link>

                    If not, display Login Route 
                */}
            </div>
        </nav>
    )
}