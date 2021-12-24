import {Navbar} from "../../components";

export default function SingleProductPage (props) {
    return (
        <>
            <Navbar/>
            <section id={"productPage"}>
                <div id={"productPageLeft"}>
                    <img id={"productImage"} src={props.src} alt={"Product Image"}/>
                </div>
                <div id={"productPageRight"}>
                    <p id={"productName"}>{props.name}</p>
                    <p id={"productPrice"}>{props.price}</p>
                    <p id={"productSeller"}><span className={"productPageBold"}>Seller: </span>{props.seller}</p>
                    <p id={"productDescription"}><span className={"productPageBold"}>Description: </span>{props.description}</p>
                    <div id={"productPriceStatistics"}>
                        <p>Price stats go here.</p>
                    </div>
                    <button id={"productPageAddToCart"}>Add to Cart</button>
                </div>
            </section>
        </>

        )
}