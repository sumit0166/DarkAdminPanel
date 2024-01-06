// import './ShowProduct.css';
import { MoreSquare } from 'iconsax-react';
import { useState } from 'react';
// import React, { useState } from 'react';

function ShowProduct({ img, variant, type, stock, headVars }) {
  const [hover, setHover] = useState(false);

  return (

    <div className="ShowProduct" >
        <div className="photo-cont" style={{backgroundImage:`url(${img})`}}></div>
        <div className="details-cont">
          <h4>ADIDAS Neo Light Green 36</h4>
          <div className="det-opts">
            {variant && <span className="varient">{variant} varients</span>}
            {
               type == "Women" ? <span className="sho-type pink">&#8226; {type} Shoes</span>:<span className="sho-type blue">&#8226; {type} Shoes</span>
            }

            { stock != "0" && stock && <div className="stock-prods">
              <span className="splbl">&#8226; Stocked Products:</span>
              <span> {stock} in stock</span>
            </div>}
          </div>
        </div>
        <div className="prod-vert-line"></div>
        <div className="retail-cont">
          <span className="price-head">RETAIL PRICE</span>
          <h4>&#8377;180.00-&#8377;220.00</h4>
        </div>
        <div className="wholesale-cont">
          <span className="price-head">WHOLESALE PRICE</span>
          <h4>&#8377;100.00-&#8377;170.00</h4>
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
