import './Navparam.css';
import { ArrowDown2 } from 'iconsax-react';
// import React, { useState } from 'react';

function Navparam({Icon,Text, onClick, active, headVars}) {
  // const [changeColor,setChangeColor] = useState('#6C6C6C');
  function makeActive(){
    headVars.setActivePage(Text);
  }
  // console.log(active,Text);
  return (
        
        <div className={headVars.activePage == Text ? "nav-item active":"nav-item"} onClick={makeActive}>
            <div className={headVars.activePage == Text ? "active-nav-logo" :"nav-logo"}> {Icon} </div>
            <span>{Text}  </span>
            {/* <ArrowDown2 size="14" color="#6C6C6C" variant="Bold"/> */}
        </div>

  );
}

export default Navparam;
