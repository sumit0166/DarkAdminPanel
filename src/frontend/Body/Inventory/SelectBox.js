import { useEffect, useRef, useState } from 'react';
// import './SelectBox.css';
import { ArrowDown2 } from 'iconsax-react';
// import React, { useState } from 'react';

function SelectBox({ isActive, options, name, ICON, setActiveList, activeList }) {
    const [selected, setSelected] = useState(null);
    const [isExtended, setIsExtended] = useState(true)
    const selectBoxCont = useRef()
    const svg = useRef()

    useEffect(() => { setSelected(activeList) }, [activeList])

    useEffect(() => { setSelected(options[0]) }, [])

    const openOptions = () => {
        selectBoxCont.current.style.height = "fit-content";
        selectBoxCont.current.style.padding = "10px 10px";
        selectBoxCont.current.style.paddingBottom = "10px";
        selectBoxCont.current.style.opacity = "1";
        svg.current.style.rotate = "180deg";
    }

    const closeOptions = () => {
        selectBoxCont.current.style.height = "0px";
        selectBoxCont.current.style.padding = "0 10px";
        selectBoxCont.current.style.opacity = "0";
        svg.current.style.rotate = "0deg";
        setIsExtended(!isExtended);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) { // 27 is the key code for ESC key
                closeOptions();
            }
        };

        document.body.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const  handleEsc = event => {
        console.log(event.keyCode);
        if (event.keyCode === 27) {
          event.preventDefault();
          alert('You hit esc!');
        }
      }


    const extendSelect = () => {
        openOptions();
        // console.log(isExtended);
        // setIsExtended(!isExtended);
        // if (isExtended) {
        //     openOptions();
        // } else {
        //     selectBoxCont.current.style.height = "0px";
        //     selectBoxCont.current.style.padding = "0 10px";
        //     selectBoxCont.current.style.opacity = "0";
        //     svg.current.style.rotate = "0deg";
        // }
    }



    const handleSelected = (e) => {
        setSelected(e);
        if (setActiveList) {
            setActiveList(e);
        }
        selectBoxCont.current.style.height = "0px";
        selectBoxCont.current.style.padding = "0 10px";
        selectBoxCont.current.style.opacity = "0";
        svg.current.style.rotate = "0deg";
        setIsExtended(!isExtended);
    }

    return (
        <div className={isActive ? "SelectBox SelectBox-active" : "SelectBox"} >
            <div className="selectbox-main" onClick={extendSelect} >
                <ICON size="22" variant="Bold" />
                {name && <span>{name}:</span>}
                <span className="sortSelected" >{selected == "None" ? "" : selected}</span>
                <ArrowDown2 size="20" variant="Bold" ref={svg} />
            </div>
            <div className="selectbox-opt-cont" ref={selectBoxCont} >
                {
                    options.map((item) => <span onClick={() => handleSelected(item)}>{item}</span>)
                }
            </div>
        </div>
    );
}

export default SelectBox;
