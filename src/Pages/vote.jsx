import React, {useEffect, useState} from 'react'
import '../Styles/vote.css'
import axios from 'axios';

export default function Vote() {

  const[image , setImages] = useState()

  const VoteURL = 'https://api.thecatapi.com/v1/votes'
  const Geturl = "https://api.thecatapi.com/v1/images/search";
  
 
 
  const handleClick=(value , imageId)=> {

    let body = {
      'image_id':imageId,
  
      'value': value
  }
  
    axios({
      method: "post",
      url: VoteURL,
      data: body,
      headers: {  'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr'},
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

 
  }
 


const newFavourite =async(imgId)=> 

{   
  let body = {
    'image_id':imgId,

}
  axios({
    method: "post",
    url: 'https://api.thecatapi.com/v1/favourites',
    data: body,
    headers: {  'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr'},
  }) .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

   
  }
  

 
  

  const fetchData = async () => {
    try {
      const response = await fetch(Geturl);
      const json = await response.json();
      setImages(json)
      console.log(json)
   
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
  
    fetchData();
}, []);



  return (
    <div>
        {image!==undefined &&
        <div className='vote'>
     
        <button className='vote-button-like' onClick={()=>handleClick(1 ,image[0].id)}>Love it</button>
        <button className='vote-button-dislike' onClick={()=>handleClick(-1 ,image[0].id)}>Nope it</button>
        
        <img src={image[0].url} className='vote-image' width="250" height="300"/>
        <div class="overlay">
                  <button className='button' onClick={()=>newFavourite(image[0].id)}>Fav it</button>
        </div>

        </div>
}
    </div>
  )
}
