import './Add.css';
import { useState } from "react";
// import { useForm } from "react-hook-form";
import { ArrowRight, NoteAdd } from 'iconsax-react';
import { collection, addDoc } from "firebase/firestore";
import db from '../../../Firebase'
import toast from 'react-hot-toast';



function Add() {

  const addNoti = () => toast('Added Sucessfully',{
    style:{
      backgroundColor: '#22ca1c',
      color: 'white',
    },
    icon: '✔️'

  });

  const required = () => toast('Please fill all data.',{
      duration: 4000,
      style:{
        backgroundColor: 'white',
        color: 'red',
      },
      icon: '😡'
  });

  const initialState = {
    name: '',
    isSpecial: false,
    price: 0,
    image: '',
    category: '',
    isAvilable: false,
    description: ''
  }
  const [data, setData] = useState(initialState);

  const isEmpty = {
    name: false,
    image: false,
    category: false,
    description: false
  }
  const [valid, setValid] = useState(isEmpty);

  const handleSubmit = () =>  {
    if(data.name !== '' && data.image !== '' && data.category !== '' && data.description !== ''){
        try {
          const docRef =  addDoc(collection(db, "products"), {
            ...data    
          });
          addNoti()
          console.log(docRef)
          console.log("Product addes with ID: ", docRef.id);
          setData(initialState)
        }  catch (e) {
          console.log("Error adding document: ", e);
        }
    } else{
      if(data.name === ''){ let updated = { name: true }; setValid(valid => ({ ...valid, ...updated })); } 

      if(data.image === ''){ let updated = { image: true }; setValid(valid => ({ ...valid, ...updated })); } 

      if(data.category === ''){ let updated = { category: true }; setValid(valid => ({ ...valid, ...updated })); }

      if(data.description === ''){ let updated = { description: true }; setValid(valid => ({ ...valid, ...updated })); } 


      required();

    }
  } 
  



  var reader = new FileReader();
  reader.onload = function(e) {
      var content = reader.result;
   
      let updated = { image: content }; setData(data => ({ ...data, ...updated }));
  }



  const inputChkFalse = {
    boxShadow:'0px 1.74px 3.78px #ff0000a8',
    border: '1px #ff0000a8'
  }


  return (
    <div className="body">
      <div className="table-2">
        <div className="table-filter-2">
          <span style={{ opacity: '100%' }}>Products</span>
          <span>Events</span>
        </div>

        <div className="table-body-2">
          
          <form >
            <div className="name">
              <span className="lbl">Name</span>
              <ArrowRight size="25" color="#000" />
              <input className='text-in' value={data.name} type="text" id="name" 
                style={valid.name ? inputChkFalse:null}
                onChange={(e) => { let updated = { name: e.target.value }; setData(data => ({ ...data, ...updated })); 
                                    let change = { name: false }; setValid(valid => ({ ...valid, ...change })); }}
                required
              />
            </div>
            <div className="spec">
              <span className="lbl">Speciality</span>
              <ArrowRight size="25" color="#000" />
              <div  onClick={(e) => { let updated = { isSpecial: !data.isSpecial }; setData(data => ({ ...data, ...updated })); }} >
                {/* <input type="checkbox" value={data.isSpecial} name='spec-chkbox'
                  onChange={(e) => { let updated = { isSpecial: !data.isSpecial }; setData(data => ({ ...data, ...updated })); }}
                  required
                /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 21 20">
                  <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.956 18.355h4.547c3.79 0 5.306-1.515 5.306-5.305V8.502c0-3.79-1.516-5.305-5.306-5.305H6.956c-3.79 0-5.306 1.515-5.306 5.305v4.548c0 3.79 1.516 5.305 5.306 5.305Z"/>
                  <path stroke={data.isSpecial ? "#1E90FF":""} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m4.379 9.146 3.774 3.775L20 1.074"/>
                </svg>
                <span >Today's Special</span>
              </div>
            </div>
            
            <div className="price">
              <span className="lbl">Price</span>
              <ArrowRight size="25" color="#000" />
              <input className='text-in' type="number" id="price" value={data.price} min="0"
                onChange={(e) => { let updated = { price: e.target.value }; setData(data => ({ ...data, ...updated })); }}
              />
            </div>

            <div className="image">
              <span className="lbl">Image</span>
              <ArrowRight size="25" color="#000" />
              <div className="upl-box" style={valid.image ? inputChkFalse:null} >
                <input type="file" accept="image/png, image/jpeg, image/jpg"
                  // onChange={(e) => { let updated = { image: e.target.files[0] }; setData(data => ({ ...data, ...updated })); console.log(updated); }}
                  onChange={(e) => { reader.readAsDataURL(e.target.files[0]);  let change = { image: false }; setValid(valid => ({ ...valid, ...change })); }}
                  required
                />
                {data.image && <img src={data.image} alt="" />}
                <svg id='upload-icon' xmlns="http://www.w3.org/2000/svg" width="45" height="43" fill="none" viewBox="0 0 45 43">
                  <path stroke="#191A47" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M33.62 6.19H44m-5.19 5.19V1m-.888 31.21-5.866-13.701c-1.987-4.648-5.641-4.835-8.097-.412l-3.542 6.39c-1.799 3.243-5.154 3.524-7.478.62l-.412-.526c-2.418-3.036-5.829-2.661-7.572.806l-3.223 6.466c-2.268 4.498 1.012 9.802 6.035 9.802H31.68c4.873 0 8.153-4.967 6.24-9.446Zm-27.57-16.793a5.622 5.622 0 1 0 .001-11.245 5.622 5.622 0 0 0 0 11.245v0Z" />
                </svg>
              </div>
            </div>

            <div className="categ">
              <span className="lbl">Category</span>
              <ArrowRight size="25" color="#000" />
              <select id="category" 
              onChange={(e) => { let updated = { category: e.target.value }; setData(data => ({ ...data, ...updated })); 
                                 let change = { category: false }; setValid(valid => ({ ...valid, ...change })); }}
              required
              value={data.category}
              style={valid.category ? inputChkFalse:null}
              >
                <option value="" defaultChecked>Select ..</option>
                <option value="coffees">Coffees</option>
                <option value="Teas">Teas</option>
                <option value="Dessert">Dessert</option>
                <option value="other">Other</option>
              </select>

            </div>

            <div className="avil">
              <span className="lbl">Avilable</span>
              <ArrowRight size="25" color="#000" />
              {/* <input type="checkbox" value={data.isAvilable} name='avl-chkbox'
                onChange={(e) => { let updated = { isAvilable: !data.isAvilable }; setData(data => ({ ...data, ...updated })); }}
              
              /> */}
                  <div>
                      
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 21 20"
                  onClick={(e) => { let updated = { isAvilable: !data.isAvilable }; setData(data => ({ ...data, ...updated })); }}
                  >
                    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.956 18.355h4.547c3.79 0 5.306-1.515 5.306-5.305V8.502c0-3.79-1.516-5.305-5.306-5.305H6.956c-3.79 0-5.306 1.515-5.306 5.305v4.548c0 3.79 1.516 5.305 5.306 5.305Z"/>
                    <path stroke={data.isAvilable ? "#1E90FF":""} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m4.379 9.146 3.774 3.775L20 1.074"/>
                  </svg>
                <span> Avilable</span>
                  </div>
            </div>

            <div className="desc">
              <span className="lbl">Description</span>
              <ArrowRight size="25" color="#000" />
              {/* <input {...register("description")}  id="desc-text" cols="30" rows="5"></input> */}
              <textarea type='text' name="" id="desc-text"
                value={data.description}
                onChange={(e) => { let updated = { description: e.target.value }; setData(data => ({ ...data, ...updated })); 
                                   let change = { description: false }; setValid(valid => ({ ...valid, ...change }));}}
                required
                style={valid.description ? inputChkFalse:null}
              >
              </textarea>
            </div>
            {/* <input type="submit" /> */}
            <div className="add-btn" onClick={handleSubmit} >
              <NoteAdd size="22" color="#000" />
              <span>Add</span>
            </div>
            
            {/* <p style={{width:'40px'}}></p> */}
          </form>

        </div>
      </div>

      
    </div>
  );
}

export default Add;