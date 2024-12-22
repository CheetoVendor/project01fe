import { useState } from "react";

const SignupForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    return (
        <div>
            <form className="signupform">
                <label>Username: </label>
                <input type="text" ></input> <br />

                <label >Password: </label>
                <input type="password"></input> <br />

                <label >Retype Password: </label>
                <input type="password"></input> <br />

                <label>Avatar: </label>
                <input type="file"></input> <br />
            </form>

        </div>

    );
}

export default SignupForm;