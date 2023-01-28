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
    const [status, setStatus] = useState("");


    const register = () => {
        if (email === "" || password === "") {
            alert("Fields are required");
            return;
        } else {
            console.log("hello");
            Axios.post("https://long-ruby-quail-slip.cyclic.app/loginform",
                {
                    username: email
                    , password: password
                }).then(response => {
                    if (response.data.message) {
                        setStatus(response.data.message);
                    } else {
                        // setUsername(response.data[0].Username);
                        // navigate('/tickets');
                        navigate({
                            pathname: '/tickets',
                            search: createSearchParams({
                                user: response.data[0].Username,
                                imageUrl: "null"
                            }).toString()
                        });
                        // setStatus(response.data[0].Username);
                    }
                    // console.log(response);
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
        // alert("User signed in")
        navigate({
            pathname: '/tickets',
            search: createSearchParams({
                user: e.profileObj.name,
                imageUrl: e.profileObj.imageUrl
            }).toString()
        });
        // console.log(e)
    }

    const onFailure = e => {
        alert("Sign in Failed")
        console.log(e)
    }
    const routeChange = () => {
        navigate('/');
    }
    return (
        <div className="cover">
            <Typography variant="h4" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                Login <Button
                    color="primary"
                    style={{ borderRadius: "32px" }}
                    size="large"
                    className="form-input"
                    onClick={routeChange}
                >
                    SignUp
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
                Login
            </Button>
            <Typography variant="h5" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                Or Login using
            </Typography>

            <div className="alt-login">
                <div className="google">
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
            <Typography variant="h5" style={{ marginBottom: 8, color: "rgb(32, 177, 255)" }}>
                {status}
            </Typography>

        </div>
    )
}

export default LoginForm