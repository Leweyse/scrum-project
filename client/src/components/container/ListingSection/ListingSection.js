import React, {useState} from 'react';
import useCookie from 'react-use-cookie';
import imageUpload from "../../../../src/assets/images/upload_image.jpg";
import apiClient from '../../../services/apiClient';

const ListingSection = (props) => {
    const [type, setType] = useState(props.type);
    const [product, setProduct] = useState(props.product === undefined ? "[]" : props.product);
    const [userToken] = useCookie('token','0');
    const [imagePreview, setImagePreview] = useState(imageUpload);
    const [error, setError] = useState({});
    const [successMsg, setSuccessMsg] = useState(null);
    
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [stockUnit, setStockUnit] = useState(product.stock_unit);
    const [categoryId, setCategoryId] = useState(product.categories_id);
    

    const handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        setImagePreview(image_as_base64);
    }

    const create = (event) => {
        event.preventDefault();
        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/product/create', {
                    title: title,
                    description: description,
                    categories_id: categoryId,
                    price: price,
                    stock_unit: stockUnit
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                })
                .then(res => {
                    if(res.data.status == 'success') {
                        setTitle('');
                        setDescription('');
                        setPrice('');
                        setCategoryId('');
                        setStockUnit('');
                        setSuccessMsg('Product is successfully added for sale');
                    }
                    if(res.data.data.error) {
                        setError(res.data.data.error);
                    } 
                });
            });
    }

    const update = (event) => {
        event.preventDefault();
        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( `/product/update/${product.id}`, {
                    title: title,
                    description: description,
                    categories_id: categoryId,
                    price: price,
                    stock_unit: stockUnit
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                })
                .then(res => {
                    if(res.data.status == 'success') {
                        setSuccessMsg('Product is successfully updated');
                    }
                    if(res.data.data.error) {
                        setError(res.data.data.error);
                    } 
                });
            });
    }

    return (
        <main id={"listingPage"}>
            <section className="title">
                {type == 'create' ? <p>Add Listing</p> : <p>Edit Listing</p>}
            </section>
            { successMsg ?
                <section>
                   {successMsg }
                </section>
                : null
            }
            
            <section className="main-container">
                <section className="left">
                    <img id={"uploadImage"}
                        className="uploadImage"
                        src={imagePreview}
                        alt="Upload"
                    />
                </section>
                <form id={"listingForm"}>
                    <input 
                        id={"imageLoad"} 
                        type="file"
                        onChange={handleImagePreview}
                    />
                        {error.image ? error.image : null}
                    <input
                        type={"text"}
                        placeholder={"Title"}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {error.title ? error.title : null}

                    <input
                        type={"text"}
                        placeholder={"Price"}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                        {error.price ? error.price : null}

                    <select 
                       value={categoryId}
                       onChange={e => setCategoryId(e.target.value)}
                    >
                        <option value="">Choose a category</option>
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                        <option value="3">Category 3</option>
                        <option value="4">Category 4</option>
                        <option value="5">Category 5</option>
                    </select>

                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={"Product description"}
                    />
                        {error.description ? error.description : null}

                    <input
                        type={"text"}
                        placeholder={"Number of units available"}
                        value={stockUnit}
                        onChange={e => setStockUnit(e.target.value)}
                    />
                        {error.stock_unit ? error.stock_unit: null}


                    {type == 'create' ?
                        <button name={"addProduct"} className={"listingSubmitButton"}  onClick={create}>Add</button>
                        :
                        <button name={"editProduct"} className={"listingSubmitButton"}  onClick={update}>Submit changes</button>
                    }
                </form>
            </section>
        </main>
    )
}

export default ListingSection;