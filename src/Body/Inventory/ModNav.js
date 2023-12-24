import { useState } from 'react';
import './ModNav.css';
import { DocumentText1 } from 'iconsax-react';
// import React, { useState } from 'react';

function ModNav({isActive, stepno, subhead, setModHeading}) {

    if(isActive){
        setModHeading(subhead);
        console.log("If loop executed..")
    }

    return (
        <div className="ModNav" >
            <div className="modnavlinecont">
                <div className={ isActive ? "modnavline modnavline-active" : "modnavline"}></div>
            </div>
            <div className={ isActive ? "modnavbox modnavbox-active" : "modnavbox"}>
                <div className={ isActive ? "modnavboxlt modnavbox-active" : "modnavboxlt"}>
                    <DocumentText1 size="22" variant="Bulk"/>
                </div>
                <div className="modnavboxrt">
                    <p>STEP {stepno}</p>
                    <p>{subhead}</p>
                </div>
            </div>
        </div>
    );
}

export default ModNav;
