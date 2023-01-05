import {Flex, Heading, IconButton} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon} from "@chakra-ui/icons";
import { SortFields } from "../Index";
interface IColumnHeadingProps {
    fieldName: "name" | "lastName" | "email";
    sortDirection: "asc" | "desc";
    setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    sortField: SortFields,
    setSortField: React.Dispatch<React.SetStateAction<SortFields>>
}
export default function({ fieldName, sortDirection, setSortDirection, sortField, setSortField }){
    return (
        <Flex alignItems="center" justifyContent="space-between">
        <Heading size="xxs">{fieldName.replace(/([A-Z])/g, " $1").replace(/(^[a-z])/, s => s.toUpperCase())}</Heading>
        <IconButton aria-label="sort" 
            variant="ghost"
            icon={
                sortDirection === "desc" && sortField === fieldName
                ? <ArrowDownIcon /> 
                : <ArrowUpIcon />
            } 
            onClick={() => {
            setSortField(fieldName)
            setSortDirection((sortDirection === "asc") ? "desc" : "asc")
            }} 
        />
      </Flex>
    )
}