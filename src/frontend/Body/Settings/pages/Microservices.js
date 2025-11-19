import './Microservices.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { ArrowUp2, ArrowDown2, ArrowCircleDown2, ArrowCircleUp2  } from 'iconsax-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin, loggedout } from '../../../../redux/LoginSlice';

// const MScardTest = () => {
//   return (
//     <div className="MScard">
//       <div className="msc-top">
//         <div className="msct-left">
//           <span>Backend</span>
//         </div>
//         <div className="msct-right">
//           <div className="msctr-up">
//             <ArrowUp2 size="45" variant="Bulk" />
//             <span>Up</span>
//             <span className="upcount">1</span>
//           </div>
//           <div className="msctr-down">
//             <ArrowDown2 size="45" variant="Bulk" />
//             <span>Down</span>
//             <span className="downcount" >3</span>
//           </div>
//         </div>
//       </div>
//       <div className="msc-bot">
//         <table>
//           {/* <caption>Table 1</caption> */}
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Url</th>
//               <th>Status</th>
//               <th>Last Up Time</th>
//               <th>Last Down Time</th>
//             </tr>
//             <tr>
//               <td>Webapp</td>
//               <td>http://webapp:8082</td>
//               <td>
//                 {true ? <ArrowCircleUp2 variant="Bulk" color='#A4FF8E'/> : <ArrowCircleDown2 variant="Bulk" color='#FF8E8E'/> }
//               </td>
//               <td>2025-08-02T09:59:47.582Z</td>
//               <td>2024-12-06T16:16:51.618Z</td>
//             </tr>
//             <tr>
//               <td>Webapp</td>
//               <td>http://webapp:8082</td>
//               <td>
//                 {false ? <ArrowCircleUp2 variant="Bulk" color='#A4FF8E'/> : <ArrowCircleDown2 variant="Bulk" color='#FF8E8E'/> }
//               </td>
//               <td>2025-08-02T09:59:47.582Z</td>
//               <td>2024-12-06T16:16:51.618Z</td>
//             </tr>
//           </thead>
//           <tbody></tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

  const response = await fetch('/config.json');
  const config = await response.json();

const MScard = ({data}) => {
    var name = data._id;
    var upItems = data.counts.filter(item => item.status === "up");
    var upCount = upItems.length > 0 ? upItems[0].count : 0;
    var downItems = data.counts.filter(item => item.status === "down");
    var downCount = downItems.length > 0 ? downItems[0].count : 0;
    var totalCount = upCount + downCount;
    return(
      <div className="MScard">
        <div className="msHead">
          <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
          <span className="totalcount">{totalCount}</span>
        </div>
        <div className="msBody">
          <div className="up-cont">
            <div className="upc-l">
            <ArrowUp2 size="45" variant="Bulk" />
            <span>Up</span>
            </div>
            <span>{upCount}</span>
          </div>
          <div className="down-cont">
            <div className="dwc-l">
              <ArrowDown2 size="45" variant="Bulk" />
              <span>Down</span>
            </div>
            <span>{downCount}</span>
          </div>
        </div>
      </div>
    )
}


function Microservices() {
  const [allDetails, setAllDetails] = useState([]);
  const [msWiseData, setMsWiseData] = useState([]);


  const animateParent = useAutoAnimate();
  const login = useSelector(selectLogin);
  const dispatch = useDispatch();


    const fetchMsDetails = async () => {
        setMsWiseData([]);
        setAllDetails([]);
        axios.get('/api/msDetail/fetchall', {
        // axios.get(config.host + '/msDetail/fetchall', {
            headers: {
                'Authorization': `Bearer ${login.token}`
            }
        })
            .then((response) => {
                switch (response.data.opStatus) {
                    case 200:
                        // console.log("response.data",response.data.details[0].allData)
                        setMsWiseData(response.data.details[0].msWIseCount);
                        setAllDetails(response.data.details[0].allData);
                        // console.log(allDetails, msWiseData)
                        break;
                    case 404:
                        toast.error(response.data.message);
                        break;
                    case 440:
                        toast.error(response.data.message);
                        dispatch(loggedout())
                        break;

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
            // var isSessionExpired = verifySession(localStorage.getItem("sessionId"));
            // console.log("isSeesionExpired", isSessionExpired);
            // if (isSessionExpired) {
            //       navigate('/SessionExpired');
            // }
            try {
                fetchMsDetails();
                
            } catch (error) {
                console.log(error)
            }
        }, []);
      let test = {
    "_id": "backend",
    "counts": [
        {
            "status": "up",
            "count": 1
        },
        {
            "status": "down",
            "count": 1
        }
    ]
}
  return (
    <div className="Microservices" >
      <h2>MicroServices</h2>
      <div className="cont">
        <div className="mscard-cont" ref={animateParent}>
          {
            msWiseData && msWiseData.map((data, index) => {
                console.log(data)
                return( <MScard key={index} data={data} />)
            })
          }
          {/* <MScard data={test}/>
          <MScard data={test}/>
          <MScard data={test}/>
          <MScard data={test}/>
          <MScard data={test}/>
          <MScard data={test}/>
          <MScard data={test}/> */}
        </div>
        <div className="allMsDetails">
          <table></table>
        </div>
      </div>
    </div>
  );
}

export default Microservices;