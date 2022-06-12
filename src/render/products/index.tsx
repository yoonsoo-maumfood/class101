import { useState, useEffect } from "react";
import fakeFetch, { Url, ProductItem } from "../../modules/fakeFetch";
import useStore from "../../modules/store/cart";

import Layout from "../../components/GlobalLayout";
import ProductCard from "../../components/ProductCard";
import PageNavigator from "../../components/PageNavigator";
import { PageWrapper } from "./styles";

const RenderProducts = () => {
  const PRODUCTS_PER_PAGE = 5;
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productsToShow, setProductsToShow] = useState<ProductItem[]>([]);

  const cartList = useStore((state) => state.cartItemIds);
  const addToCart = useStore((state) => state.addItem);
  const removeFromCart = useStore((state) => state.removeItem);

  useEffect(() => {
    try {
      let productsRaw = fakeFetch(Url.Products);
      if (productsRaw === undefined) {
        throw new Error("product load failed");
      }
      productsRaw.sort((a: ProductItem, b: ProductItem) => b.score - a.score);
      setPages(
        Array(Math.ceil(productsRaw.length / PRODUCTS_PER_PAGE))
          .fill(1)
          .map((x, y) => x + y)
        //페이지가 3개있어야 한다면, [1, 2, 3]이런 array 형성
      );
      setProducts(productsRaw);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }, []);

  useEffect(() => {
    const pts: ProductItem[] = [];
    for (
      let index = (page - 1) * PRODUCTS_PER_PAGE;
      index < products.length && index < page * PRODUCTS_PER_PAGE;
      index++
    ) {
      //보여줘야할 페이지의 인덱스 계산
      pts.push(products[index]);
    }
    setProductsToShow(pts);
  }, [page, products]);

  return (
    <Layout>
      <PageWrapper>
        {!error &&
          productsToShow.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              inCart={!(cartList.find((id) => id === product.id) === undefined)}
              addToCart={() => addToCart(product.id)}
              removeFromCart={() => removeFromCart(product.id)}
            />
          ))}
        <PageNavigator pages={pages} currentPage={page} setPage={setPage} />
      </PageWrapper>
    </Layout>
  );
};

export default RenderProducts;
