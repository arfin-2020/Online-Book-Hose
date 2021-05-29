import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import './Book.css'
import { CardDeck } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height:"350px",
      width:"350px",
      paddingTop: '50.25px', // 16:9
      marginButtom: '25%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: green[500],
    },
  }));
  export default function Book  ({book})  {
    const classes = useStyles();
    const history = useHistory();
    const handleBook = (id) => {
        history.push(`/book/${id}`);
    }
     function deleteButton (id) {
        fetch(`https://protected-stream-48236.herokuapp.com/delete/${id}`,{
          method:"DELETE"
        })
        .then(res=>res.json())
        .then(result =>{
          console.log("Deleted successfull")
        })
    }
    return (
        <div className = "main-containt col-md-4">
            <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={book.imageUrl}     
      />
      <CardActions>
        <Button onClick={() => handleBook(book._id)} variant="contained" color="primary">
            Buy
        </Button>
          <h5>{book.BookName}</h5><br/>
           <h4> ${book.price} </h4>
           <button onClick={() => deleteButton(book._id)} style={{backgroundColor:"green",height:"40px",width:"200px",color:"white"}}>Delete</button>
      </CardActions>
    </Card>

   
        </div>
    );
};