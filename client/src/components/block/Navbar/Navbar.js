export default function Navbar () {
    return (
        <nav id={"navbar"}>
            <div id={"navLeft"}>
                <a id={"navHome"} href={""}>B-bay</a>
            </div>
            <div id={"navRight"}>
                <form className={"navRight"} id={"navSearch"}><input id={"navSearchInput"} type={"text"} placeholder={"Search..."} name={"navSearch"}/></form>
                <a className={"navRight"} href={""}>Products</a>
                <a className={"navRight"} href={""}>Profile</a>
                <a className={"navRight"} href={""}>Cart</a>
            </div>
        </nav>
    )
}