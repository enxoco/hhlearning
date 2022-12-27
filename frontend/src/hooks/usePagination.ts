import { useEffect, useReducer } from "react";
import { paginationReducer, PaginationState } from "#/reducers/paginationReducer";
export const getTotalPages = (totalRecords: number, limit: number) => {
  const total = [];
  for (var i = 0; i < totalRecords / limit; i++) {
    total.push(i);
  }
  return total;
};

export default function usePagination({
  totalRecords,
  initialPage,
  defaultLimit
}: {
  totalRecords: number;
  initialPage: number;
  defaultLimit: number;
}): [state: PaginationState, setPage: (page: number, limit: number) => void, setTotalRecords: (total: number) => void] {
  // Set a default limit of 10

  const initialState = () => {
    
  }
  const [state, dispatch] = useReducer(paginationReducer, {
    firstPage: 0,
    currentPage: initialPage,
    lastPage: totalRecords / defaultLimit - 1,
    totalPages: getTotalPages(totalRecords, defaultLimit),
    pages: getTotalPages(totalRecords, defaultLimit),
    totalRecords: totalRecords,
    showFirst: false,
    showLast: true,
    offset: 0,
    limit: defaultLimit
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

  const setTotalRecords = (total: number) => {
    dispatch({
        type: "SET_TOTAL_RECORDS",
        payload: { limit: state.limit, nextPage: state.currentPage, totalRecords: total}
    })
  }

  useEffect(() => {
    setPage(initialPage, defaultLimit);
  }, []);

  useEffect(() => {
    if (state.totalRecords != totalRecords) {
      setTotalRecords(totalRecords)
      console.log("state.currentPage", state.currentPage)
      setPage(initialPage, state.limit)
    }
  }, [totalRecords])

  return [state, setPage, setTotalRecords];
}
