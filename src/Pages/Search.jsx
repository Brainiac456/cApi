import React, { useState, useEffect } from "react";
import axios from 'axios'
import { FaHeart } from "react-icons/fa"
import '../Styles/Search.css'



export default function Search() {
  const [order, setOrder] = useState();
  const [isHovered, setHover] = useState(false);
  const [type, setType] = useState();
  const [Category, setCategory] = useState();
  const [breeds, setBreeds] = useState();
  const [page ,setPage ] = useState ('9')
  const [breedData , setBreedData] = useState([])
  const [CategoryData , setCategoryData]= useState([])
  const [finalData, setFinalData]= useState();
  const Geturl = `https://api.thecatapi.com/v1/images/search?limit=`;



  const handleOrder = (event)=>{
      setOrder(event.target.value)
  }
  const handleType = (event)=>{
    setType(event.target.value)
  }
  const handlePage = (event) => {
    setPage(event.target.value)
  }
  const handleCategory = (event)=>{
    setCategory(event.target.value)
  }
  const handleBreed = (event)=>{
    setBreeds(event.target.value)

  }

  const handleFavorite =() => {
    
  }
  const fetchData = async () => {
    console.log(page)
    axios.get(Geturl + page, {headers: {'x-api-key':'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr'},
      params: {
       
          'breeds_ids': breeds,
          'category': Category,
          'order': order,
          'mime_types':type

      }
    })

  .then((response) => {
    console.log(response.data);
    setFinalData(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

  };

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
    



  const getBreed = async()=>{
    axios.get((`https://api.thecatapi.com/v1/breeds`) , { 'headers': { 'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr' } })
    .then((response) => {
      setBreedData(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const getCategory = async()=>{
    axios.get((`https://api.thecatapi.com/v1/categories`) , { 'headers': { 'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr' } })
    .then((response) => {
    setCategoryData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  useEffect(() => {
    fetchData();
}, [page,order, type,Category,breeds]);


useEffect(()=>{
  getBreed()
  getCategory()
},[])



  return (
    <div className="Search">
      <div>
        <label className="lable">Order</label>
        <select className="dropdown-content" onChange={handleOrder}>
          <option value="DESC">DESC</option>
          <option value="ASC">ASC</option>
        </select>
       
       
        <label className="lable">Type</label>
        <select className="dropdown-content"  onChange={handleType}>
          <option value="png">Static</option>
          <option value="gif">Animated</option>
        </select>
       
       
        <label className="lable">Category</label>
        <select className="dropdown-content" onChange={handleCategory}>
          {CategoryData?.map(Category=>{
         return <option value={Category.name}>{Category.name}</option>
        })
      }
        </select>
        <label className="lable">Breed</label>
        <select className="dropdown-content" name='Breed' onChange={handleBreed} >
        {
        breedData?.map(breed =>{
        return  <option key={breed.id}>{breed.name}</option>
         })
        }
        </select>
      </div>
      <div>

   <div className='imageList'>

 <div

        >
          <div >
            {finalData && (
              <div>
                {finalData.map((image, index) => {
                  return (
                    <div className="Search-image" key={index}>
                      <div className="image_with_btn" onMouseOver={() => setHover(index)}
                           onMouseLeave={() => setHover(null)}>

                      <img src={image.url} className="m-2 cta_img" alt="" width="150" height="100" />
                      
                      {isHovered===index && (
                      <div className="image_hover_cta">
                      <button onClick={()=>{newFavourite(image.id)}} ><FaHeart style={{ color: 'red' , width:'100px' ,height:'20px'}} /></button>
                      </div>
                      )
                
                       }
                        </div>
                    </div>)
                }
                )}
              </div>
            )}
          </div>
        </div>
   
</div>
</div>

      <div className="bottomleft">
        <label className="lable">PerPage</label>
        <select className="dropdown-content" onChange={handlePage}>
          <option value="9">9</option>
          <option value="18">18</option>
          <option value="80">80</option>
        </select>
      </div>
    </div>
  );
}