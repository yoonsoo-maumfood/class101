import styled from 'styled-components';

export const NavigatorWrapper = styled.div`
  margin-bottom: 20px;
`;

export const NavigatorContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PageBox = styled.div<{highlight: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  width: 40px;
  height: 40px;
  margin: 0 10px;

  background-color: ${ props => props.highlight ? 'skyblue' : 'white' };
  color: ${ props => props.highlight ? 'white' : 'black' };
`;