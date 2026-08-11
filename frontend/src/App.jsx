import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CakeDetails from "./pages/CakeDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import AdminAddCake from "./pages/AdminAddCake";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/cakes/:id"
                    element={<CakeDetails />}
                />

                <Route
                    path="/admin/add-cake"
                    element={<AdminAddCake />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/order-success"
                    element={<OrderSuccess />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/orders/:orderId"
                    element={<OrderDetails />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;