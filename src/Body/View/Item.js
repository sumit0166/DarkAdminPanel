import './Item.css';


function Item({name,category,isSpecial,isAvilable,p,desc,uid,im,editOpen,setId,removeProudct}) {

p = Number(p).toFixed(2);
let price = p.split('.');

const handleClick = (e) => {
    setId(e.currentTarget.id);
    editOpen(true);
}

const handleRemove = (e) => {
    setId(e.currentTarget.id);
    removeProudct(true)
}
  return (
    <div className="item-body">
 
       
      
        <div className="products">
            <div className="img" style={{backgroundImage:`url(${im})`}}>
    
            </div>
            <div className="details">
                <div className="name">{name}</div>
                <div className="category">{category}</div>
            </div>
        </div>

        <div className="speciality">
            <div className="checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none" viewBox="0 0 18 16">
                <path stroke="#FF4848" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.375 15.25h3.75c3.125 0 4.375-1.25 4.375-4.375v-3.75C13.5 4 12.25 2.75 9.125 2.75h-3.75C2.25 2.75 1 4 1 7.125v3.75C1 14 2.25 15.25 5.375 15.25Z"/>
                <path stroke={isSpecial ? "#07C807":"" } strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3.25 7.656 3.112 3.113L16.132 1"/>
            </svg>
            </div>
            <span>Today's Special</span>
        </div>

        <div className="status" >
            <div className="round" style={{color:isAvilable ? '#029802':'#FF0000',backgroundColor: isAvilable ? "#99E599":"#FF9999"}}>
                <span>{isAvilable ? 'Avilable':'Unavilable'}</span>
                </div>
        </div>

        <div className="price">
            <div>
                <span>$ {price[0]}.</span><span style={{fontSize:'14px'}}>{price[1]}</span>
            </div>
        </div>

        <div className="description">
          <span>{desc}</span>
        </div>
        <div className="actions">

            <div className="edit" id={uid} onClick={(e) => handleClick(e)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <path fill="#000" d="M13.75 27.753h-6c-5.43 0-7.75-2.32-7.75-7.75v-6c0-5.43 2.32-7.75 7.75-7.75h2c.41 0 .75.34.75.75s-.34.75-.75.75h-2c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 5.43-2.32 7.75-7.75 7.75Z"/>
                    <path id="pen-outer" fill="#000" d="M13.199 16.692c-.61 0-1.17-.22-1.58-.62-.49-.49-.7-1.2-.59-1.95l.43-3.01c.08-.58.46-1.33.87-1.74l7.88-7.88c1.99-1.99 4.01-1.99 6 0 1.09 1.09 1.58 2.2 1.48 3.31-.09.9-.57 1.78-1.48 2.68l-7.88 7.88c-.41.41-1.16.79-1.74.87l-3.01.43c-.13.03-.26.03-.38.03Zm8.07-14.14-7.88 7.88c-.19.19-.41.63-.45.89l-.43 3.01c-.04.29.02.53.17.68.15.15.39.21.68.17l3.01-.43c.26-.04.71-.26.89-.45l7.88-7.88c.65-.65.99-1.23 1.04-1.77.06-.65-.28-1.34-1.04-2.11-1.6-1.6-2.7-1.15-3.87.01Z"/>
                    <path id="pen-cap" fill="#000" d="M24.549 8.834c-.07 0-.14-.01-.2-.03a7.937 7.937 0 0 1-5.46-5.46.76.76 0 0 1 .52-.93c.4-.11.81.12.92.52.6 2.13 2.29 3.82 4.42 4.42.4.11.63.53.52.93-.09.34-.39.55-.72.55Z"/>
                </svg>
            </div>

            <div id={uid} className="remove" onClick={(e) => handleRemove(e)}>

                <svg id="dust-top" xmlns="http://www.w3.org/2000/svg" width="18" height="5" fill="none" viewBox="0 0 18 5">
                    <path fill="#000" d="M11.963 3.45v-2.3c0-.645-.43-1.15-.98-1.15H6.417c-.549 0-.979.505-.979 1.15v2.3H0v1.533h17.4V3.45h-5.437ZM6.888 1.533h3.624V3.45H6.887V1.533Z"/>
                </svg>

                <svg id='dust-box' xmlns="http://www.w3.org/2000/svg" width="16" height="17" fill="none" viewBox="0 0 16 17">
                    <path fill="#000" d="M0 15.85A1.141 1.141 0 0 0 1.13 17h13.073a1.142 1.142 0 0 0 1.13-1.15V.517H0V15.85Zm1.533-13.8H13.8v13.417H1.533V2.05Z"/>
                    <path fill="#000" d="M4.983 3.583H3.45v9.584h1.533V3.583Zm3.45 0H6.9v9.584h1.533V3.583Zm3.45 0H10.35v9.584h1.533V3.583Z"/>
                </svg>

            </div>
        </div>

    </div>
  );
}

export default Item;