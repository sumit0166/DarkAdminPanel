import './EditBox.css'
import {Edit2, CloseSquare,ArrowRight } from 'iconsax-react'
import { useEffect, useState } from 'react'
// import { collection, getDocs, onSnapshot , doc } from "firebase/firestore";
// import db from '../../Firebase'
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import toast from 'react-hot-toast';


function EditBox({editClose,Id}) {
    const db = getFirestore();
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


    var reader = new FileReader();
    reader.onload = function(e) {
        var content = reader.result;
        let updated = { image: content }; setNewData(newData => ({ ...newData, ...updated }));
    }
  
    const handleEdit = async () => {
        const docRef =  doc(db, "products", Id);
        await updateDoc(docRef, newData)
        .then(docRef => {
            sucess("Data Updated Sucessfully", docRef);
            editClose(false);
            // console.log("A New Document Field has been added to an existing document");
        })
        .catch(error => {
            failed(error);
        })
    }

    const fetchData = async () => {
        const docRef = doc(db, "products", Id);
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


    return(
        <div className="modal-bg" >
            <div className="edit-cont">
                <div className="edit-header">
                    <div className="edit-header-left">
                    <Edit2 size="25" color="#000"/>
                    <span>Edit Product</span>
                    </div>
                    <div className="edit-header-right" onClick={() => editClose(false)}>
                    <CloseSquare size="28" color="#000"/>
                    </div>
                </div>
                <div className="edit-body">
                    <div className="edit-body-top">
                        <div className="edit-id-cont">
                            <span>Id</span>
                            <div></div>
                            <span>{Id}</span>
                        </div>
                    </div>
                    <div className="edit-body-middle">

                        <div className="edit-body-middle-left">
                            <div className="name">
                                <span className="lbl">Name</span>
                                <ArrowRight size="25" color="#000" />
                                <input className='text-in' 
                                value={newData.name} 
                                type="text" id="name" 
                                    // style={valid.name ? inputChkFalse:null}
                                    onChange={(e) => { let updated = { name: e.target.value }; setNewData(newData => ({ ...newData, ...updated })); }}
                                                        // let change = { name: false }; setValid(valid => ({ ...valid, ...change })); }}
                                />
                            </div>

                            <div className="categ">
                                <span className="lbl">Category</span>
                                <ArrowRight size="25" color="#000" />
                                <select id="category" 
                                  onChange={(e) => { let updated = { category: e.target.value }; setNewData(newData => ({ ...newData, ...updated }));} }
                                                    //  let change = { category: false }; setValid(valid => ({ ...valid, ...change })); }}
                                
                                  value={newData.category}
                                //   style={valid.category ? inputChkFalse:null}
                                >
                                    <option value="" defaultChecked>Select ..</option>
                                    <option value="coffees">Coffees</option>
                                    <option value="Teas">Teas</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="spec">
                                <span className="lbl">Speciality</span>
                                <ArrowRight size="25" color="#000" />
                                <div>
                                    <input type="checkbox" 
                                    value={newData.isSpecial} name='spec-chkbox'
                                    onClick ={(e) => { let updated = { isSpecial: !newData.isSpecial }; setNewData(newData => ({ ...newData, ...updated })); }}
                                    defaultChecked={newData.isSpecial ? 'checked':null}
                                    />
                                    <label htmlFor="spec-chkbox">Today's Special</label>
                                </div>
                            </div>

                            <div className="avil">
                                <span className="lbl">Avilable</span>
                                <ArrowRight size="25" color="#000" />
                                <input type="checkbox" value={newData.isAvilable} name='avl-chkbox'
                                        onClick={() => { 
                                        console.log("onChange",newData.isAvilable)
                                        let updated = { isAvilable: ! newData.isAvilable };  
                                         setNewData(newData => ({ ...newData, ...updated })); 
                                        }}
                                        defaultChecked={newData.isAvilable ? 'checked':null}
                                />
                                <label htmlFor="avl-chkbox">Avilable</label><br></br>
                            </div>

                            <div className="price">
                                <span className="lbl">Price</span>
                                <ArrowRight size="25" color="#000" />
                                <input className='text-in' type="number" id="price" min="0"
                                    value={newData.price} 
                                    onChange={(e) => { let updated = { price: e.target.value }; setNewData(newData => ({ ...newData, ...updated })); }}
                                />
                            </div>

                        </div>

                        <div className="edit-body-middle-right">
                            <div className="image">
                                {/* <span className="lbl">Image</span>
                                <ArrowRight size="25" color="#000" /> */}
                                <div className="upl-box" 
                                    //  style={newData.image ? inputChkFalse:null} 
                                >
                                    <input type="file" accept="image/png, image/jpeg, image/jpg"
                                    // onChange={(e) => { let updated = { image: e.target.files[0] }; setNewData(data => ({ ...newData, ...updated })); console.log(updated); }}
                                    onChange={(e) => { reader.readAsDataURL(e.target.files[0]);  }}
                                    required
                                    />
                                    {newData.image && <img src={newData.image} alt="" />}
                                    <svg id='upload-icon' xmlns="http://www.w3.org/2000/svg" width="45" height="43" fill="none" viewBox="0 0 45 43">
                                    <path stroke="#191A47" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M33.62 6.19H44m-5.19 5.19V1m-.888 31.21-5.866-13.701c-1.987-4.648-5.641-4.835-8.097-.412l-3.542 6.39c-1.799 3.243-5.154 3.524-7.478.62l-.412-.526c-2.418-3.036-5.829-2.661-7.572.806l-3.223 6.466c-2.268 4.498 1.012 9.802 6.035 9.802H31.68c4.873 0 8.153-4.967 6.24-9.446Zm-27.57-16.793a5.622 5.622 0 1 0 .001-11.245 5.622 5.622 0 0 0 0 11.245v0Z" />
                                    </svg>
                                </div>       
                            </div>

                            <div className="desc">
                                <span className="lbl">Description</span>
                                <ArrowRight size="25" color="#000" />
                
                                <textarea type='text' name="" id="desc-text"
                                    value={newData.description}
                                    onChange={(e) => { let updated = { description: e.target.value }; setNewData(newData => ({ ...newData, ...updated })); }}
                                                    // let change = { description: false }; setValid(valid => ({ ...valid, ...change }));}}
                                    
                                    // style={valid.description ? inputChkFalse:null}
                                >
                                </textarea>
                            </div>
                        </div>

                    </div>
                    <div className="edit-body-bottom">
                        <div className="edit-btn" onClick={handleEdit}>
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default EditBox                                    




// const [newData,setNewData] = useState({});
//     const fetchData = async () => {
//         const docRef = doc(db, "products", Id);
//         const docSnap = await getDoc(docRef);
        
//         if (docSnap.exists()) {
//           return docSnap.data()
//         } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//         }
//     }
//     useEffect(() => {
//         const data = fetchData();
//         data.then(function(result) {
//             setNewData(result) // "Some User token"
//             console.log(newData)
//          })
//     },[]);