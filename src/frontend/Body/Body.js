import './Body.css';
// import View from './View/View';
import Inventory from './Inventory/Inventory';
import Settings from './Settings/Settings';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// const response = await fetch('/config.json');
// const config = await response.json();

const NotFound = () => {
  
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Not Found</h1>
      <p style={styles.text}>The page you're looking for does not exist.</p>
    </div>
  );
};


const TestPage = ({name}) => {
  return(
    <div className={name} style={{height: "100vh",  background: '#DFE7F0'}}>
      <center><h1><strong>{name}</strong></h1></center>
    </div>
  )
}


const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    background: '#DFE7F0',
  },
  header: {
    fontSize: '3em',
    color: '#333',
  },
  text: {
    fontSize: '1.2em',
    color: '#666',
  },
};


function Body({headVars}) {
  const [animationParent] = useAutoAnimate();
  const invePage = <Inventory setViewAddPrd={headVars.setViewAddPrd}/>;
  const SettingsPage = <Settings />;

  var pages = ["Dashboard", "Sales", "Order", "Report", "Document"]
  return (
    <div className="Body" ref={animationParent}>
      {/* {headVars.activePage == "Inventory" ? <Inventory setViewAddPrd={headVars.setViewAddPrd}/>  : null} */}

      <Routes>
        <Route path="/Inventory" element={invePage} />
        <Route path='/Settings' element={SettingsPage} />


        {/* <Route index={2} path="/Dashboard" element={<TestPage name="Dashboard" />}  /> */}
        {
          pages.map( key => {
            const route = <Route path={"/"+key} element={<TestPage name={key} />} />
            return(route)
          })
        }
        <Route path="/404" element={<NotFound />} index={1} />
        {/* <Route path="/*" element={ <Navigate to="/404" element={<NotFound />} /> } /> */}
      </Routes>

    </div>
  );
}

export default Body;