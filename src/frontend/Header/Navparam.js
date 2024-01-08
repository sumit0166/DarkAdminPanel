import './Navparam.css';
import { ArrowDown2 } from 'iconsax-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';



function Navparam({Icon,Text }) {

  const [isActive, setIsActive] = useState(null);

  return (
        <NavLink style={{ textDecoration: 'none', background: 'none' }} to={"/"+Text} className={({isActive}) => {
          setIsActive(isActive);
          return ""
        }}>

          <div className={isActive ? "nav-item active":"nav-item"}>
              <div className={isActive ? "active-nav-logo" :"nav-logo"}> {Icon} </div>
              <span>{Text}  </span>
          </div>
        </NavLink>

  );
}

export default Navparam;
