
import React, { createContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Book from '../Book/Book';



export const ComponentContext = createContext();
const Home = () => { 
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch(`https://protected-stream-48236.herokuapp.com/photosurl`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])
   
    const history = useHistory();
    const handleBook = (id) => {
        history.push(`/book/${id}`);
    }
    return (
      
            <div>
           
            {
            books.length === 0 && <p><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner></p>
            }
            <div className = 'row'>
            {
                books.map(book =><Book book={book} key={book._id}></Book>)
            }
            </div>
            
          
            </div>
        
        
    )
};

export default Home;