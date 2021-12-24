export default function SingleProductSection (props) {
    return (
        <main id={"productPage"}>
            <div className={"productPageLeft"}>
                <img className={"productImage"} src={props.src} alt={"Product"}/>
            </div>
            <div className={"productPageRight"}>
                <p className={"productRightElements"}>
                    <span className={"productPageBold"}>Product: </span>
                    {props.name}
                </p>
                <p className={"productRightElements"}>
                    <span className={"productPageBold"}>Price: </span>
                    {props.price}
                </p>
                <p className={"productRightElements"}>
                    <span className={"productPageBold"}>Seller: </span>
                    {props.seller}
                </p>
                <p className={"productRightElements"}>
                    <span className={"productPageBold"}>Description: </span>
                    {props.description}
                </p>
                <div className={"productRightElements productPriceStatistics"}>
                    <p>Price stats go here.</p>
                </div>
                <button className={"productPageAddToCart"}>Add to Cart</button>
            </div>
        </main>
    )
}