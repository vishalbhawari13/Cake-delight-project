import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {

    const location = useLocation();

    const order = location.state?.order;


    return (

        <main className="order-success">

            <h1>
                🎉 Order Placed Successfully!
            </h1>

            <p>
                Thank you for ordering from Cake Delight.
            </p>

            {order && (

                <div>

                    <h3>
                        Order ID
                    </h3>

                    <p>
                        {order._id || order.orderId}
                    </p>

                    <h3>
                        Status
                    </h3>

                    <p>
                        {order.status}
                    </p>

                </div>

            )}

            <p>
                A confirmation email will be sent to
                your email address.
            </p>

            <Link
                to="/orders"
                className="button"
            >
                View My Orders
            </Link>

        </main>
    );
}

export default OrderSuccess;