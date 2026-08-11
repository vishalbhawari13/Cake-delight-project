import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";
import { getOrderById } from "../services/orderService";
import { createRating } from "../services/ratingService";

function OrderDetails() {
    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [ratingItem, setRatingItem] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getOrderById(orderId);

                setOrder(response.data || response);
            } catch (error) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                    "Unable to load order details."
                );
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [orderId]);

    const openRatingForm = (item) => {
        setRatingItem(item);
        setRating(0);
        setReview("");
        setMessage("");
    };

    const closeRatingForm = () => {
        if (submitting) return;

        setRatingItem(null);
        setRating(0);
        setReview("");
        setMessage("");
    };

    const submitRating = async () => {
        if (!rating) {
            setMessage("Please select a rating.");
            return;
        }

        if (!ratingItem) return;

        try {
            setSubmitting(true);
            setMessage("");

            await createRating({
                cakeId: ratingItem.cakeId,

                // Replace this with the authenticated user's ID later.
                userId: "user1",

                rating,
                review: review.trim(),
            });

            setMessage("Rating submitted successfully! ⭐");

            setTimeout(() => {
                closeRatingForm();
            }, 1000);
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to submit rating. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status?.toUpperCase()) {
            case "DELIVERED":
                return "status delivered";

            case "CANCELLED":
                return "status cancelled";

            case "SHIPPED":
                return "status shipped";

            case "PROCESSING":
                return "status processing";

            case "PENDING":
                return "status pending";

            default:
                return "status";
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <main className="order-details-page">
                <div className="order-loading">
                    <div className="loading-spinner"></div>
                    <h2>Loading your order...</h2>
                    <p>Please wait while we fetch your order details.</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="order-details-page">
                <div className="order-error">
                    <div className="error-icon">⚠️</div>

                    <h2>Unable to load order</h2>

                    <p>{error}</p>

                    <button
                        className="button"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="order-details-page">
                <div className="order-error">
                    <div className="error-icon">📦</div>

                    <h2>Order not found</h2>

                    <p>
                        We couldn't find the order you're looking for.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="order-details-page">

            {/* Page Header */}
            <div className="order-page-header">

                <div>
                    <p className="breadcrumb">
                        Orders / Order Details
                    </p>

                    <h1>
                        Order Details
                    </h1>

                    <p className="order-number">
                        Order #{order._id}
                    </p>
                </div>

                <div className={getStatusClass(order.status)}>
                    <span className="status-dot"></span>
                    {order.status}
                </div>

            </div>


            {/* Order Summary */}
            <section className="order-summary">

                <div className="summary-card">

                    <div className="summary-icon">
                        📦
                    </div>

                    <div>
                        <span>Order ID</span>
                        <strong>{order._id}</strong>
                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        👤
                    </div>

                    <div>
                        <span>Customer</span>
                        <strong>
                            {order.customerName || "Customer"}
                        </strong>
                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        📅
                    </div>

                    <div>
                        <span>Order Date</span>
                        <strong>
                            {formatDate(
                                order.createdAt ||
                                order.orderDate
                            )}
                        </strong>
                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        💰
                    </div>

                    <div>
                        <span>Total Amount</span>
                        <strong className="total-price">
                            ₹{Number(
                                order.totalAmount || 0
                            ).toLocaleString("en-IN")}
                        </strong>
                    </div>

                </div>

            </section>


            {/* Main Content */}
            <div className="order-content">

                {/* Items */}
                <section className="items-section">

                    <div className="section-heading">
                        <div>
                            <h2>Order Items</h2>

                            <p>
                                {order.items?.length || 0}{" "}
                                {order.items?.length === 1
                                    ? "item"
                                    : "items"}{" "}
                                in this order
                            </p>
                        </div>
                    </div>


                    <div className="items-list">

                        {order.items?.length > 0 ? (
                            order.items.map((item, index) => (

                                <article
                                    className="order-item-card"
                                    key={`${item.cakeId}-${index}`}
                                >

                                    {/* Product Image */}
                                    <div className="product-image">

                                        {item.image ||
                                        item.cakeImage ? (
                                            <img
                                                src={
                                                    item.image ||
                                                    item.cakeImage
                                                }
                                                alt={item.cakeName}
                                            />
                                        ) : (
                                            <span>🍰</span>
                                        )}

                                    </div>


                                    {/* Product Info */}
                                    <div className="product-info">

                                        <h3>
                                            {item.cakeName}
                                        </h3>

                                        <p className="product-meta">
                                            Cake
                                        </p>

                                        <div className="product-details">

                                            <span>
                                                Qty:{" "}
                                                <strong>
                                                    {item.quantity}
                                                </strong>
                                            </span>

                                            <span>
                                                ₹
                                                {Number(
                                                    item.price || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}{" "}
                                                each
                                            </span>

                                        </div>

                                    </div>


                                    {/* Price */}
                                    <div className="item-price">

                                        <span>Total</span>

                                        <strong>
                                            ₹
                                            {(
                                                Number(
                                                    item.price || 0
                                                ) *
                                                Number(
                                                    item.quantity || 0
                                                )
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>


                                    {/* Rating */}
                                    {order.status === "DELIVERED" && (
                                        <button
                                            className="rate-button"
                                            onClick={() =>
                                                openRatingForm(item)
                                            }
                                        >
                                            ⭐ Rate
                                        </button>
                                    )}

                                </article>

                            ))
                        ) : (
                            <div className="empty-items">
                                <span>🛒</span>
                                <h3>No items found</h3>
                                <p>
                                    This order doesn't contain
                                    any items.
                                </p>
                            </div>
                        )}

                    </div>

                </section>


                {/* Right Sidebar */}
                <aside className="order-sidebar">

                    <div className="sidebar-card">

                        <h3>Order Summary</h3>


                        <div className="summary-row">
                            <span>Items</span>

                            <strong>
                                {order.items?.reduce(
                                    (total, item) =>
                                        total +
                                        Number(
                                            item.quantity || 0
                                        ),
                                    0
                                )}
                            </strong>
                        </div>


                        <div className="summary-row">
                            <span>Subtotal</span>

                            <strong>
                                ₹
                                {Number(
                                    order.totalAmount || 0
                                ).toLocaleString("en-IN")}
                            </strong>
                        </div>


                        <div className="summary-divider"></div>


                        <div className="summary-total">
                            <span>Total</span>

                            <strong>
                                ₹
                                {Number(
                                    order.totalAmount || 0
                                ).toLocaleString("en-IN")}
                            </strong>
                        </div>

                    </div>


                    {/* Delivery Status */}
                    <div className="sidebar-card">

                        <h3>Delivery Status</h3>

                        <div className="delivery-timeline">

                            <div className="timeline-item completed">
                                <span className="timeline-dot">
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Order Placed
                                    </strong>

                                    <small>
                                        Your order has been
                                        received
                                    </small>
                                </div>
                            </div>


                            <div
                                className={
                                    order.status !==
                                    "PENDING"
                                        ? "timeline-item completed"
                                        : "timeline-item"
                                }
                            >
                                <span className="timeline-dot">
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Processing
                                    </strong>

                                    <small>
                                        Your cake is being
                                        prepared
                                    </small>
                                </div>
                            </div>


                            <div
                                className={
                                    [
                                        "SHIPPED",
                                        "DELIVERED",
                                    ].includes(
                                        order.status
                                    )
                                        ? "timeline-item completed"
                                        : "timeline-item"
                                }
                            >
                                <span className="timeline-dot">
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Shipped
                                    </strong>

                                    <small>
                                        Your order is on its
                                        way
                                    </small>
                                </div>
                            </div>


                            <div
                                className={
                                    order.status ===
                                    "DELIVERED"
                                        ? "timeline-item completed"
                                        : "timeline-item"
                                }
                            >
                                <span className="timeline-dot">
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Delivered
                                    </strong>

                                    <small>
                                        Order delivered
                                        successfully
                                    </small>
                                </div>
                            </div>

                        </div>

                    </div>

                </aside>

            </div>


            {/* Rating Modal */}
            {ratingItem && (

                <div
                    className="rating-overlay"
                    onClick={closeRatingForm}
                >

                    <div
                        className="rating-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="close-rating"
                            onClick={closeRatingForm}
                            disabled={submitting}
                            aria-label="Close"
                        >
                            ×
                        </button>


                        <div className="rating-header">

                            <div className="rating-cake-icon">
                                🍰
                            </div>

                            <h2>
                                Rate your cake
                            </h2>

                            <p>
                                How was your experience with{" "}
                                <strong>
                                    {ratingItem.cakeName}
                                </strong>
                                ?
                            </p>

                        </div>


                        {/* Stars */}
                        <div className="star-selector">

                            {[1, 2, 3, 4, 5].map(
                                (star) => (

                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() =>
                                            setRating(star)
                                        }
                                        className={
                                            star <= rating
                                                ? "star active"
                                                : "star"
                                        }
                                        aria-label={`${star} star`}
                                    >
                                        ★
                                    </button>

                                )
                            )}

                        </div>


                        <p className="rating-label">

                            {rating === 0
                                ? "Select your rating"
                                : rating === 5
                                    ? "Excellent! 🤩"
                                    : rating === 4
                                        ? "Great! 😊"
                                        : rating === 3
                                            ? "Good 👍"
                                            : rating === 2
                                                ? "Could be better"
                                                : "We're sorry 😔"}

                        </p>


                        <textarea
                            className="review-input"
                            placeholder="Tell us what you liked about the cake..."
                            value={review}
                            onChange={(e) =>
                                setReview(
                                    e.target.value
                                )
                            }
                            maxLength={500}
                        />


                        <div className="review-count">
                            {review.length}/500
                        </div>


                        {message && (
                            <div
                                className={
                                    message.includes(
                                        "successfully"
                                    )
                                        ? "rating-message success"
                                        : "rating-message error"
                                }
                            >
                                {message}
                            </div>
                        )}


                        <div className="rating-actions">

                            <button
                                className="cancel-button"
                                onClick={closeRatingForm}
                                disabled={submitting}
                            >
                                Cancel
                            </button>

                            <button
                                className="submit-rating-button"
                                onClick={submitRating}
                                disabled={
                                    submitting ||
                                    rating === 0
                                }
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit Rating ⭐"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </main>
    );
}

export default OrderDetails;

