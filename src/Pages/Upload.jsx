import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { IoMdCloudUpload } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

import "../Styles/Upload.css";

const url = "https://api.thecatapi.com/v1/images/upload";
const Uploaded = "https://api.thecatapi.com/v1/images/";
const apiKey =
  "live_2om4LCa9Cj0PuUxGU1Ylr3tvEUFtP56pqOxC1j8BA4qiCefv6iq8IsAIUlhPTJgr";

export default function Upload() {
  const [source, setSource] = useState(null);
  const [original, setOriginal] = useState();
  const [Response, setResponse] = useState("");

  const [cat, setCat] = useState();
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    console.log(file);
    setOriginal(file);
  };

  const getUpload = () => {
    console.log("here", cat);
    if (cat) {
      axios
        .get(Uploaded + cat.id, { headers: { "x-api-key": apiKey } })
        .then((response) => {
          const data = response.data;
          setCount(count + 1);
          if (count === 2) {
            setCount(0);
          }
          const imagesUpload = [...images];
          imagesUpload[count] = data;
          setImages(imagesUpload);

          console.log(images);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getUpload();
  }, [cat]);

  const handleUpload = (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append("file", original);

    axios
      .post(url, data, { headers: { "x-api-key": apiKey } })
      .then((response) => {
        console.log(response);
        setCat(response.data);
        setResponse(true);
      })
      .catch((error) => {
        console.log(error);
        setResponse(false);
      });
  };

  return (
    <div>
      <p>
        Any uploads must comply with the{" "}
        <a href="https://thecatapi.com/privacy" target="_blank">
          {" "}
          upload guidelines{" "}
        </a>{" "}
        or face deletion.
      </p>

      <div className="upload-btn-wrapper">
        <div className="btn">
          <label for="firstImage">
            <i style={{ fontsize: "24px", border: "1px" }}></i>
            {source ? (
              <img src={source} width="350px" height="300px" />
            ) : (
              <IoMdCloudUpload
                style={{
                  color: "rgb(57, 126, 217)",
                  fontSize: "200px",
                  marginTop: "40px",
                  marginLeft: "70px",
                }}
              />
            )}
          </label>
          <input
            id="firstImage"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
      </div>
      {source && (
        <div>
          <button
            className="upload-btn"
            onClick={(event) => handleUpload(event, original)}
          >
            Upload
          </button>
        </div>
      )}

      <h3 style={{textAlign:'center'}}>Upload a .jpg or .png cat image</h3>

      {source !== null && Response === true ? (
        <div>
          <div className="Msg-Panel ">
            <p>
              <AiFillCheckCircle style={{ color: "green", fontSize: "15px" }} />{" "}
              Thank for Uploading. Still cats are strange !{" "}
            </p>
          </div>

          {images &&
            images.map((im, index) => {
              return (
                <div key={index} className="image-container">
                  <img src={im.url}  width="150" height="150" />
                </div>
              );
            })}
        </div>
      ) : source !== null && Response === false ? (
        <div className="Error-Msg-Panel  ">
          <p>
            <BsFillExclamationTriangleFill
              style={{ color: "red", fontSize: "20px" }}
            />{" "}
            Cat not Found ! Please try again with lion pictures
          </p>
          <h4 style={{marginTop:'35px'}}>Your Last three uploads</h4>
          {images &&

            
            images.map((im, index) => {
              return (
                <div key={index} className="image-container">
                  <img src={im.url} width="150" height="150" />
                </div>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
