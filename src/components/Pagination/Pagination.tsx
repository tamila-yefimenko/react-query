import css from './Pagination.module.css';
import ReactPaginateImport from 'react-paginate';
import type { ComponentType } from 'react';
import type { ReactPaginateProps } from 'react-paginate';

const ReactPaginate =
  (
    ReactPaginateImport as unknown as {
      default: ComponentType<ReactPaginateProps>;
    }
  ).default || ReactPaginateImport;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={event => onPageChange(event.selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
