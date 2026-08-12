import { useEffect, useState } from "react";
import { getAllCakes } from "../services/catalogService";
import CakeCard from "../components/CakeCard";

function Home() {
    const [cakes, setCakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filter state
    const [nameFilter, setNameFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        const loadCakes = async () => {
            try {
                const data = await getAllCakes();

                const cakeData = data?.data?.data || data?.data || data;

                setCakes(Array.isArray(cakeData) ? cakeData : []);
            } catch (error) {
                console.error(error);
                setError("Unable to load cakes.");
            } finally {
                setLoading(false);
            }
        };

        loadCakes();
    }, []);

    // Get unique categories from cakes
    const categories = [
        ...new Set(cakes.map((cake) => cake.category).filter(Boolean)),
    ];

    // Apply all filters
    const filteredCakes = cakes.filter((cake) => {
        const matchesName = cake.name
            ?.toLowerCase()
            .includes(nameFilter.toLowerCase());

        const matchesCategory =
            !categoryFilter || cake.category === categoryFilter;

        const matchesMinPrice =
            minPrice === "" || Number(cake.price) >= Number(minPrice);

        const matchesMaxPrice =
            maxPrice === "" || Number(cake.price) <= Number(maxPrice);

        return (
            matchesName &&
            matchesCategory &&
            matchesMinPrice &&
            matchesMaxPrice
        );
    });

    const clearFilters = () => {
        setNameFilter("");
        setCategoryFilter("");
        setMinPrice("");
        setMaxPrice("");
    };

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
                <h2>Our Cakes</h2>

                <div className="cake-filters">
                    <div className="filter-group">
                        <label htmlFor="cake-name">
                            Search by Cake Name
                        </label>

                        <input
                            id="cake-name"
                            type="text"
                            placeholder="Search cakes..."
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="cake-category">
                            Category
                        </label>

                        <select
                            id="cake-category"
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(e.target.value)
                            }
                        >
                            <option value="">
                                All Categories
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="min-price">
                            Minimum Price
                        </label>

                        <input
                            id="min-price"
                            type="number"
                            min="0"
                            placeholder="₹ Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="max-price">
                            Maximum Price
                        </label>

                        <input
                            id="max-price"
                            type="number"
                            min="0"
                            placeholder="₹ Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="clear-filters"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>

                <p className="filter-result-count">
                    Showing {filteredCakes.length} of {cakes.length} cakes
                </p>

                {filteredCakes.length === 0 ? (
                    <div className="no-cakes">
                        <h3>No cakes found</h3>
                        <p>
                            Try changing your search or filter options.
                        </p>

                        <button
                            type="button"
                            className="clear-filters"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="cake-grid">
                        {filteredCakes.map((cake) => (
                            <CakeCard
                                key={cake._id}
                                cake={cake}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Home;