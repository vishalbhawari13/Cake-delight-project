import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminAddCake.css";

function AdminAddCake() {
    // =========================
    // CAKE FORM
    // =========================

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        stock: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    // =========================
    // ORDERS
    // =========================

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [orderMessage, setOrderMessage] = useState("");
    const [updatingOrderId, setUpdatingOrderId] = useState(null);


    // =========================
    // AVAILABLE STATUSES
    // =========================

    const statuses = [
        "PLACED",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED"
    ];


    // =========================
    // HANDLE CAKE INPUT
    // =========================

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    // =========================
    // ADD CAKE
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await api.post(
                "/api/catalog/cakes",
                {
                    name: form.name,
                    description: form.description,
                    price: Number(form.price),
                    category: form.category,
                    imageUrl: form.imageUrl,
                    stock: Number(form.stock)
                }
            );

            console.log("Cake added:", response.data);

            setMessage("Cake added successfully! 🎂");

            setForm({
                name: "",
                description: "",
                price: "",
                category: "",
                imageUrl: "",
                stock: ""
            });

        } catch (error) {
            console.error("Failed to add cake:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to add cake"
            );

        } finally {
            setLoading(false);
        }
    };


    // =========================
    // GET ALL ORDERS
    // =========================

    const fetchOrders = async () => {
        setOrdersLoading(true);
        setOrderMessage("");

        try {
            const response = await api.get("/api/orders");

            console.log("Orders API response:", response.data);

            /*
                API response:

                {
                    success: true,
                    count: 3,
                    data: [...]
                }

                Therefore:
                response.data.data = orders
            */

            if (Array.isArray(response.data.data)) {
                setOrders(response.data.data);
            } else {
                setOrders([]);
                setOrderMessage("No orders found.");
            }

        } catch (error) {
            console.error("Failed to fetch orders:", error);

            setOrderMessage(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {
            setOrdersLoading(false);
        }
    };


    // =========================
    // LOAD ORDERS ON PAGE LOAD
    // =========================

    useEffect(() => {
        fetchOrders();
    }, []);


    // =========================
    // UPDATE ORDER STATUS
    // =========================

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingOrderId(orderId);
        setOrderMessage("");

        try {
            const response = await api.put(
                `/api/orders/${orderId}/status`,
                {
                    status: newStatus
                }
            );

            console.log(
                "Order status updated:",
                response.data
            );

            // Update only this order in the UI
            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order._id === orderId
                        ? {
                            ...order,
                            status: newStatus
                        }
                        : order
                )
            );

            setOrderMessage(
                `Order #${orderId} updated to ${formatStatus(newStatus)}.`
            );

        } catch (error) {
            console.error(
                "Failed to update order status:",
                error
            );

            console.error(
                "Backend error:",
                error.response?.data
            );

            setOrderMessage(
                error.response?.data?.message ||
                "Failed to update order status"
            );

        } finally {
            setUpdatingOrderId(null);
        }
    };


    // =========================
    // FORMAT STATUS
    // =========================

    const formatStatus = (status) => {
        if (!status) {
            return "Unknown";
        }

        return status
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };


    // =========================
    // FORMAT DATE
    // =========================

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        try {
            return new Date(date).toLocaleString(
                "en-IN",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            );
        } catch {
            return "N/A";
        }
    };


    // =========================
    // FORMAT MONEY
    // =========================

    const formatMoney = (amount) => {
        return Number(amount || 0).toLocaleString(
            "en-IN"
        );
    };


    // =========================
    // RENDER
    // =========================

    return (
        <main className="admin-page">

            <div className="admin-container">


                {/* ==========================================
                    ADD NEW CAKE
                ========================================== */}

                <div className="admin-header">

                    <div className="header-icon">
                        🎂
                    </div>

                    <div>
                        <h1>
                            Add New Cake
                        </h1>

                        <p>
                            Add a delicious new cake to your catalog.
                        </p>
                    </div>

                </div>


                {/* ==========================================
                    CAKE FORM
                ========================================== */}

                <form
                    className="cake-form"
                    onSubmit={handleSubmit}
                >

                    {/* Cake Information */}

                    <div className="form-section">

                        <h2>
                            🍰 Cake Information
                        </h2>


                        {/* Name */}

                        <div className="form-group">

                            <label htmlFor="name">
                                Cake Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="e.g. Chocolate Truffle Cake"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Description */}

                        <div className="form-group">

                            <label htmlFor="description">
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                placeholder="Describe the cake, flavors, ingredients..."
                                value={form.description}
                                onChange={handleChange}
                                required
                                rows="5"
                            />

                        </div>


                        {/* Price + Stock */}

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="price">
                                    Price
                                </label>

                                <div className="input-with-symbol">

                                    <span>
                                        ₹
                                    </span>

                                    <input
                                        id="price"
                                        type="number"
                                        name="price"
                                        placeholder="599"
                                        value={form.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-group">

                                <label htmlFor="stock">
                                    Stock Available
                                </label>

                                <input
                                    id="stock"
                                    type="number"
                                    name="stock"
                                    placeholder="10"
                                    value={form.stock}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />

                            </div>

                        </div>


                        {/* Category */}

                        <div className="form-group">

                            <label htmlFor="category">
                                Category
                            </label>

                            <input
                                id="category"
                                type="text"
                                name="category"
                                placeholder="e.g. Birthday, Chocolate, Wedding"
                                value={form.category}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* ==========================================
                        CAKE IMAGE
                    ========================================== */}

                    <div className="form-section">

                        <h2>
                            🖼️ Cake Image
                        </h2>

                        <div className="form-group">

                            <label htmlFor="imageUrl">
                                Image URL
                            </label>

                            <input
                                id="imageUrl"
                                type="url"
                                name="imageUrl"
                                placeholder="https://example.com/cake.jpg"
                                value={form.imageUrl}
                                onChange={handleChange}
                                required
                            />

                            <small>
                                Add a publicly accessible image URL for the cake.
                            </small>

                        </div>


                        {form.imageUrl && (

                            <div className="image-preview">

                                <img
                                    src={form.imageUrl}
                                    alt="Cake preview"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />

                            </div>

                        )}

                    </div>


                    {/* ==========================================
                        ADD CAKE BUTTON
                    ========================================== */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Adding Cake...
                                </>
                            ) : (
                                <>
                                    Add Cake 🎂
                                </>
                            )}

                        </button>

                    </div>

                </form>


                {/* ==========================================
                    CAKE MESSAGE
                ========================================== */}

                {message && (

                    <div
                        className={`form-message ${
                            message.includes("successfully")
                                ? "success"
                                : "error"
                        }`}
                    >
                        {message}
                    </div>

                )}


                {/* ==========================================
                    ORDER MANAGEMENT
                ========================================== */}

                <section className="admin-orders">


                    {/* Orders Header */}

                    <div className="orders-header">

                        <div>

                            <h1>
                                📦 Cake Orders
                            </h1>

                            <p>
                                View and manage customer cake orders.
                            </p>

                        </div>


                        <button
                            type="button"
                            className="refresh-button"
                            onClick={fetchOrders}
                            disabled={ordersLoading}
                        >
                            {ordersLoading
                                ? "Loading..."
                                : "🔄 Refresh Orders"}
                        </button>

                    </div>


                    {/* Order Message */}

                    {orderMessage && (

                        <div className="order-message">
                            {orderMessage}
                        </div>

                    )}


                    {/* ==========================================
                        LOADING
                    ========================================== */}

                    {ordersLoading ? (

                        <div className="orders-loading">

                            <span className="spinner"></span>

                            <p>
                                Loading orders...
                            </p>

                        </div>


                    ) : orders.length === 0 ? (


                        /* ==========================================
                            NO ORDERS
                        ========================================== */

                        <div className="no-orders">

                            <div className="no-orders-icon">
                                📭
                            </div>

                            <h3>
                                No Orders Found
                            </h3>

                            <p>
                                There are currently no cake orders.
                            </p>

                        </div>


                    ) : (


                        /* ==========================================
                            ORDERS
                        ========================================== */

                        <div className="orders-list">

                            {orders.map((order) => (

                                <div
                                    className="order-card"
                                    key={order._id}
                                >


                                    {/* ==================================
                                        ORDER HEADER
                                    ================================== */}

                                    <div className="order-card-header">

                                        <div>

                                            <span className="order-label">
                                                Order ID
                                            </span>

                                            <h3>
                                                #{order._id}
                                            </h3>

                                        </div>


                                        <div
                                            className={`order-status status-${String(
                                                order.status || ""
                                            ).toLowerCase()}`}
                                        >
                                            {formatStatus(
                                                order.status
                                            )}
                                        </div>

                                    </div>


                                    {/* ==================================
                                        CUSTOMER INFORMATION
                                    ================================== */}

                                    <div className="order-info">


                                        {/* Customer */}

                                        <div className="order-info-item">

                                            <span>
                                                👤 Customer
                                            </span>

                                            <strong>
                                                {order.customerName}
                                            </strong>

                                        </div>


                                        {/* Email */}

                                        <div className="order-info-item">

                                            <span>
                                                📧 Email
                                            </span>

                                            <strong>
                                                {order.email}
                                            </strong>

                                        </div>


                                        {/* Phone */}

                                        <div className="order-info-item">

                                            <span>
                                                📱 Phone
                                            </span>

                                            <strong>
                                                {order.phone}
                                            </strong>

                                        </div>


                                        {/* Date */}

                                        <div className="order-info-item">

                                            <span>
                                                📅 Ordered
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </strong>

                                        </div>


                                        {/* Total */}

                                        <div className="order-info-item">

                                            <span>
                                                💰 Total
                                            </span>

                                            <strong>
                                                ₹{formatMoney(
                                                    order.totalAmount
                                                )}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* ==================================
                                        ORDER ITEMS
                                    ================================== */}

                                    <div className="order-items">

                                        <h4>
                                            🍰 Ordered Cakes
                                        </h4>


                                        {order.items?.map(
                                            (item, index) => {

                                                const itemTotal =
                                                    Number(item.price || 0) *
                                                    Number(item.quantity || 0);

                                                return (

                                                    <div
                                                        className="order-item"
                                                        key={`${item.cakeId}-${index}`}
                                                    >


                                                        {/* Cake Icon */}

                                                        <div className="order-item-image">
                                                            🎂
                                                        </div>


                                                        {/* Cake Details */}

                                                        <div className="order-item-details">

                                                            <strong>
                                                                {item.cakeName}
                                                            </strong>

                                                            <span>
                                                                Price: ₹{formatMoney(
                                                                    item.price
                                                                )}
                                                            </span>

                                                            <span>
                                                                Quantity:{" "}
                                                                {item.quantity}
                                                            </span>

                                                        </div>


                                                        {/* Item Total */}

                                                        <div className="order-item-price">

                                                            <strong>
                                                                ₹{formatMoney(
                                                                    itemTotal
                                                                )}
                                                            </strong>

                                                        </div>

                                                    </div>

                                                );
                                            }
                                        )}

                                    </div>


                                    {/* ==================================
                                        DELIVERY ADDRESS
                                    ================================== */}

                                    <div className="delivery-address">

                                        <h4>
                                            📍 Delivery Details
                                        </h4>

                                        <p>
                                            {order.address}
                                        </p>

                                    </div>


                                    {/* ==================================
                                        STATUS UPDATE
                                    ================================== */}

                                    <div className="order-actions">

                                        <label
                                            htmlFor={`status-${order._id}`}
                                        >
                                            Update Order Status
                                        </label>


                                        <select
                                            id={`status-${order._id}`}
                                            value={
                                                order.status || "PLACED"
                                            }
                                            disabled={
                                                updatingOrderId === order._id
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            {statuses.map(
                                                (status) => (

                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {formatStatus(
                                                            status
                                                        )}
                                                    </option>

                                                )
                                            )}

                                        </select>


                                        {updatingOrderId === order._id && (

                                            <span className="updating-text">
                                                Updating...
                                            </span>

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
}

export default AdminAddCake;

