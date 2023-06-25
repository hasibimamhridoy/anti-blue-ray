import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {

    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-2 lg:gap-3">
        {products.map(product=><ProductCard key={product.id} product={product}></ProductCard>)}
    </div>
  );
};

export default Products;
