import React, { useState } from "react";
import imageUpload from "../../../../src/assets/images/upload_image.jpg"

const ListingSection = (props) => {
    const [name, setName] = useState(props.name === undefined ? "" : props.name);
    const [price, setPrice] = useState(props.price === undefined ? "" : props.price);
    const [description, setDescription] =useState(props.description === undefined ? "" : props.description);

    return (
        <main id={"listingPage"}>
            <section className="title">
                {/* <h1>Edit (item name)</h1> */}
                {name === "" && price === "" && description === "" ? <h1>Add Listing</h1> : <h1>Edit Listing</h1>}
            </section>
            <section className="main-container">
                <section className="left">
                    <img id={"uploadImage"}
                         className="uploadImage"
                         src={imageUpload}
                         alt="Upload"
                    />
                </section>
                {/*<section className="right">*/}
                <form id={"listingForm"}>

                    <label>
                        Upload image:
                    </label>

                    {/*<input id={"imageLoad"}*/}
                    {/*    type="file"*/}
                    {/*    value={selectedFile}*/}
                    {/*    onChange={(e) => setSelectedFile(e.target.files[0])}*/}
                    {/*/>*/}
                    <button name={"Browse"}>Browse</button>

                    <label>
                        Name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>
                        Price:
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <label>
                        Description:
                    </label>
                    <textarea value={description}
                              onChange={(e) => setDescription(e.target.value)}
                    />

                    {name === "" && price === "" && description === "" ?
                        <button name={"addProduct"} className={"listingSubmitButton"}>Add</button>
                        :
                        <button name={"editProduct"} className={"listingSubmitButton"}>Submit changes</button>
                    }
                </form>
                {/*</section>*/}
            </section>
        </main>
    )
}

export default ListingSection;