import Header from './frontend/Header/Header';
import Body from './frontend/Body/Body';
import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './frontend/Login';
import { Toaster } from 'react-hot-toast';
import {selectLogin} from './redux/LoginSlice'
import { useSelector } from 'react-redux'
import AddProduct from './frontend/Body/Inventory/AddProduct';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';






function App() {
  const [animationParent] = useAutoAnimate();
  const [activePage, setActivePage] = useState("Inventory");
  const [isMobile, setMobile] = useState(window.innerWidth <= 768);
  const [viewAddPrd, setViewAddPrd] = useState(false);
  const login = useSelector(selectLogin)
  const [uiMode, SetUiMode] = useState(localStorage.getItem("activeUiMode"));


  const loginComp = !login ? <Login /> : <Navigate to="/Inventory"/>;
  const headerComp = login && <Header headVars={{ activePage, setActivePage, uiMode, SetUiMode }} />;
  const bodyComp = login && <Body headVars={{ activePage, setActivePage, setViewAddPrd }} />;
  const addProdComp = viewAddPrd && <AddProduct modalControl={{viewAddPrd, setViewAddPrd}}/>;



  return (
    <div className={uiMode ? "App" : "App-dark"}>
      <Toaster   position="top-right" reverseOrder={false} />

      <Routes>
        <Route exact path="/" element={ <Navigate to="/Login" element={loginComp} />} />
        <Route exact path="/Login" element={loginComp}/>
      </Routes>

      <div ref={animationParent}>
        {addProdComp}
      </div>
      {headerComp}
      {bodyComp}
    
    </div>
  );
}

export default App;
