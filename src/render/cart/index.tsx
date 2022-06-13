import { useState, useEffect } from "react";
import fakeFetch, { Url, ProductItem, Coupon } from "../../modules/fakeFetch";
import useProductList from "../../modules/store/productList";
import useCart from "../../modules/store/cart";

import Layout from "../../components/GlobalLayout";
import ProductCard from "../../components/ProductCard";
import PageNavigator from "../../components/PageNavigator";
import {
  PageWrapper,
  ProductCardContainer,
  CalculatorContainer,
  CouponSelector,
  PriceDetailContainer,
  PriceContainer,
  PriceContainerTitle,
  PriceBox,
  PriceTitle,
  PriceValue,
  TotalPrice,
} from "./styles";

interface SaleHistory {
  title: string;
  price: number;
}

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

  //Price related values

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [saleHistory, setSaleHistory] = useState<SaleHistory[]>([]);

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
    const history = Array<SaleHistory>();

    if (coupon === null) {
      for (const product of productsInBuy) {
        sum += product.price;
      }
    } else {
      if (coupon.type === "rate") {
        for (const product of productsInBuy) {
          if (!(product.availableCoupon === false)) {
            sum +=
              product.price * (100 - (coupon.discountRate as number)) * 0.01;
            history.push({
              title: product.title + ` ${coupon.discountRate}% 세일`,
              price: product.price * (coupon.discountRate as number) * 0.01,
            });
          } else {
            sum += product.price;
          }
        }
      } else if (coupon.type === "amount") {
        for (const product of productsInBuy) {
          sum += product.price;
        }
        sum -= coupon.discountAmount as number;
        history.push({
          title: `${coupon.discountAmount as number}원 세일`,
          price: coupon.discountAmount as number,
        });
        if (sum < 0) {
          sum = 0;
        }
      } else {
        throw new Error("invalid coupon");
      }
    }

    setTotalPrice(sum);
    setSaleHistory(history);
  }, [coupon, productsInBuy]);

  return (
    <Layout>
      <PageWrapper>
        <ProductCardContainer>
          {productsToShow.map((product) => (
            <ProductCard
              image={false}
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
        </ProductCardContainer>

        <PageNavigator pages={pages} currentPage={page} setPage={setPage} />

        <CalculatorContainer>
          <CouponSelector
            onChange={(e: any) => {
              if (e.target.value === "") {
                setCoupon(null);
              } else {
                setCoupon(coupons[e.target.value]);
              }
            }}
          >
            <option value="">쿠폰을 선택하세요</option>
            {coupons.map((coupon, index) => (
              <option key={index} value={index}>
                {coupon.title}
              </option>
            ))}
          </CouponSelector>

          <PriceDetailContainer>
            <PriceContainer>
              <PriceContainerTitle>가격 정보</PriceContainerTitle>
              {productsInBuy.map((product) => (
                <PriceBox key={product.id}>
                  <PriceTitle>{product.title}</PriceTitle>
                  <PriceValue sale={false}>{product.price.toLocaleString()}</PriceValue>
                </PriceBox>
              ))}
            </PriceContainer>
            <PriceContainer>
              <PriceContainerTitle>세일 정보</PriceContainerTitle>
              {saleHistory.map((history, index) => (
                <PriceBox key={index}>
                  <PriceTitle>{history.title}</PriceTitle>
                  <PriceValue sale={true}>-{history.price.toLocaleString()}</PriceValue>
                </PriceBox>
              ))}
            </PriceContainer>
          </PriceDetailContainer>

          <TotalPrice>총합: {totalPrice.toLocaleString()}</TotalPrice>
        </CalculatorContainer>
      </PageWrapper>
    </Layout>
  );
};

export default RenderCart;
