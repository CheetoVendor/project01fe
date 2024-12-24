import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Comments from "./Comments/Comments";
const PostDisplay = ({ setPosts, posts, update }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [likedPosts, setLikedPosts] = useState({});
    const [lovedPosts, setLovedPosts] = useState({});
    const [commentText, setCommentText] = useState("");

    const handleUserClick = (postedById) => {
        navigate(`/profile/${postedById.accountId}`);
    }

    const handleLiked = (postId) => {
        setLikedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));

        const isLiked = likedPosts[postId];
        if (isLiked) {
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
                accountId: userId,
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

        const isLiked = lovedPosts[postId];

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
                accountId: userId,
                type: 2
            }).then((res) => {
                console.log(res.data);
                console.log("love removed!")
            })
        }
    }

    // get likes for posts
    useEffect(() => {
        posts.forEach(post => {
            axios.get(`http://localhost:8080/posts/${post.postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                accountId: userId
            })
                .then((res) => {
                    const isLiked = res.data.some((like) => like.userId === userId);
                    setLikedPosts((prev) => ({
                        ...prev,
                        [post.postId]: isLiked
                    }))
                    console.log(res.data)
                    //setLikedPosts(res.data)
                })
                .catch((ex) => {
                    console.log(ex);
                })
        });
    }, [userId, token])

    // posts comment to website
    const handleSubmitComment = (postId) => {
        axios.post(`http://localhost:8080/posts/${postId}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            postId: postId,
            text: commentText,
            accountId: userId
        })
            .then((res) => {
                setCommentText("");
                console.log(res);
                console.log("Comment submitted")
            })
            .catch((ex) => {
                console.log(ex);
            })
    }

    return (
        <>
            {
                posts.map((post) => (
                    <div className="postCard" key={post.postId}>
                        <div className="postHeader" onClick={() => handleUserClick(post.postedBy)}>
                            <img className="profilePicture" src={post.postedBy.profilePicture || "s"}></img>
                            <b className="profileName">{post.postedBy.username}</b>
                        </div>
                        <hr className="divider" />
                        <div className="postContent">
                            <span>{post.postText}</span>
                            <br />
                            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                        </div>
                        <hr />
                        <Comments postId={post.postId} />
                        <div className="postFooter">
                            {likedPosts[post.postId] ? (
                                <MdThumbUp size={30} style={{ cursor: 'pointer' }} onClick={() => handleLiked(post.postId)} />
                            ) : (
                                <MdOutlineThumbUp size={30} style={{ cursor: 'pointer' }} onClick={() => handleLiked(post.postId)} />

                            )}


                            {lovedPosts[post.postId] ? (
                                <FaHeart
                                    size={30}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleLoved(post.postId)}
                                />
                            ) : (
                                <FaRegHeart
                                    size={30}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleLoved(post.postId)}
                                />
                            )}
                            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
                            <button onClick={() => handleSubmitComment(post.postId)}>comment</button>
                        </div>

                    </div >
                ))

            }
        </>
    );
}

export default PostDisplay;