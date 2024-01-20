import './Body.css';
import View from './View/View';
import Inventory from './Inventory/Inventory';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Not Found</h1>
      <p style={styles.text}>The page you're looking for does not exist.</p>
    </div>
  );
};

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

  return (
    <div className="Body" ref={animationParent}>
      {/* {headVars.activePage == "Inventory" ? <Inventory setViewAddPrd={headVars.setViewAddPrd}/>  : null} */}

      <Routes>
        <Route exact path="Inventory" element={invePage} />
        {/* <Route path="*" element={ <Navigate to="/404" /> } /> */}
        <Route path="/404" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default Body;