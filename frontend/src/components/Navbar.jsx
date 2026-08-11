import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="logo">
                    🍰 Cake Delight
                </Link>

                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/cart">
                        🛒 Cart
                    </Link>

                    <Link to="/orders">
                        📦 My Orders
                    </Link>
                    <Link to="/admin/add-cake">
                        ⚙️ Admin
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;