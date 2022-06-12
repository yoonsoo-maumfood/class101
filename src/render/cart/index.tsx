import { useState, useEffect } from "react";
import fakeFetch, { Url, ProductItem, Coupon } from "../../modules/fakeFetch";
import useProductList from "../../modules/store/productList";
import useCart from "../../modules/store/cart";

import Layout from "../../components/GlobalLayout";
import ProductCard from "../../components/ProductCard";
import PageNavigator from "../../components/PageNavigator";
import { PageWrapper } from "./styles";

const RenderCart = () => {
  const PRODUCTS_PER_PAGE = 5;
  const {
    initialized: initialized,
    productList: products,
    fetchProducts: fetchProducts,
  } = useProductList();

  //product related values
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const [productsInCart, setProductsInCart] = useState<ProductItem[]>([]);
  const [productsToShow, setProductsToShow] = useState<ProductItem[]>([]);

  //cart related values
  const {
    cartItemIds: cartList,
    addItem: addToCart,
    removeItem: removeFromCart,
  } = useCart();

  //coupon related values
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  //buy related values
  const [productsInBuy, setProductsInBuy] = useState<ProductItem[]>([]);
  const removeFromBuy = (product: ProductItem) => {
    setProductsInBuy(productsInBuy.filter((p) => p.id !== product.id));
  };
  const toggleBuy = (product: ProductItem) => {
    const index = productsInBuy.findIndex((p) => p.id === product.id);
    if (index === -1) {
      setProductsInBuy([...productsInBuy, product]);
    } else {
      setProductsInBuy(productsInBuy.filter((p, i) => i !== index));
    }
  };

  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    //when products change
    if (!initialized) {
      fetchProducts();
    }
    //pic === productsInCart
    const pic = products.filter((product) => {
      for (const id of cartList) {
        if (product.id === id) {
          return true;
        }
      }
      return false;
    });
    setPages(
      Array(Math.ceil(pic.length / PRODUCTS_PER_PAGE))
        .fill(1)
        .map((x, y) => x + y)
      //페이지가 3개있어야 한다면, [1, 2, 3]이런 array 형성
    );
    setProductsInCart(pic);
  }, [initialized, products, fetchProducts, cartList]);

  useEffect(() => {
    //when coupons change(never -> only once)

    setCoupons(fakeFetch(Url.Coupons));
  }, []);

  useEffect(() => {
    //when page changes
    const pts: ProductItem[] = [];
    for (
      let index = (page - 1) * PRODUCTS_PER_PAGE;
      index < productsInCart.length && index < page * PRODUCTS_PER_PAGE;
      index++
    ) {
      //보여줘야할 페이지의 인덱스 계산
      pts.push(productsInCart[index]);
    }
    setProductsToShow(pts);
  }, [page, productsInCart]);

  useEffect(() => {
    let sum = 0;

    if (coupon === null) {
      for (const product of productsInBuy) {
        sum += product.price;
      }
    } else {
      if (coupon.type === "rate") {
        for (const product of productsInBuy) {
          if (!(product.availableCoupon === false)) {
            sum += product.price * (100 - (coupon.discountRate as number)) * 0.01;
          } else {
          sum += product.price;
          }
        }
      } else if (coupon.type === "amount") {
        for (const product of productsInBuy) {
          sum += product.price;
        }
        sum -= coupon.discountAmount as number;
        if (sum < 0) {
          sum = 0;
        }
      } else {
        throw new Error("invalid coupon");
      }
    }

    setTotalCost(sum);
  }, [coupon, productsInBuy]);

  return (
    <Layout>
      <PageWrapper>
        {productsToShow.map((product) => (
          <ProductCard
            cartView={true}
            product={product}
            key={product.id}
            inBuy={
              !(productsInBuy.find((p) => p.id === product.id) === undefined)
            }
            inCart={!(cartList.find((id) => id === product.id) === undefined)}
            addToCart={() => addToCart(product.id)}
            removeFromCart={() => {
              removeFromCart(product.id);
              removeFromBuy(product);
            }}
            onChange={() => toggleBuy(product)}
          />
        ))}
        <PageNavigator pages={pages} currentPage={page} setPage={setPage} />

        <select
          onChange={(e: any) => {
            if (e.target.value === "") {
              setCoupon(null);
            } else {
              setCoupon(coupons[e.target.value]);
            }
          }}
        >
          <option value="">-</option>
          {coupons.map((coupon, index) => (
            <option key={index} value={index}>
              {coupon.title}
            </option>
          ))}
        </select>

        <div>총합: {totalCost}</div>
      </PageWrapper>
    </Layout>
  );
};

export default RenderCart;
