import { useState } from "react";
import './TableFilter.css'
import {DocumentFilter, CloseCircle, ArrowUp2} from 'iconsax-react'
import { toast } from 'react-hot-toast';



function TableFilter({setOrderBy, setDesc, setFilter, order, isDesc}) {
    const [getOne,setOne] = useState(order);
    const [getTwo,setTwo] = useState(isDesc);

    const sucess = (e) => toast(e,{
        delay:0,
        duration: 4000,
        style:{
          backgroundColor: '#22ca1c',
          color: 'white',
        },
        icon: '✔️'
    
      });

    const handleClick = () => {
        setOrderBy(getOne);
        setDesc(getTwo);
        sucess("Filter Apllied Sucessfully");
        setFilter(false);
    }

    return (
        <div className="filt-cont">
            <ArrowUp2 size="32"  style={{top:'-18px',position:'absolute',right:'36px'}} color="#FFF" variant="Bold"/>
            <div className="filt-top">
                <div className="filt-top-left">
                    <DocumentFilter size="20"  variant="Bulk"/>
                    <span>Filter</span>
                </div>
                <div className="filt-top-right" onClick={() => setFilter(false)}>
                    <CloseCircle size="20" variant="Bulk"/>
                </div>
            </div>
            <div className="filt-middle">
                <div className="filt-middle-left">
                    <span>Filter By</span>
                    <select onChange={(e) => setOne(e.target.value)} value={getOne}>
                        <option value="">.. Select ..</option>
                        <option value="name">Name</option>
                        <option value="isSpecial">Speciality</option>
                        <option value="isAvilable">Status</option>
                        <option value="price">Price</option>
                        <option value="description">Description</option>
                    </select>
                </div>
                <div className="filt-middle-right">
                    <span>Order</span>
                    <select onChange={(e) => setTwo(e.target.value === 'desc' ? true:false)} value={getTwo ? 'desc':'asc'}>
                        <option value="">.. Select ..</option>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>
            </div>
            <div className="filt-bottom">
                    <div className="filt-btn" onClick={handleClick}>
                        <span>Apply Filter</span>
                    </div>
                </div>
        </div>
    )
}

export default TableFilter