import { useState } from 'react';
import apiClient from "../../../services/apiClient";
import { Spinner } from '../../block';

const ProductRow = (props) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isSuccessMsg, setSuccessMsg] = useState(null);
    const [isErrorMsg, setErrorMsg] = useState(null);

    const [currentQty, setCurrentQty] = useState(props.quantity);

    const updateCartAdd = (event) => {
        event.preventDefault();

        setIsAdding(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/cart/update', 
                {
                    quantity: 1,
                    rowId: props.rowId
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        setIsAdding(false)
                        if(res.data.status === 'success') {
                            setCurrentQty(parseInt(currentQty) + 1)
                            setSuccessMsg("Product updated successfully")
                        }
                        if(res.data.status === 'fail') {
                            setErrorMsg("Sorry There was some error")
                        }
                    });
            });
    }

    const updateCartMin = (event) => {
        event.preventDefault();

        setIsRemoving(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/cart/update', 
                {
                    quantity: -1,
                    rowId: props.rowId
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        setIsRemoving(false)
                        if(res.data.status === 'success') {
                            setCurrentQty(parseInt(currentQty) - 1)
                            setSuccessMsg("Product updated successfully")
                        }
                        if(res.data.status === 'fail') {
                            setErrorMsg("Sorry There was some error")
                        }
                    });
            });
    }
    return (
        <>
            <article id={"productRow"}>
            { currentQty > 0 ?
                <>
                    <div className={"productTitle"}>{props.title}</div>
                    <p className={"productPrice"}>{props.price}</p>
                    <span className={"productQuantity"}>
                        <p>{currentQty}</p>
                        { !isRemoving ? <button className={props.visibility} onClick={updateCartMin}>-</button>: <Spinner size={20}/> }
                        { !isAdding ? <button className={props.visibility} onClick={updateCartAdd}>+</button> : <Spinner size={20}/> }
                    </span>
                    <p className={"productTotal"}>{props.total}</p>
                </>
            :
                <div className={"productTitle"}>No items in cart</div>
            }
            </article>
        </>
        
    )
}

export default ProductRow;
