import './Settings.css';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// const response = await fetch('/config.json');
// const config = await response.json();
import { SecurityUser, ColorSwatch } from 'iconsax-react';
import { useState } from 'react';

const MenuButton = ({Icon, name, path, setActivePage}) => {
  const [isHover, setHover] = useState(false);
  // const navigate = useNavigate();

  const handleClick = () => {
    setActivePage(name);
    // navigate('/Settings/' + name, { replace: false })
  }

  return (
    <div className="MenuButton"
      onMouseEnter={()=> setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {Icon && <Icon size="24" color="var(--primary)" variant={isHover ? "Bulk" :"Linear"} />}
      <h4>{name}</h4>
    </div>
  );
}


const IAM = () => {
  return(
    <div className="IAM">
      <center><h1>User Management</h1></center>
    </div>
  )
}


const Personalise = () => {
  return(
    <div className="Personalise">
      <center><h1>Personalise</h1></center>
    </div>
  )
}


function Settings() {
  const [activePage, setActivePage] = useState('');
  const animateParent = useAutoAnimate();

  return (
    <div className="Settings" >
      <div className="leftMenu">
        <h4 style={{padding:'10px', marginBottom:'1%', fontSize:'14px', color:'var(--pri-color)'}}>Options</h4>
        <MenuButton name="Personalize" Icon={ColorSwatch} setActivePage={setActivePage} isActive={activePage === "Personalize"}/>
        <MenuButton name="User Management" Icon={SecurityUser} setActivePage={setActivePage} isActive={activePage === "IAM"}/>

      </div>
      <div className="rightPageCont" ref={animateParent}>
        {activePage === "Personalize" && <Personalise />}
        {activePage === "User Management" && <IAM />}
      </div>
    </div>
  );
}

export default Settings;