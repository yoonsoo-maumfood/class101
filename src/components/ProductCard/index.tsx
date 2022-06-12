
import { ProductItem } from '../../modules/fakeFetch';

const ProductCard = ( { product }: { product: ProductItem }) => {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p>{product.score}</p>
    </div>
  );
}

export default ProductCard;