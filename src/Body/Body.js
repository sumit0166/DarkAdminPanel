import './Body.css';
import View from './View/View';
import Inventory from './Inventory/Inventory';

// import NavMobile from '../Header/NavMobile';

function Body({headVars}) {

  return (
    <div className="Body">
      {headVars.activePage == "Inventory" ? <Inventory setViewAddPrd={headVars.setViewAddPrd}/>  : null}

      {/* {data.isMobile && <NavMobile  data={{data}}  />} */}
    </div>
  );
}

export default Body;