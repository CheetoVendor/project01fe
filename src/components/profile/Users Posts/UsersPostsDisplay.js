import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../../PostDisplay/Comments/Comments";

const UsersPostsDisplay = ({ userId }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});  // For 'like' reactions
    const [lovedPosts, setLovedPosts] = useState({});  // For 'love' reactions
    const token = localStorage.getItem('token');
    const currentUsersId = localStorage.getItem('userId');

    const handleUserClick = (id) => {
        navigate(`/profile/${id}`);
    }

    // Handle the "like" action
    const handleLiked = async (postId) => {
        try {
            const isLiked = likedPosts[postId]; // Get the current like status for the post

            // If the post is liked, remove the like
            if (isLiked) {
                await axios.delete(`http://localhost:8080/posts/${postId}/likes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        postId,
                        accountId: currentUsersId,
                        type: 1
                    }
                });
                setLikedPosts((prevState) => ({ ...prevState, [postId]: false }));
            } else {
                // Otherwise, add the like
                await axios.post(`http://localhost:8080/posts/${postId}/likes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    postId,
                    accountId: currentUsersId,
                    type: 1
                });
                setLikedPosts((prevState) => ({ ...prevState, [postId]: true }));
            }
        } catch (error) {
            console.error("Error handling like:", error);
        }
    };

    // Handle the "love" action
    const handleLoved = async (postId) => {
        try {
            const isLoved = lovedPosts[postId]; // Get the current love status for the post

            // If the post is loved, remove the love
            if (isLoved) {
                await axios.delete(`http://localhost:8080/posts/${postId}/likes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        postId,
                        accountId: currentUsersId,
                        type: 2
                    }
                });
                setLovedPosts((prevState) => ({ ...prevState, [postId]: false }));
            } else {
                // Otherwise, add the love
                await axios.post(`http://localhost:8080/posts/${postId}/likes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    postId,
                    accountId: currentUsersId,
                    type: 2
                });
                setLovedPosts((prevState) => ({ ...prevState, [postId]: true }));
            }
        } catch (error) {
            console.error("Error handling love:", error);
        }
    };

    // Fetch initial likes and loves for the posts
    const fetchLikesAndLoves = async (posts) => {
        const postIds = posts.map((post) => post.postId);

        try {
            const likedResponses = await Promise.all(
                postIds.map((postId) =>
                    axios.get(`http://localhost:8080/likes/${postId}/${currentUsersId}/1`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                )
            );

            const lovedResponses = await Promise.all(
                postIds.map((postId) =>
                    axios.get(`http://localhost:8080/likes/${postId}/${currentUsersId}/2`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                )
            );

            // Map responses to set state
            const likedMap = likedResponses.reduce((acc, response, index) => {
                acc[postIds[index]] = response.data; // true or false based on the response
                return acc;
            }, {});

            const lovedMap = lovedResponses.reduce((acc, response, index) => {
                acc[postIds[index]] = response.data; // true or false based on the response
                return acc;
            }, {});

            setLikedPosts(likedMap);
            setLovedPosts(lovedMap);
        } catch (error) {
            console.error("Error fetching likes and loves:", error);
        }
    };

    // Get user's posts
    useEffect(() => {
        axios.get(`http://localhost:8080/accounts/${userId}/posts`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setPosts(res.data);
            fetchLikesAndLoves(res.data); // Fetch likes/loves when posts are loaded
        }).catch((error) => {
            console.log(error);
        });
    }, [userId, token]);

    // Check if the post is liked or loved
    const checkIfLiked = (postId) => likedPosts[postId];
    const checkIfLoved = (postId) => lovedPosts[postId];

    return (
        <div>
            <h2>Users Posts</h2>
            {posts.map((post) => (
                <div className="postCard" key={post.postId}>
                    <div className="postHeader" onClick={() => handleUserClick(post.postedBy.accountId)}>
                        <img className="profilePicture" src={post.postedBy.profilePicture} alt="Profile" />
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
                        <button onClick={() => handleLiked(post.postId)}>
                            {checkIfLiked(post.postId) ? 'Unlike' : 'Like'}
                        </button>
                        <button onClick={() => handleLoved(post.postId)}>
                            {checkIfLoved(post.postId) ? 'Unlove' : 'Love'}
                        </button>
                        <input type="text" placeholder="Add a comment..." />
                        <button>Comment</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersPostsDisplay;
