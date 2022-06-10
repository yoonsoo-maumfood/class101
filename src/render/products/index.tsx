import { useState, useEffect } from "react";
import fakeFetch, { Url, ProductItem } from "../../modules/fakeFetch";

import Layout from "../../components/GlobalLayout";
import { PageWrapper } from "./styles";

const RenderProducts = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    try {
      const productsRaw = fakeFetch(Url.Products);
      if (productsRaw === undefined) {
        throw new Error("product load failed");
      } else {
        setProducts(productsRaw);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Layout>
      <PageWrapper>
        { products.map ( (product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </PageWrapper>
    </Layout>
  );
};

export default RenderProducts;
