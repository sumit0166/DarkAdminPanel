import './ChPass.css';
import toast from 'react-hot-toast';

function ChPass() {
  const info = (e) => toast(e,{
    delay:0,
    duration: 4000,
    style:{ 
      backgroundColor: '#01ffe4',
      color: 'black',
    },
    icon: '☁️'

  });

const handleSubmit = () =>{
  info('Auhentication is not in sync with firestore.');
}
  return (
<> pass </>
  );
}

export default ChPass;