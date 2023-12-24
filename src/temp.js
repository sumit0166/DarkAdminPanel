const fetchData = async () => {
    const docRef = doc(db, "products", Id);
    try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            // console.log(docSnap.data());
            setNewData(docSnap.data())
        } else {
            console.log("Document does not exist")
        }
    
    } catch(error) {
        console.log(error)
    }
}

useEffect(() => {
    fetchData()

},[])




import { getFirestore, doc, updateDoc } from "firebase/firestore";
const db = getFirestore();
const docRef = doc(db, "products", Id);
updateDoc(docRef, newData)
.then(docRef => {
    console.log("A New Document Field has been added to an existing document");
})
.catch(error => {
    console.log(error);
})


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





for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if(element.id === Id){

        let name = { name: element.name }; setNewData(newData => ({ ...newData, ...name })); 
        
        let special = { isSpecial: element.isSpecial }; setNewData(newData => ({ ...newData, ...special })); 
        
        let price = { price: element.price }; setNewData(newData => ({ ...newData, ...price })); 
        
        let image = { image: element.image }; setNewData(newData => ({ ...newData, ...image })); 
        
        let cate = { category: element.category }; setNewData(newData => ({ ...newData, ...cate })); 
        
        let avil = { isAvilable: element.isAvilable }; setNewData(newData => ({ ...newData, ...avil })); 
        
        let des = { description: element.description }; setNewData(newData => ({ ...newData, ...des})); 

    }
}












TableHEader.js


import { useState } from "react";


function TableHeader({title, filter, setO, setG}) {
    const [count,setCount] = useState(1);
    const handleClick = () => {
        console.log(title+" clicked")
        setO(filter);
        switch (count) {
            case 1:
                setG(true);
                setCount(2)
                break;
            case 2:
                setG(false);
                setCount(1)
                break;
            default:
                break;
        }
    }

    return (
        <span onClick={handleClick}>{title}</span>
    )
}

export default TableHeader