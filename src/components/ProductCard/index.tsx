import { ProductItem } from "../../modules/fakeFetch";
import { useState } from "react";

const ProductCard = ({
  product,
  inCart,
  addToCart,
  removeFromCart,
  cartView,
  inBuy,
  onChange,
}: {
  product: ProductItem;
  inCart: boolean;
  addToCart: any;
  removeFromCart: any;
  cartView?: boolean;
  onChange?: any;
  inBuy?: boolean;
}) => {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p>{product.score}</p>
      {!(product.availableCoupon===false) ? <div>쿠폰 사용 가능</div> : ""}
      {inCart ? (
        <div onClick={removeFromCart}>등록</div>
      ) : (
        <div onClick={addToCart}>미등록</div>
      )}
      {cartView ? (
        <input type="checkbox" checked={inBuy} onChange={onChange} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductCard;
