import React, { useState, useEffect } from "react";
import axios from 'axios'
import { FaHeart } from "react-icons/fa"
import '../Styles/Search.css'



const im = [
  'https://picsum.photos/200',
  'https://picsum.photos/200',
  'https://picsum.photos/200',
  'https://picsum.photos/200',
  'https://picsum.photos/200',
]
export default function Search() {
  const [order, setOrder] = useState("asc");
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
    console.log("sds")
  }
  const fetchData = async () => {
    axios.get(Geturl + page, {
      params: {
          'breeds_ids': breeds,
          'category': Category,
          'order': order,
      }
    },{headers: {'x-api-key':'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr'}})
  .then((response) => {
    console.log(response.data);
    setFinalData(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  //   axios.get((` https://api.thecatapi.com/v1/images/search?limit=${page}&order=${order}`) , { 'headers': { 'x-api-key': 'live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr' } })
  // .then((response) => {
  //   console.log(response.data);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  };



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
          <option value="Static">Static</option>
          <option value="Animated">Animated</option>
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
          
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div >
            {finalData && (
              <div>
                {finalData.map((image, index) => {
                  return (
                    <div key={index}>
                      <img src={image.url} className="m-2" alt="" width="150" height="100" />
                      {isHovered && (
                        <button
                          onClick={(event) => handleFavorite(image, event)}
                          className="btn btn-light m-2"
                          style={{
                            position: "relative",
                            top: "25px",
                            right: "140px",
                            opacity: "70%",
                            width: "100px",
                            height: "5%",
                            color: "black",
                          }}
                          variant="contained"
                        >
                          <FaHeart style={{ color: "red" }} />
                        </button>
                      )}
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