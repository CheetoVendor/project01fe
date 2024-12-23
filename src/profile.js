import { useEffect, useState } from "react";
import FriendDisplay from "./components/Friends/FriendDisplay";
import axios from "axios";
import { useParams } from "react-router-dom";
import UsersPostsDisplay from "./components/profile/Users Posts/UsersPostsDisplay";

const Profile = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState("");
    const { userId } = useParams();
    const currentUsersProfile = localStorage.getItem('userId')
    const [isFriend, setIsFriend] = useState(null)
    const [activeTab, setActiveTab] = useState("profile")

    // Checks whether the user is already a friend OR if its the same users account
    const checkFriendStatus = () => {
        if (userId === currentUsersProfile) {
            setIsFriend(true)
            return
        }
        axios.get(`http://localhost:8080/friends/${userId}/${currentUsersProfile}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data === 'friends') {
                    setIsFriend(true)
                } else {
                    setIsFriend(false)
                }
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                checkFriendStatus();
                setUser(res.data);

            }).catch((e) => {
                console.log(e);
            })
    }, [token, userId])

    const handleAddClick = () => {
        axios.post(`http://localhost:8080/friends/${currentUsersProfile}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    setIsFriend(true)
                } else {
                    setIsFriend(false)
                }
            })
    }

    return (

        <div className="userProfile">
            <div className="profileInfo">
                <img className="profilePictureOnProfile" src={user.profilePicture || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} />
                <p className="usernameOnProfile">{user.username}'s Profile</p>
                {isFriend == false ? (
                    <button onClick={() => handleAddClick()} className="addFriendButton">+</button>
                ) : (
                    <div></div>
                )}


            </div>
            <div className="biographyInfo">
                <h3>Bio</h3>
                <hr /> <br />
                <b>{user.bioText}</b> <br />
            </div>



            <FriendDisplay userId={userId} />
            <br />
            <UsersPostsDisplay userId={userId} />
        </div>
    );
}

export default Profile;