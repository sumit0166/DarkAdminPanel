
import { CloseSquare } from 'iconsax-react';
import { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';

function ShowFiles({ file }) {
  const [hover, setHover] = useState(false);
  const [uploadPerc, setUploadPerc] = useState(file);
  const [imagePreview, setImagePreview] = useState('');

  useEffect( () => {
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  } ,[file])
    // axios.post(config.host+'/upload', formData, {
        //   onUploadProgress: (progressEvent) => {
        //     console.log(progressEvent)
        //     const currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //     setUploadedPerc(currentProgress);
        //   },
        // })
        //   .then((response) => {
        //     // Handle the response after the file is successfully uploaded
        //     console.log(response.data);
        //     switch (response.data.opStatus) {
        //         case 200:
        //             toast.success("File added sucessfully")
        //             break;
        //         case 500:
        //             setFile(null);
        //             setUploadedPerc(0);
        //             toast.error(`File upload Failed -> ${response.data.error}`)
        //             break;
        //         default:
        //             break;
        //     }

        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });

  return (
    <div className="ShowFiles" >
        <div className="imu-loader" style={{ width: uploadPerc + "%" }}></div>
        <div className="cancel-ico"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <CloseSquare size="22" variant={hover ? 'Bulk' : 'Linear'} color="var(--primary)"/>
        </div>
        <img className="iml-img" src={imagePreview}></img>
        <span className='imu-span'>
          <span style={{fontSize:'14px'}}>{file.name}</span>
          <span style={{fontSize:'10px', color:'var(--pri-color)'}}>24kb</span>
          {/* <span style={{ color: 'var(--primary)',transition: 'all 0.5s ease' }} ></span>  */}
        </span>
    </div>
  );
}

export default ShowFiles;
