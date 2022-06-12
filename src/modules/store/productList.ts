import create from "zustand";
import fakeFetch, { ProductItem, Url } from "../fakeFetch";

interface ProductListState {
  initialized: boolean;
  productList: ProductItem[];
  fetchProducts: () => void;
}

const useStore = create<ProductListState>((set) => ({
  initialized: false,
  productList: [],
  fetchProducts: () => {
    set((state) => {
      let productRaw = fakeFetch(Url.Products);
      productRaw.sort( (a: ProductItem, b: ProductItem) => b.score - a.score )
      //score기준 내림차순
      return {
        initialized: true,
        productList: productRaw,
      };
    });
  },
}));

export default useStore;
