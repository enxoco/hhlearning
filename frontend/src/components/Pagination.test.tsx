import '@testing-library/jest-dom'
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";
import { screen, RenderResult, render, queries } from "@testing-library/react"
import { renderHook } from '@testing-library/react-hooks'
import { PaginationState } from "#/reducers/paginationReducer";
import { MemoryRouter } from 'react-router-dom';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode}) => <MemoryRouter>{children}</MemoryRouter>

/**
 *  Function that takes in some state, renders the component and then returns the component and the updated state
 */
async function renderPagination(totalRecords: number, initialPage: number, defaultLimit: number): Promise<[
  component: RenderResult<typeof queries, HTMLElement, HTMLElement>,
  pagination: PaginationState
]> {
  
  const wrapper = ({ children }: { children: ReactNode}) => <MemoryRouter>{children}</MemoryRouter>
  const { result } = renderHook(() => usePagination({
    totalRecords
  }), { wrapper });

  const [pagination, setPage] = result.current
  const component = render(
    <Pagination pagination={result.current[0]} setPage={setPage} />
  );
  await setPage(initialPage, defaultLimit);

  await component.rerender(<Pagination pagination={result.current[0]} setPage={setPage} />)
  return [component, result.current[0]]
}

test("Pagination renders correctly initially", async () => {

  const { result } = renderHook(() => usePagination({
    totalRecords: 380
  }), { wrapper });

  const [pagination, setPage] = result.current
  const component = render(
        <Pagination pagination={pagination} setPage={setPage} />);
  // Get our button container
  const buttonWrapper = screen.getByTestId("paginationButtonContainer");

  const buttons = buttonWrapper.querySelectorAll("button")
  expect(buttons.length).toEqual(11)
  // const buttons = buttonWrapper.children
  expect(buttons[0].innerHTML).toEqual("1")
  expect(buttons[0].classList.contains("button-active")).toBeTruthy()
  expect(buttons[buttons.length - 2].innerHTML.trim()).toEqual("10")
  expect(buttons[buttons.length - 1].innerHTML.trim()).toEqual("last")

  // expect(buttonWrapper.style.justifyContent).toEqual("space-between")
  expect(buttonWrapper.getElementsByTagName("button")[0].style.marginRight).toBeFalsy()
  let currentResults = await component.findByTestId("paginationCurrentResults")
  expect(currentResults.textContent).toBe(`1 - 20 of 380`)

  expect(component).toMatchSnapshot()
});

test("Pagination renders first and last buttons when on page 8 or higher", async () => {
  // const [component] = renderPagination(380, 8, 10)
  let { result } = renderHook(() => usePagination({
    totalRecords: 380
  }), { wrapper });

  let [pagination, setPage] = result.current

  const component = render(<Pagination pagination={result.current[0]} setPage={setPage} />);

  await setPage(8, 10)
  await component.rerender(<Pagination pagination={result.current[0]} setPage={setPage} />)
  // Get our button container

  let buttonWrapper = await screen.getByTestId("paginationButtonContainer");
  let buttons = buttonWrapper.querySelectorAll("button")
  expect(buttons.length).toEqual(11)
  expect(buttons[0].innerHTML).toEqual("first")
  expect(buttons[1].innerHTML).toEqual("4")
  expect(buttons[buttons.length - 2].innerHTML.trim()).toEqual("12")
  expect(buttons[buttons.length - 1].innerHTML.trim()).toEqual("last")
  expect(component).toMatchSnapshot()

});

test("Pagination initial state is correct", async () => {

  const [component, state] = await renderPagination(251, 1, 10)

  const { firstPage, currentPage, lastPage, totalPages, pages, totalRecords, showFirst, showLast, offset, limit } = state;
  expect(firstPage).toEqual(0);
  expect(currentPage).toEqual(1);
  expect(lastPage).toEqual(26);
  expect(totalPages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
  expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  expect(showFirst).toBe(false);
  expect(showLast).toBe(true);

});

test("limit updates correctly", async () => {
  const [component, state] = await renderPagination(251, 8, 20)

  expect(state.lastPage).toEqual(13)
  expect(state.totalPages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
  expect(state.currentPage).toEqual(8)
  expect(state.pages).toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12])
  expect(state.showFirst).toBe(true)
  expect(state.showLast).toBe(true)
  expect(screen.queryByDisplayValue("20")).toBeInTheDocument()
  expect(screen.queryByDisplayValue("20").getAttribute("name")).toBe("limit")
  expect(screen.queryByDisplayValue("10")).not.toBeInTheDocument()


  expect(component).toMatchSnapshot()
})

test("should automatically set last page if greater than last page is provided", async () => {
  const { result } = renderHook(() => usePagination({
    totalRecords: 251
  }));
  const [component, state] = await renderPagination(251, 15, 20)
  expect(state.currentPage).toEqual(state.lastPage)

  const buttonWrapper = screen.getByTestId("paginationButtonContainer");
  const buttons = buttonWrapper.querySelectorAll("button")
  expect(buttons.length).toEqual(4)
  expect(buttons[buttons.length - 1].innerHTML).toEqual("13")
  expect(buttons[buttons.length - 1].classList.contains("button-active")).toBe(true)

  expect(component).toMatchSnapshot()
})

test("shows correct number of buttons in relation to results", async () => {
  const { result } = renderHook(() => usePagination({
    totalRecords: 20
  }));

  const [component] = await renderPagination(20, 1, 10)
  screen.findAllByRole("button")
    .then((buttons) => {
      expect(buttons.length).toEqual(2)
    })
  const buttonWrapper = screen.getByTestId("paginationButtonContainer");

  expect(buttonWrapper.getElementsByTagName("button")[0].style.marginRight).toBeDefined()
  expect(component).toMatchSnapshot()

})

test("shows correct number of results when less than the limit size", async () => {
  const [component, state] = await renderPagination(15, 1, 20)
  expect(state.pages).toEqual([1])
  let currentResults = await component.findByTestId("paginationCurrentResults")
  expect(currentResults.textContent).toBe(`1 - 15 of 15`)
})

test("shows 0 when no results", async () => {
  const [component, state] = await renderPagination(0, 1, 20)
  expect(state.pages).toEqual([])
  let currentResults = await component.findByTestId("paginationCurrentResults")
  expect(currentResults.textContent).toBe(`0 results`)
})