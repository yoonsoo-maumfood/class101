import { NavigatorWrapper, NavigatorContainer, PageBox } from "./styles";

const PageNavigator = ({
  pages,
  currentPage = 0,
  setPage,
}: {
  pages: number[];
  currentPage: number;
  setPage: Function;
}) => {
  return (
    <NavigatorWrapper>
      <NavigatorContainer>
        {pages.map((page) => (
          <PageBox
            key={page}
            onClick={() => setPage(page)}
            highlight={page === currentPage}
          >
            {page}
          </PageBox>
        ))}
      </NavigatorContainer>
    </NavigatorWrapper>
  );
};

export default PageNavigator;
