import '../styles/SignUp.css'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import hide1 from '../assets/hide1.png'
import show1 from '../assets/show1.png'

function LoginDiv(){
  const navigate = useNavigate()
  function handleClick(){
    navigate('/login');
  }

  return(<>
            <h3>Account already exist ?</h3>
            <button onClick={handleClick}>Login</button>
          </>)
}

export default function SignUp(){
    const signUpObj = {name:"",email:"",password:"",confirmPassword:""};

    const [signUpDetails, setSignUpDetails] = useState(signUpObj);
   // let obj = {visible:true, name:"Show"};
    const [show, setShow] = useState(false);
    const [showButton, setShowButton] = useState("Show");
    const [message, setMessage] =useState("");
    

    function handleChange(event,input=0){
        switch(input){
            case 1: setSignUpDetails({...signUpDetails,name:event.target.value});
                    break;
            case 2: setSignUpDetails({...signUpDetails,email:event.target.value});
                    break;
            case 3: setSignUpDetails({...signUpDetails,password:event.target.value});
                    setMessage("");
                    break;
            case 4: setSignUpDetails({...signUpDetails,confirmPassword:event.target.value});
                    break;
            default : console.log("Wrong form  submission");
        }
        
    }

    function handleShow(){
         setShow((prev)=>!prev);
         let prevState = showButton === "Show"?"Hide":"Show"; 
            setShowButton(prevState);
            console.log(showButton);
        
    }

    
    function handleSubmit(event){
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{8,}$/;
        event.preventDefault();
        let password = signUpDetails.password;
        let confirmPassword = signUpDetails.confirmPassword ;
        let setBoolean = regex.test(password);
        
        //console.log(regex.test(password))
        console.log(password.match(regex))
        console.log(password,confirmPassword);
    

        if(setBoolean === true){
           if(password === confirmPassword ){
            console.log(signUpDetails);
            let userInfo ={name:signUpDetails.name, email:signUpDetails.email, password:signUpDetails.password};
            let usersArr = localStorage.getItem('users') === null? [] :JSON.parse(localStorage.getItem('users'));
            usersArr.push(userInfo)
            console.log(usersArr)
            localStorage.setItem("users",JSON.stringify(usersArr));
            setSignUpDetails(signUpObj);

           
           }else{
            setMessage("Password doesn't match.");
        

            
           }
        }else{
            setMessage("Not strong, set new Password.");
           
            
        }

        
      
        
    
    }

    return(
        <>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="parent-container" >
                    <div>
                        <input type="text" value={signUpDetails.name} placeholder="Enter your name..." onChange={(event)=>{handleChange(event,1)}} required/>
                        
                    </div>
                    <div>
                        <input type="email" value={signUpDetails.email} placeholder="Enter your email..." onChange={(event)=>{handleChange(event,2)}} required/>
                    </div>
                    <div className="password">
                        <input  className="password-input" type={show? "text":"password"} value={signUpDetails.password} placeholder="Enter password..." onChange={(event)=>{handleChange(event,3)}}/>
                        <button className="button-show" onClick={handleShow}>{showButton}</button>                    
                        <div>{message}</div> 
                    </div>
                    <div>
                        <input type="password" value={signUpDetails.confirmPassword} placeholder="Confirm password..." onChange={(event)=>{handleChange(event,4)}}/>
                    </div>
                    <div>
                        <button type="submit">Sign up</button>
                    </div>
                </div>

                
            
            </form>
            <LoginDiv />
        </>
    )
 }