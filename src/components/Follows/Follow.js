import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
const Follow = () => {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // get followers
    useEffect(() => {
        axios.get(`http://localhost:8080/followers/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setFollowers(res.data);
            })
            .catch((ex) => {
                console.log(ex);
            })


    }, [userId])

    // get following
    useEffect(() => {
        axios.get(`http://localhost:8080/followed/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setFollowing(res.data);
            })
            .catch((ex) => {
                console.log(ex);
            })
    }, [userId])

    const handleDeleteFollow = (follow) => {
        axios.delete(`http://localhost:8080/followed/${userId}/${follow.accountId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setFollowing(prevFollowing => prevFollowing.filter(f => f !== follow));
            })
            .catch((ex) => {
                console.log(ex);
            })
    }

    return (
        <div>
            <div className="followersContainer">
                <h2 style={{ textDecoration: "underline" }}>Followers</h2>
                {
                    followers.map((follow) => (
                        <div>
                            <img className="profilePicture" src={follow.profilePictureUrl} />
                            <span className="profileName" >{follow.username}</span>
                        </div>

                    ))
                }
            </div>


            <h2 style={{ textDecoration: "underline" }}>Following</h2>
            <div>
                {
                    following.map((follow) => (
                        <div>
                            <img className="profilePicture" src={follow.profilePictureUrl} />
                            <span className="profileName">{follow.username}</span>
                            <AiOutlineClose style={{ marginLeft: "20px" }} onClick={() => handleDeleteFollow(follow)} />
                        </div>

                    ))
                }

            </div>
        </div>
    );
}

export default Follow;