import React, {useEffect, useState} from 'react'
import '../Styles/vote.css'
import axios from 'axios';
import { FaThumbsUp ,FaThumbsDown,FaHeart} from "react-icons/fa"
export default function Vote() {

  const[image , setImages] = useState()
  const [heart, setHeart] = useState(false)
  const [favData, setFavData] = useState()

  const VoteURL = 'https://api.thecatapi.com/v1/votes'
  const Geturl = "https://api.thecatapi.com/v1/images/search";
  
 
 
  const handleClick=(value , imageId)=> {
    fetchData();
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
 
  const handleUnfav = ()=>{
   
   
    setHeart(false)

    axios({
      method: "DELETE",
      url: (`https://api.thecatapi.com/v1/favourites/${favData}`),
      headers: {  'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr'},
    }) .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);

    });
    setFavData(null)
  }
  


const newFavourite =async(imgId)=> { 

  let body = {
    'image_id':imgId,

}
  axios({
    method: "post",
    url: 'https://api.thecatapi.com/v1/favourites',
    data: body,
    headers: {  'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr'},
  }) .then(function (response) {
    setFavData(response.data.id)
    console.log(response);
    setHeart(true)
  })
  .catch(function (error) {
    console.log(error);
  });

  }
  

 
  

  const fetchData = async () => {
    setHeart(false)
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
       
        <div className='vote'>
     
        <button className='vote-button-like' onClick={()=>handleClick(1 ,image[0].id)}><FaThumbsUp style={{ color: "black"  , fontSize:'20px' , marginRight:'10px'}} />Love it</button>
        <button className='vote-button-dislike' onClick={()=>handleClick(-1 ,image[0].id)}><FaThumbsDown style={{ color: "black"  , fontSize:'20px' , marginRight:'10px'}} />Nope it</button>
        {image!==undefined &&
        <div className='image-background'>
        <img src={image[0].url} className='vote-image' width="350" height="300"/>    
          {console.log(heart)}
        {heart ===false?
                  <button className='button' onClick={()=>newFavourite(image[0].id)}>Fav it</button>
                  :
                  <button className='unfav' onClick={()=>handleUnfav(image[0].id)}>Un-Fav it</button>
        }
       
        </div>
      }
      {heart &&
      <FaHeart style={{ color: "Red"  , fontSize:'30px' , marginLeft:'300px'}}/>
} 
      </div>

    </div>
  )
}
