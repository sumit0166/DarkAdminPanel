import { useState } from 'react';
import './Inventory.css';

import { More, Element3, RowVertical, SearchNormal1, Scan } from 'iconsax-react';
import AddProduct from './AddProduct';
// import React, { useState } from 'react';

function Inventory({setViewAddPrd}) {
    const [selectView, setSelectView] = useState("List");


//   function makeActive(){
//     headVars.setActivePage(Text);
//   }

  return (
        <div className="Inventory">
  
                
                <div className="inv-head-lft">
                    <div className="inv-heading"><h2>Product</h2></div>
                    <div className="inv-count"><h5>1320</h5><span>total products</span></div>
                </div>
                <div className="inv-head-right">
                    <div className="inv-search-box">
                        <div className="inv-search-icon">
                            <SearchNormal1 size="20" variant="Bulk"/>
                        </div>
                        <input type="text" className="inv-search-inp" placeholder='search...'/>
                        <div className="scan-cont">
                            <Scan size="20" color='var(--primary)' variant="Bold"/>
                            <span>Scan</span>
                        </div>
                    </div>
                    <div className="inv-view">
                        <div className={selectView == "List" ? "inv-view-btn i-v-b-active" : "inv-view-btn"}
                            onClick={() => setSelectView("List")}
                        >
                            <RowVertical size="18" variant="Bold"/>
                        </div>
                        <div className={selectView == "Grid" ? "inv-view-btn i-v-b-active" : "inv-view-btn"}
                            onClick={() => setSelectView("Grid")}
                        >       
                            <Element3 size="18" variant="Bold"/>
                        </div>
                    </div>
                    <div className="vert-line">

                    </div>
                   <div className="more-box">
                        <div className="more-btn">
                            <More size="24" />
                        </div>
                        <div className="add-product-btn" onClick={() => setViewAddPrd(true)} ><h5 >Add Product</h5 ></div>
                   </div>
                </div>

            
                <div className="filter-cont">
                    <div className="filtbox">
                        <div className="filt-stat-cont">
                            <label >Product Status</label>
                            <div className="filt-stat-opts">
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product-cont">

                </div>
            {/* <div className="inv-body">
                <div className="inv-body-left">
                </div>
                <div className="inv-body-right">

                </div>
            </div> */}



        </div>

  );
}

export default Inventory;
