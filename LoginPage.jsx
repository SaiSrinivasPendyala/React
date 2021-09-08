import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';


export default function LoginPage() {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const gotoLoginPage = () => {
        const path = "http://localhost:3002/api/login";
        Axios.post(path, {
            "username": username,
            "password": password
        }).then((result) => {
            console.log(result);
            if(result.status === 200) {
                console.log(result.data[0]);
                const data = result.data[0];
                const token = data.token;
                const username = data.username;
                // console.log(token);
                // console.log(data.token);
                // console.log(data);
                window.sessionStorage.setItem("token", token);
                window.sessionStorage.setItem("username", username);
                history.push("/course");
            }
        }).catch((error) => {
            console.log(error, error.response);
            // if(error.response.status === 404) {
            //     setErrorMessage("Please check your username and password!");
            // }
        });
    }
    return (
        <div>
            <label >Username: </label>
            <input type="text" name="username" id="username" autoComplete="off" value={username} onChange={onUsernameChange}></input><br></br>
            <label>Password: </label>
            <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={onPasswordChange}></input><br></br>
            <button onClick={gotoLoginPage}>Login</button><br></br>
            <label>{errorMessage}</label>
        </div>
    );  
}
