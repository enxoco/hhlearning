import { PaginationState } from "#/reducers/paginationReducer";
import { Box, Button, Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

export default function Pagination({
    pagination,
    setPage,
}: {
    pagination: PaginationState;
    setPage: (page: number, limit: number) => void;
}) {

    return (
            <Flex justifyContent="flex-start" mt={5} data-testid="paginationButtonContainer" alignItems="center">
                {pagination.showFirst && (
                    <Button
                        className="button-pagination"
                        key="first-button"
                        onClick={() => setPage(1, pagination.limit)}
                        marginRight="1em"
                    >first</Button>
                )}
                {pagination.pages.map((page) => (
                    <Button
                        isActive={page === pagination.currentPage}
                        className={
                            page === pagination.currentPage
                                ? "button-pagination button-active"
                                : "button-pagination"
                        }
                        marginRight="1em"
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
                    >last</Button>
                )}
                <Flex marginLeft="auto">

                    <FormControl display="flex" alignItems="left" flexDirection="column" mr={5} maxWidth="120px">
                        <FormLabel htmlFor="limit">Limit</FormLabel>
                        <Select
                            data-testid="paginationSelect"
                            name="limit"
                            onChange={(e) => {
                                setPage(pagination.currentPage, +e.target.value);
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((limit) => (
                                <option data-testid={`setLimit${limit}`} key={limit} value={limit}>{limit}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl display="flex" alignItems="left" flexDirection="column" maxWidth="150px" mr={5}>
                        <FormLabel htmlFor="gotopage">Go to page: </FormLabel>
                        <Input value={pagination.currentPage || 1} onChange={(e) => setPage(+e.target.value, pagination.limit)} />
                    </FormControl>
                    <Box display="flex" alignItems="center" mt={5} minWidth="100px" data-testid="paginationCurrentResults">
                        {pagination.offset + 1} - {pagination.offset + pagination.limit} of {pagination.totalRecords}
                    </Box>
                </Flex>
            </Flex>
    );
}
