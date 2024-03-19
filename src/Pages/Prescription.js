import React, { useEffect, useState } from 'react'
import "./MyCart.css"
import Header from '../Components/Header'
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"
import { imageDB } from '../firebase-config'
import {v4} from "uuid";
import { auth } from '../firebase-config'

const Prescription = () => {

  
    const [img,setImg]= useState(null)
    const [imgUrl,setImgUrl]=useState(null)

    useEffect(() => {
      console.log('Component mounted. Fetching images...');
      const fetchImage = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const folderRef = ref(imageDB, `images/${user.uid}`);
            const imageList = await listAll(folderRef);
            const urls = await Promise.all(imageList.items.map(async (item) => {
              return await getDownloadURL(item);
            }));
            setImgUrl(urls);
          } else {
            setImgUrl([]);
          }
        } catch (error) {
          console.error('Error retrieving images:', error);
          setImgUrl([]);
        }
      };
      console.log('Fetching images...');
      fetchImage();
    }, []);
    



    const uploadImg=()=>{
      const userID = auth.currentUser;
    if (!img) {
      alert('Please select an image');
      return;
    }
        const imageRef = ref(imageDB,`images/${userID.uid}/${v4()}`)
        uploadBytes(imageRef,img)
        .then(() => {
            alert("Image uploaded successfully");
            setImg(null);
        })
        .catch(error => {
            console.error("Error uploading image:", error);
            alert("Error uploading image");
        });
    }

  return (
    <div>
       {/* css file in my cart */}
       <Header></Header>
       <div className='my-presc'>
        <h4>My Prescription</h4>
       </div>
     <div className='pres-main-div'> 
     <label className='file-upl'>
        <input  type='file' onChange={(e)=>setImg(e.target.files[0])}></input></label>
        <button className='upload-btn' onClick={uploadImg}>Upload</button>
     </div>
     <div className='pres-img'>
     {imgUrl && imgUrl.map((url, index) => (
    <img className="pres-img-cls" key={index} src={url} alt={`Prescription ${index}`} />
  ))}
     </div>

    </div>
  )
}

export default Prescription