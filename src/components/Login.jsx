import  '../styles/Login.css';
import loginicon from '../assets/loginicon.png'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(){
    const [user, setUser]= useState({email:"",password:""});
    const navigate = useNavigate();



 function handleChange(event){
    setUser((prevUser)=>({...prevUser,[event.target.name] : event.target.value}))
 }

    function handleSubmit(event){
        event.preventDefault();
       let users=JSON.parse(localStorage.getItem('users'));
       console.log(event)
       let emailExist = false;
       let passwordExist = false;
       
       
       for(let i=0;i<users.length;i++){
        if(users[i].email === user.email){
            emailExist = true;
            if(users[i].password  === user.password){
            passwordExist = true;
            break;
            }
        }
       }

       if(emailExist === true && passwordExist === true){
        alert("Successful Login")
        console.log("successful login");
        setUser((prevUser)=>({...prevUser,email:"",password:""}));
       }else if(emailExist === true && passwordExist === false){
        console.log("Entered wrong password")
       }else if(emailExist === false && passwordExist === true){
        console.log("User doesn't exist");
       }else{
        console.log("User doesn't exist");
       }
     
    }

    return(<>
        <div className="login-component">
            <div className="login-component-child">
                <form onSubmit={(event)=>handleSubmit(event)} className="login-form">
                        <div className="login-parent-container">
                            <div className="login-child-container">
                                <img src={loginicon} id="login-icon" />
                                <h2>Login</h2>
                            </div>
                            <div className="login-child-container">
                                <input className="login-input" name="email" type="email" placeholder="Email..." value={user.email} onChange={(event)=>handleChange(event)}/>
                            </div>
                            <div className="login-child-container">
                                <input  className="login-input"  name="password" type="password" placeholder="Password..." value={user.password} onChange={(event)=>handleChange(event)}/>
                            </div>
                            <div className="login-child-container">
                                <button id="login" type="submit">Submit</button>
                            </div>   
                        </div>
                
                </form>
            </div>
            <div className="login-component-child">
                    <div> <h3>Don't have an account ?</h3></div>
                    <div><button id="navigate-signup" onClick={()=>navigate('/')}>Create an account!</button></div>
            </div>
              {/**/} 
        </div>

        </>)
}