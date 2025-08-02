import { useRef, useState } from 'react'

import './Login.css'
import { useDispatch } from 'react-redux'
import { loggedin, loggedout } from '../redux/LoginSlice'
import { EyeSlash, Eye, CloudConnection } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// import config from '../config.json'


const response = await fetch('/config.json');
const config = await response.json();

const bcrypt = require('bcryptjs');

const requestOptions= {
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
    }
}
//  application/json multipart/form-data application/x-www-form-urlencoded
// import app from '../backend/database';


function Login() {
    const [validCred, setValidCred] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [isLoding, setLoading] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [animateLogin] = useAutoAnimate();

    // const [defaultPage, setDefaultPage] = useState("");
    const dispatch = useDispatch();
    const username = useRef(null);
    const password = useRef(null);
    const role = useRef(null);
    const navigate = useNavigate();
    const configData = config.roles;

    var errorStyle = {
        width: '80%',
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--pri-font-color)',
        background: "var(--inv-search-box)",
        boxShadow: '4px 6px 12px rgb(90 90 90 / 38%)',
        font: "font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
    }


    // function checkDefaultPage(roles) {
    //     let defPage = config.defaultPage;
    //     let acessDenPage = config.roles[roles]['accessDeniedPages']
    //     let isDefaultPagePresent = acessDenPage.includes(defPage);
    //     return isDefaultPagePresent
    // }

    const getHashPassword = async (password) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    };


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

    function handleSucessfulLogin(data) {
        localStorage.setItem("isAlreadyLogin", true);
        let configData = config.roles;
        // let userConfig = configData[data.roles];
        dispatch(loggedin({
            user: username.current.value,
            roles: data.roles,
            userConfig: configData[data.roles],
            token: data.token
        }))
        var sessionId = btoa(username.current.value + "_" + expireTime(config.sessionExpiredTime))
        localStorage.setItem("sessionId", sessionId);
        // cheeck acesseDenied pages and change defaultPage if it is present in the list
        let roleData = config.roles[data.roles];
        let acessDenPage = roleData.accessDeniedPages;
        if (acessDenPage.includes(config.defaultPage)) {
            navigate(roleData.defaultPage);
        } else {
            navigate(config.defaultPage);
        }
        setLoading(true);
    }

    const handelSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(username.current.value, password.current.value, role.current.value)
        if (username.current.value === '' || password.current.value === '' || role.current.value === 'none') {
            setValidCred(false);
            toast.error("Please provide all fields", {
                style: errorStyle,
            });
            setLoading(false);
            return;
        }

        try {
            const hashPassword = await getHashPassword(password.current.value);

            const response = await axios.put(config.host + '/iam', { username: username.current.value, passwd: password.current.value, roles: role.current.value });
            console.log(response.data.opStatus);
            switch (response.data.opStatus) {
                case 200:
                    setLoading(false);
                    username.current.value = '';
                    password.current.value = '';
                    role.current.value = "none";
                    toast.success(response.data.message);
                    break;
                default:
                    username.current.value = '';
                    password.current.value = '';
                    role.current.value = "none";
                    toast.error(response.data.message, {
                        style: errorStyle,
                    });
                    setLoading(false);
            }
        } catch (error) {
            console.log("108", error);
            toast.error(error.message);
            setLoading(false);
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
                const hashPassword = await getHashPassword(password.current.value)
                const response = await axios.post(config.host + '/iam/getLogin?operation=userAuthHash', 
                    // `username=${encodeURIComponent(username.current.value)}&passwd=${encodeURIComponent(hashPassword)}`,
                    { username: username.current.value, passwd: hashPassword }, 
                    requestOptions
                );
                console.log(response.data.opStatus);

                switch (response.data.opStatus) {
                    case 200:
                        handleSucessfulLogin(response.data);
                        break;

                    case 2001:
                        setValidCred(false)
                        username.current.value = '';
                        password.current.value = '';
                        toast.error("Wrong Userame or Password.\n Please try again...", {
                            style: errorStyle,
                        });
                        setLoading(false);
                        break;

                    case 2002:
                        setValidCred(false)
                        username.current.value = '';
                        password.current.value = '';
                        setLoading(false);
                        toast.error('User not found, Please try again', { style: errorStyle, });
                        break;

                    // case 400:
                    //     setLoading(false);
                    //     toast.error('Request Error! \n operation not found', { style: errorStyle, });
                    //     break;

                    // case 502:
                    //     setLoading(false);
                    //     toast.error('Database Error!', { style: errorStyle, });
                    //     console.error(response.data.error)
                    //     break;

                    default:
                        setLoading(false);
                        console.error(`${response.data.opStatus} - ${response.data.message}`);
                        toast.error(`${response.data.opStatus} - ${response.data.message}`, { style: errorStyle, });
                        break;
                }
            } catch (error) {
                // Handle errors
                console.log(error);
                setLoading(false);
                toast.error(error.message.toLowerCase(), {
                    style: errorStyle,
                });
                // dispatch(loggedout())
            }
        } else {
            setValidCred(false)
            toast.error("Please provide all fields", {
                style: errorStyle,
            });
            setLoading(false);
        }
    }


    return (
        <div>
            Test
        </div>
    )


}

export default Login