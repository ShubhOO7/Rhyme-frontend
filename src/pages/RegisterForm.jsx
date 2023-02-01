import React, { useEffect, useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import "../Css/LoginForm.css";
import { createSearchParams, useNavigate } from "react-router-dom";
import Axios from "axios";


const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [profile, setProfile] = useState("");
    // const [error, setError] = useState("");

    const routeChange = () => {
        // console.log("hello");
        navigate('/LoginForm');
    }

    const register = () => {
        if (email === "" || password === "") {
            alert("Fields are required")
            return;
        } else {
            Axios.post("http://localhost:8000/",
                {
                    username: email,
                    password: password,
                    imageUrl: "null"
                }).then(response => {
                    // console.log(response);
                    if (response.data !== "ER_DUP_ENTRY") {
                        navigate({
                            pathname: '/tickets',
                            search: createSearchParams({
                                user: email,
                                imageUrl: "null"
                            }).toString()
                        });
                    }
                    if (response.data === "ER_DUP_ENTRY") {
                        alert("User Already Exists with that name ");
                    }
                });
        }

    };


    useEffect(() => {
        function start() {
            gapi.auth2.init({
                clientId: "400821186589-u1vait71482la17hds6048bh3ivr4r89.apps.googleusercontent.com",
                scope: ""
            })
        }
        gapi.load('client: auth2', start)
    }, [])




    const onSuccess = e => {
        // alert("User signed in");
        console.log(e.profileObj.imageUrl);
        // console.log(e.profileObj.name);
        Axios.post("http://localhost:8000/",
            {
                username: e.profileObj.name,
                password: e.profileObj.name,
                imageUrl: e.profileObj.imageUrl

            }).then(response => {
                navigate({
                    pathname: '/tickets',
                    search: createSearchParams({
                        user: e.profileObj.name,
                        imageUrl: e.profileObj.imageUrl
                    }).toString()
                });
            });
    }

    const onFailure = e => {
        alert("Sign Up Failed")
        console.log(e)
    }

    return (
        <>

            <div className="cover">
                <Typography variant="h4" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                    SignUp <Button
                        color="primary"
                        style={{ borderRadius: "32px" }}
                        size="large"
                        className="form-input"
                        onClick={routeChange}
                    >
                        Login
                    </Button>
                </Typography>

                <TextField
                    label="Username"
                    variant="outlined"
                    // fullWidth
                    className="form-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    // fullWidth
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    style={{ borderRadius: "32px", BackgrounColor: "rgb(32, 177, 255)" }}
                    className="login-btn form-input"
                    size="large"
                    onClick={register}
                >
                    SignUp
                </Button>
                <Typography variant="h5" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                    Or SignUp using
                </Typography>

                <div className="alt-login" >
                    <div className="google" >
                        <GoogleLogin className="blue"
                            clientId="400821186589-u1vait71482la17hds6048bh3ivr4r89.apps.googleusercontent.com"
                            buttonText=""
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                            icon={false}
                            theme="dark"

                        />
                    </div>
                </div>

            </div>
        </>

    )
}

export default LoginForm