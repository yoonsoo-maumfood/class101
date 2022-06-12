import { useMemo } from 'react';
/*import {

} from 'styles'; */

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
    <div>
      { pages.map( ( page ) => (
        (page === currentPage) ?
        <span key={page}>@</span> :
        <span key={page} onClick={ () => setPage(page) }>{page}</span>
      ))}
    </div>
  )
};

export default PageNavigator;
