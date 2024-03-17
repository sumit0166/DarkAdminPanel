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


const sucessNoti = (msg) => toast(msg,{
    style:{
      backgroundColor: '#22ca1c',
      color: 'white',
    },
    icon: '✔️'

  });

  const errorNoti = (msg) => toast(msg,{
      duration: 4000,
      style:{
        backgroundColor: 'white',
        color: 'red',
      },
      icon: '😡'
  });




function AddProduct({ modalControl }) {
    const [step, setStep] = useState(1);
    // const [step, setStep] = useState(1);
    const [modHeading, setModHeading] = useState("Genral Information");
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [mouseEnter, setMouseEnter] = useState(0);
    const [fileCount, setFileCount] = useState(0);
    const [uploadedfile, setUploadedFile] = useState([]);
    const [animationParent] = useAutoAnimate();

    const formRef = useRef(null);
    // console.log(step)

    const handleSubmit = (e) => {

        // setStep(step + 1);
        // if (step == 4) {
        //     setStep(1);
        //     navigate("/Inventory")
        //     modalControl.setViewAddPrd(false);
        // }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        const formData = new FormData(e.target);
        console.log(formData)
        files.forEach(file => {
            formData.append('image', file);
        });
        // console.log(formData.entries.length)
        // if (formData.entries.length === 0) {
        //     errorNoti('Please fill all data.');
        //     toast.error("Empty Data");
        //     return
        // }
        
        axios.post(config.host + '/products/uploadProduct', formData)
        .then(response => {
            console.log(response);
                sucessNoti('Data Uploaded Sucessfully')
                // toast.success();
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

    const nextStep = () => { setStep(step + 1) }
    const prevStep = () => { setStep(step - 1) }

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
                    <ModNav stepno="1" setModHeading={setModHeading} subhead="Genral Information" isActive={step == 1} />
                    <ModNav stepno="2" setModHeading={setModHeading} subhead="Sales Information" isActive={step == 2} />
                    <ModNav stepno="3" setModHeading={setModHeading} subhead="Quantity & Recorder" isActive={step == 3} />
                    <ModNav stepno="4" setModHeading={setModHeading} subhead="Measurement" isActive={step == 4} />
                </div>
                <div className="mod-body-right">
                    {/* <div style={{ width:'450px', height:'450px'}}>
                    <img src="http://webapp:3001/images/kpim.png" style={{ width:'450px', height:'450px'}} />
                </div> */}
                    { step === 1 &&
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
                    }
                </div>
            </div>

            <div className="mod-footer">
                <div className="draft-btn">Save as Draft</div>
                <div className="vert"></div>
                {/* <button className="next-btn" type="submit" value="Submit" >Submit</button> */}

                {/* Note: won't uplod if using stepwise, i think data is erasing */}
                {step >= 2 && step <= 4 && <div className="prev-btn" onClick={prevStep}>Previous</div>}
                {step >= 1 && step <= 3 && <div className="next-btn" onClick={nextStep}>Next</div>}
                {step === 4 && <button className="next-btn" type="submit" value="Submit" >Submit</button>}


                {/* {step > 1 && <div className="prev-btn" onClick={() => setStep(step - 1)}>Previous</div>} */}
                {/* { step < 6 && <button type={step == 5 ? 'submit' : 'button'} className ="next-btn mfb-active" onClick={() => setStep(step+1)}>{step == 4 ? "Submit" : "Next"}</button>} */}
                {/* {<div className="next-btn" onClick={handleSubmit}>{step == 4 ? "Submit" : "Next"}</div>} */}
            </div>


        </form>

    );
}

export default AddProduct;

