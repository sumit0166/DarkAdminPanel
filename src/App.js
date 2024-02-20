import Header from './frontend/Header/Header';
import Body from './frontend/Body/Body';
import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './frontend/Login';
import { Toaster } from 'react-hot-toast';
import {selectLogin, loggedout} from './redux/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import AddProduct from './frontend/Body/Inventory/AddProduct';

import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// import config from './config.json'

const response = await fetch('/config.json');
const config = await response.json();


const styles = {
  container: {
    boxSizing: 'border-box',
    paddingTop: '20px',
    textAlign: 'center',
    background: '#DFE7F0',
    height: '100vh'
  },
  header: {
    fontSize: '3em',
    color: '#333',
  },
  text: {
    paddingTop: '10px',
    fontSize: '1.2em',
    fontWeight:'500',
    color: '#666',
  },
}

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Not Found</h1>
      <hr />
      <p style={styles.text}>The page you're looking for does not exist.</p>
    </div>
  );
};



const SessionExp = () => {
  const dispatch = useDispatch();
  dispatch(loggedout());
  return(
    <div className="SessionExp" style={{height: "100vh"}}>
      
      <img style={{height: "80%" }} src="https://assets-global.website-files.com/5ff3396ab1ab6ddde538541c/631097be376c40c68d443764_everything%20you%20need%20to%20know%20about%20Session-timeout%20in%20GA%201.png" alt="" />
      <h1>Your session has expired</h1>
      <p>Please <NavLink to="/Login" ><strong>log in</strong></NavLink> again to continue using the application.</p>
    </div>
  )
}

const AuthenticatedApp = ({argu}) => {
  const [activePage, setActivePage] = useState("Inventory");
  const [viewAddPrd, setViewAddPrd] = useState(false);
  const [animationParent] = useAutoAnimate();
  const {uiMode, SetUiMode} = argu;

  const headerComp =  <Header headVars={{ activePage, setActivePage, uiMode, SetUiMode }} />;
  const bodyComp = <Body headVars={{ activePage, setActivePage, setViewAddPrd }} />;
  const addProdComp =  viewAddPrd && <AddProduct modalControl={{viewAddPrd, setViewAddPrd}}/>;

  return(
    <div className="AuthenticatedApp" ref={animationParent}>
      {addProdComp}
      {headerComp}
      {bodyComp}
    </div>
  )
}


function App() {
  const [uiMode, SetUiMode] = useState(false);
  const login = useSelector(selectLogin);
  // const login = useSelector(selectLogin);
  const nav = useNavigate()



  function verifySession(id) {
    let decoded = Number(atob(atob(id).split('_')[1]));
    console.log("before Decode >>", decoded)
    let decodedTime = new Date(decoded);
    console.log("after Decode >>", decodedTime)
    let cur_time = new Date();
    console.log("curr_time: ",cur_time," Old time: ",decodedTime);
    if (cur_time >= decodedTime) {
      return true;
    } else{
      return false;
    }
  }



  try {
    const sessionID = localStorage.getItem("sessionId");
    if (sessionID) {
      var isSeesionExpired = verifySession(sessionID);
      console.log("isSeesionExpired",isSeesionExpired);
    } else {
      var goToLogin = true
    }
  } catch (error) { 
    console.log("SessionExpired is not found in storage or \n", error);
  }

  
  const loginComp = <Login />;


  return (
    <div className={uiMode ? "App" : "App-dark"}>

      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
	      <Route path="/" element={ login && !isSeesionExpired ? <Navigate to={config.defaultPage} /> : <Navigate to="/Login" /> }  />
        <Route path="/Login" element={loginComp} index={1} />
        <Route path='/SessionExpired' element={ <SessionExp />}  index={2} />
        <Route path='/*' element={login && !isSeesionExpired ? <AuthenticatedApp argu={{uiMode, SetUiMode}}/> : <Navigate to="/SessionExpired" /> } />
      </Routes>

      {/* {login && !isSeesionExpired && <AuthenticatedApp argu={{uiMode, SetUiMode}}/> } */}
    
    </div>
  );
}
 
export default App;
