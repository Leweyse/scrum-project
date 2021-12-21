const ProductCard = (props) => {
    return (
        <article id={"productCard"}>
            <img src={props.src} alt="" />
            <p className="productTitle">{props.title}</p>
            <p className="productPrice">{props.price}</p>
            <p className="productSeller">{props.seller}</p>
        </article>
    )
}

export default ProductCard;