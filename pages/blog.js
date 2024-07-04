import Banner from "@/components/Basic/Banner";
import Header from "@/components/Basic/Header";
import Layout from "@/components/Layout/Layout";
import Footer from "@/components/Basic/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Blog() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('/api/blog')
            .then(response => setArticles(response.data))
            .catch(error => console.error('Error fetching articles:', error));
    }, []);

    return (
        <>
            <Banner />
            <Header />
            <Layout>
                <div className="w-full flex items-start justify-center flex-col mt-[5rem]">
                    <h4 className="mb-5">Catalog</h4>
                    {/* {mainCategories.map((cat) => (
                        <div key={cat._id} className="mb-8 w-full">
                            <div className="flex justify-between items-center mb-4">
                                <div className="w-full flex flex-col">
                                    <h5 className=" font-bold text-[#000]">{cat.name}</h5>
                                    <Link href={'/category/' + cat._id}>
                                        <p className="text-[#000]">Arată toate</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex gap-[50px] flex-col lg:flex-row">
                                {categoriesProducts[cat._id].map((p, index) => (
                                    <ProductBox key={p._id} {...p} wished={wishedProducts.includes(p._id)} />
                                ))}
                            </div>
                        </div>
                    ))} */}
                </div>
            </Layout>
            <Footer />
        </>
    );
}
