import { useState } from "react";
import api from "../services/api";
import "./AdminAddCake.css";

function AdminAddCake() {
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await api.post("/api/catalog/cakes", {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                category: form.category,
                imageUrl: form.imageUrl,
                stock: Number(form.stock)
            });

            console.log(response.data);

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
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to add cake"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-page">
            <div className="admin-container">

                <div className="admin-header">
                    <div className="header-icon">🎂</div>

                    <div>
                        <h1>Add New Cake</h1>
                        <p>
                            Add a delicious new cake to your catalog.
                        </p>
                    </div>
                </div>

                <form className="cake-form" onSubmit={handleSubmit}>

                    <div className="form-section">
                        <h2>🍰 Cake Information</h2>

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

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="price">
                                    Price
                                </label>

                                <div className="input-with-symbol">
                                    <span>₹</span>

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

                    <div className="form-section">
                        <h2>🖼️ Cake Image</h2>

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

            </div>
        </main>
    );
}

export default AdminAddCake;