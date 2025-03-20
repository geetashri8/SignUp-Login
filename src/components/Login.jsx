import  '../styles/Login.css';
import {useState} from 'react';

export default function Login(){
    const [user, setUser]= useState({email:"",password:""})

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
    
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="parent-container">
                    <div>
                        <input name="email" type="email" placeholder="Email" value={user.email} onChange={(event)=>handleChange(event)}/>
                    </div>
                    <div>
                        <input name="password" type="password" placeholder="Password" value={user.password} onChange={(event)=>handleChange(event)}/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>   
                </div>
           
            </form>
           </>)
}