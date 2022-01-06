import { useState, useEffect, useRef } from 'react';
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
        { currentQty > 0 ?
            <article id={"productRow"}>
            <div className={"productTitle"}>{props.title}</div>
            <p className={"productPrice"}>{props.price}</p>
            <span className={"productQuantity"}>
                
                <button onClick={updateCartMin}>{isRemoving ? <Spinner size={20}/>: "-"}</button>
                <p>{currentQty}</p>
                <button onClick={updateCartAdd}>{isAdding ? <Spinner size={20}/>: "+"}</button>
            </span>
            <p className={"productTotal"}>{props.total}</p>
            </article>
            : 'There are no products in you shopping cart'
        }
        </>
        
    )
}

export default ProductRow;
