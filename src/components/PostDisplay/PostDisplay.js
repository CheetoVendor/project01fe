import { MdAlignHorizontalLeft, MdMargin, MdOutlineThumbUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
const PostDisplay = ({ posts }) => {
    return (
        <>
            {
                posts.map((post) => (
                    <div className="postCard" key={post.postId}>
                        <div className="postHeader">
                            <img className="profilePicture" src={post.postedBy.profilePicture}></img>
                            <b className="profileName">{post.postedBy.username}</b>
                        </div>
                        <hr className="divider" />
                        <div className="postContent">
                            <span>{post.postText}</span>
                            <br />
                            <img src={post.imageUrl}></img>
                        </div>
                        <hr />
                        <div className="postFooter">

                            <MdOutlineThumbUp size={30} />
                            <FaRegHeart size={30} />
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