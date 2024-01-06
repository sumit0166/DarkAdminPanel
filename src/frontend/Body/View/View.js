import './View.css';
import Item from './Item'
import EditBox from './EditBox';
import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
// import { Toaster } from 'react-hot-toast';
import Remove from '../Remove/Remove';
import TableFilter from './TableFilter'
import { FilterAdd, SearchStatus1 } from 'iconsax-react'
// import { doc, collection, query, where, onSnapshot } from "firebase/firestore";
// import db from '../../Firebase'

function View({ SetProg }) {
  const db = getFirestore();
  const [data, setData] = useState([]);
  // const [prog,SetProg ] = useState('0%');
  const [isEdit, setEdit] = useState(false);
  const [isRemove, setRemove] = useState(false);
  const [currentId, setId] = useState('');
  const [order, setOrderBy] = useState('name');
  const [isDesc, setDesc] = useState(false);
  const [isFilter, setFilter] = useState(false);
  const [search, setSearch] = useState('');

  const fetchPost = async () => {
    const dbRef = collection(db, "products");
    onSnapshot(dbRef, docsSnap => {
      setData(
        docsSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
      )
      SetProg('100%')
      // console.log(data);
    });



  }





  useEffect(() => {
    SetProg('60%');
    fetchPost();
  }, [])



  return (
    <div className="body">
      {/* <center><div style={{position:'absolute',width:'100%'}}>{order+" - "+isDesc}</div></center>  */}

      {isEdit && <EditBox editClose={setEdit} Id={currentId} />}

      {isRemove && <Remove Id={currentId} removeClose={setRemove} />}

      {isFilter && <TableFilter setOrderBy={setOrderBy} setDesc={setDesc} setFilter={setFilter} order={order} isDesc={isDesc} />}
      
      {/* <div className="prog-cont">
        <div className="progresBar" 
        style={{width:prog, animationName: prog =='100%' ? 'fadeProgessBar':''}}
        > </div>
        
      </div> */}

      <div className="table">


        <div className="table-filter">
          <div className="table-filter-left">
            <span style={{ background: '# `008CDB', opacity: '100%' }}>All</span>
            <span>Categories</span>
            <span>Today's Special</span>
          </div>
          <div className="table-filter-right">
            <div>
              <SearchStatus1 size="16" variant="Linear" color="#008CDB" />
              <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <span style={{ justifySelf: 'center' }} onClick={() => setFilter(!isFilter)}><FilterAdd size="24" variant="Bulk" /></span>
          </div>
        </div>


        <div className="table-header">
          <span>Products</span>
          <span>Speciality</span>
          <span>Status</span>
          <span>Price</span>
          <span>Description</span>
          {/* <span style={{justifySelf:'center'}} onClick={() => setFilter(!isFilter)}><FilterAdd size="24" variant="Bulk"/></span> */}
        </div>



        <div className="table-body">

          {
            search !== '' ? isDesc ? data.filter((e) => { return (e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) }).sort((a, b) => a[order] < b[order] ? 1 : -1)?.map((product, i) => (
              <Item key={i} uid={product.id} name={product.name}
                category={product.category} desc={product.description} isSpecial={product.isSpecial}
                isAvilable={product.isAvilable} p={product.price} im={product.image}
                editOpen={setEdit}
                setId={setId}
                removeProudct={setRemove}
              />
            )) : data.filter((e) => { return (e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) }).sort((a, b) => a['isAvilable'] > b['isAvilable'] ? 1 : -1)?.map((product, i) => (
              <Item key={i} uid={product.id} name={product.name}
                category={product.category} desc={product.description} isSpecial={product.isSpecial}
                isAvilable={product.isAvilable} p={product.price} im={product.image}
                editOpen={setEdit}
                setId={setId}
                removeProudct={setRemove}
              />
            )) :

              isDesc ? data.sort((a, b) => a[order] < b[order] ? 1 : -1)?.map((product, i) => (
                <Item key={i} uid={product.id} name={product.name}
                  category={product.category} desc={product.description} isSpecial={product.isSpecial}
                  isAvilable={product.isAvilable} p={product.price} im={product.image}
                  editOpen={setEdit}
                  setId={setId}
                  removeProudct={setRemove}
                />
              )) : data.sort((a, b) => a['isAvilable'] > b['isAvilable'] ? 1 : -1)?.map((product, i) => (
                <Item key={i} uid={product.id} name={product.name}
                  category={product.category} desc={product.description} isSpecial={product.isSpecial}
                  isAvilable={product.isAvilable} p={product.price} im={product.image}
                  editOpen={setEdit}
                  setId={setId}
                  removeProudct={setRemove}
                />
              ))


            // data?.map((product,i)=>(
            //   <Item key={i} uid={product.id} name={product.name} 
            //         category={product.category} desc={product.description} isSpecial={product.isSpecial} 
            //         isAvilable={product.isAvilable} p={product.price} im={product.image}
            //         editOpen={setEdit}
            //         setId={setId}
            //         removeProudct={setRemove}
            //   /> 
            //   ))

          }




          {/* <Item uid='1' desc='special one ..' isSpecial={true} isAvilable={true} p='86.25'/> 
            <Item uid='2' desc='Italian, Choclate chips, ..' isSpecial={false} isAvilable={false} p='15.80'/> 
            <Item uid='3' desc='nothing just chill' isSpecial={false} isAvilable={true} p='4.99'/> 
            <Item uid='4' desc='cold and refreshing' isSpecial={false} isAvilable={false} p='26.50'/> 
            <Item uid='5' desc='mouthfreshning coffes with whipped cream ..' isSpecial={true} isAvilable={true} p='29.99'/>   */}




        </div>
      </div>
      {/* <Toaster /> */}
    </div>
  );
}

export default View;