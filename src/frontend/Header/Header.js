import './Header.css';
import Navparam from './Navparam';
import { OceanProtocol, Bag, BinanceUsd, Setting2, Notification, ArrowDown2, ArrowUp2, Note1, PresentionChart, Folder2, ShoppingCart } from 'iconsax-react';
import {  useDispatch } from 'react-redux'
import { loggedout } from '../../redux/LoginSlice'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({headVars}) {
  const dispatch = useDispatch()
  const [viewModal, setViewModal] = useState(false);
  const navigate= useNavigate();


function Logout(){
    dispatch(loggedout())
    navigate("/Login")
}


  return (
    <div className="Header">
      {viewModal && <div className="acc-modal"> </div>}

      <div className="h-left">
        <OceanProtocol size="38" color="#39db7d" variant="Bold"/>
        <span>Test</span>
      </div>
      <div className="h-middle">

        <Navparam  Text="Dashboard" headVars={headVars} Icon={<BinanceUsd variant="Bold" size="16" />} />
        <Navparam  Text="Inventory" headVars={headVars} Icon={<Bag variant="Bold" size="16" />} />
        <Navparam  Text="Sales" headVars={headVars} Icon={<ShoppingCart variant="Bold" size="16" />} />
        <Navparam  Text="Order" headVars={headVars} Icon={<Note1 variant="Bold" size="16" />} />
        <Navparam  Text="Report" headVars={headVars} Icon={<PresentionChart variant="Bold" size="16" />} />
        <Navparam  Text="Document" headVars={headVars} Icon={<Folder2 variant="Bold" size="16" />} />

      </div>
      <div className="h-right">
        <div className="rght-btns-box">
          <div className="rght-btn" id='setting-btn'>
            <Setting2 size="20" color="#bec3c3" variant="Bold"/>
          </div>
          <div className="rght-btn" id='noti-btn'>
            <Notification size="20" color="#bec3c3" variant="Bold"/>
            <div className="red_dot"></div>
          </div>
        </div>
        <div className="acct-info-box" >
        <div className="acc-info-btn" onClick={Logout}><label>S</label></div>
          {/* <div className="acc-info-btn" onClick={() => setViewModal(!viewModal)}><label>S</label></div> */}
          <div className="acc-info-arows">
            <ArrowUp2 size="10" variant="Bold"/>
            <ArrowDown2 size="10" variant="Bold"/>
          </div>
        </div>
      </div>
    </div>
  );

}


export default Header;
