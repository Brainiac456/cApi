import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlider from './slider';
import "../Styles/breed.css"

const baseURL = "https://api.thecatapi.com/v1/breeds";
const apiKey = "live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr";


const Breeds = () => {

        const [stats, setStats] = useState(null);
        const [breed , setBreed]= useState([])
        const [Cat, setCat] = useState([]);

      
        const getBreed = async(event)=>{
            console.log('yoe',event.target.value)
          event.preventDefault()
          axios.get((`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=`+event.target.value) , { 'headers': { 'x-api-key': apiKey } })
          .then((response) => {
            console.log(response.data)
           setCat(response.data)
            })
            
          .catch((error) => {
            console.log(error);
          });
        
      
        }

        useEffect(()=>{
          
          axios.get((`https://api.thecatapi.com/v1/breeds`) , { 'headers': { 'x-api-key': apiKey } })
          .then((response) => {

              let temp =[]
            response.data.map(data=>{
              temp.push(data)
            })
       
            setBreed(temp)
          })
          .catch((error) => {
            console.log(error);
          });
        
        },[])

     useEffect(() =>
      {
    axios.get(`${baseURL}`, {
      headers: {
        'x-api-key': apiKey
      }
    })
    
    .then((response) => {
      const data = (response.data);
      setStats(data);
  
    }).catch(error => {
      console.log(error)
    })
} ,[])

      
    if(stats!== null){
    return ( <div> 
        <select  id="All" className="Breed-selector" name='Breed' onClick={getBreed}>
        {
        breed?.map(breed =>{  
        return  <option value={breed.id}>{breed.name}</option>
         })     
        }
        </select>
      
    


  {Cat.length!==0 && (
  <div className='image-background'> 
    <ImageSlider slides={Cat}/>
  </div>
  )}

</div>

); 
}
 else {
    <h1>Loading...</h1>
  }
}
 
export default Breeds;