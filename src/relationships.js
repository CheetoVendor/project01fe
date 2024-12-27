import { useNavigate } from "react-router-dom";
import Follow from "./components/Follows/Follow";
import FriendDisplay from "./components/Friends/FriendDisplay";
import FriendRequests from "./components/Friends/FriendRequests";
import { useEffect } from "react";
import { useState } from "react";
const Relationships = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);

    // navigate back to login if token is empty
    useEffect(() => {
        if (token === null) {
            navigate('/login')
        }

    }, [token, navigate])

    return (
        <div>
            <FriendDisplay userId={userId} friends={friends} setFriends={setFriends} />
            <FriendRequests setFriends={setFriends} friends={friends} />
            <Follow />
        </div>
    );
}

export default Relationships;