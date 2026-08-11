import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderById } from "../services/orderService";

function OrderDetails() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        const loadOrder = async () => {

            try {

                const response =
                    await getOrderById(orderId);

                setOrder(
                    response.data || response
                );

            } catch (error) {

                console.error(error);

            }

        };

        loadOrder();

    }, [orderId]);


    if (!order) {
        return <h2>Loading order...</h2>;
    }


    return (

        <main className="order-details">

            <h1>
                Order Details
            </h1>

            <h3>
                Order ID
            </h3>

            <p>
                {order._id}
            </p>

            <h3>
                Customer
            </h3>

            <p>
                {order.customerName}
            </p>

            <h3>
                Status
            </h3>

            <p>
                {order.status}
            </p>

            <h3>
                Total
            </h3>

            <h2>
                ₹{order.totalAmount}
            </h2>


            <h2>
                Items
            </h2>

            {order.items?.map((item) => (

                <div
                    key={item.cakeId}
                >

                    <p>
                        {item.cakeName}
                    </p>

                    <p>
                        Quantity: {item.quantity}
                    </p>

                    <p>
                        Price: ₹{item.price}
                    </p>

                </div>

            ))}

        </main>
    );
}

export default OrderDetails;