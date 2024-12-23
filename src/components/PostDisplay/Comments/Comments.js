import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [commentsVisible, setCommentsVisible] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/posts/${postId}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setComments(res.data);
            })
    }, [postId])

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`)
    }


    return (
        <div className="comments">
            <hr />
            <strong style={{ textDecoration: "underline" }}>Comments</strong><br />
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.commentId} className="commentContainer">
                        <img
                            className="profilePictureComment"
                            src={comment.postedBy.profilePicture}
                            alt={comment.postedBy.username}
                            onClick={() => handleUserClick(comment.postedBy.accountId)}
                        />
                        <span className="profileName" onClick={() => handleUserClick(comment.postedBy.accountId)}>
                            {comment.postedBy.username}:{" "}
                        </span>
                        <span>{comment.text}</span>
                    </div>
                ))
            ) : (
                <div>
                    <p>No comments to display</p> <br />
                </div>

            )}
            <hr />
        </div >
    );
}

export default Comments;