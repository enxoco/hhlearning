import Pagination from "#/components/Pagination";
import ColumnHeading from "#/features/parents/components/ColumnHeading";
import { useGetAllTeachersQuery } from "#/generated/graphql";
import usePagination from "#/hooks/usePagination";
import { CellRender, ITableProps, GridTemplateColumns } from "#/utils/tableUtils";
import { Box, Grid, Icon, Input, InputGroup, InputLeftElement, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";


export type SortFields = "email" | "name"

export default function ({ tableHeading, columnHeadings }: ITableProps) {
    const [limit] = useState(20);
    const [offset] = useState(0);
    const [searchString, setSearchString] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortField, setSortField] = useState<SortFields>("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [{ data, fetching, error }, fetchData] = useGetAllTeachersQuery({ variables: { limit, offset, searchString: debouncedSearch, sortParams: { [sortField]: sortDirection } } });

    const [pagination, setPage] = usePagination({
        totalRecords: data?.usersCount,
        initialPage: 1,
        defaultLimit: limit
    });


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (debouncedSearch != searchString) {
                setDebouncedSearch(searchString)
            }
        }, 500)
        return () => clearTimeout(timeout)
    }, [searchString])

    const columnHeadingProps = { sortDirection, sortField, setSortDirection, setSortField }

    return (
        <Stack spacing="5">
            <Box px={{ base: "4", md: "6" }} pt="5">
                <Stack direction={{ base: "column", md: "row" }} justify="space-between">
                    <Text fontSize="lg" fontWeight="medium">{tableHeading}</Text>
                    <InputGroup maxW="xs">
                        <InputLeftElement pointerEvents="none">
                            <Icon as={FiSearch} color="muted" boxSize="5" />
                        </InputLeftElement>
                        <Input placeholder="Search" onChange={(e) => setSearchString(e.target.value)} />h
                    </InputGroup>
                </Stack>
            </Box>
            <Box overflowX="auto">
                <Stack spacing="5">
                    <Box p={0}>
                        <List bgColor="white" p={5} border="1px solid #f5f5f5" borderRadius={10}>
                            <ListItem mb={5} border="5px solid #f8fafc" p={5}>
                                <Grid gridTemplateColumns={GridTemplateColumns(columnHeadings)} gridColumnGap={10}>
                                    {columnHeadings.map((heading) => <ColumnHeading key={heading.fieldName} fieldName={heading.fieldName} {...columnHeadingProps} disableSort={heading.disableSort || false} />)}
                                </Grid>
                            </ListItem>
                            {data?.users?.map((user) => (
                                <ListItem key={user.id} border="5px solid #f8fafc" p={5}>
                                    <Grid gridTemplateColumns={GridTemplateColumns(columnHeadings)} gridColumnGap={10}>
                                        {columnHeadings.map((column) => CellRender(column, user))}
                                    </Grid>
                                </ListItem>
                            ))}
                            <ListItem mt={5}>
                                <Pagination setPage={setPage} pagination={pagination} />
                            </ListItem>
                        </List>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}