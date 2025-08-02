import './Microservices.css';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// const response = await fetch('/config.json');
// const config = await response.json();
import { ArrowUp2, ArrowDown2, ArrowCircleDown2, ArrowCircleUp2  } from 'iconsax-react';
import { useState } from 'react';


const MScardTest = () => {
  return (
    <div className="MScard">
      <div className="msc-top">
        <div className="msct-left">
          <span>Backend</span>
        </div>
        <div className="msct-right">
          <div className="msctr-up">
            <ArrowUp2 size="45" variant="Bulk" />
            <span>Up</span>
            <span className="upcount">1</span>
          </div>
          <div className="msctr-down">
            <ArrowDown2 size="45" variant="Bulk" />
            <span>Down</span>
            <span className="downcount" >3</span>
          </div>
        </div>
      </div>
      <div className="msc-bot">
        <table>
          {/* <caption>Table 1</caption> */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Url</th>
              <th>Status</th>
              <th>Last Up Time</th>
              <th>Last Down Time</th>
            </tr>
            <tr>
              <td>Webapp</td>
              <td>http://webapp:8082</td>
              <td>
                {true ? <ArrowCircleUp2 variant="Bulk" color='#A4FF8E'/> : <ArrowCircleDown2 variant="Bulk" color='#FF8E8E'/> }
              </td>
              <td>2025-08-02T09:59:47.582Z</td>
              <td>2024-12-06T16:16:51.618Z</td>
            </tr>
            <tr>
              <td>Webapp</td>
              <td>http://webapp:8082</td>
              <td>
                {false ? <ArrowCircleUp2 variant="Bulk" color='#A4FF8E'/> : <ArrowCircleDown2 variant="Bulk" color='#FF8E8E'/> }
              </td>
              <td>2025-08-02T09:59:47.582Z</td>
              <td>2024-12-06T16:16:51.618Z</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  )
}


const MScard = () => {
    return(
      <div className="MScard">
        <div className="msHead">
          <span>Backend</span>
          <span className="totalcount">4</span>
        </div>
        <div className="msBody">
          <div className="up-cont">
            <div className="upc-l">
            <ArrowUp2 size="45" variant="Bulk" />
            <span>Up</span>
            </div>
            <span>1</span>
          </div>
          <div className="down-cont">
            <div className="dwc-l">
              <ArrowDown2 size="45" variant="Bulk" />
              <span>Down</span>
            </div>
            <span>3</span>
          </div>
        </div>
      </div>
    )
}


function Microservices() {
  const [activePage, setActivePage] = useState('');
  const animateParent = useAutoAnimate();

  return (
    <div className="Microservices" >
      <h2>MicroServices</h2>
      <div className="cont">
        <div className="mscard-cont" ref={animateParent}>
          <MScard />
          {/* <MScard />
          <MScard />
          <MScard />
          <MScard />
          <MScard />
          <MScard />
          <MScard /> */}
        </div>
      </div>
    </div>
  );
}

export default Microservices;