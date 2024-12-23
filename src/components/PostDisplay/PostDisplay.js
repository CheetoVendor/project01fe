import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const PostDisplay = ({ setPosts, posts }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [likedPosts, setLikedPosts] = useState({});

    const handleUserClick = (postedById) => {
        navigate(`/profile/${postedById.accountId}`);
    }

    const checkIfPostLiked = (postId) => {

        const isLiked = likedPosts[postId]; // Check if the post is already liked

        // Toggle the liked status
        setLikedPosts((prevState) => ({
            ...prevState,
            [postId]: !isLiked
        }));


        axios.get(`http://localhost:8080/posts/{postId}/likes`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            postId: postId,
            accountId: userId,
            type: 1
        })
            .then(res => {
                console.log(res.data);
            })
    }

    const handleLiked = (postId) => {
        axios.post(`http://localhost:8080/posts/${postId}/likes`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            postId: postId,
            accountId: userId,
            type: 1
        }).then(res => {
            console.log('like reaction submitted.')
            console.log(res.data)
        })
    }

    const handleUnliked = (postId) => {
        axios.delete(`http://localhost:8080/posts/${postId}/likes`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            postId: postId,
            accountId: userId,
            type: 1
        })
    }
    const handleUnloved = (postId) => {
        axios.delete(`http://localhost:8080/posts/${postId}/likes`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            postId: postId,
            accountId: userId,
            type: 2
        })
    }

    const handleLoved = (postId) => {
        axios.post(`http://localhost:8080/posts/${postId}/likes`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            postId: postId,
            accountId: userId,
            type: 2
        }).then(res => {
            console.log('heart reaction submitted.')
            console.log(res.data)
        })
    }

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
                // Initialize liked status for each post 
                const initialLikedState = res.data.reduce((acc, post) => {
                    acc[post.postId] = post.isLikedByUser;
                    return acc;
                }, {});
                setLikedPosts(initialLikedState);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId, token]);

    return (
        <>
            {
                posts.map((post) => (
                    <div className="postCard" key={post.postId}>
                        <div className="postHeader" onClick={() => handleUserClick(post.postedBy)}>
                            <img className="profilePicture" src={post.postedBy.profilePicture}></img>
                            <b className="profileName">{post.postedBy.username}</b>
                        </div>
                        <hr className="divider" />
                        <div className="postContent">
                            <span>{post.postText}</span>
                            <br />
                            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                        </div>
                        <hr />
                        <div className="postFooter">
                            <MdOutlineThumbUp size={30} style={{ cursor: 'pointer', color: likedPosts[post.postId] ? 'blue' : 'black' }} onClick={() => handleLiked(post.postId)} />

                            {likedPosts[post.postId] ? (
                                <FaHeart
                                    size={30}
                                    style={{ cursor: 'pointer', color: 'red' }}
                                    onClick={() => handleUnloved(post.postId)}
                                />
                            ) : (
                                <FaRegHeart
                                    size={30}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleUnloved(post.postId)}
                                />
                            )}
                            <input type="text"></input>
                            <button>comment</button>
                        </div>

                    </div >
                ))

            }
        </>
    );
}

export default PostDisplay;