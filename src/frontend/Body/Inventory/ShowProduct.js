// import './ShowProduct.css';
import { MoreSquare } from 'iconsax-react';
import { useState } from 'react';
// import React, { useState } from 'react';

function ShowProduct({ data }) {
  const [hover, setHover] = useState(false);

  return (

    <div className="ShowProduct" >
        {/* <div className="zoomIMageCont" style={{backgroundImage:`url(${data.image})`}} ></div> */}
        <div className="photo-cont" style={{backgroundImage:`url(${data.image})`}}></div>
        <div className="details-cont">
          <h4>{data.name}</h4>
          <div className="det-opts">
            {data.type && <span className="varient">{data.type}</span>}
            {
               data.variant.includes("Women") ? <span className="sho-type pink">&#8226; {data.variant}</span>:<span className="sho-type blue">&#8226; { data.variant}</span>
            }

            { data.stock != "0" && data.stock && <div className="stock-prods">
              <span className="splbl">&#8226; Stocked Products:</span>
              <span> {data.stock} in stock</span>
            </div>}
          </div>
        </div>
        <div className="prod-vert-line"></div>
        <div className="retail-cont">
          <span className="price-head">RETAIL PRICE</span>
          <h4>&#8377;{data.retail}</h4>
        </div>
        <div className="wholesale-cont">
          <span className="price-head">WHOLESALE PRICE</span>
          <h4>&#8377;{data.wholesale}</h4>
        </div>
        <div className="more-opt-cont" 
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <MoreSquare size="32" variant={hover ? 'Bold':'Linear'}/>
        </div>
    </div>



  );
}

export default ShowProduct;
