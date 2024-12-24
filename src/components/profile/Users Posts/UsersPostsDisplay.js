import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineThumbUp } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Comments from "../../PostDisplay/Comments/Comments";
const UsersPostsDisplay = ({ userId }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState({})
    const [lovedPosts, setLovedPosts] = useState({})
    const token = localStorage.getItem('token');
    const currentUsersId = localStorage.getItem('userId');

    const handleUserClick = (id) => {
        navigate(`/profile/${id}`)
    }

    const handleLiked = (postId) => {
        setLikedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));

        const isLiked = likedPosts[postId];
        if (!isLiked) {
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
        } else {
            axios.delete(`http://localhost:8080/posts/${postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}` // postId account Id type
                },
                postId: postId,
                accountId: currentUsersId,
                type: 1
            }).then((res) => {
                console.log(res.data);
                console.log("like removed!")
            })
        }

    }
    const handleLoved = (postId) => {
        setLovedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
        const isLiked = likedPosts[postId];
        if (!isLiked) {
            axios.post(`http://localhost:8080/posts/${postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                postId: postId,
                accountId: userId,
                type: 2
            }).then(res => {
                console.log('love reaction submitted.')
                console.log(res.data)
            })
        } else {
            axios.delete(`http://localhost:8080/posts/${postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}` // postId account Id type
                },
                postId: postId,
                accountId: currentUsersId,
                type: 2
            }).then((res) => {
                console.log(res.data);
                console.log("love removed!")
            })
        }
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

    // get likes for each post
    useEffect(() => {
        posts.forEach((post) => {
            axios.get(`http://localhost:8080/posts/${post.postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    const isLiked = res.data.some((like) => like.userId === currentUsersId);
                    setLikedPosts((prev) => ({
                        ...prev,
                        [post.postId]: isLiked
                    }))
                    console.log(res.data)
                    setLikedPosts(res.data)
                })
                .catch((ex) => {
                    console.log(ex);
                })
        })
    }, [posts, token])

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
                            <button
                                onClick={() => handleLiked(post.postId)}
                            >
                                {likedPosts[post.postId] ? 'Unlike' : 'Like'}
                            </button>

                            <button
                                onClick={() => handleLoved(post.postId)}
                            >
                                {lovedPosts[post.postId] ? 'Unlove' : 'Love'}
                            </button>
                            <input type="text"></input>
                            <button>comment</button>
                        </div>

                    </div >
                ))

            }
        </div>);
}

export default UsersPostsDisplay;