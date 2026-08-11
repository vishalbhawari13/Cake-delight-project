import { Link } from "react-router-dom";

function CakeCard({ cake }) {

    return (

        <div className="cake-card">

            <img
                src={cake.imageUrl}
                alt={cake.name}
                className="cake-image"
            />

            <div className="cake-info">

                <h3>
                    {cake.name}
                </h3>

                <p>
                    {cake.description}
                </p>

                <h4>
                    ₹{cake.price}
                </h4>

                <p>
                    Stock: {cake.stock}
                </p>

                <Link
                    to={`/cakes/${cake._id}`}
                    className="button"
                >
                    View Cake
                </Link>

            </div>

        </div>
    );
}

export default CakeCard;