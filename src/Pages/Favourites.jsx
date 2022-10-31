import React,{useState, useEffect} from 'react'
import "../Styles/Favourite.css";
import axios from 'axios';



export default function Favourites() {

  const [order , setOrder] = useState('ASC')
  const [page , setPage] = useState('9')
  const[images, setImages] = useState(null)
 
 
  const Geturl = 'https://api.thecatapi.com/v1/favourites';
  
  const fetchData = ()=>{

    axios.get(Geturl+'?limit='+page+'&order='+order , { 'headers': { 'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr' } })
  .then((response) => {
    if(response.data.length>0){
    setImages(response.data)
    }
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });



  }
  useEffect(() => {
 
   fetchData();
    
}, [order,page]);



const handleChange = (event)=>{

  console.log(event.target.value)
  setOrder(event.target.value)

}

const handlePage = (event) =>{


  console.log(event.target.value)
  setPage(event.target.value)

}

  
const handleUnfav = (event,favouriteId)=>{
  
    event.preventDefault()

   let myArray = images.filter(function( obj ) {
      return obj.id !== favouriteId;
    });
    setImages(myArray)

    axios({
      method: "DELETE",
      url: (`https://api.thecatapi.com/v1/favourites/${favouriteId}`),
      headers: {  'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr'},
    }) .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  




  return (
    <div >

      <div >

        <label className="lable">Order</label>

        <select className="dropdown-content" name ='order' defaultValue={'ASC'} onChange={handleChange}>
          <option value="DESC">DESC</option>
          <option value="ASC">ASC</option>

        </select>
      </div>



     <div className='imageList'>
      {images ===null? 
      <p>No image </p>:
     
      images.map(img=>{
        return <div className='imgContainer'>
                       
                        <img className='imageStyle' src={img.image.url}  width="250" height="150"   />
                        <button className='btn' onClick={(e)=>handleUnfav(e,img.id)}>Un-Fav</button>
               </div>
      })
     }
     </div>

      <div>

        <label className="Page-button" >Per Page</label>
        <select className="dropdown-content" defaultValue={'9'} onChange={handlePage}>
          <option value="9">9</option>
          <option value="18">18</option>
          <option value="80">80</option>


        </select>
      
      <button className='more'>More</button>

      </div>

    
    </div>

  )
}
