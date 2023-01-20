import { useEffect, useReducer, useState } from "react";
import { paginationReducer, PaginationState } from "#/reducers/paginationReducer";
import { useSearchParamsState } from "./useSearchParamsState";

export const getTotalPages = (totalRecords: number, limit: number) => {
  const total = [];
  for (var i = 0; i < totalRecords / limit; i++) {
    total.push(i);
  }
  return total;
};
interface IPaginationProps {
  totalRecords: number;
}

type IPaginationReturnType = [
  state: PaginationState,
  setPage: (page: number,
  limit: number) => void, 
  setTotalRecords: (total: number) => void, 
  setLimit: (limit: number) => void, 
  setOffset: (offset: number) => void
]


export default function usePagination({
  totalRecords,
}: IPaginationProps): IPaginationReturnType {

  const [page, setInitialPage] = useSearchParamsState("page", "1");
  const [limit, setLimitState] = useSearchParamsState("limit", "20");
  const numPages = getTotalPages(totalRecords, +limit);
  const [state, dispatch] = useReducer(paginationReducer, {
    firstPage: 0,
    currentPage: +page,
    lastPage: totalRecords / +limit - 1,
    totalPages: numPages,
    pages: numPages,
    totalRecords: totalRecords,
    showFirst: false,
    showLast: true,
    offset: 0,
    limit: +limit
  });

  const setPage = (page: number, limit: number) => {
    dispatch({
      type: "SET_PAGE",
      payload: {
        limit: limit,
        nextPage: page
      }
    });
    setInitialPage(page.toString());
    setLimitState(limit.toString());
  };

  const setTotalRecords = (total: number) => {
    dispatch({
        type: "SET_TOTAL_RECORDS",
        payload: { limit: state.limit, nextPage: state.currentPage, totalRecords: total}
    })
  }

  const setLimit = (limit: number) => {
    dispatch({
      type: "SET_LIMIT",
      payload: { nextPage: state.currentPage, limit }
    })
    setLimitState(limit.toString());
  }

  const setOffset = (offset: number) => {
    dispatch({
      type: "SET_OFFSET",
      payload: { nextPage: state.currentPage, limit: state.limit, offset }
    })
  }

  // This is basically responsible for syncing our state on the initial page load.
  // This is where we take the page/limit from the search params if they exist
  // and push them into our local state.
  useEffect(() => {
    setPage(+page, +limit);
  }, []);

  useEffect(() => {
    if (state.totalRecords != totalRecords) {
      setTotalRecords(totalRecords)
      setPage(+page, state.limit)
    }
  }, [totalRecords])

  

  return [state, setPage, setTotalRecords, setLimit, setOffset];
}
