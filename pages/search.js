import Header from "@/components/Basic/Header";
import Input from "@/components/Layout/Input";
import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "@/components/Product/ProductsGrid";
import { debounce } from "lodash";
import Layout from "@/components/Layout/Layout";
import Banner from "@/components/Basic/Banner";

export default function SearchPage() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useMemo(() => debounce(searchProducts, 500), []);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase, debouncedSearch]);

  function searchProducts(phrase) {
    axios.get('/api/products?phrase=' + encodeURIComponent(phrase))
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Banner/>
      <Header />
    
        <Layout className="w-full h-full flex items-center justify-center">
      <div className="mt-[5rem] min-w-full">
          <Input
            className="w-full p-3 rounded-md text-lg"
            autoFocus
            value={phrase}
            onChange={ev => setPhrase(ev.target.value)}
            placeholder="Caută produse...."
          />
        {!isLoading && phrase !== '' && products.length === 0 && (
          <h2 className="text-xl font-semibold mt-6 text-center">Nu există produse care conțin fraza "{phrase}"</h2>
        )}
        {isLoading && (
          <p>Se încarcă</p>
        )}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </div>
        </Layout>
 

    </>
  );
}
