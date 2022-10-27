import React from 'react'
import "../Styles/Upload.css"

import axios from 'axios'
import { useState } from 'react';

export default function Upload() {
  const [image , setImage ]= useState()

  const onUpload = (event)=>{
    let data = new FormData();
    data.append('file', image, image.name);
    let im = event.target.value
    axios({
      method: "post",
      url: (`https://api.thecatapi.com/v1/images/upload`),
      headers: {  'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr'},
    }) .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


  }
  const ne = (event)=>{
    console.log(event.target.value)
    setImage(event.target.value)
  }

  return (
    <div>


    <p className='upload-para'>Any uploads must comply with the upload guidelines or face deletion.</p>

      <div className="upload-btn-wrapper">
        <selection>
        <input className="btn" type="file" name="myfile" onChange={onUpload}  />
        <input type="image" src="https://www.google.com/search?q=cloud+submit+image&sxsrf=ALiCzsZOTVcnxHYsuQPyMRG8bB9Ow4jElA:1666876467394&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi7r-TdvoD7AhXRRfEDHUG7A9oQ_AUoAXoECAIQAw&biw=1920&bih=979&dpr=1#imgrc=r-mZTBHKSzVtWM" alt="Submit" width="150" height="150"/>

        </selection>
    
        <h1>Upload a .jpg or .png cat image</h1>
        
      </div>
      

    </div>
  )
}
