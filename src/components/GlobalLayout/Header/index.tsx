import Link from "next/link";

import {
  HEADER_HEIGHT,
  HeaderWrapper,
  HeaderContainer,
  TitleWrapper,
  Title,
  LinkContainer,
  LinkElement,
} from "./styles";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <TitleWrapper>
          <Title>
            <Link href="/">Class101</Link>
          </Title>
        </TitleWrapper>
        <LinkContainer>
          <LinkElement>
            <Link href="/products">제품 보기</Link>
          </LinkElement>
          <LinkElement>
            <Link href="/cart">장바구니</Link>
          </LinkElement>
        </LinkContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
export { HEADER_HEIGHT };