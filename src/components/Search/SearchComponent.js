import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../PostDisplay/Comments/Comments";
const SearchComponent = ({ posts, users, setPosts, setUsers }) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [searchString, setSearchString] = useState('');
    const navigate = useNavigate();
    const [likedPosts, setLikedPosts] = useState({});  // For 'like' reactions
    const [lovedPosts, setLovedPosts] = useState({});  // For 'love' reactions

    const handleSearch = () => {
        if (searchString.trim() === '') {
            setUsers([]);
            setPosts([]);
            return;
        }

        // search accounts
        axios.get(`http://localhost:8080/api/search/accounts/${searchString}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((ex) => {
                console.log(ex);
            })

        // search posts
        axios.get(`http://localhost:8080/api/search/posts/${searchString}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch((ex) => {
                console.log(ex);
            })

    };

    // Navigate to user profile on click
    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`)
    };


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
                        accountId: userId,
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
                    accountId: userId,
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
                        accountId: userId,
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
                    accountId: userId,
                    type: 2
                });
                setLovedPosts((prevState) => ({ ...prevState, [postId]: true }));
            }
        } catch (error) {
            console.error("Error handling love:", error);
        }
    };

    // Check if the post is liked or loved
    const checkIfLiked = (postId) => likedPosts[postId];
    const checkIfLoved = (postId) => lovedPosts[postId];
    return (
        <div>
            <div className="search">
                <input placeholder="search here!~" type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)}></input>
                <button onClick={handleSearch}>Search</button>
            </div>


            <h3 className="headerDiv">Users</h3>
            <hr />
            {
                users.map((user) => (
                    <div className="searchResults" id={user.accountId} onClick={() => handleUserClick(user.accountId)}>
                        <img className="profilePicture" src={user.profilePictureUrl} />
                        <span>{user.username}</span>
                    </div>
                ))
            }
            <br />
            <h3 className="headerDiv">Posts</h3>
            <hr />
            {
                posts.map((post) => (
                    <div className="postCard" id={post.postId}>
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
                ))
            }
        </div>
    );
}

export default SearchComponent;