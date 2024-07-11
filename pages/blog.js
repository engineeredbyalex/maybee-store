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
          <h4 className="mb-8 text-3xl font-bold">Blog</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-lg shadow-md p-5">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2">{article.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {article.properties.map((property, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <h5 className="text-sm font-medium text-gray-600">{property.name}</h5>
                      <div className="flex gap-2">
                        {property.values.map((value, valueIndex) => (
                          <span
                            key={valueIndex}
                            className="text-xs bg-gray-200 rounded-full px-2 py-1"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Link key={article._id} article={article} href={`/blog/${article._id}`} passHref>
                  <button className="bg-[#7F1515] text-white px-4 py-2 rounded-md hover:bg-[#5b0e0e] transition-colors duration-200 mt-4">
                    Read More
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
