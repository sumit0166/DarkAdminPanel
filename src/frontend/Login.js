import { useRef, useState } from 'react'

import './Login.css'
import { useDispatch } from 'react-redux'
import { loggedin, loggedout } from '../redux/LoginSlice'
import { EyeSlash, Eye, CloudConnection } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';
// import config from '../config.json'

const response = await fetch('/config.json');
const config = await response.json();



// import app from '../backend/database';


function Login() {
    const [validCred, setValidCred] = useState(true);
    const [showPass, setShowPass] = useState(false)
    const [isLoding, setLoading] = useState(false)
    const dispatch = useDispatch();
    const username = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();


    var errorStyle = {
        width: '80%',
        fontSize:'16px',
        fontWeight:'600',
        color: 'var(--pri-font-color)',
        background:"var(--inv-search-box)",
        boxShadow: '4px 6px 12px rgb(90 90 90 / 38%)',
        font: "font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
    }



    function expireTime(hrs) {
        var now = new Date();
        switch (config.sessionExpiredType) {
            case "Hrs":
                return btoa(now.setHours(now.getHours() + hrs));
            case "Mins":
                return btoa(now.setMinutes(now.getMinutes() + hrs));
            default:
                console.log(">>Invalid sessionExpiredType Value");
                break;
        }
    }






     const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(username.current.value, password.current.value);
        if (username.current.value !== '' && password.current.value !== '') {
            console.log(config)
        try {
            // Make a POST request using axios
            const response = await axios.post(config.host +'/getLogin?operation=userAuth', {username:username.current.value , passwd:password.current.value});
            console.log(response.data.statusCode);

                switch (response.data.statusCode) {
                    case 200:
                        if (response.data.isAuthSuccesfull) {
                            localStorage.setItem("isAlreadyLogin", true);
                            
                            let configData = config.roles;
                            // let userConfig = configData[response.data.roles];
                            dispatch(loggedin({
                                user: username.current.value,
                                roles: response.data.roles,
                                userConfig: configData[response.data.roles]
                            }))
                            var sessionId = btoa(username.current.value+"_"+expireTime(config.sessionExpiredTime))
                            localStorage.setItem("sessionId",sessionId);
                            navigate(config.defaultPage);
                            setLoading(true);
                        } else {
                            setValidCred(false)
                            username.current.value = '';
                            password.current.value = '';
                            toast.error("Wrong Userame or Password.\n Please try again...",{
                                style: errorStyle,
                            });
                            setLoading(false);
                        }
                        break;

                    case 2001:
                        setValidCred(false)
                        username.current.value = '';
                        password.current.value = '';
                        setLoading(false);
                        toast.error('User not found, Please try again',{ style: errorStyle, });
                        break;
                    
                    case 400:
                        setLoading(false);
                        toast.error('Request Error! \n operation not found',{ style: errorStyle, });
                        break;
                    
                    case 502:
                        setLoading(false);
                        toast.error('Database Error!' ,{ style: errorStyle, });
                        console.error(response.data.error)
                        break;

                    default:
                        setLoading(false);
                        console.error(response.data.statusCode," - Wrong Status code");
                        toast.error(response.data.statusCode," - Wrong Status Code",{ style: errorStyle, });
                        break;
                }
            } catch (error) {
                // Handle errors
                console.log(error.message);
                setLoading(false);
                toast.error(error.message.toLowerCase(),{
                    style: errorStyle,
                });
                dispatch(loggedout())
            }
        } else {
            setValidCred(false)
            toast.error("Please provide all fields",{
                style: errorStyle,
            });
            setLoading(false);
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
                    <button type="submit" className="logIn" disabled={!validCred}>
                        <span>Login</span>
                        {isLoding && <div className="loading"></div>}
    

                    </button>
                </div>
            </form>
        </div>
    )

    
}

export default Login