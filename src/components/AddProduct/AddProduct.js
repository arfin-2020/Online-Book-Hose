import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import axios from "axios";
import './addProduct.css'
import plusicon from "../../icons/plus 1.png"
import manageicon from "../../icons/grid 1.png"
import photoicon from "../../icons/cloud-upload-outline 1.png"
import editicon from "../../icons/edit 1.png"
import { Link } from "react-router-dom";
const AddProduct = () => {
    
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageUrl,setImageUrl]  = useState(null);
    const onSubmit = data => {
        const eventData = {
           BookName:data.BookName,
           AuthorName:data.AuthorName,
           price:data.price,
           imageUrl: imageUrl
        };
        const url = `https://protected-stream-48236.herokuapp.com/addphoto`
        console.log(eventData)
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
        })
        .then(res =>console.log('server side response successfully',res))
    };
    const handleImgUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set("key","1f116a2db6e07ec9cde80cd7b839edf8");
        imageData.append("image",event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
      
    <div className = "main-container">    
    <div className = "bar-container">
    <h4>Online Book House</h4>
    <p> <img src={manageicon} alt="" height="20px"/><Link style={{ textDecoration: 'none',color:'white' }} to="/order"> Manage Book </Link></p>
    <p> <img src={plusicon} alt="" height="20px"/> <Link style={{ textDecoration: 'none',color:'white' }} to="/addproduct">Add Book</Link></p>
    <p> <img src={editicon} alt="" height="20px"/> Edit Book</p>
    </div>
    <div className = "input-container">
    <form onSubmit={handleSubmit(onSubmit)}>
    <h6>Book Name</h6>
      <input name="BookName" placeholder="name" className="input-form" ref={register}/><br/>
      <h6>Author Name</h6>
      <input name="AuthorName" placeholder="Author Name" className="input-form" ref={register}/><br/>
      <h6>Price</h6>
      <input name="price" placeholder="price" className="input-form" ref={register}/><br/>
      <h6>Add Book cover Photo</h6>
      <img src={photoicon} alt = "" height="20px"/> <input name="exampleRequired" type = "file" onChange = {handleImgUpload}/><br/><br/>
      <input type="submit" value = "Save" id="submit" />
    </form>
    </div>
    </div>
      
    );
};

export default AddProduct;