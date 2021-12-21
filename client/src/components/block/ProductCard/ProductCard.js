const ProductCard = (props) => {
    return (
        <article id={"productCard"}>
            <section className={"image_container"}
                style={{
                    background: `
                        url(${props.src}) 
                        50% 50% / 
                        cover no-repeat
                    `
                }}
            ></section>
            <section className={"description_container"}>
                <p className="productTitle">{props.title}</p>
                <p className="productPrice">{props.price}</p>
                <p className="productSeller">{props.seller}</p>
            </section>
        </article>
    )
}

export default ProductCard;