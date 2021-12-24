import { Link } from "react-router-dom";

export default function Navbar () {
    return (
        <nav id={"navbar"}>
            <div id={"navLeft"}>
                <Link id={"navHome"} to={"/"}>B-bay</Link>
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
                {/* 
                    If user is logged, display Profile Route
                        <Link className={"navRight"} to={"/profile"}>{props.username}</Link>

                    If not, display Login Route 
                */}
                <Link className={"navRight"} to={"/login"}>Login</Link>
                <Link className={"navRight"} to={"/cart"}>Cart</Link>
            </div>
        </nav>
    )
}