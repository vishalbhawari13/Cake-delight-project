import { useEffect, useState } from "react";
import { getAllCakes } from "../services/catalogService";
import CakeCard from "../components/CakeCard";

function Home() {

    const [cakes, setCakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadCakes = async () => {

            try {

                const data = await getAllCakes();

                setCakes(data.data || data);

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load cakes."
                );

            } finally {

                setLoading(false);

            }
        };

        loadCakes();

    }, []);

    if (loading) {
        return <h2>Loading cakes...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (

        <main>

            <section className="hero">

                <h1>
                    Delicious Cakes For Every Occasion 🎂
                </h1>

                <p>
                    Freshly baked cakes delivered to your doorstep.
                </p>

            </section>


            <section className="cakes-section">

                <h2>
                    Our Cakes
                </h2>

                <div className="cake-grid">

                    {cakes.map((cake) => (

                        <CakeCard
                            key={cake._id}
                            cake={cake}
                        />

                    ))}

                </div>

            </section>

        </main>
    );
}

export default Home;