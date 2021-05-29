import React, {useEffect, useState } from 'react';


const Order = () => {
    const [orders,setOrder] = useState([]);
    useEffect(()=>{
        fetch("https://protected-stream-48236.herokuapp.com/photosurl")
        .then(res=>res.json())
        .then(data=>setOrder(data))
        
    },[])

    return (
        <div>
                <h1>This is order components</h1>
        </div>
    );
};

export default Order;   