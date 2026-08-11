import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../services/orderService";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const loadOrders = async () => {

            try {

                const response =
                    await getOrders();

                setOrders(
                    response.data || response
                );

            } catch (error) {

                console.error(error);

            }

        };

        loadOrders();

    }, []);


    return (

        <main className="orders">

            <h1>
                My Orders
            </h1>

            {orders.length === 0 ? (

                <p>
                    No orders found.
                </p>

            ) : (

                orders.map((order) => (

                    <div
                        className="order-card"
                        key={order._id}
                    >

                        <h3>
                            Order #{order._id}
                        </h3>

                        <p>
                            Status: {order.status}
                        </p>

                        <p>
                            Total: ₹{order.totalAmount}
                        </p>

                        <Link
                            to={`/orders/${order._id}`}
                            className="button"
                        >
                            View Order
                        </Link>

                    </div>

                ))

            )}

        </main>
    );
}

export default Orders;