const ProductRow = (props) => {
    return (
        <article id={"productRow"}>
            <div className={"productTitle"}>{props.title}</div>
            <p className={"productPrice"}>{props.price}</p>
            <span className={"productQuantity"}>
                <p>{props.quantity}</p>
                <button onClick={props.onClickAdd}>+</button>
                <button onClick={props.onClickRemove}>-</button>
            </span>
            <p className={"productTotal"}>{props.total}</p>
        </article>
    )
}

export default ProductRow;
