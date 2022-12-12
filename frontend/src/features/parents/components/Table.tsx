import { Button, HStack, Input, Select, Table as TableWrapper, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { IoArrowDown, IoArrowUp } from "react-icons/io5"
import { useFilters, usePagination, useSortBy, useTable } from "react-table"
// Create an editable cell renderer
const EditableCell = ({ value: initialValue }) => {
  // We need to keep and update the state of the cell normally
  const [, setValue] = useState(initialValue)

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return `${initialValue}`
}
// Define a default UI for filtering
function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
  const count = preFilteredRows.length

  return (
    <Input
      maxW="300px"
      value={filterValue || ""}
      data-filter="true"
      onChange={(e) => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} parents...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  // return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val

export default function Table({ columns, data }) {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true
        })
      },
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
      Cell: EditableCell,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const initialState = {
    hiddenColumns: ["id", "portalId"],
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      disableMultiSort: true,
      initialState,
    },
    useFilters,
    useSortBy,
    usePagination
  )

  // Render the UI for your table
  return (
    <TableContainer>
      <TableWrapper {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} data-test={"test"}>
              {headerGroup.headers.map((column) => {
                return (
                  <Th {...column.getHeaderProps()}>
                    <VStack spacing="1" {...column.getSortByToggleProps()}>
                      <HStack>
                      <Text mr={10}>{column.render("Header")}</Text>

                      {column.canSort ? <Button>{column.isSorted ? column.isSortedDesc ? <IoArrowDown /> : <IoArrowUp /> : <IoArrowUp />}</Button> : null}

                      </HStack>
                      {column.canFilter ? column.render("Filter") : null}
                    </VStack>
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} key={row.values.id} data-id={row.values.id}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>
                      {cell.render("Cell", { editable: false })}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </TableWrapper>

      <HStack className="pagination" mt={5}>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </Button>{" "}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </Button>{" "}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </Button>{" "}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </Button>{" "}
        <Text>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </Text>
        <Text>
          | Go to page:{" "}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: "100px" }}
          />
        </Text>{" "}
        <Select
          maxW="200px"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </HStack>
    </TableContainer>
  )
}