import { useEffect, useState } from "react";
import FriendDisplay from "./components/Friends/FriendDisplay";
import axios from "axios";
import { useParams } from "react-router-dom";
import UsersPostsDisplay from "./components/profile/Users Posts/UsersPostsDisplay";
import Follow from "./components/Follows/Follow";
import FriendRequests from "./components/Friends/FriendRequests";
const Profile = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState("");
    const { userId } = useParams();
    const currentUsersProfile = localStorage.getItem('userId')
    const [isFriend, setIsFriend] = useState(null)
    const [isFollowing, setIsFollowing] = useState(null)

    // Checks whether the user is already a friend OR if its the same users account
    const checkFriendStatus = () => {
        if (userId === currentUsersProfile) {
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

    const checkFollowStatus = () => {
        if (userId === currentUsersProfile) {
            return
        }

        axios.get(`http://localhost:8080/followers/${currentUsersProfile}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log("checking follow status")
                console.log(res.data);
                if (res.data === true) {
                    setIsFollowing(true);
                } else {
                    setIsFollowing(false);
                }
            })
            .catch((ex) => {
                console.log(ex);
            })
    }


    // gets users profile
    useEffect(() => {
        axios.get(`http://localhost:8080/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                checkFriendStatus();
                checkFollowStatus();
                setUser(res.data);

            }).catch((e) => {
                console.log(e);
            })
    }, [token, userId])

    // handles adding a user
    const handleAddClick = () => {
        if (!isFriend) {
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
        } else {
            axios.delete(`http://localhost:8080/friends/${currentUsersProfile}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        setIsFriend(false);
                    }
                })
        }

    }

    // handles following a user
    const followUser = () => {
        if (!isFollowing) {
            axios.post(`http://localhost:8080/follow/${currentUsersProfile}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setIsFollowing(true);
                })
        } else {
            axios.delete(`http://localhost:8080/followed/${currentUsersProfile}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setIsFollowing(false);
                })
        }

    }

    return (

        <div className="userProfile">
            <div className="profileInfo">
                <img className="profilePictureOnProfile" src={user.profilePicture || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} />
                <p className="usernameOnProfile">{user.username}'s Profile</p>

                {/* Check if user is viewing their OWN profile*/}
                {currentUsersProfile === userId ? (
                    <div>
                    </div>
                ) : (
                    <div>
                        {/* Follow button */}
                        {isFollowing === false ? (
                            <button onClick={() => followUser()}>Follow!</button>
                        ) : (
                            <button onClick={() => followUser()} style={{ marginLeft: "10px" }}>Unfollow</button>
                        )}

                        {/*  Friend button */}
                        {isFriend == false ? (
                            <button onClick={() => handleAddClick()} className="addFriendButton">+ Add</button>
                        ) : (
                            <button onClick={() => handleAddClick()} className="addFriendButton">- Remove</button>
                        )}
                    </div>


                )}
            </div>
            <div className="biographyInfo">
                <h3>Bio</h3>
                <hr /> <br />
                <b>{user.bioText}</b> <br />
            </div>
            <br />
            <UsersPostsDisplay userId={userId} />
        </div>
    );
}

export default Profile;