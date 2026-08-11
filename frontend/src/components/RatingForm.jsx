import { useState } from "react";
import { createRating } from "../services/ratingService";

function RatingForm({ cakeId, userId = "user1", onRatingAdded }) {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (rating === 0) {
            setMessage("Please select a rating.");
            return;
        }

        try {

            setLoading(true);
            setMessage("");

            await createRating({
                cakeId,
                userId,
                rating,
                review
            });

            setMessage("Review submitted successfully! ⭐");

            setRating(0);
            setReview("");

            if (onRatingAdded) {
                onRatingAdded();
            }

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to submit review."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="rating-form">

            <h2>
                Rate This Cake
            </h2>

            <div className="star-selector">

                {[1, 2, 3, 4, 5].map((star) => (

                    <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={
                            star <= rating
                                ? "star active"
                                : "star"
                        }
                    >
                        ★
                    </button>

                ))}

            </div>

            <p>
                {rating > 0
                    ? `${rating} out of 5`
                    : "Select a rating"}
            </p>

            <textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) =>
                    setReview(e.target.value)
                }
                rows="5"
            />

            <button
                className="button"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading
                    ? "Submitting..."
                    : "Submit Review"}
            </button>

            {message && (
                <p>
                    {message}
                </p>
            )}

        </div>
    );
}

export default RatingForm;