import './Remove.css';
import { getFirestore, doc, getDoc, deleteDoc  } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react'
import {NoteRemove, CloseSquare,ArrowRight } from 'iconsax-react'

function Remove({Id,removeClose}) {
  const db = getFirestore();
  const docRef = doc(db, "products", Id);
  const [newData,setNewData] = useState({
      name: '',
      isSpecial: false,
      price: 0,
      image: '',
      category: '',
      isAvilable: false,
      description: ''
  });

  const sucess = (e) => toast(e,{
      delay:0,
      duration: 4000,
      style:{
        backgroundColor: '#22ca1c',
        color: 'white',
      },
      icon: '✔️'
  
    });
  
    const failed = (e) => toast(e,{
        duration: 4000,
        style:{
          backgroundColor: 'white',
          color: 'red',
        },
        icon: '😡'
    });
    
    const handleRemove = () => {
      deleteDoc(docRef)
      .then(() => {
          sucess("Entire Product has been deleted successfully.")
          removeClose(false)
      })
      .catch(error => {
          failed(error);
      })
    }

    const fetchData = async () => {
      try {
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
              // console.log(docSnap.data());
              setNewData(docSnap.data())
          } else {
              failed("Document does not exist")
          }
      
      } catch(error) {
          failed(error)
      }
  }
  
  useEffect(() => {
      fetchData()
  },[])




  return (
    <div className="modal-bg">
      <div className="rm-cont">

        <div className="rm-header">
          <div className="rm-header-left">
            <NoteRemove size="24"  variant="Bulk"/>
            <span>Remove Product</span>
          </div>
          <div className="rm-header-right" onClick={() => removeClose(false)}>
            <CloseSquare size="22" />
          </div>
        </div>

        <div className="rm-body">
          <div className="rm-body-top">
            <div className="rm-body-top-left">
              <div className="rm-id">
                <span>Id</span>
                <div></div>
                <span>{Id}</span>
              </div>

              <div className="rm-name det-frame" >
                <span className="rm-lbl" >Name</span>
                <ArrowRight size="18" color="#000" />
                <div className="rm-text-in">{newData.name} </div>
              </div>

              <div className="rm-cat det-frame" >
                <span className="rm-lbl" >Category</span>
                <ArrowRight size="18" color="#000" />
                <div className="rm-text-in"> {newData.category} </div>
              </div>


            </div>
            <div className="rm-body-top-right">
               <div className="rm-upl-box" >
                {newData.image && <img src={newData.image} alt="" />}
              </div>       
            </div>
          </div>
          <div className="rm-middle">
            <div className="rm-caution">
              <div className="caut-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 11 11">
                  <g clipPath="url(#a)">
                    <path stroke="#818100" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".688" d="M5.5 3.726V5.94m-.573-4.817c.32-.27.839-.27 1.15 0l.725.619c.137.114.398.21.582.21h.779c.486 0 .884.4.884.885v.78c0 .183.097.44.211.577l.62.724c.27.32.27.839 0 1.15l-.62.725c-.114.137-.21.394-.21.577v.78a.888.888 0 0 1-.885.884h-.78c-.183 0-.44.096-.577.21l-.724.62c-.32.27-.839.27-1.15 0l-.725-.62a1.057 1.057 0 0 0-.577-.21h-.802a.888.888 0 0 1-.885-.885v-.784c0-.178-.091-.44-.206-.572l-.619-.73a.923.923 0 0 1 0-1.145l.62-.729c.114-.137.205-.394.205-.573v-.774c0-.486.4-.885.885-.885h.793c.183 0 .44-.096.577-.21l.73-.624Z"/>
                    <path stroke="#818100" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".917" d="M5.498 7.333H5.5"/>
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h11v11H0z"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span>After clicking on remove button the data will be permanently deleted from database.</span>
            </div>
          </div>
          <div className="rm-bottom">
            <div className="rm-btn cancel-btn" onClick={() => removeClose(false)}>
              <span>Cancel</span>
            </div>
            <div className="rm-btn remove-btn" onClick={handleRemove}>
              <span>Remove</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Remove;