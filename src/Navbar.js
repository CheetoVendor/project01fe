import { Link } from "react-router-dom";

const Navbar = () => {

    // signs out (removes token)
    const signout = () => {
        localStorage.removeItem('token')
    }

    const token = localStorage.getItem('token');

    return (
        <div className="navbar">
            {/* change O-O to page name on click*/}
            <h2>Socialbook ::  O-O</h2>
            <div className="links">
                <Link to="./home">Home</Link>
                <Link to="./login">Login</Link>
                <Link to="./signup">Signup</Link>
                <Link to="./search">Search</Link>
                <Link to="./login" onClick={signout}>Signout</Link>
                <Link to="./profile/1" >Profile</Link>
                <Link to="./relationships">Relationships</Link>
                <Link to="./editprofile">Edit Profile</Link>
            </div>
        </div >
    );
}

export default Navbar;