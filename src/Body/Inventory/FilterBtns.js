import { useState } from 'react';
// import './FilterBtns.css';
import { DocumentText1 } from 'iconsax-react';
// import React, { useState } from 'react';

function FilterBtns({isActive, name, count}) {

    if(isActive){
    
        console.log("If loop executed..")
    }

    return (
        <div className={ isActive ? "FilterBtns FilterBtns-active" :"FilterBtns"} >
            <label>{name}</label>
            {count && <div className={isActive? "filt-prod-count fpc-active" : "filt-prod-count"}>
                <span>{count}</span>
            </div>}
        </div>
    );
}

export default FilterBtns;
