import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../../PostDisplay/Comments/Comments";
import Reaction from "../../PostDisplay/Reaction";

const UsersPostsDisplay = ({ userId }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');
    const currentUsersId = localStorage.getItem('userId');

    const handleUserClick = (id) => {
        navigate(`/profile/${id}`);
    }

    // Get user's posts
    useEffect(() => {
        axios.get(`http://localhost:8080/accounts/${userId}/posts`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setPosts(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [userId, token]);

    return (
        <div>
            <h2>Users Posts</h2>
            {posts.map((post) => (
                <div className="postCard" key={post.postId}>
                    <div className="postHeader" onClick={() => handleUserClick(post.postedBy.accountId)}>
                        <img className="profilePicture" src={post.postedBy.profilePictureUrl} alt="Profile" />
                        <b className="profileName">{post.postedBy.username}</b>
                    </div>
                    <hr className="divider" />
                    <div className="postContent">
                        <span>{post.postText}</span>
                        <br />
                        {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                    </div>
                    <Reaction postId={post.postId} />
                    <Comments postId={post.postId} />
                    <div className="postFooter">
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersPostsDisplay;
