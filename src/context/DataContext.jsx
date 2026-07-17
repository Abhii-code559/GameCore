import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import products from "../Data/Products";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [productsData] = useState(products);

  const [filteredProducts, setFilteredProducts] =
    useState(products);

  const [loading] = useState(false);

  const [error] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  useEffect(() => {
    let result = [...productsData];

    if (category !== "All") {
      result = result.filter(
        (item) => item.category === category
      );
    }

    if (search.trim()) {
      result = result.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [search, category, productsData]);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        productsData.map((item) => item.category)
      ),
    ],
    [productsData]
  );

  return (
    <DataContext.Provider
      value={{
        products: productsData,
        filteredProducts,
        loading,
        error,
        search,
        setSearch,
        category,
        setCategory,
        categories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};