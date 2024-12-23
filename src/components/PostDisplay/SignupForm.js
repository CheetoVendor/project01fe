import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerification, setPasswordVerification] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const handleSignupClick = (e) => {
        e.preventDefault()
        // see if passwords match
        if (password === passwordVerification) {
            if (username.length > 5) {
                axios.post(`http://localhost:8080/register`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    username: username,
                    password: password,
                    profilePictureUrl: profilePicture
                })
                    .then((res) => {
                        console.log(res.data);
                        navigate('/login')
                    })
                    .catch((ex) => {
                        console.log(ex);
                    })
            }
        } else {
            // add error message
            return
        }
    }

    return (
        <div>
            <form className="signupform">
                <label>Username: </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input> <br />

                <label >Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input> <br />

                <label >Retype Password: </label>
                <input type="password" value={passwordVerification} onChange={(e) => setPasswordVerification(e.target.value)}></input> <br />

                <label>Avatar Link: </label>
                <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)}></input> <br />

                <button onClick={(e) => handleSignupClick(e)}>Signup</button>
            </form>

        </div>

    );
}

export default SignupForm;