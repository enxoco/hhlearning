import { useReducer } from "react";

type PaginationActionKind = "SET_LIMIT" | "SET_PAGE" | "SET_TOTAL_RECORDS";

export interface PaginationState {
  firstPage: number;
  currentPage: number;
  lastPage: number;
  totalPages: number[];
  pages: number[];
  totalRecords: number;
  showFirst: boolean;
  showLast: boolean;
  offset: number;
  limit: number;
}

type PaginationActionType = {
  type: PaginationActionKind;
  payload: {
    nextPage: number;
    limit: number;
    totalRecords?: number;
  };
};

/**
 * 
 * @param totalRecords - total number of rows of data.  This can come from an api response.
 * @param limit - number of records to display at a time.  defaults to 10
 * @param nextPage - the page that is being selected
 * 
 * our page should always be the most recent page that the user has selected, however if the
 * user changes the limit.
 * @returns 
 */
function getPages({totalRecords, limit, nextPage, totalPages}: { totalRecords: number, limit: number, nextPage: number; totalPages: number[] }): [lastPage: number, totalPageCount: number[], paginationObj: number[]]{
    const lastPage = Math.ceil(totalRecords / limit);
    const totalPageCount: number[] = [];
    for (var i = 0; i < lastPage; i++) {
      totalPageCount.push(i + 1);
    }
    // This is the default value
    // We only want to show 10 pages of results max.
    // If we have less than 10 pages then we should show all the buttons.
    let paginationObj = totalPageCount.length < 10 ? totalPageCount : [1,2,3,4,5,6,7,8,9,10];
    
    if (nextPage >= 7 && totalPageCount.length > 10) {
      paginationObj = totalPageCount.slice(
        totalPageCount[nextPage - 6],
        totalPageCount[nextPage + 3]
      );
    }

    return [lastPage, totalPageCount, paginationObj]
}

export function paginationReducer(
  state: PaginationState,
  action: PaginationActionType
) {
  const { payload, type } = action;

  switch (type) {
    case "SET_TOTAL_RECORDS":
        return {
            ...state,
            totalRecords: payload.totalRecords,
        }
    case "SET_PAGE":
        const [lastPage, totalPageCount, paginationObj] = getPages({ totalRecords: state.totalRecords, limit: payload.limit, nextPage: payload.nextPage, totalPages: state.totalPages})
        
        // We should always have a current page set, even on initial render.
        let curPage: number;
        if (!lastPage) {
          curPage = 1;
        }
        else if (payload.nextPage < lastPage) {
          curPage = payload.nextPage;
        } else {
          curPage = lastPage;
        }  
      return {
        ...state,
        limit: payload.limit,
        firstPage: 0,
        currentPage: curPage,
        lastPage: lastPage,
        totalPages: totalPageCount,
        pages: paginationObj,
        showFirst: payload.nextPage > 6 && totalPageCount.length > 5,
        showLast: payload.nextPage < totalPageCount[totalPageCount.length - 1] && totalPageCount.length > 5,
        offset: (payload.nextPage - 1) * payload.limit
      };
  }
}

