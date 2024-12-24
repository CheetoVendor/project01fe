import { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";
import axios from "axios";

const AxiosGetPosts = ({ posts, setPosts }) => {

    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get("http://localhost:8080/posts", {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setPosts(res.data)
            });
    }, [posts])

    return (
        <div className="postContainer">
            <PostDisplay setPosts={setPosts} posts={posts} update={useEffect} />
        </div>
    );
}

export default AxiosGetPosts;