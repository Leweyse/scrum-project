import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProductCard = (props) => {
    const productCardRef = useRef(null);
    const cardHoverEffect = useRef(null);

    useEffect(() => {
        productCardRef.current.addEventListener('mouseenter', () => {
            cardHoverEffect.current.play();
        })

        productCardRef.current.addEventListener('mouseleave', () => {
            cardHoverEffect.current.reverse();
        })

        productCardRef.current.addEventListener('focus', () => {
            cardHoverEffect.current.play();
        })
        
        productCardRef.current.addEventListener('blur', () => {
            cardHoverEffect.current.reverse();
        })

        cardHoverEffect.current = gsap.to(productCardRef.current,
            {
                duration: 0.2, 
                scale: 1.05, 
                backgroundImage: "linear-gradient(#EAD637, #DF2935, #006D77)", 
                paused: true
            }
        );
    }, []);

    return (
        <Link
            id={"productCard"}
            ref={productCardRef}
            to={`/products/${props.toId}`}
        >
            <img className={"image_container"} src={props.src} alt={"Product"} />
            <section className={"description_container"}>
                <div className={"productTitle"}>{props.title}</div>
                <div className={"productPrice"}>{props.price}</div>
                <div className={"productSeller"}>{props.seller}</div>
            </section>
        </Link>
    )
}

export default ProductCard;
