
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const Buy = () => {
    const {id} = useParams();
    const [products,setProduct] = useState({});
    useEffect(() => {
        fetch('https://protected-stream-48236.herokuapp.com/order/' + id)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[])
    return (
        <div style={{textAlign: 'center'}}>
           <Table striped bordered hover>
  <thead>
    <tr>
      <th>Serial No</th>
      <th>Book Name</th>
      <th>Author Name</th>
      <th>price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>{products.BookName}</td>
      <td>{products.AuthorName}</td>
      <td>{products.price}</td>
    </tr>  
  </tbody>
</Table>
            
            <button style={{height:"50px",width:"150",backgroundColor:"orange",border:"none"}}> <Link style={{ textDecoration: 'none',color:'white' }} to="/addproduct">Checkout</Link> </button>
           
        </div>
    );
};

export default Buy;