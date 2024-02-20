import { useEffect, useRef, useState } from 'react';
import './AddProduct.css';
import { ArrowLeft2, CloseSquare, HashtagDown } from 'iconsax-react';
import ModNav from './ModNav';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';
import ShowFiles from './ShowFiles';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// import React, { useState } from 'react';
const response = await fetch('/config.json');
const config = await response.json();






function AddProduct({ modalControl }) {
    const [activeModalNav, setActiveModalNav] = useState(1);
    const [modHeading, setModHeading] = useState("Genral Information");
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [mouseEnter, setMouseEnter] = useState(0);
    const [fileCount, setFileCount] = useState(0);
    const [uploadedfile, setUploadedFile] = useState([]);
    const [animationParent] = useAutoAnimate();

    const formRef = useRef(null);
    // console.log(activeModalNav)

    const handleSubmit = (e) => {

        // setActiveModalNav(activeModalNav + 1);
        // if (activeModalNav == 4) {
        //     setActiveModalNav(1);
        //     navigate("/Inventory")
        //     modalControl.setViewAddPrd(false);
        // }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        files.forEach(file => {
            formData.append('image', file);
        });
        // formData.append('image', files);
        axios.post(config.host + '/test', formData)
            .then(response => {
                console.log(response);
                toast.success('Data Uploaded Sucessfully');
                setFiles([]);
                if (formRef.current) {
                    formRef.current.reset();
                  }
         
            })
            .catch(err => {
                console.log(err);
                toast.error('Data uploadinf failed..');
            })

    }





    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         // Increase count by 1 on each interval
    //         if (uploadPerc >= 100) {
    //             setUploadedPerc(0)
    //         }
    //         setUploadedPerc(prevCount => { 
    //             if (prevCount >= 100) {
    //                 prevCount = 0;

    //             }
    //             return prevCount >= 100 ? 0 : prevCount + Math.floor(Math.random() * 16); 
    //         });
    //     }, 1000); // Interval in milliseconds (0.4 seconds)

    //     // Clear the interval when the component unmounts
    //     return () => clearInterval(intervalId);
    // }, []);
    // useEffect(() => {
    //     setFileCount(fileCount+1);
    // },[files])

    const onDrop = (acceptedFiles) => {
        console.log('lenght ->', acceptedFiles.length, 'file-count->', files.length, 'FileCount+length', files.length + acceptedFiles.length);
        if (acceptedFiles.length > config.maxImageUpload || (files.length + acceptedFiles.length) > config.maxImageUpload) {
            toast.error('Maximum 4 images can be uploaded', { style: { width: 'auto' } });
            return;
        } else {

            for (let ele of acceptedFiles) {
                const selectedFile = ele;
                var accepted = ['image/png', 'image/jpg', 'image/jpeg'];
                if (!accepted.includes(selectedFile.type)) {
                    toast.error('Invalid file type. Please select a JPEG, JPG, or PNG file.', { style: { width: 'auto' } });
                    return;
                }
                if (files.length === config.maxImageUpload) {
                    toast.error('Maximum 4 images can be uploaded', { style: { width: 'auto' } });
                    return;
                }
                setFileCount(fileCount + 1);
                setFiles(files => [...files, selectedFile]);
                // const formData = new FormData();
                // formData.append('image', selectedFile);
            }

        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    // navigate('/Inventory/addProduct?'+modHeading, { replace: true })
    useEffect(() => { navigate('/Inventory/addProduct?' + modHeading, { replace: true }) }, [modHeading])


    return (
        // <form className={ modalControl.viewAddPrd ? "AddProduct up" : "AddProduct"} >
        <form className="AddProduct" ref={formRef} onSubmit={handleFormSubmit}>
            <div className="hBack">
                <div className="back-btn-box"
                    onClick={() => {
                        navigate("/Inventory")
                        modalControl.setViewAddPrd(false)
                    }}
                >
                    <ArrowLeft2 size="23" variant="Bold" />
                    <span>Back to product list</span>
                </div>
                <div className="sub-head">
                    <span>Add New Product</span>
                </div>
                <div className="mod-heading">
                    <span>{modHeading}</span>
                </div>
            </div>


            <div className="modal-mid-cont">
                <div className="mod-body-left">
                    <ModNav stepno="1" setModHeading={setModHeading} subhead="Genral Information" isActive={activeModalNav == 1} />
                    <ModNav stepno="2" setModHeading={setModHeading} subhead="Sales Information" isActive={activeModalNav == 2} />
                    <ModNav stepno="3" setModHeading={setModHeading} subhead="Quantity & Recorder" isActive={activeModalNav == 3} />
                    <ModNav stepno="4" setModHeading={setModHeading} subhead="Measurement" isActive={activeModalNav == 4} />
                </div>
                <div className="mod-body-right">
                    {/* <div style={{ width:'450px', height:'450px'}}>
                    <img src="http://webapp:3001/images/kpim.png" style={{ width:'450px', height:'450px'}} />
                </div> */}
                    <div className="mbr-box1">
                        <div className="inptcont">
                            <label htmlFor="productname">Product name</label>
                            <div className="inptbox">
                                <input name='productname' type="text" placeholder='e.g Adidas Running Shoes' />
                            </div>
                        </div>
                        <div className="img-box">
                            <span>Image</span>
                            <div className="img-select" {...getRootProps()}>
                                <input {...getInputProps()}
                                    onMouseEnter={() => setMouseEnter(true)}
                                    onMouseLeave={() => setMouseEnter(false)}
                                />
                                <div className="is-cont">
                                    <img id='is-cont-img' width="50" height="50" accept="image/png, image/jpeg"
                                        src={mouseEnter ? "https://img.icons8.com/ios-filled/50/39db7d/upload-to-cloud--v1.png" : "https://img.icons8.com/ios/50/39db7d/upload-to-cloud--v1.png"}
                                        alt="upload-to-cloud--v1"
                                    />
                                    <span>Select Image or drag to Upload</span>
                                </div>
                            </div>
                            <div className="shofiles-cont" ref={animationParent}>
                                {files?.map((file, index) => {
                                    return (
                                        <ShowFiles key={file.id || index} file={file} fileOpt={{ files, setFiles, uploadedfile, setUploadedFile }} />
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mod-footer">
                <div className="draft-btn">Save as Draft</div>
                <div className="vert"></div>
                <button className="next-btn" type="submit" value="Submit" >Submit</button>
                {/* {activeModalNav > 1 && <div className="prev-btn" onClick={() => setActiveModalNav(activeModalNav - 1)}>Previous</div>} */}
                {/* { activeModalNav < 6 && <button type={activeModalNav == 5 ? 'submit' : 'button'} className ="next-btn mfb-active" onClick={() => setActiveModalNav(activeModalNav+1)}>{activeModalNav == 4 ? "Submit" : "Next"}</button>} */}
                {/* {<div className="next-btn" onClick={handleSubmit}>{activeModalNav == 4 ? "Submit" : "Next"}</div>} */}
            </div>


        </form>

    );
}

export default AddProduct;

