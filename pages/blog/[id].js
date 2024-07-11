import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Banner from "@/components/Basic/Banner";
import Header from "@/components/Basic/Header";
import Layout from "@/components/Layout/Layout";
import Footer from "@/components/Basic/Footer";

const BlogPost = () => {
    const router = useRouter();
    const { id } = router.query;
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/blog/${id}`)
                .then((response) => {
                    setArticle(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching article:", error);
                    setError("Error fetching article");
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!article) {
        return <div>No article found</div>;
    }

    return (
        <>
            <Banner />
            <Header />
            <Layout>
                <div className="py-20 min-h-screen">
                    <div className="w-full flex flex-col items-center">
                        <div className="relative w-full h-96 mb-8">
                            <Image
                                src={article.thumbnail}
                                alt={article.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                        <div className="w-full max-w-2xl">
                            {article.properties.map((property, index) => (
                                <div key={index} className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-2">{property.name}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {property.values.map((value, valueIndex) => (
                                            <span
                                                key={valueIndex}
                                                className="text-sm bg-gray-200 rounded-full px-3 py-1"
                                            >
                                                {value}
                                            </span>
                                        ))}
                                    </div>
                                    {property.images.length > 0 && (
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {property.images.map((image, imageIndex) => (
                                                <div key={imageIndex} className="w-full md:w-1/2">
                                                    <Image
                                                        src={image}
                                                        alt={`Image for ${property.name}`}
                                                        layout="responsive"
                                                        width={500}
                                                        height={300}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
            <Footer />
        </>
    );
};

export default BlogPost;
