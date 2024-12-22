import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const data = {
        username: username,
        password: password
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login(data);

            if (response.data !== 'Invalid credentials') {
                // save token to storage
                localStorage.setItem('token', response.data);

                // get user info
                const decoded = jwtDecode(localStorage.getItem('token'))
                // save user info
                localStorage.setItem('userId', decoded.userId)
                //navigate home
                navigate('/home');
            } else {
                console.log('Invalid credentials');
            }
        } catch (error) {
            console.log('ERROR: Invalid credentials');
        }
    }


    return (
        <div>
            <br />
            <form className="loginForm" onSubmit={loginHandler}>
                <label>Username: </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input><br />

                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br />

                <button>Login</button><br /> <br />
                <p>{errorMessage}</p>

                {/* link to signup page*/}
                <a href="" onClick={() => navigate('../signup')}>New user? Sign up here.. </a>
            </form>
        </div>
    );
}

export default Login;