import { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";
import axios from "axios";

const AxiosGetPosts = () => {
    const [posts, setPost] = useState([])
    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get("http://localhost:8080/posts", {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setPost(res.data)
            });
    }, [])

    return (
        <div className="postContainer">
            <PostDisplay posts={posts} />
        </div>
    );
}

export default AxiosGetPosts;