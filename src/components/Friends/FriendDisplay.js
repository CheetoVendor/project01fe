import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FriendDisplay = ({ userId, friends, setFriends }) => {

    // get friends for user

    const [usersFriends, setUsersFriends] = useState([])
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Filters the list of friends
    let getFriends = () => {
        let userFriendsSet = new Set();

        friends.forEach(element => {

            if (element.friender.accountId !== parseInt(userId)) {
                userFriendsSet.add(element.friender);
            }

            if (element.friended.accountId !== parseInt(userId)) {
                userFriendsSet.add(element.friended);
            }
        });

        setUsersFriends([...userFriendsSet]);
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/friends/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setFriends(res.data);
            })
            .catch(ex => {
                console.log(ex)
            })
    }, [userId, token])

    useEffect(() => {
        if (friends.length > 0) {
            getFriends();
        }
    }, [friends])

    const handleFriendClick = (friendId) => {
        navigate(`/profile/${friendId}`)
    }

    const noFriends = friends.length === 0;

    return (
        <div className="friendContainer">
            <h3>Friends</h3>
            <hr />
            <div>
                {noFriends ? (
                    <p>No friends to display...</p>
                ) : (
                    <div>
                        {
                            usersFriends.map((friend) => (
                                <div className="friendCard" onClick={() => handleFriendClick(friend.accountId)} key={friend.accountId}>
                                    <img className="profilePicture" src={friend.profilePictureUrl} />
                                    <b>{friend.username}</b>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );


}
export default FriendDisplay;