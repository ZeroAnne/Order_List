import React from "react";
import Pagination from "react-bootstrap/Pagination";

function TablePagination({
  totalPages,
  currentPage,
  onPageChange,
  totalOrders,
  setPageInput,
  pageInput,
  className = "",
}) {
  const maxVisiblePages = 5;
  const pageItems = [];

  // 計算"顯示"頁碼範圍
  const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);

  // 第一頁
  pageItems.push(
    <Pagination.Item
      key={1}
      active={currentPage === 1}
      onClick={() => onPageChange(1)}
    >
      1
    </Pagination.Item>
  );

  // 前省略號
  if (startPage > 2) {
    pageItems.push(<Pagination.Ellipsis key="ellipsis-start" />);
  }

  // 中間頁碼
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  // 後省略號
  if (endPage < totalPages - 1) {
    pageItems.push(<Pagination.Ellipsis key="ellipsis-end" />);
  }

  // 最後一頁
  if (totalPages > 1) {
    pageItems.push(
      <Pagination.Item
        key={totalPages}
        active={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  return (
    <section
      className={`${className} d-flex align-items-center justify-content-between`}
    >
      <div className="d-flex align-items-center">
        <Pagination size="sm" className="m-0">
          <Pagination.First onClick={() => onPageChange(1)} />
          <Pagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {pageItems}
          <Pagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => onPageChange(totalPages)} />
        </Pagination>
        <div className="d-flex align-items-center gap-1 mx-2">
          第
          <input
            type="number"
            className="form-control form-control-sm ms-1"
            style={{ width: "60px" }}
            aria-label="pagenumber"
            min="1"
            max={totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
          />
          頁
        </div>

        <button
          className="btn btn-outline-primary btn-sm text-nowrap ms-1"
          onClick={() => {
            if (pageInput > totalPages) {
              onPageChange(totalPages);
              setPageInput(totalPages);
            } else if (pageInput < 1) {
              onPageChange(1);
              setPageInput(1);
            } else {
              onPageChange(pageInput);
            }
          }}
        >
          前往
        </button>
      </div>
      <div className="d-flex">
        <p className="m-0 me-2"> 共 {totalOrders} 筆</p>
      </div>
    </section>
  );
}

export default TablePagination;
