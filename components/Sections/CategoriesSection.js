import Link from "next/link";
import Layout from "../Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setError("Failed to fetch categories");
            });
    }, []);

    const filteredCategories = categories.filter((cat) => cat.parent);

    return (
        <div className="py-12">
            <Layout>
                <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-left">
                    <h2 className="w-full font-semibold uppercase">Categorii</h2>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="w-full h-auto gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {filteredCategories.map((cat) => (
                                <div
                                    className="w-full flex flex-col items-center"
                                    key={cat._id}
                                >
                                    <div
                                        className="w-full min-h-[10rem] sm:min-h-[15rem] lg:min-h-[20rem] bg-cover bg-center"
                                        style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/maybee-store.appspot.com/o/images%2F1698693286725.jfif?alt=media&token=069df4d9-eff4-4679-899d-c56a7f1f237f)' }}
                                    />
                                    <h3 className="mt-2 text-center text-black">{cat.name}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}
