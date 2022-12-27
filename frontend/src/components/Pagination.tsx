import { PaginationState } from "#/reducers/paginationReducer";
import { Button, Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

export default function Pagination({
    page,
    pagination,
    setPage,
    setLimit,
    totalRecords
}: {
    page: number;
    pagination: PaginationState;
    setPage: (page: number, limit: number) => void;
    setLimit: (limit: number) => void;
    totalRecords: number;
}) {

    return (
        <>
            <Flex>
                <FormControl maxWidth="200px">
                    <FormLabel htmlFor="limit">Limit</FormLabel>
                    <Select
                        name="limit"
                        onChange={(e) => {
                            setPage(pagination.currentPage, +e.target.value);
                        }}
                    >
                        {[10,20,30,40,50].map((limit) => (
                            <option key={limit} value={limit}>{limit}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl maxWidth="200px" ml={5}>
                    <FormLabel htmlFor="gotopage">Go to page: </FormLabel>
                    <Input onChange={(e) => setPage(+e.target.value, pagination.limit)} />
                </FormControl>
            </Flex>


            <Flex justifyContent="space-between" mt={5}>
                {pagination.showFirst && (
                    <Button
                        className="button-pagination"
                        key="first-button"
                        onClick={() => setPage(1, pagination.limit)}
                    >
                        first
                    </Button>
                )}
                {pagination.pages.map((page) => (
                    <Button
                        isActive={page === pagination.currentPage}
                        className={
                            page === pagination.currentPage
                                ? "button-pagination button-active"
                                : "button-pagination"
                        }
                        key={page}
                        onClick={() => setPage(page, pagination.limit)}
                    >
                        {page}
                    </Button>
                ))}
                {pagination.showLast && (
                    <Button
                        className="button-pagination"
                        key="last-button"
                        onClick={() => setPage(pagination.lastPage, pagination.limit)}
                    >
                        last
                    </Button>
                )}
            </Flex>

        </>
    );
}
