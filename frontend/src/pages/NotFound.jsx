import { Link } from "react-router-dom";

function NotFound() {

    return (

        <main>

            <h1>
                404
            </h1>

            <h2>
                Page Not Found
            </h2>

            <Link
                to="/"
                className="button"
            >
                Go Home
            </Link>

        </main>
    );
}

export default NotFound;