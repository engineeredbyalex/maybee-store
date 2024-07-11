import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Basic/Header";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";
import Layout from "@/components/Layout/Layout";
import ProductsGrid from "@/components/Product/ProductsGridAll";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default function CategoryPage({ category, subCategories, products: initialProducts }) {
  const defaultSorting = "_id-desc";
  const defaultFilterValues = category.properties.map((property) => ({
    name: property.name,
    value: "all",
  }));

  const [products, setProducts] = useState(initialProducts);
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const handleFilterChange = (filterName, filterValue) => {
    setFiltersValues((prevFilters) =>
      prevFilters.map((filter) => ({
        ...filter,
        value: filter.name === filterName ? filterValue : filter.value,
      }))
    );
    setFiltersChanged(true);
  };

  useEffect(() => {
    if (!filtersChanged) return;

    setLoadingProducts(true);
    const categoryIds = [category._id, ...(subCategories?.map((sub) => sub._id) || [])];
    const params = new URLSearchParams({
      categories: categoryIds.join(","),
      sort,
    });

    filtersValues.forEach((filter) => {
      if (filter.value !== "all") {
        params.set(filter.name, filter.value);
      }
    });

    axios.get(`/api/products?${params.toString()}`).then((response) => {
      setProducts(response.data);
      setLoadingProducts(false);
    });
  }, [filtersValues, sort, filtersChanged, category._id, subCategories]);

  return (
    <>
      <Banner />
      <Header />
      <Layout>
        <div className="flex items-center justify-between mt-[5rem]">
          <h4 className="mb-5">{category.name}</h4>
          <div className="flex gap-4">
            {category.properties.map((property) => (
              <div className="bg-gray-300 p-2 rounded-md flex gap-2" key={property.name}>
                <span>{property.name}:</span>
                <select
                  className="bg-transparent border-0"
                  onChange={(e) => handleFilterChange(property.name, e.target.value)}
                  value={filtersValues.find((filter) => filter.name === property.name).value}
                >
                  <option value="all">Toate</option>
                  {property.values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        {loadingProducts ? (
          <div>Loading...</div>
        ) : products.length > 0 ? (
          <ProductsGrid products={products} />
        ) : (
          <div>Nu există produse.</div>
        )}
      </Layout>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const categoryIds = [category._id, ...subCategories.map((sub) => sub._id)];
  const products = await Product.find({ category: categoryIds });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
