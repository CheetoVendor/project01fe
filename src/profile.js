import { useEffect, useState } from "react";
import FriendDisplay from "./components/Friends/FriendDisplay";
import axios from "axios";

const Profile = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState("");
    const userId = localStorage.getItem('userId')
    const [activeTab, setActiveTab] = useState("profile")


    useEffect(() => {
        axios.get(`http://localhost:8080/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setUser(res.data);
            }).catch((e) => {
                console.log(e);
            })
    }, [token, userId])

    return (
        <div className="userProfile">
            <div className="profileInfo">
                <img className="profilePictureOnProfile" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" />
                <p className="usernameOnProfile">{user.username}'s Profile</p>

            </div>

            <h3>Biography</h3>
            <hr /> <br />

            <b>{user.bioText}</b> <br />
            <FriendDisplay userId={userId} />
        </div>
    );
}

export default Profile;