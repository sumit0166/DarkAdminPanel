import { useEffect, useState } from 'react';
import './Inventory.css';

import { More, Element3, RowVertical, SearchNormal1, Scan, Refresh } from 'iconsax-react';
import { ArrangeVerticalSquare, ClipboardText, Shapes, DollarCircle } from 'iconsax-react';
import FilterBtns from './FilterBtns';
import SelectBox from './SelectBox';
import ShowProduct from './ShowProduct';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { selectLogin, loggedout } from '../../../redux/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';


// import React, { useState } from 'react';
const response = await fetch('/config.json');
const config = await response.json();

function verifySession(id) {
    let decoded = Number(atob(atob(id).split('_')[1]));
    console.log("before Decode >>", decoded)
    let decodedTime = new Date(decoded);
    console.log("after Decode >>", decodedTime)
    let cur_time = new Date();
    console.log("curr_time: ", cur_time, " Old time: ", decodedTime);
    if (cur_time >= decodedTime) {
        return true;
    } else {
        return false;
    }
}

function Inventory({ setViewAddPrd }) {
    const [selectView, setSelectView] = useState("List");
    const [sortOrder, setSortOrder] = useState("");
    const [searchInp, setSearchInp] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const [animationParent] = useAutoAnimate();

    const [varientCount, setVarientCount] = useState();
    const [categoryCount, setCategoryCount] = useState();

    const [prdVar, setPrdVar] = useState(null);
    const [prdTyp, setPrdTyp] = useState(null);

    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    const login = useSelector(selectLogin);
    const dispatch = useDispatch();

    // console.log("login -->" , login);

    const fetchProducts = async () => {
        axios.get(config.host + '/products/getProducts?operation=allProducts', {
            headers: {
                'Authorization': `Bearer ${login.token}`
            }
        })
            .then((response) => {
                switch (response.data.opStatus) {
                    case 200:
                        // console.log(response.data.data[0].allData)
                        setProducts(response.data.data[0].allData);
                        setVarientCount(response.data.data[0].uniqueVariants);
                        setCategoryCount(response.data.data[0].uniqueType);
                        // setProducts(response.data.data);
                        break;
                    case 404:
                        toast.error(response.data.message);
                        break;
                    case 440:
                        toast.error(response.data.message);
                        dispatch(loggedout())
                        break;

                    // case 401:
                    //     toast.error(response.data.message);
                    //     break;

                    // case 403:
                    //     toast.error(response.data.message);
                    //     break;
                    default:
                        if (response.data.error) {
                            toast.error(response.data.error);
                        }
                        toast.error(response.data.message);
                        break;
                }
            })
            .catch((error) => {
                if (error instanceof Response) {
                    // HTTP error
                    console.error("HTTP error! Status:", error.status);
                    toast.error("HTTP error! Status:", error.status);
                } else {
                    // Network error or error during parsing
                    console.error("Request failed:", error);
                    toast.error("Request failed:", error.message);
                }
            });
    }


    useEffect(() => {
        var isSessionExpired = verifySession(localStorage.getItem("sessionId"));
        console.log("isSeesionExpired", isSessionExpired);
        if (isSessionExpired) {
            //   navigate('/SessionExpired');
        }
        try {
            fetchProducts();
        } catch (error) {
            console.log(error)
        }
    }, []);

    // useEffect(() =>{
    //     console.log(se)
    //     // const query = searchInp.toLowerCase();
    //     const filteredData = products.filter(item => {
    //         console.log(item)
    //         // item.name.toLowerCase().includes(query)
    //     })
    //     // setProducts(filteredData);
    // },[searchInp])




    return (
        <div className="Inventory">

            <div className="inv-head-lft">
                <div className="inv-heading"><h2>Product</h2></div>
                <div className="inv-count"><h5>{products.length}</h5><span>total products</span></div>
            </div>
            <div className="inv-head-right">
                <div className="inv-search-box">
                    <div className="inv-search-icon">
                        <SearchNormal1 size="20" variant="Bulk" />
                    </div>
                    <input type="text" className="inv-search-inp"
                        value={searchInp}
                        onChange={(e) => setSearchInp(e.target.value)}
                        placeholder='search...'
                    />
                    <div className="scan-cont">
                        <Scan size="20" color='var(--primary)' variant="Bold" />
                        <span>Scan</span>
                    </div>
                </div>
                <div className="inv-view">
                    <div className={selectView == "List" ? "inv-view-btn i-v-b-active" : "inv-view-btn"}
                        onClick={() => setSelectView("List")}
                    >
                        <RowVertical size="18" variant="Bold" />
                    </div>
                    <div className={selectView == "Grid" ? "inv-view-btn i-v-b-active" : "inv-view-btn"}
                        onClick={() => setSelectView("Grid")}
                    >
                        <Element3 size="18" variant="Bold" />
                    </div>
                </div>
                <div className="vert-line">

                </div>
                <div className="more-box">
                    <div className="more-btn">
                        <More size="24" />
                    </div>
                    <div className="add-product-btn" onClick={() => {
                        navigate('/Inventory/addProduct', { replace: true });
                        setViewAddPrd(true);
                    }} ><h5 >Add Product</h5 ></div>
                </div>
            </div>


            {products.length > 0 && <div className="filter-cont">
                <div className="main-filt-box-wrap">

                    <div className="resetfilt-box"
                        onClick={() => {
                            console.log('reset filt called')
                            setSortOrder("None")
                            setSearchInp("")
                            setPrdVar(null)
                            setPrdTyp(null)
                            setMinPrice()
                            setMaxPrice()

                        }}
                    >
                        <Refresh size="18px" variant="Outline" />
                        <span>Reset Filters</span>
                    </div>
                    <div className="filtbox">
                        <div className="filt-stat-cont">
                            <label >PRODUCT VARIENTS</label>
                            <div className="filt-stat-opts">
                                {/* {varientCount &&
                                Object.entries(varientCount).map(([variant, count]) => (
                                    <FilterBtns type='varient' key={variant} name={variant} btnProp={prdVar} setBtnProp={setPrdVar} count={count} isActive={true} />
                                ))
                            } */}

                                {
                                    varientCount && varientCount?.map(key => {
                                        // console.log(key)
                                        return (<FilterBtns type='varient' key={key.variant} name={key.variant} btnProp={prdVar} setBtnProp={setPrdVar} count={key.count} />)
                                    })
                                }


                                {/* <FilterBtns name="All" count="1345" isActive={true} />
                                <FilterBtns name="Active" count="45" isActive={false} />
                                <FilterBtns name="Inactive" count="7" isActive={false} /> */}
                            </div>
                        </div>
                        <div className="filt-stat-cont">
                            <label >PRODUCT TYPE</label>
                            <div className="filt-stat-opts">
                                {
                                    categoryCount && categoryCount?.map(key => {
                                        // console.log(key)
                                        return (<FilterBtns type='type' key={key.type} name={key.type} btnProp={prdTyp} setBtnProp={setPrdTyp} count={key.count} />)
                                    })
                                }
                                {/* <FilterBtns type='category' name="Retail" isActive={true} />
                                <FilterBtns type='category' name="Wholesale" isActive={false} /> */}
                            </div>
                        </div>
                        <div className="filt-stat-cont">
                            <label >SORT BY</label>
                            <div className="sort-box">
                                <SelectBox
                                    name="Alphabetical"
                                    options={["A-Z", "Z-A", "None"]}
                                    ICON={ArrangeVerticalSquare}
                                    setActiveList={setSortOrder}
                                    activeList={sortOrder}
                                />
                            </div>
                        </div>
                        <div className="filt-stat-cont">
                            <label >STOCK ALERT</label>
                            <div className="sort-box">
                                <SelectBox
                                    name="Avilability"
                                    options={["All Stock", "Not Avilable", "Avilable"]}
                                    ICON={ClipboardText}
                                />
                            </div>
                        </div>
                        <div className="filt-stat-cont">
                            <label >CATEGORY</label>
                            <div className="sort-box">
                                <SelectBox
                                    options={["All Product", "Tea", "Coffe", "Dessert"]}
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
                                        <input type="number" className="money-inp"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            placeholder='Minimum Price'
                                        />
                                    </div>
                                </div>
                                <div className="price-vert-line"></div>
                                <div className="price-box">
                                    <div className="pbl">
                                        <DollarCircle size="20px" variant="Bold" />
                                    </div>
                                    <div className="pbr">
                                        <input type="text" className="money-inp"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            placeholder='Maximum Price'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: "40px" }}></div>
                    </div>
                </div>
            </div>
            }

            <div className="product-cont" ref={animationParent} >

                {products && products.
                    filter(item => {
                        console.log(prdTyp, item.category)
                        // const nameFilter = item.name.toLowerCase().includes(searchInp?.toLowerCase());
                        const nameFilter = Object.values(item).some(value => {
                            if (typeof value === 'string') {
                                return value.toLowerCase().includes(searchInp?.toLowerCase());
                            }
                            return false;
                        });
                        const variantFilter = prdVar ? item.variant.toLowerCase() === prdVar.toLowerCase() : true;
                        const categoryFilter = prdTyp ? item.type.toLowerCase() === prdTyp.toLowerCase() : true;
                        const priceFilter = (minPrice || maxPrice) ? (minPrice <= item.retail && item.retail <= maxPrice) : true;
                        return nameFilter && variantFilter && categoryFilter && priceFilter;
                        // return(item.name.toLocaleLowerCase().includes(searchInp?.toLocaleLowerCase())) 
                    }).
                    // filter( item => {
                    //     console.log(prdVar)
                    //     if (prdVar) {
                    //         return(item.variant.toLocaleLowerCase() === prdVar?.toLocaleLowerCase())
                    //     }
                    // }).
                    sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();

                        if (sortOrder === 'A-Z') {
                            return nameA.localeCompare(nameB);
                        } else if (sortOrder === 'Z-A') {
                            return nameB.localeCompare(nameA);
                        }
                    })
                    ?.map(prd => {
                        return (<ShowProduct key={prd._id} data={prd} />)
                    })
                }
                {/* <ShowProduct variant="6" type="Men" stock="10" img={imgs[0]} /> */}

                {/* <ShowProduct variant="3" type="Women" stock="0" img={imgs[1]} />
                    <ShowProduct type="Casual" stock="210" img={imgs[2]} />
                    <ShowProduct variant="4" type="Women" stock="23" img={imgs[1]} />
                    <ShowProduct variant="2" type="Men" stock="150" img={imgs[2]} /> */}
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
