import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from 'next/router';

const paginationArray = (totalPages, currentPage) => {
  if (totalPages < 5) {
    return Array.from({ length: totalPages }).map((_, index) => index);
  }

  if (currentPage <= 2) {
    return [0, 1, 2, 3, 4];
  }

  if (totalPages - (currentPage + 1) < 2) {
    return Array.from({ length: 5 }).map(
      (_, index) => totalPages - (5 - index)
    );
  }

  return [-2, -1, 0, 1, 2].map((val) => currentPage + val);
};

function ProductPagination({ count, page }) {
  const router = useRouter();
  const search = (pageNo) => {
    router.push({
      pathname: '/search',
      query: {
        ...router.query,
        pageNo,
      },
    });
  };

  return (
    <Pagination className='m-4' size='sm'>
      {page > 2 && (
        <>
          <Pagination.First onClick={() => search(0)} />
          <Pagination.Prev onClick={() => search(page - 1)} />
        </>
      )}
      {paginationArray(count, page).map((pageNo) => (
        <Pagination.Item
          onClick={() => search(pageNo)}
          key={pageNo}
          active={pageNo === page}
        >
          {pageNo + 1}
        </Pagination.Item>
      ))}
      {Math.abs(count - (page + 1)) > 2 && (
        <>
          <Pagination.Next onClick={() => search(page + 1)} />
          <Pagination.Last onClick={() => search(page - 1)} />
        </>
      )}
    </Pagination>
  );
}

export default ProductPagination;
