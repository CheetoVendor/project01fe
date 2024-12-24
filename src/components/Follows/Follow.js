import axios from "axios";
import { useEffect, useState } from "react";

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
                console.log(res.data);
                const filtered = res.data.filter((follow) => follow.followedId !== userId);
                setFollowers(filtered);
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
                console.log(res.data)
                const filtered = res.data.filter((follow) => follow.followerId === userId);
                setFollowing(filtered)
            })
            .catch((ex) => {
                console.log(ex);
            })
    }, [userId])

    return (
        <div>
            <div className="followersContainer">
                <h2 style={{ textDecoration: "underline" }}>Followers</h2>
                {
                    followers.map((follow) => (
                        <div>
                            <img className="profilePicture" src={follow.followed.profilePicture} />
                            <span className="profileName" >{follow.followed.username}</span>
                        </div>

                    ))
                }
            </div>


            <h2 style={{ textDecoration: "underline" }}>Following</h2>
            <div>
                {
                    following.map((follow) => (
                        <div>
                            <img class="profilePicture" className="profilePicture" src={follow.followed.profilePicture} />
                            <span className="profileName">{follow.followed.username}</span>
                        </div>

                    ))
                }

            </div>
        </div>
    );
}

export default Follow;