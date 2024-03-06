
import axios from 'axios';
import { CloseSquare } from 'iconsax-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
// import TextTransition, { presets } from 'react-text-transition';
const response = await fetch('/config.json');
const config = await response.json();

function ShowFiles({ file, fileOpt }) {
  const [hover, setHover] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [tmpPath, setTmpPath] = useState('')
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  }, [file])



  useEffect(() => {
    const totalSteps = 6;
    const totalTime =  Math.floor(Math.random() * 1500) + 1000; // 5 seconds
    const stepDuration = totalTime / totalSteps;
    let currentStep = 0;

    const interval = setInterval(() => {
      const newValue = (currentStep / totalSteps) * 100;

      setProgressValue(Math.floor(newValue));

      currentStep++;

      if (currentStep > totalSteps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);


  const removeUpload = () => {
    console.log('in removeUpload')
    console.log(fileOpt.files)
    let newFileList = fileOpt.files.filter((uploadedFile) => uploadedFile !== file);
    fileOpt.setFiles(newFileList);

    console.log(fileOpt.files)
    // axios.get(`${config.host}/removeItem?remPath=${tmpPath}`)
    // .then(response => {
    //   if(response.data.opStatus === 200){
    //     let newList = fileOpt.files.filter((_, index) => index !== file);
    //     fileOpt.setFiles(newList);
    //   }
    // })
    // .catch( error => {
    //   toast.error(`ERROR -> ${error}`)
    // });
  }

  return (
    <div className="ShowFiles" >
      <div className="imu-loader" style={{ width: progressValue + "%", opacity: progressValue === 100 ? '0' : '1' }}></div>
      {progressValue >= 100 ? <div className="cancel-ico"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={removeUpload}
      >
        <CloseSquare size="22" variant={hover ? 'Bulk' : 'Linear'} color="var(--primary)" />
      </div> :
      <div className="progressPerc"><strong>{progressValue}%</strong></div>}
      <img className="iml-img" src={imagePreview}></img>
      <span className='imu-span'>
        <span style={{ fontSize: '14px' }}>{file.name}</span>
        <span style={{ fontSize: '10px', color: 'var(--pri-color)' }}>24kb</span>
        {/* <span style={{ color: 'var(--primary)',transition: 'all 0.5s ease' }} ></span>  */}
      </span>
    </div>
  );
}

export default ShowFiles;
