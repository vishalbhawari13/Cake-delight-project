import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { checkout } from "../services/orderService";

function Checkout() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        customerName: "",
        email: "",
        phone: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {

        setForm({
            ...form,
            [event.target.name]:
                event.target.value
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        try {

            const response =
                await checkout(form);

            const order =
                response.data || response;

            navigate("/order-success", {
                state: {
                    order
                }
            });

        } catch (error) {

            console.error(error);

            alert(
                "Checkout failed."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="checkout">

            <h1>
                Checkout
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="customerName"
                    placeholder="Full Name"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="address"
                    placeholder="Delivery Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="button"
                    disabled={loading}
                >
                    {loading
                        ? "Placing Order..."
                        : "Place Order"}
                </button>

            </form>

        </main>
    );
}

export default Checkout;