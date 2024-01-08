import { useRef, useState } from 'react'

import './Login.css'
import { useDispatch } from 'react-redux'
import { loggedin } from '../redux/LoginSlice'
import { EyeSlash, Eye, CloudConnection } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

// import app from '../backend/database';


function Login() {
    const [validCred, setValidCred] = useState(true);
    const dispatch = useDispatch()
    const [showPass, setShowPass] = useState(false)
    const username = useRef();
    const password = useRef();
    const navigate= useNavigate();
    

    const handleClick = (e) => {
        e.preventDefault()
        console.log(username.current.value, password.current.value)
        if (username.current.value !== '' && password.current.value !== '') {
            if (username.current.value === 'admin' && password.current.value === '1234') {
                localStorage.setItem("isAlreadyLogin", true);
                dispatch(loggedin({
                    user: username.current.value
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
        }
    
    }
    return (
        <div className="container">
            <form className="login-box" onSubmit={ (e) => handleClick(e)}>
                <div className="top">
                    <CloudConnection size="90" color="#39db7d" variant="TwoTone"/>
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
                                onChange={() => setValidCred(true)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="Password">Password</label>
                            <input 
                                style={{borderColor: !validCred ? "red" : ""}} 
                                type={showPass ? "text" : "password"} 
                                name='password' 
                                ref={password} 
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
                    <button type="submit" className="logIn" 
                        // onClick={handleClick}
                    >
                        <span>Login</span>
                    </button>
                </div>
            </form>
        </div>
    )

    
}

export default Login