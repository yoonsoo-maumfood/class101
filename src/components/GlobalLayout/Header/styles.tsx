import styled from 'styled-components';

export const HEADER_HEIGHT = 50;

export const HeaderWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 5px 1px gray;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  margin-left: 30px;
`;

export const Title = styled.div`
  font-size: 2rem;
  &:hover {
    color: gray;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
`;

export const LinkElement = styled.div`
  margin-right: 30px;

  &:hover {
    color: gray;
  }
`;