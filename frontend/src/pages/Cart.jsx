import { useEffect, useState } from "react";
import {
    getBasket,
    updateBasket,
    removeFromBasket,
    clearBasket
} from "../services/orderService";

import { Link } from "react-router-dom";

function Cart() {

    const [basket, setBasket] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadBasket = async () => {

        try {

            const response = await getBasket();

            setBasket(
                response.data || response
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadBasket();

    }, []);


    const handleUpdate = async (
        basketId,
        quantity
    ) => {

        if (quantity < 1) {
            return;
        }

        await updateBasket(
            basketId,
            quantity
        );

        loadBasket();

    };


    const handleRemove = async (basketId) => {

        await removeFromBasket(
            basketId
        );

        loadBasket();

    };


    const handleClear = async () => {

        await clearBasket();

        setBasket([]);

    };


    if (loading) {
        return <h2>Loading cart...</h2>;
    }


    if (!basket || basket.length === 0) {

        return (

            <main className="empty-cart">

                <h1>
                    Your Cart Is Empty 🛒
                </h1>

                <Link
                    to="/"
                    className="button"
                >
                    Browse Cakes
                </Link>

            </main>

        );

    }


    const total = basket.reduce(
        (sum, item) =>
            sum + item.subtotal,
        0
    );


    return (

        <main className="cart">

            <h1>
                Your Cart
            </h1>


            {basket.map((item) => (

                <div
                    className="cart-item"
                    key={item._id}
                >

                    <div>

                        <h3>
                            {item.cakeName}
                        </h3>

                        <p>
                            ₹{item.price}
                        </p>

                    </div>


                    <div className="quantity">

                        <button
                            onClick={() =>
                                handleUpdate(
                                    item._id,
                                    item.quantity - 1
                                )
                            }
                        >
                            -
                        </button>

                        <span>
                            {item.quantity}
                        </span>

                        <button
                            onClick={() =>
                                handleUpdate(
                                    item._id,
                                    item.quantity + 1
                                )
                            }
                        >
                            +
                        </button>

                    </div>


                    <strong>
                        ₹{item.subtotal}
                    </strong>


                    <button
                        onClick={() =>
                            handleRemove(item._id)
                        }
                    >
                        Remove
                    </button>

                </div>

            ))}


            <div className="cart-summary">

                <h2>
                    Total: ₹{total}
                </h2>

                <button
                    onClick={handleClear}
                >
                    Clear Cart
                </button>

                <Link
                    to="/checkout"
                    className="button"
                >
                    Proceed To Checkout
                </Link>

            </div>

        </main>
    );
}

export default Cart;