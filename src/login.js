import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";
const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const data = {
        username: username,
        password: password
    };
    /*
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/login", data)
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        console.log("Login success..");
                        // log user in and navigate to home
                        navigate('/home')
                    } else {
                        setErrorMessage("Username or password is incorrect!");
                        console.log("login failed..");
                        // throw error message

                    }
                })
        } catch (ex) {
            console.log(ex);
        }
    }
*/
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login(data);
            if (response.data !== 'Invalid credentials') {
                localStorage.setItem('token', response.data);
                navigate('/home');
            } else {
                console.log('Invalid credentials');
                console.log(response);

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
                <a>New user? Sign up here.. </a>
            </form>
        </div>
    );
}

export default Login;