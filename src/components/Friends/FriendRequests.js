import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([])
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:8080/friends/${userId}/pending`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setFriendRequests(res.data);
                console.log(res.data);
            })
    }, [userId])

    const handleDecline = (friendId) => {
        axios.delete(`http://localhost:8080/friends/${friendId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);
                setFriendRequests(prev => prev.filter(req => req.friendId !== friendId));
            })
            .catch((ex) => {
                console.log(ex);
            })
    }

    const handleAccept = (friendId) => {
        axios.patch(`http://localhost:8080/friends/${friendId}`, 1,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data);

            })
            .catch((ex) => {
                console.log(ex);
            })
    }

    return (
        <div>
            <h2 style={{ textDecoration: "underline" }}>Friend Requests</h2>
            {
                friendRequests.map((requests) => (
                    <div key={requests.friendId}>
                        <img className="profilePicture" src={requests.friender.profilePicture} />
                        <b>{requests.friender.username}</b>
                        <FaCheck style={{ marginLeft: "20px", cursor: 'pointer' }} onClick={() => handleAccept(requests.friendId)} />
                        <AiOutlineClose style={{ marginLeft: "20px", cursor: 'pointer' }} onClick={() => handleDecline(requests.friendId)} />
                    </div>

                ))
            }
        </div>);
}

export default FriendRequests;