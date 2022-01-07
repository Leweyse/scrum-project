import React, {useState} from 'react';
import useCookie from 'react-use-cookie';
import imageUpload from "../../../../src/assets/images/upload_image.jpg";
import apiClient from '../../../services/apiClient';

const ListingSection = (props) => {
    const [userToken] = useCookie('token','0');

    const type = props.type;
    const product = props.type === 'create' ? [] : props.product;

    const [error, setError] = useState({});
    const [successMsg, setSuccessMsg] = useState(null);

    const [imagePreview, setImagePreview] = useState(props.type === 'update' && props.product.image !== 'default.jpg' ? `http://localhost:8000/storage/images/products/thumb/${props.product.image}` : imageUpload);
    
    const [title, setTitle] = useState(product.title || '');
    const [description, setDescription] = useState(product.description || '');
    const [price, setPrice] = useState(product.price || '');
    const [stockUnit, setStockUnit] = useState(product.stock_unit  || '');
    const [categoryId, setCategoryId] = useState(product.categories_id  || '');
    const [image, setImage] = useState('');
    
    const handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0]);
        let image_as_files = e.target.files[0];
        setImagePreview(image_as_base64);
        setImage(image_as_files); 
    }

    const create = async (event) => {
        event.preventDefault();

        let bodyFormData = new FormData();

        bodyFormData.append('image',image);
        bodyFormData.append('title',title);
        bodyFormData.append('description',description);
        bodyFormData.append('categories_id',categoryId);
        bodyFormData.append('price',price);
        bodyFormData.append('stock_unit',stockUnit);

        const res = await apiClient.post('/product/create',
            bodyFormData,
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "multipart/form-data"
            }
        })
        
        if (res.data.data.status === 'success') {
            setTitle('');
            setDescription('');
            setPrice('');
            setCategoryId('');
            setStockUnit('');
            setSuccessMsg(<div className={"success"}>'Product successfully added to listings'</div>);
        } else if (res.data.data.status === 'fail' && res.data.data.error) {
            setError(res.data.data.error);
        }
    }

    const update = async (event) => {
        event.preventDefault();

        const res = await apiClient.post( `/product/update/${product.id}`, {
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
        
        if (res.data.data.status === 'success') {
            setSuccessMsg(<div className={"success"}>Product is successfully updated</div>);
        } else if (res.data.data.error) {
            setError(res.data.data.error);
        } 
    }

    return (
        <main id={"listingPage"}>
            <section className="title">
                { type === 'create' ? <p>Add Listing</p> : <p>Edit Listing</p> }
            </section>
            { successMsg ?
                <section>
                   {successMsg }
                </section>
                : null
            }
            
            <section className="main-container">
                {/* <img src="http://localhost:8000/storage/images/products/thumb/1234576579987.jpg" /> */}
                <section className="left">
                    <img id={"uploadImage"}
                        className="uploadImage"
                        src={imagePreview}
                        alt="Upload"
                    />
                    <input 
                        id={"imageLoad"} 
                        type="file"
                        onChange={handleImagePreview}
                    />
                    { error.image ? <div className={"error"}>{error.image}</div> : null }
                </section>
                <form id={"listingForm"}>
                    <input
                        type={"text"}
                        placeholder={"Title"}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    { error.title ? <div className={"error"}>{error.title}</div> : null }

                    <input
                        type={"text"}
                        placeholder={"Price"}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    { error.price ? <div className={"error"}>{error.price}</div> : null }

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
                    { error.description ? <div className={"error"}>{error.description}</div> : null }

                    <input
                        type={"text"}
                        placeholder={"Number of units available"}
                        value={stockUnit}
                        onChange={e => setStockUnit(e.target.value)}
                    />
                    {error.stock_unit ? <div className={"error"}>{error.stock_unit}</div> : null}

                    {type === 'create' ?
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