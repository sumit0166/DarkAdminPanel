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






function App() {
  const [activePage, setActivePage] = useState("Inventory");
  const [isMobile, setMobile] = useState(window.innerWidth <= 768);
  const [viewAddPrd, setViewAddPrd] = useState(false);
  const login = useSelector(selectLogin)


  const loginComp = !login ? <Login /> : <Navigate to="/Inventory"/>;
  const headerComp = login && <Header headVars={{ activePage, setActivePage }} />;
  const bodyComp = login && <Body headVars={{ activePage, setActivePage, setViewAddPrd }} />;
  const addProdComp = < AddProduct modalControl={{viewAddPrd, setViewAddPrd}}/>;

  return (
    <div className="App">
      <Toaster   position="top-right" reverseOrder={false} />

      <Routes>
        <Route exact path="/" element={ <Navigate to="/Login" element={loginComp} />} />
        <Route exact path="/Login" element={loginComp}/>
        
      </Routes>

      {/* {loginComp} */}
      {addProdComp}
      {headerComp}
      {bodyComp}
    
    </div>
  );
}

export default App;
