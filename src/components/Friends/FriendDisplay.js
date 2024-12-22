import { useEffect, useState } from "react";
import axios from "axios";

const FriendDisplay = () => {

    // get friends for user
    const [friends, setFriends] = useState([]);
    const [usersFriends, setUsersFriends] = useState([])
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // Filters the list of friends
    let getFriends = () => {
        console.log(friends);
        let userFriendsSet = new Set();

        friends.forEach(element => {

            if (element.friender.accountId !== parseInt(userId)) {
                userFriendsSet.add(element.friender);
            }
            console.log("friended account id:" + element.friended.accountId)
            if (element.friended.accountId !== parseInt(userId)) {
                userFriendsSet.add(element.friended);
            }
        });

        setUsersFriends([...userFriendsSet]);
        console.log(userId);
        console.log("sorted list: ", [...userFriendsSet]);
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

    const handleFriendClick = (friend) => {
        // navigate to friends page.
    }


    return (
        <div className="friendContainer">
            <h3>Friends</h3>
            <hr />
            <div>
                {
                    usersFriends.map((friend) => (
                        <div className="friendCard" onClick={() => handleFriendClick(friend)} key={friend.accountId}>
                            <img className="profilePicture" src={friend.profilePicture} />
                            <b>{friend.username}</b>
                        </div>
                    ))
                }
            </div>
        </div>
    );


}
export default FriendDisplay;