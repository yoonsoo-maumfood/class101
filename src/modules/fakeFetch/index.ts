//페이지 파일에서 직접 data에 접근하는 대신에, fakeFetch를 이용해서 fetch 쓰듯 사용하게 해주는 그런 느낌
import { productItems, ProductItem } from "../../data/productItems";
import { coupons, Coupon } from "../../data/coupons";

export enum Url {
  Products,
  Coupons,
}

const fakeFetch = (
  url: Url,
  index?: number
): any => {
  //index가 주어질경우 그에 해당하는 하나의 아이템 반환
  //주어지지 않으면 전체 리스트 반환
  switch (url) {
    case Url.Products:
      if (index !== undefined) {
        return productItems[index];
      } else {
        return productItems;
      }
    case Url.Coupons:
      if (index !== undefined) {
        return coupons[index];
      } else {
        return coupons;
      }
    default:
      return undefined;
  }
};

export default fakeFetch;
export type { ProductItem, Coupon };
