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
                            <b>{post.postText}</b>
                        </div>


                        <div className="postFooter">
                            <hr />
                            <img ></img>
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