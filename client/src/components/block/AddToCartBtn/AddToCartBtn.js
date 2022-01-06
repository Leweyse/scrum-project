import { Spinner } from '../../block';
import { useState } from 'react';
import apiClient from "../../../services/apiClient";

const AddToCartBtn = (props) => {

    const [isProcessing, setIsProcessing] = useState(false);

    const addItemTocart = (event) => {

        event.preventDefault();
        setIsProcessing(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/cart/add', 
                {
                    id: props.id,
                   quantity: props.quantity
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        setIsProcessing(false)
                       console.log(res.data);
                    });
            });
    }
    return (
        <button onClick={addItemTocart}
        >
           {isProcessing ? <Spinner size={20}/>: "Add To cart"}
        </button>
    )
}

export default AddToCartBtn;
