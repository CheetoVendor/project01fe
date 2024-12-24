import { useEffect, useState } from "react";
import axios from "axios";
const EditProfile = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const token = localStorage.getItem('token');
    // get profile info on load
    useEffect(() => {
        axios.get(`http://localhost:8080/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setUser(res.data);
                console.log("user loaded");
            })
    }, [userId])

    const handleProfileUpdate = () => {
        axios.patch(`http://localhost:8080/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, // takes in an account
            accountId: userId,
            username: username,
            bioText: bio
        })
            .then((res) => {
                setUser(res.data);
                console.log("user loaded");
            })
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            <label>Username: </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input> <br />

            <label>Biography: </label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)}></input> <br />

            <button onClick={() => handleProfileUpdate()}>Update Profile</button>
        </div>
    );
}

export default EditProfile;