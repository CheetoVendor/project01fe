import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../PostDisplay/Comments/Comments";
import Reaction from "../PostDisplay/Reaction";
const SearchComponent = ({ posts, users, setPosts, setUsers }) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [searchString, setSearchString] = useState('');
    const navigate = useNavigate();

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

    const handleUserClick = (accountId) => {
        navigate(`/profile/${accountId}`)
    }

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
                        <Reaction postId={post.postId} />
                        <Comments postId={post.postId} />
                    </div>
                ))
            }
        </div>
    );
}

export default SearchComponent;