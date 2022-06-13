import { useState, useEffect } from "react";
import { ProductItem } from "../../modules/fakeFetch";
import useCart from "../../modules/store/cart";
import useProductList from "../../modules/store/productList";

import Layout from "../../components/GlobalLayout";
import ProductCard from "../../components/ProductCard";
import PageNavigator from "../../components/PageNavigator";
import { PageWrapper, ProductCardContainer } from "./styles";

const RenderProducts = () => {
  const PRODUCTS_PER_PAGE = 5;
  const {
    initialized: initialized,
    productList: products,
    fetchProducts: fetchProducts,
  } = useProductList();
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const [productsToShow, setProductsToShow] = useState<ProductItem[]>([]);

  const {
    cartItemIds: cartList,
    addItem: addToCart,
    removeItem: removeFromCart,
  } = useCart();

  useEffect(() => {
    if (!initialized) {
      fetchProducts();
    }
    setPages(
      Array(Math.ceil(products.length / PRODUCTS_PER_PAGE))
        .fill(1)
        .map((x, y) => x + y)
      //페이지가 3개있어야 한다면, [1, 2, 3]이런 array 형성
    );
  }, [initialized, products, fetchProducts]);

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
        <ProductCardContainer>
          {productsToShow.map((product) => (
            <ProductCard
              width={500}
              image={true}
              product={product}
              key={product.id}
              inCart={!(cartList.find((id) => id === product.id) === undefined)}
              addToCart={() => addToCart(product.id)}
              removeFromCart={() => removeFromCart(product.id)}
            />
          ))}
        </ProductCardContainer>
        <PageNavigator pages={pages} currentPage={page} setPage={setPage} />
      </PageWrapper>
    </Layout>
  );
};

export default RenderProducts;
