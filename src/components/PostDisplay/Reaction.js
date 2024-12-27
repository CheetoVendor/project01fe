import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
const Reaction = ({ postId }) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [liked, setLiked] = useState(false)
    const [loved, setLoved] = useState(false)

    const handleLiked = () => {
        // like
        if (!liked) {
            axios.post(`http://localhost:8080/posts/${postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                accountId: userId,
                type: 1
            })
                .then((res) => {
                    console.log(res.data);
                    setLiked(true);
                }).catch((ex) => {
                    console.log(ex);
                })
        } else {
            // remove like
            axios.delete(`http://localhost:8080/posts/${postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setLiked(false);
                }).catch((ex) => {
                    console.log(ex);
                })

        }
    }
    const handleLoved = () => {
        if (!loved) {
            axios.post(`http://localhost:8080/posts/${postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                accountId: userId,
                type: 2
            })
                .then((res) => {
                    console.log(res.data);
                    setLoved(true);
                }).catch((ex) => {
                    console.log(ex);
                })
        } else {
            axios.delete(`http://localhost:8080/posts/${postId}/likes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setLoved(false);
                })
                .catch((ex) => {
                    console.log(ex);
                })
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/likes/${postId}/${userId}/1`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setLiked(true)
                }
            })
            .catch((ex) => {
                console.log(ex);
            })

        // check if loved 

        axios.get(`http://localhost:8080/likes/${postId}/${userId}/2`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setLoved(true)
                }
            })
            .catch((ex) => {
                console.log(ex);
            })
    }, [postId, userId])

    return (
        <div className="reactionDiv">
            {liked ? (
                <MdThumbUp size={30} style={{ cursor: 'pointer' }} onClick={() => handleLiked()} />
            ) : (
                <MdOutlineThumbUp size={30} style={{ cursor: 'pointer' }} onClick={() => handleLiked()} />

            )}


            {loved ? (
                <FaHeart
                    size={30}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleLoved()}
                />
            ) : (
                <FaRegHeart
                    size={30}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleLoved()}
                />
            )}
        </div>
    );
}

export default Reaction;