import styled from 'styled-components';

import Header, { HEADER_HEIGHT } from './Header';
import Footer from './Footer';

const GlobalWrapper = styled.div`
  margin: 0;
  padding: 0;
`

const ChildrenWrapper = styled.div`
  position: relative;
  margin: ${HEADER_HEIGHT}px 0 0 0;
  padding: 0;
`

const GlobalLayout = ({
  children,
  header = true,
  footer = true,
}: {
  children?: JSX.Element,
  header?: boolean;
  footer?: boolean;
}) => {
  return (
    <GlobalWrapper>
      { header ? <Header /> : '' }
      <ChildrenWrapper>
      {children}
      </ChildrenWrapper>
      { footer ? <Footer /> : '' }
    </GlobalWrapper>
  );
};

export default GlobalLayout;
