import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebaseConfig from './config';
import google from '../../icons/Group 573.png'
import './Login.css'
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const [newUser, setnewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        newUser: false,
        email: '',
        password: '',
        photo: '',
        error:'',
        success: false
    
      })

     //google sign in
     const googlehandler =  () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName,email}= result.user;
    const signInUser = {name: displayName,email};
    setLoggedInUser(signInUser);
    history.replace(from);
  }).catch((error) => {
 
    var errorCode = error.code;
    var errorMessage = error.message;
  });
    }  
    const handleBlur = (e) =>{
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /^\S+@\S+\.\S+$/.test(e.target.value);       
        }

        if(e.target.name === 'password'){
        const IsPasswordValid = e.target.value.length > 6;
        const IsPasswordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid = IsPasswordValid && IsPasswordHasNumber;
        }

        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value; 
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) =>{
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = { ...user };
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
              
             
              })
  .catch((error) => {
    const newUserInfo = { ...user };
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
  });
    }
    if(!newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = { ...user };
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                
             
              })
  .catch((error) => {
    const newUserInfo = { ...user };
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
  });
    }
        e.preventDefault();
    }

    return (
        
        <div className = "login-container container">
        {!newUser && <h1>login</h1>}
        {newUser && <h1>Create an Account</h1>}
        <form onSubmit = {handleSubmit}>
        {newUser && <input className="inputfrom" type="text" onBlur={handleBlur} name='name' placeholder="Your Name" />}<br/><br/>
            <input type="text" className="inputfrom" name="email" onBlur = {handleBlur}  placeholder='Username or Email' required/> <br/><br/>
            <input type="password" className="inputfrom" name="password" onBlur = {handleBlur}  placeholder='Password' required/><br/><br/>
            {newUser && <input className= 'btn btn-success inputfrom' type="submit" value="Create an account"/>}
             {!newUser && <input className= 'btn btn-success inputfrom' type="submit" value="Log in"/>}<br/>
             {newUser && <input type="checkbox" name = "checkbox"/>}
             {newUser && <label htmlFor="checkbox">Remember me</label>}
        </form>
        
        <p onClick={() => setnewUser(!newUser)} name = 'newUser'>Don't have an account? {!newUser && <span  style={{color:"red",cursor: 'pointer'}}>Create account</span>}
        {newUser && <span  style={{color:"red",cursor: 'pointer'}}>Log in</span>}</p>
       <button className= 'btn btn-success inputfrom' onClick = {googlehandler}> <img src={google} height="20px" width="20px" alt=""/> Sign in with Google</button>
        <p style={{color:"red"}}>{user.error}</p>
        {user.success && <p style={{color:"green"}}> User {newUser ? "Created" : "logged in"} Successfully</p>}     
        </div>
    );
};

export default Login;