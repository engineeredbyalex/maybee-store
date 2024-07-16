import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "@/components/Basic/Banner";
import Header from "@/components/Basic/Header";
import Footer from "@/components/Basic/Footer";
import Layout from "@/components/Layout/Layout";

export default function BlogFunction() {
    const router = useRouter();
    const { id } = router.query;
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`/api/blog?id=${id}`)
                .then(response => {
                    console.log('Article data:', response.data);
                    setArticle(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching article:', error);
                    setError('Could not fetch article.');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!article) {
        return <div>No article found.</div>;
    }

    return (
        <>
            <Banner />
            <Header />
            <Layout>
                <div className="mt-[5rem]">
                    <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                    {article.thumbnail && (
                        <div className="relative w-full h-64 mb-6">
                            <img
                                src={article.thumbnail}
                                alt={article.title}
                                className="object-cover w-full h-full rounded-lg"
                            />
                        </div>
                    )}
                    {article.properties && article.properties.length > 0 && (
                        <div className="text-lg mb-4">
                            <h2 className="text-2xl font-semibold mb-2">Continut</h2>
                            {article.properties.map((property, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-bold mb-2">{property.name}</h3>
                                    <ul className="mb-2">
                                        {property.values.map((value, idx) => (
                                            <li key={idx}>{value}</li>
                                        ))}
                                    </ul>
                                    {property.images && property.images.length > 0 && (
                                        <div className="flex flex-col gap-4">
                                            {property.images.map((image, idx) => (
                                                <div key={idx} className="relative w-full h-64">
                                                    <img
                                                        src={image}
                                                        alt={`Image ${idx + 1}`}
                                                        className="object-cover w-full h-full rounded-lg"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Layout>
            <Footer />
        </>
    );
}
