import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";
import { screen, render } from "@testing-library/react"
import { renderHook } from '@testing-library/react-hooks'


test("Pagination renders correctly initially", async () => {
  const { result } = renderHook(() => usePagination({
    totalRecords: 380,
    initialPage: 1,
    defaultLimit: 10
  }));

  const [pagination, setPage] = result.current
  const component = render(
    <Pagination pagination={pagination} setPage={setPage} />
  );
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
  expect(currentResults.textContent).toBe(`1 - 10 of 380`)

  expect(component).toMatchSnapshot()
});

test("Pagination renders first and last buttons when on page 8 or higher", () => {
  const { result } = renderHook(() => usePagination({
    totalRecords: 380,
    initialPage: 8,
    defaultLimit: 10
  }));

  const [pagination, setPage] = result.current

  const component = render(<Pagination pagination={pagination} setPage={setPage} />)
  // Get our button container
  const buttonWrapper = screen.getByTestId("paginationButtonContainer");
  const buttons = buttonWrapper.querySelectorAll("button")
  expect(buttons.length).toEqual(11)
  expect(buttons[0].innerHTML).toEqual("first")
  expect(buttons[1].innerHTML).toEqual("4")
  expect(buttons[buttons.length - 2].innerHTML.trim()).toEqual("12")
  expect(buttons[buttons.length - 1].innerHTML.trim()).toEqual("last")
  expect(component).toMatchSnapshot()

});

test("Pagination initial state is correct", () => {
  const { result } = renderHook(() => usePagination({
    totalRecords: 251,
    initialPage: 1,
    defaultLimit: 10
  }));
  const [pagination, setPage] = result.current

  render(
    <Pagination pagination={pagination} setPage={setPage} />
  );

  const { firstPage, currentPage, lastPage, totalPages, pages, totalRecords, showFirst, showLast, offset, limit } = result.current[0];
  expect(firstPage).toEqual(0);
  expect(currentPage).toEqual(1);
  expect(lastPage).toEqual(26);
  expect(totalPages).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]);
  expect(pages).toEqual([1,2,3,4,5,6,7,8,9,10])
  expect(showFirst).toBe(false);
  expect(showLast).toBe(true);

});

test("limit updates correctly", () => {
  const { result } = renderHook(() => usePagination({
    totalRecords: 251,
    initialPage: 8,
    defaultLimit: 20
  }));


  const [pagination, setPage] = result.current

  const component = render(<Pagination pagination={pagination} setPage={setPage} />)

  expect(pagination.lastPage).toEqual(13)
  expect(pagination.totalPages).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13])
  expect(pagination.currentPage).toEqual(8)
  expect(pagination.pages).toEqual([4,5,6,7,8,9,10,11,12])
  expect(pagination.showFirst).toBe(true)
  expect(pagination.showLast).toBe(true)
  
  expect(component).toMatchSnapshot()
})

test("should automatically set last page if greater than last page is provided", () => {
  const { result } = renderHook(() => usePagination({
    totalRecords: 251,
    initialPage: 15,
    defaultLimit: 20
  }));

  const [pagination, setPage] = result.current
  const component = render(
    <Pagination pagination={pagination} setPage={setPage} />
  );

  expect(pagination.currentPage).toEqual(pagination.lastPage)
  
  const buttonWrapper = screen.getByTestId("paginationButtonContainer");
  const buttons = buttonWrapper.querySelectorAll("button")
  expect(buttons.length).toEqual(4)
  expect(buttons[buttons.length - 1].innerHTML).toEqual("13")
  expect(buttons[buttons.length -1].classList.contains("button-active")).toBe(true)

  expect(component).toMatchSnapshot()
}) 

test("shows correct number of buttons in relation to results", async () => {
  const { result } = renderHook(() => usePagination({
    totalRecords: 20,
    initialPage: 1,
    defaultLimit: 10
  }));

  const [pagination, setPage] = result.current
  const component = render(
    <Pagination pagination={pagination} setPage={setPage} />
  );
  screen.findAllByRole("button")
    .then((buttons) => {
      expect(buttons.length).toEqual(2)
  })
  const buttonWrapper = screen.getByTestId("paginationButtonContainer");

  expect(buttonWrapper.getElementsByTagName("button")[0].style.marginRight).toBeDefined()
  expect(component).toMatchSnapshot()
  
})

// test("shows index of results", async () => {
//   const { result } = renderHook(() => usePagination({
//     totalRecords: 200,
//     initialPage: 1,
//     defaultLimit: 10
//   }));

//   const [pagination, setPage] = result.current
//   const component = render(
//     <Pagination pagination={pagination} setPage={setPage} />
//   );
//   let currentResults = await component.findByTestId("paginationCurrentResults")
//   expect(currentResults.textContent).toBe("1 - 10 of 200")

//   // setPage(2, 10)
//   // component.rerender(<Pagination pagination={pagination} setPage={setPage} />);
//   // currentResults = await component.findByTestId("paginationCurrentResults")
//   // expect(currentResults.textContent).toBe("11 - 20 of 200")

// })