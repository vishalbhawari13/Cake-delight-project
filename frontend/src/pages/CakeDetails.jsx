import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingForm from "../components/RatingForm";
import { getCakeById } from "../services/catalogService";
import {
    getCakeRatings,
    getAverageRating
} from "../services/ratingService";

import { addToBasket } from "../services/orderService";

function CakeDetails() {

    const { id } = useParams();

    const [cake, setCake] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [average, setAverage] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {

            try {

                const cakeResponse =
                    await getCakeById(id);

                const ratingResponse =
                    await getCakeRatings(id);

                const averageResponse =
                    await getAverageRating(id);

                setCake(
                    cakeResponse.data || cakeResponse
                );

                setRatings(
                    ratingResponse.data || ratingResponse
                );

                setAverage(
                    averageResponse.data ||
                    averageResponse
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, [id]);


    const handleAddToCart = async () => {

        try {

            await addToBasket(
                id,
                quantity
            );

            alert("Cake added to cart!");

        } catch (error) {

            console.error(error);

            alert(
                "Unable to add cake to cart."
            );

        }

    };


    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!cake) {
        return <h2>Cake not found.</h2>;
    }


    return (

        <main className="cake-details">

            <div className="cake-details-image">

                <img
                    src={cake.imageUrl}
                    alt={cake.name}
                />

            </div>


            <div className="cake-details-info">

                <h1>
                    {cake.name}
                </h1>

                <p>
                    {cake.description}
                </p>

                <h2>
                    ₹{cake.price}
                </h2>

                <p>
                    Category: {cake.category}
                </p>

                <p>
                    Available Stock: {cake.stock}
                </p>


                {average && (

                    <div>

                        ⭐ {average.averageRating}

                        {" "}

                        ({average.totalRatings} reviews)

                    </div>

                )}


                <div className="quantity">

                    <button
                        onClick={() =>
                            setQuantity(
                                Math.max(
                                    1,
                                    quantity - 1
                                )
                            )
                        }
                    >
                        -
                    </button>

                    <span>
                        {quantity}
                    </span>

                    <button
                        onClick={() =>
                            setQuantity(
                                Math.min(
                                    cake.stock,
                                    quantity + 1
                                )
                            )
                        }
                    >
                        +
                    </button>

                </div>


                <button
                    className="button"
                    onClick={handleAddToCart}
                    disabled={cake.stock === 0}
                >
                    Add To Cart 🛒
                </button>

            </div>


            <section className="reviews">

                <h2>
                    Customer Reviews
                </h2>

                {ratings.length === 0 ? (

                    <p>
                        No reviews yet.
                    </p>

                ) : (

                    ratings.map((rating) => (

                        <div
                            className="review"
                            key={rating._id}
                        >

                            <strong>
                                {rating.userId}
                            </strong>

                            <p>
                                {"⭐".repeat(rating.rating)}
                            </p>

                            <p>
                                {rating.review}
                            </p>

                        </div>

                    ))

                )}

            </section>

            <RatingForm
                cakeId={id}
                userId="user1"
                onRatingAdded={() => {
                    window.location.reload();
                }}
            />

        </main>
    );
}

export default CakeDetails;