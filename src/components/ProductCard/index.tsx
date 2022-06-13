import { ProductItem } from "../../modules/fakeFetch";
import { useState } from "react";

import {
  CardWrapper,
  CardContainer,
  CartView,
  ClickToAddNoti,
  ProductImage,
  InformationCard,
  Information,
  Title,
  Price,
  Score,
  ToggleCart,
  CouponUnavailable,
} from "./styles";

const ProductCard = ({
  width = 500,
  image,
  product,
  inCart,
  addToCart,
  removeFromCart,
  cartView,
  inBuy,
  onChange,
}: {
  width?: number;
  image: boolean;
  product: ProductItem;
  inCart: boolean;
  addToCart: any;
  removeFromCart: any;
  cartView?: boolean;
  onChange?: any;
  inBuy?: boolean;
}) => {
  return (
    <CardWrapper
      width={width}
      cartView={cartView === undefined ? false : (cartView as boolean)}
      inBuy={inBuy === undefined ? false : (inBuy as boolean)}
      onClick={cartView ? onChange : null}
    >
      <Title>{product.title}</Title>
      <CardContainer>

        <InformationCard>
          <ToggleCart
            inCart={inCart}
            onClick={inCart ? removeFromCart : addToCart}
          >
            ♥
          </ToggleCart>
          <Information>
            <Price>
              {product.availableCoupon === false ? ( //쿠폰이 false일 때에만 불가 안내
                <CouponUnavailable>쿠폰 사용 불가</CouponUnavailable>
              ) : (
                ""
              )}
              {product.price.toLocaleString()} 원
            </Price>

            <Score>{product.score} 점</Score>
          </Information>
        </InformationCard>
        {image ? <ProductImage src={product.coverImage} /> : ""}
        {cartView ? (
          <CartView>
            <ClickToAddNoti inBuy={inBuy as boolean}>
              클릭해서 계산대에 추가
            </ClickToAddNoti>
          </CartView>
        ) : (
          ""
        )}
      </CardContainer>
    </CardWrapper>
  );
};

export default ProductCard;
