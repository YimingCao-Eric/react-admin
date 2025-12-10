/**
 * ImageUpload Component
 * 
 * A reusable component for uploading images to the server.
 * Provides a file input button that allows users to select and upload image files.
 * Once uploaded, the component calls the provided callback with the image URL.
 */
import React from 'react';
import axios from "axios";

const ImageUpload = (props:{uploaded:(url:string) => void}) => {

    /**
     * Handles the file upload process
     * @param files - The FileList containing the selected file(s)
     */
    const upload = async (files: FileList | null) => {
        if (files === null) return;

        console.log("Selected file:", files[0]);
        console.log("File name:", files[0].name);
        console.log("File size:", files[0].size);
        console.log("File type:", files[0].type);

        const formData = new FormData();
        formData.append("image", files[0]);

        const {data} = await axios.post('upload', formData)
        props.uploaded((data as any).url);
    }

    return (
        <label className="btn btn-primary">
            upload <input type="file" hidden onChange={e => upload(e.target.files)}/>
        </label>
    )
}
export default ImageUpload;