import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Comments from "./Comments/Comments";
import Reaction from "./Reaction";
const PostDisplay = ({ setPosts, posts }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');


    const handleUserClick = (postedById) => {
        navigate(`/profile/${postedById.accountId}`);
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
                        <Reaction postId={post.postId} />
                        <Comments postId={post.postId} />


                    </div >
                ))

            }
        </>
    );
}

export default PostDisplay;