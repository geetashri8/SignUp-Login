import '../styles/SignUp.css';
import signup from '../assets/signup.png'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'


const ShowIcon = ({ size = 24, color = "black" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );

  const HideIcon = ({ size = 24, color = "black" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
  );

function LoginDiv(){
  const navigate = useNavigate()
  function handleClick(){
    navigate('/login');
  }

  return(<>
            <h3>Account already exist ?</h3>
            <button id="login-button" onClick={handleClick}>Login</button>
          </>)
}

export default function SignUp(){
    const signUpObj = {name:"",email:"",password:"",confirmPassword:""};

    const [signUpDetails, setSignUpDetails] = useState(signUpObj);
   // let obj = {visible:true, name:"Show"};
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
   
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

    function handleShow1(){
         setShow1((prev)=>!prev);        
    }
    function handleShow2(){
        setShow2((prev)=>!prev);        
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
        <div className="signup-component">
            <div className="signup-icon-class">{/*<img id ="signup-icon" src={signup} />*/}<h2>Sign Up</h2></div>
            <div className="signup-form"><form onSubmit={(event)=>handleSubmit(event)} className="signup-form">     
                <div className="signup-parent-container" >
                    <div className="signup-child-container">
                        <input className="signup-input" type="text" value={signUpDetails.name} placeholder="Enter your name..." onChange={(event)=>{handleChange(event,1)}} required/>
                        
                    </div>
                    <div className="signup-child-container">
                        <input className="signup-input" type="email" value={signUpDetails.email} placeholder="Enter your email..." onChange={(event)=>{handleChange(event,2)}} required/>
                    </div>
                    <div className="signup-child-container">
                        <div className="password">
                            <input  className="signup-input" type={show1? "text":"password"} value={signUpDetails.password} placeholder="Enter password..." onChange={(event)=>{handleChange(event,3)}}/>
                            <button className="button-show" type="button" onClick={handleShow1}>
                                {show1 ? <HideIcon />:<ShowIcon />}
                            </button> 
                        </div>                                       
                        <div>{message}</div> 
                    </div>
                    <div className="signup-child-container confirm-password">
                        <input className="signup-input" type={show2? "text":"password"} value={signUpDetails.confirmPassword} placeholder="Confirm password..." onChange={(event)=>{handleChange(event,4)}}/>
                        <button className="button-show" type="button" onClick={handleShow2}>
                                {show2 ? <HideIcon />:<ShowIcon />}
                         </button>                   
                    </div>
                    <div className="signup-child-container">
                        <button type="submit" id="signup">Sign up</button>
                    </div>
                </div>             
            
            </form></div>
            <div><LoginDiv /></div>
        </div>
    )
 }