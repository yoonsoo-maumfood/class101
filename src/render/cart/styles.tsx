import styled from 'styled-components';

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
export const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CouponSelector = styled.select`
  width: 100%;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;


export const PriceDetailContainer = styled.div`
  display: flex; 
  justify-content: center;
  margin-bottom: 20px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  width: 200px;
`;

export const PriceContainerTitle = styled.div`
  font-size: 1.5rem;
`;

export const PriceBox = styled.div`
  padding: 10px 10px;
  box-shadow: 0px 1px 3px 2px gray;
  margin-bottom: 20px;
`;

export const PriceTitle = styled.div`
  margin-bottom: 20px;
`;

export const PriceValue = styled.div<{sale: boolean}>`
  text-align: right;
  color: ${ props => props.sale ? 'blue' : 'black' };
`;


export const TotalPrice = styled.div`
  margin-bottom: 30px;
  text-align: center;
  font-size: 2rem;
`;
