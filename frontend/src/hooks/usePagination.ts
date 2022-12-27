import { useEffect, useReducer } from "react";
import { paginationReducer, PaginationState } from "#/reducers/paginationReducer";
const getTotalPages = (totalRecords: number, limit: number) => {
  const total = [];
  for (var i = 0; i < totalRecords / limit; i++) {
    total.push(i);
  }
  return total;
};

export default function usePagination({
  totalRecords,
}: {
  totalRecords: number;
}): [state: PaginationState, setPage: (page: number, limit: number) => void, setLimit: (limit: number) => void, setTotalRecords: (total: number) => void] {
  // Set a default limit of 10
  const limit = 10;
  const [state, dispatch] = useReducer(paginationReducer, {
    firstPage: 0,
    currentPage: 0,
    lastPage: totalRecords / limit - 1,
    totalPages: getTotalPages(totalRecords, limit),
    pages: getTotalPages(totalRecords, limit),
    totalRecords: totalRecords,
    showFirst: false,
    showLast: true,
    offset: 0,
    limit: limit
  });

  const setPage = (page: number, limit: number) => {
    dispatch({
      type: "SET_PAGE",
      payload: {
        limit: limit,
        nextPage: page
      }
    });
  };

  const setLimit = (limit: number) => {
    dispatch({
      type: "SET_LIMIT",
      payload: { limit, nextPage: state.currentPage, totalRecords: state.totalRecords }
    })
  }

  const setTotalRecords = (total: number) => {
    dispatch({
        type: "SET_TOTAL_RECORDS",
        payload: { limit: state.limit, nextPage: state.currentPage, totalRecords: total}
    })
  }

  useEffect(() => {
    setPage(1, 10);
  }, []);

  return [state, setPage, setLimit, setTotalRecords];
}
