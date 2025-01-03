import { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostAdded }) => {
    const [postText, setPostText] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        if (postText.trim() === '') {
            return;
        }

        const token = localStorage.getItem('token')

        axios.post("http://localhost:8080/posts", {
            headers: {
                Authorization: 'Bearer ' + token
            },
            postText: postText,
            postedBy: { accountId: 1 }
        })
            .then((res) => {
                console.log("HELLO" + res);
                onPostAdded(res.data);
            }).catch((ex) => {
                console.log(ex);
            })
        setPostText("")
    }

    return (
        <div className="postformcontainer">
            <img className="profilePicture" src="https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" />
            <form className="postForm" onSubmit={(e) => submitHandler(e)}>
                <input type="text" value={postText}
                    placeholder="whatcha got to say?"
                    onChange={(e) => setPostText(e.target.value)}></input>
                <button>Post</button>
            </form>
        </div>
    );

}

export default PostForm;