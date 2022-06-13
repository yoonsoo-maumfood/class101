import styled, { keyframes } from "styled-components";
import Image from "next/image";

//cartView에 따라서 width에 변화를 줄수도 있을듯?
export const CardWrapper = styled.div<{
  width: number;
  cartView: boolean;
  inBuy?: boolean;
}>`
  position: relative;
  box-shadow: 0px 5px 5px 3px gray;
  width: ${(props) => props.width}px;
  //height: 300px;
  padding: 10px 20px;
  margin: 0px 30px 20px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: 0.5s;

  ${(props) =>
    props.cartView
      ? (props) => (props.inBuy ? "box-shadow: 0px 5px 5px 3px orange;" : "")
      : ""}

  &:hover {
    transform: scale(1.03, 1.03);
  }
`;

export const Title = styled.div`
  font-size: 20px;
  height: 50px;
  width: 100%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CartView = styled.div``;

export const ClickToAddNoti = styled.div<{ inBuy: boolean }>`
  opacity: ${(props) => (props.inBuy ? "0" : "1")};
  transition: 0.5s;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ProductImage = ({ src }: { src: string }) => {
  return (
    <ImageContainer>
      <Image src={src} layout="fill" objectFit="contain" alt="ProductImage" />
    </ImageContainer>
  );
};

export const InformationCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 15px;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const Price = styled.div`
  display: flex;
  font-size: 1.2rem;
`;

export const Score = styled.div`
  font-size: 0.8rem;
`;

export const ToggleCart = styled.div<{ inCart: boolean }>`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: ${(props) => (props.inCart ? "red" : "white")};
  text-shadow: ${(props) => (props.inCart ? "none" : "0px 3px 5px gray;")};

  transition: 0.5s;

  &:hover {
    transform: scale(2, 2);
  }
`;

export const CouponUnavailable = styled.div`
  font-size: 0.8rem;
  margin-right: 15px;
  color: rgb(126, 126, 126);
  display: flex;
  justify-content: center;
  align-items: center;
`;
