import './Settings.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// const response = await fetch('/config.json');
// const config = await response.json();



function Settings() {

  return (
    <div className="Settings" style={{height: "100vh",  background: '#DFE7F0'}}>

      <center><h1><strong>Settings</strong></h1></center>

    </div>
  );
}

export default Settings;