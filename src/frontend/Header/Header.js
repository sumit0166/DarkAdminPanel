import './Header.css';
import Navparam from './Navparam';
import { OceanProtocol, Bag, BinanceUsd, Setting2, Notification, ArrowDown2, ArrowUp2, Note1, PresentionChart, Folder2, ShoppingCart } from 'iconsax-react';
import {  useDispatch, useSelector } from 'react-redux'
import { loggedout, selectLogin } from '../../redux/LoginSlice'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const response = await fetch('/config.json');
const config = await response.json();


function Header({headVars}) {
  const dispatch = useDispatch()
  const [viewModal, setViewModal] = useState(false);
  const navigate= useNavigate();
  const loginData = useSelector(selectLogin);
  const { user, roles, userConfig } = loginData;
  // const configData = config.roles;
  // const userConfig = configData[roles];

  
  console.log(user, userConfig);
  
  function Logout(){
    localStorage.removeItem("sessionId");
    dispatch(loggedout());
    navigate("/Login");
  }

  function toogleModes() {
    headVars.SetUiMode(!headVars.uiMode);
    localStorage.setItem("activeUiMode",headVars.uiMode);
  }

  
  async function getNotis() {
    try {
      const response = await axios.get(config.host +'/getusers');
      console.log(response.data);
    } catch (error) {
      console.error(`Got ERROR while fetching info ${error}`)
    }
  }

  const navigationItems = [
    {  path:"/Dashboard", Text:"Dashboard", Icon: <BinanceUsd variant="Bold" size="16" />},
    {  path:"/Inventory", Text:"Inventory", Icon: <Bag variant="Bold" size="16" />},
    {  path:"/Sales", Text:"Sales", Icon: <ShoppingCart variant="Bold" size="16" />},
    {  path:"/Order", Text:"Order", Icon: <Note1 variant="Bold" size="16" />},
    {  path:"/Report", Text:"Report",  Icon: <PresentionChart variant="Bold" size="16" />},
    {  path:"/Document", Text:"Document", Icon: <Folder2 variant="Bold" size="16" />}
  ]

  const filteredItems = navigationItems.filter(item => !userConfig.accessDeniedPages?.includes(item.path));
  

  return (
    <div className="Header">
      {viewModal && <div className="acc-modal"> </div>}

      <div className="h-left">
        <OceanProtocol size="38" color="#39db7d" variant="Bold"/>
        <span>Test</span>
      </div>
      <div className="h-middle">

      {filteredItems.map((item, index) => (
          <Navparam key={index} Text={item.Text} headVars={headVars} Icon={item.Icon} />
      ))}

        {/* <Navparam  Text="Dashboard" headVars={headVars} Icon={<BinanceUsd variant="Bold" size="16" />} />
        <Navparam  Text="Inventory" headVars={headVars} Icon={<Bag variant="Bold" size="16" />} />
        <Navparam  Text="Sales" headVars={headVars} Icon={<ShoppingCart variant="Bold" size="16" />} />
        <Navparam  Text="Order" headVars={headVars} Icon={<Note1 variant="Bold" size="16" />} />
        <Navparam  Text="Report" headVars={headVars} Icon={<PresentionChart variant="Bold" size="16" />} />
        <Navparam  Text="Document" headVars={headVars} Icon={<Folder2 variant="Bold" size="16" />} /> */}

      </div>
      <div className="h-right">
        <div className="rght-btns-box" >
          { roles.includes("super") && <div className="rght-btn" id='setting-btn' onClick={() => {navigate('/Settings')}}>
            <Setting2 size="20" variant="Bold"/>
          </div>}
          <div className="rght-btn" id='noti-btn' onClick={getNotis}>
            <Notification size="20" variant="Bold"/>
            <div className="red_dot"></div>
          </div>
        </div>
        <div className="acct-info-box" >
        <div className="acc-info-btn" onClick={Logout}><label>{ user[0].toUpperCase() }</label></div>
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



// const filteredItems = navigationItems.filter(item => {
//   const allowedRoles = Object.keys(userConfig);
//   const hasAccess = allowedRoles.some(role => !userConfig[role]?.accessDeniedPages?.includes(item.path));
//   return hasAccess;
// });
