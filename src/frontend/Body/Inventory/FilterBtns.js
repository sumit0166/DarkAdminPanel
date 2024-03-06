import { useState } from 'react';
// import './FilterBtns.css';
import { DocumentText1 } from 'iconsax-react';
// import React, { useState } from 'react';

function FilterBtns({name, count, btnProp, setBtnProp}) {
    
    const handleClick = () => {
        if (btnProp !== name) {
            setBtnProp(name);
        }
        else if (!btnProp) {
            setBtnProp(name);
        } else {
            setBtnProp(null);
        }
    }

    return (
        <div className={ btnProp === name ? "FilterBtns FilterBtns-active" :"FilterBtns"} onClick={handleClick} >
            <label>{name}</label>
            {count && <div className={btnProp === name? "filt-prod-count fpc-active" : "filt-prod-count"}>
                <span>{count}</span>
            </div>}
        </div>
    );
}

export default FilterBtns;
