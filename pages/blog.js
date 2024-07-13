import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/Basic/Banner";
import Header from "@/components/Basic/Header";
import Layout from "@/components/Layout/Layout";
import Footer from "@/components/Basic/Footer";

export default function Blog() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get('/api/blog')
      .then((response) => setArticles(response.data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return (
    <>
      <Banner />
      <Header />
      <Layout>
        <div className="w-full flex flex-col items-start justify-center mt-[5rem]">
          <h4 className="mb-8 text-4xl font-bold">Blog</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 mb-6">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h4 className="text-2xl font-semibold mb-4">{article.title}</h4>

                <Link key={article._id} href={`/blog/${article._id}`} passHref>
                  <button className="bg-[#7F1515] text-white w-64 px-6 py-3 rounded-md hover:bg-[#5b0e0e] transition-colors duration-200 ">
                    <p>    Read More</p>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}
