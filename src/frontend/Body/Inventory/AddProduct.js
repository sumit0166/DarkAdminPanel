import { useEffect, useState } from 'react';
import './AddProduct.css';
import { ArrowLeft2, DocumentText1, HashtagDown } from 'iconsax-react';
import ModNav from './ModNav';
import { useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';

function AddProduct({modalControl}) {
    const [activeModalNav, setActiveModalNav] = useState(1);
    const [modHeading, setModHeading] = useState("Genral Information");
    const navigate = useNavigate()
    // console.log(activeModalNav)

    const handleSubmit = () => {
        setActiveModalNav(activeModalNav+1);
        if (activeModalNav == 4) {
            setActiveModalNav(1);
            navigate("/Inventory")
            modalControl.setViewAddPrd(false);

        }
    }

    // navigate('/Inventory/addProduct?'+modHeading, { replace: true })
    useEffect(() => { navigate('/Inventory/addProduct?'+modHeading, { replace: true }) },[modHeading])


    return (
            // <form className={ modalControl.viewAddPrd ? "AddProduct up" : "AddProduct"} >
             <form className="AddProduct" >
                <div className="back-btn-box"
                    onClick={() => {
                        navigate("/Inventory")
                        modalControl.setViewAddPrd(false)
                    }}
                >
                    <ArrowLeft2 size="23" variant="Bold"/>
                    <span>Back to product list</span>
                </div>
                <div className="sub-head">
                    <h3>Add New Product</h3>
                </div>
                <div className="mod-heading">
                    <h2>{modHeading}</h2>
                </div>

                <div className="mod-body-left">
                    <ModNav stepno="1" setModHeading={setModHeading} subhead="Genral Information" isActive={activeModalNav == 1 }/>
                    <ModNav stepno="2" setModHeading={setModHeading} subhead="Sales Information" isActive={activeModalNav == 2 }/>
                    <ModNav stepno="3" setModHeading={setModHeading} subhead="Quantity & Recorder" isActive={activeModalNav == 3}/>
                    <ModNav stepno="4" setModHeading={setModHeading} subhead="Measurement" isActive={activeModalNav == 4}/>
                </div>
                <div className="mod-body-right">
                </div>

                <div className="mod-footer">
                    <div className="draft-btn">Save as Draft</div>
                    <div className="vert"></div>
                    { activeModalNav > 1 && <div className="prev-btn" onClick={() => setActiveModalNav(activeModalNav-1)}>Previous</div>}
                    {/* { activeModalNav < 6 && <button type={activeModalNav == 5 ? 'submit' : 'button'} className ="next-btn mfb-active" onClick={() => setActiveModalNav(activeModalNav+1)}>{activeModalNav == 4 ? "Submit" : "Next"}</button>} */}
                    { <div className ="next-btn" onClick={handleSubmit}>{activeModalNav == 4 ? "Submit" : "Next"}</div>}
                </div>
            </form>

    );
}

export default AddProduct;

