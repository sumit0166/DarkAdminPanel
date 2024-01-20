import { useRef, useState } from 'react'

import './Login.css'
import { useDispatch } from 'react-redux'
import { loggedin } from '../redux/LoginSlice'
import { EyeSlash, Eye, CloudConnection } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';
// import app from '../backend/database';


function Login() {
    const [validCred, setValidCred] = useState(true);
    const dispatch = useDispatch()
    const [showPass, setShowPass] = useState(false)
    const username = useRef(null);
    const password = useRef(null);
    const navigate= useNavigate();

    // const [postData, setPostData] = useState({ username: '', passwd: '' });
    // const handleInputChange = (e) => {
    //     setValidCred(true);
    //     const { name, value } = e.target;
    //     setPostData({ ...postData, [name]: value });
    //   };
    

     const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username.current.value, password.current.value);
        if (username.current.value !== '' && password.current.value !== '') {
        try {
            // Make a POST request using axios
            const response = await axios.post('http://linux3:3001/getLogin?operation=userAuth', {username:username.current.value , passwd:password.current.value});
            console.log(response.data);

                if (response.data.isAuthSuccesfull) {
                    localStorage.setItem("isAlreadyLogin", true);
                    dispatch(loggedin({
                        user: username.current.value,
                        roles: response.data.roles
                    }))
                    navigate("/Inventory")
                } else {
                    setValidCred(false)
                    username.current.value = '';
                    password.current.value = '';
                    toast.error("Wrong Userame or Password.\n Please try again...",{
                        style:{
                            width: '80%',
                            fontSize:'16px',
                            fontWeight:'600',
                            color: "red",
                        },
                    });
                }
                
            } catch (error) {
                // Handle errors
                console.error('Error making POST request:', error.message);
            }
        } else {
            setValidCred(false)
            toast.error("Please provide all fields",{
                style:{
                    width: '80%',
                    fontSize:'16px',
                    fontWeight:'600',
                    color: "red",
                },
            });
        }
    }


    return (
        <div className="container">
            <form className="login-box" onSubmit={ e => handleSubmit(e)}>
                <div className="top">
                    <CloudConnection size="90" color="var(--primary)" variant="TwoTone"/>
                </div>
                <div className="bottom">
                    <div className="heading"><span>Login</span></div>
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <input 
                                style={{borderColor: !validCred ? "red" : ""}} 
                                type="text" 
                                name='username' 
                                ref={username} 
                                // value={postData.username} onChange={handleInputChange}
                                onChange={() => setValidCred(true)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="Password">Password</label>
                            <input 
                                style={{borderColor: !validCred ? "red" : ""}} 
                                type={showPass ? "text" : "password"} 
                                name='passwd' 
                                ref={password} 
                                // value={postData.passwd} onChange={handleInputChange}
                                onChange={() => setValidCred(true)}
                             />
                            <div className="showpass" onClick={ () => setShowPass(!showPass) } >
                                {/* <Eye size="22" color="#39db7d"/> */}
                                { showPass ? <EyeSlash size="20" color="#92a1a7"/> : <Eye size="20" color="#304750"/>}
                            </div>
                        </div>
                    </div>
                    <div className="options">
                        {/* <div className="rem">
                            <input type="checkbox" name='remember'/>
                            <label htmlFor="remember">Keep me login</label>
                        </div> */}
                        <div className="forgot">
                            <span>Forgotten your password?</span>
                        </div>
                    </div>
                    <button type="submit" className="logIn" >
                        <span>Login</span>
                    </button>
                </div>
            </form>
        </div>
    )

    
}

export default Login