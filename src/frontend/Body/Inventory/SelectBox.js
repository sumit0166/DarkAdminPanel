import { useRef, useState } from 'react';
// import './SelectBox.css';
import { ArrowDown2 } from 'iconsax-react';
// import React, { useState } from 'react';

function SelectBox({isActive, options, name, ICON}) {
    const [selected,setSelected] = useState(options[0]);
    const [isExtended,setIsExtended] = useState(true)
    const selectBoxCont = useRef()
    const svg = useRef()
    
    const extendSelect = () => {
        setIsExtended(!isExtended);
        if (isExtended) {
            selectBoxCont.current.style.height = "fit-content"; 
            selectBoxCont.current.style.padding = "5px 10px";
            selectBoxCont.current.style.paddingBottom = "10px";
            selectBoxCont.current.style.opacity = "1";
            svg.current.style.rotate = "180deg";
        } else {
            selectBoxCont.current.style.padding = "0 10px";
            selectBoxCont.current.style.opacity = "0";
            selectBoxCont.current.style.height = "0px"; 
            svg.current.style.rotate = "0deg";
        }
    }
    const handleSelected = (e) => {
        setSelected(e);
        selectBoxCont.current.style.height = "0px"; 
        selectBoxCont.current.style.padding = "0 10px";
        selectBoxCont.current.style.opacity = "0";
        svg.current.style.rotate = "0deg";
        setIsExtended(!isExtended);
    }

    return (
        <div className={ isActive ? "SelectBox SelectBox-active" :"SelectBox"} >
            <div className="selectbox-main" onClick={extendSelect} >
                <ICON size="22" variant="Bold"/>
                { name && <span>{name}:</span>}
                <span className="sortSelected">{selected == "Clear" ? "" : selected}</span>
                <ArrowDown2 size="20" variant="Bold" ref={svg}/>
            </div>
            <div className="selectbox-opt-cont" ref={selectBoxCont}>
                {
                    options.map( (item) => <span onClick={()=> handleSelected(item)}>{item}</span>)
                }
            </div>
        </div>
    );
}

export default SelectBox;
