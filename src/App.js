import Header from './frontend/Header/Header';
import Body from './frontend/Body/Body';
import NavMobile from './frontend/Header/NavMobile'
import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './frontend/Login';
import { Toaster } from 'react-hot-toast';

import {selectLogin} from './redux/LoginSlice'
import { useSelector } from 'react-redux'
import AddProduct from './frontend/Body/Inventory/AddProduct';


function App() {
  const [activePage, setActivePage] = useState("Inventory");
  // const [isView, setView] = useState(false);
  // const [isAdd, setAdd] = useState(false);
  // const [isRm, setRm] = useState(false);
  // const [isPass, setPass] = useState(true);
  // const [prog, SetProg] = useState('0%');
  const [isMobile, setMobile] = useState(window.innerWidth <= 768);
  const [viewAddPrd, setViewAddPrd] = useState(false);

  // const [isLogin, setLogin] = useState(false);
  
  const login = useSelector(selectLogin)



  function handleWindowSizeChange() {
    setMobile(window.innerWidth <= 768);
  }

  useEffect(() => {
    // try {
    //   console.log('in try ')
    //   setLogin(localStorage.getItem('isAlreadyLogin') === 'true' ? true:false)
    // } catch (error) {
    //   console.log(error);
    // }

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  

  return (
    <div className="App">
      <Toaster  />
      {/* <Login /> */}
      {!login && <Login />}

      {< AddProduct modalControl={{viewAddPrd, setViewAddPrd}}/>}

      {/* {login && <div className="prog-cont">
        <div className="progresBar"
          style={{ width: prog, animationName: prog === '100%' ? 'fadeProgessBar' : '' }}
        >
        </div>
      </div>} */}

      {login && <Header headVars={{ activePage, setActivePage }} />}

      {login && <Body headVars={{ activePage, setActivePage, setViewAddPrd }} />}
      {/* {login && isMobile && <NavMobile data={{ isView, setView, isAdd, setAdd, isRm, setRm, isPass, setPass }} />}  */}
    </div>
  );
}

export default App;
