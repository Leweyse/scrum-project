import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProductCard = (props) => {
    const productCardRef = useRef(null);
    const cardHoverEffect = useRef(null);

    useEffect(() => {
        cardHoverEffect.current = gsap.to(productCardRef.current,
            {
                duration: 0.2, 
                scale: 1.05, 
                backgroundImage: "linear-gradient(#EAD637, #DF2935, #006D77)", 
                paused: true
            }
        );
    }, []);

    const onMouseEnterHandler = () => {
        cardHoverEffect.current.play();
    };

    const onMouseLeaveHandler = () => {
        cardHoverEffect.current.reverse();
    };

    return (
        <Link
            id={"productCard"}
            ref={productCardRef}
            to={`/products/${props.toId}`}

            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}

            onFocus={onMouseEnterHandler}
            onBlur={onMouseLeaveHandler}
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
