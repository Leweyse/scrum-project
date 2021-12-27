import {Link} from "react-router-dom";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";

const ProductCard = (props) => {
    const productCardRef = useRef(null);
    const cardHoverEffect = useRef(null);

    useEffect(() => {
        cardHoverEffect.current = gsap.to(productCardRef.current, {duration: 0.2, scale: 1.05, backgroundImage: "linear-gradient(#006D77, #DF2935, #EAD637)", paused: true});
    }, []);

    const onMouseEnterHandler = () => {
        cardHoverEffect.current.play();
    };

    const onMouseLeaveHandler = () => {
        cardHoverEffect.current.reverse();
    };

    return (
        <Link id={"productCard"} to={"/product"} ref={productCardRef} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
            <div className={"image_container"}
                 style={{
                     background: `
                        url(${props.src}) 
                        50% 50% / 
                        cover no-repeat
                    `
                 }}
            ></div>
            <section className={"description_container"}>
                <p className="productTitle">{props.title}</p>
                <p className="productPrice">{props.price}</p>
                <p className="productSeller">{props.seller}</p>
            </section>
        </Link>
    )
}

export default ProductCard;