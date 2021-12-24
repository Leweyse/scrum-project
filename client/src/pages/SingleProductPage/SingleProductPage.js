import { Footer, Navbar } from "../../components";

export default function SingleProductPage (props) {
    return (
        <>
            <Navbar/>
            <main id={"productPage"}>
                <div className={"productPageLeft"}>
                    {/* 
                        Screen-readers already announce `img` tags as an image. 
                        You don’t need to use the words `image`, `photo,` or `picture` 
                        (or any specified custom words) 
                        in the alt prop. 
                    */}
                    <img className={"productImage"} src={props.src} alt={"Product"}/>
                </div>
                <div className={"productPageRight"}>
                    <p className={"productName"}>
                        <span className={"productPageBold"}>Product: </span>
                        {props.name}
                    </p>
                    <p className={"productPrice"}>
                        <span className={"productPageBold"}>Price: </span>
                        {props.price}
                    </p>
                    <p className={"productSeller"}>
                        <span className={"productPageBold"}>Seller: </span>
                        {props.seller}
                    </p>
                    <p className={"productDescription"}>
                        <span className={"productPageBold"}>Description: </span>
                        {props.description}
                    </p>
                    <div className={"productPriceStatistics"}>
                        <p>Price stats go here.</p>
                    </div>
                    <button className={"productPageAddToCart"}>Add to Cart</button>
                </div>
            </main>
            <Footer />
        </>
    )
}