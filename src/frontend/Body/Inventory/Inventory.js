import { useState } from 'react';
import './Inventory.css';

import { More, Element3, RowVertical, SearchNormal1, Scan, Refresh } from 'iconsax-react';
import { ArrangeVerticalSquare, ClipboardText,Shapes, DollarCircle } from 'iconsax-react';
import FilterBtns from './FilterBtns';
import SelectBox from './SelectBox';
import ShowProduct from './ShowProduct';
// import React, { useState } from 'react';

function Inventory({setViewAddPrd}) {
    const [selectView, setSelectView] = useState("List");





      
    var imgs = [
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0cf53065f4e443f0a0c245cdbccbb43d_9366/GRIP-ED_RUN_SHOES_Black_IQ8998_01_standard.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/63c259ebedee4ae3a9f2af5e012d65c2_9366/BREEZEWALK_SHOES_Pink_GC0553_01_standard.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/64cbf9d717ad4a368b54af46002a2870_9366/VS_Pace_2.0_Shoes_Grey_HP6006_01_standard.jpg",

    ]

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
                    <div className="main-filt-box-wrap">

                    <div className="resetfilt-box">
                        <Refresh size="18px" variant="Outline"/>
                        <span>Reset Filters</span>
                    </div>
                    <div className="filtbox">
                        <div className="filt-stat-cont">
                            <label >PRODUCT STATUS</label>
                            <div className="filt-stat-opts">
                                <FilterBtns name="All" count="1345" isActive={true}/>
                                <FilterBtns name="Active" count="45" isActive={false}/>
                                <FilterBtns name="Inactive" count="7" isActive={false}/>
                            </div>
                        </div>
                        <div className="filt-stat-cont">
                            <label >PRODUCT TYPE</label>
                            <div className="filt-stat-opts">
                                <FilterBtns name="Retail" isActive={true}/>
                                <FilterBtns name="Wholesale" isActive={false}/>
                            </div>
                        </div>
                        <div className="filt-stat-cont">
                            <label >SORT BY</label>
                           <div className="sort-box">
                                <SelectBox 
                                    name="Alphabetical" 
                                    options={["A-Z","Z-A","None"]}
                                    ICON={ArrangeVerticalSquare}
                                />   
                           </div>
                        </div>
                        <div className="filt-stat-cont">
                            <label >STOCK ALERT</label>
                           <div className="sort-box">
                                <SelectBox 
                                    options={["All Stock","Not Avilable","Avilable"]}
                                    ICON={ClipboardText } 
                                    />   
                           </div>
                        </div>
                        <div className="filt-stat-cont">
                            <label >CATEGORY</label>
                           <div className="sort-box">
                                <SelectBox 
                                    options={["All Product","Tea","Coffe","Dessert"]}
                                    ICON={Shapes} 
                                    />   
                           </div>
                        </div>


                        <div className="filt-stat-cont">
                            <label >PRICE</label>
                           <div className="price-box-cont">
                                <div className="price-box">
                                    <div className="pbl">
                                    <DollarCircle size="20px" variant="Bold" />
                                    </div>
                                    <div className="pbr">
                                        <input type="number" className="money-inp" placeholder='Minimum Price'/>
                                    </div>
                                </div>
                                <div className="price-vert-line"></div>
                                <div className="price-box">
                                    <div className="pbl">
                                    <DollarCircle size="20px" variant="Bold" />
                                    </div>
                                    <div className="pbr">
                                        <input type="text" className="money-inp" placeholder='Maximum Price'/>
                                    </div>
                                </div>
                           </div>
                        </div>
                        <div style={{height:"40px"}}></div>
                        </div>
                    </div>
                </div>

                <div className="product-cont" >
                    <ShowProduct variant="6" type="Men" stock="10" img={imgs[0]} />
                    <ShowProduct variant="3" type="Women" stock="0" img={imgs[1]} />
                    <ShowProduct type="Casual" stock="210" img={imgs[2]} />
                    <ShowProduct variant="4" type="Women" stock="23" img={imgs[1]} />
                    <ShowProduct variant="2" type="Men" stock="150" img={imgs[2]} />
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