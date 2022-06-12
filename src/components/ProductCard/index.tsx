import { ProductItem } from "../../modules/fakeFetch";

const ProductCard = ({
  product,
  inCart,
  addToCart,
  removeFromCart,
}: {
  product: ProductItem;
  inCart: boolean;
  addToCart: any,
  removeFromCart: any,
}) => {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p>{product.score}</p>
      { inCart ? <div onClick={removeFromCart}>등록</div> : <div onClick={addToCart}>미등록</div> }
    </div>
  );
};

export default ProductCard;
