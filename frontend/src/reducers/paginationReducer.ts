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
    let paginationObj = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // let page = nextPage < totalPageCount.at(-1) ? nextPage : totalPageCount.at(-1)
    if (nextPage >= 7 && totalPageCount.length > 10) {
      paginationObj = totalPageCount.slice(
        totalPageCount[nextPage - 6],
        totalPageCount[nextPage + 3]
      );
    }
    // if (totalPageCount.length < 10) {
    //     console.log("pagination object", paginationObj)
    //     paginationObj = totalPageCount
    // }
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
    case "SET_LIMIT":

      return {
        ...state,
        limit: payload.limit,
        lastPage: Math.ceil(payload.totalRecords / payload.limit)
        
      };
    case "SET_PAGE":
        const [lastPage, totalPageCount, paginationObj] = getPages({ totalRecords: state.totalRecords, limit: payload.limit, nextPage: payload.nextPage, totalPages: state.totalPages})

      return {
        ...state,
        limit: payload.limit,
        firstPage: 0,
        currentPage: payload.nextPage,
        lastPage: lastPage,
        totalPages: totalPageCount,
        pages: paginationObj,
        showFirst: payload.nextPage > 6,
        showLast: payload.nextPage < totalPageCount[totalPageCount.length - 1],
        offset: (payload.nextPage - 1) * payload.limit
      };
  }
}

