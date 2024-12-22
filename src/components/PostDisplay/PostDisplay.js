import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const PostDisplay = ({ posts }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const handleUserClick = (postedById) => {
        navigate(`/profile/${postedById.accountId}`);
    }

    const checkIfPostLiked = (postId) => {
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
            console.log('help me..')
            console.log(res.data)
        })
    }

    const handleLoved = (postId) => {

    }


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

                            <MdOutlineThumbUp size={30} style={{ cursor: 'pointer' }} onClick={() => handleLiked(post.postId)} />

                            <FaRegHeart size={30} style={{ cursor: 'pointer' }} />
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