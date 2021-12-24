import React, { useState } from "react";
import imageUpload from "../../assets/images/upload_image.jpg"

const AddListingPage = (props) => {
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [price, setPrice] = useState(!null);
    const [description, setDescription] =useState("");

    return (
        <main id={"addListingPage"}>
            <section className="title">
                <h1>Add/Edit Your Item to B-Bay</h1>
            </section>
            <section className="main-container">
                <section className="left">
                    <img id={"uploadImage"}
                         className="uploadImage"
                         src={imageUpload}
                         alt="Upload your image"
                    />
                </section>
                {/*<section className="right">*/}
                    <form id={"addListingForm"}>

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

                        <button id={"addItemButton"}>Add item!</button>
                    </form>
                {/*</section>*/}
            </section>
        </main>
    )
}
// const handleFileInput = (e) => {
//     // handle validations
//     const file = e.target.files[0];
//     if (file.size > 1024)
//         onFileSelectError({ error: "File size cannot exceed more than 1MB" });
//     else onFileSelectSuccess(file);
// };

export default AddListingPage;