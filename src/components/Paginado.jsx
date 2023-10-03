import { Pagination } from 'react-bootstrap';
import './Paginado.css';

export default function Paginado({ pagina, totalPaginas, onPageChange }) {
  const handlePagination = (pageNumber) => {
    onPageChange(pageNumber);
    scrollToTop(); 
  };

  const handleNextPage = () => {
    const nextPage = pagina + 1;
    if (nextPage <= totalPaginas) {
      handlePagination(nextPage);
    }
  };

  const handlePreviousPage = () => {
    const previousPage = pagina - 1;
    if (previousPage >= 1) {
      handlePagination(previousPage);
    }
  };

  const renderPaginationItems = () => {
    let items = [];

    for (let number = 1; number <= totalPaginas; number++) {
      items.push(
        <Pagination.Item key={number} active={number === pagina} onClick={() => handlePagination(number)}>
          {number}
        </Pagination.Item>
      );
    }

    return items;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div>
      <Pagination>
        <Pagination.Prev onClick={handlePreviousPage} />
        {renderPaginationItems()}
        <Pagination.Next onClick={handleNextPage} />
      </Pagination>
    </div>
  );
}
