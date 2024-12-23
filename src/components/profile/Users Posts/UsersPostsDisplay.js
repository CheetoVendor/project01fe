import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineThumbUp } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Comments from "../../PostDisplay/Comments/Comments";
const UsersPostsDisplay = ({ userId }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');
    const currentUsersId = localStorage.getItem('userId');

    const handleUserClick = (id) => {
        navigate(`/profile/${id}`)
    }

    const handleLiked = () => {

    }

    // get users posts
    useEffect(() => {
        axios.get(`http://localhost:8080/accounts/${userId}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            accountId: userId
        })
            .then((res) => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId, token])

    // get like for post by user Id 
    useEffect((postId) => {

    }, [])
    return (
        <div>
            <h2> Users Posts </h2>
            {
                posts.map((post) => (
                    <div className="postCard" key={post.postId}>
                        <div className="postHeader" onClick={() => handleUserClick(post.postedBy.accountId)}>
                            <img className="profilePicture" src={post.postedBy.profilePicture}></img>
                            <b className="profileName">{post.postedBy.username}</b>
                        </div>
                        <hr className="divider" />
                        <div className="postContent">
                            <span>{post.postText}</span>
                            <br />
                            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                        </div>
                        <Comments postId={post.postId} />
                        <div className="postFooter">

                            <MdOutlineThumbUp size={30} style={{ cursor: 'pointer' }} onClick={() => handleLiked(post.postId)} />

                            <FaRegHeart size={30} style={{ cursor: 'pointer' }} />
                            <input type="text"></input>
                            <button>comment</button>
                        </div>

                    </div >
                ))

            }
        </div>);
}

export default UsersPostsDisplay;