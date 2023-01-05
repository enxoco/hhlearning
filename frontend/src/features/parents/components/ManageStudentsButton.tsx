import { chakra, IconButton, Tooltip } from "@chakra-ui/react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";
import { Student } from "#/generated/graphql";
interface ButtonProps {
    id: string, portalId: string, email: string, students: Student[];
    setParentName: Dispatch<SetStateAction<string>>;
    setParentId: Dispatch<SetStateAction<string>>;
    lastName: string;
    onOpen: () => void;
  }
const Button = chakra(IconButton, {
    baseStyle: {
        color: "green",
        background: "white",
        borderRadius: "50%",
        padding: 1
    }
})
export default function ({ students, setParentName, setParentId, onOpen, lastName, id }: ButtonProps) {
    return (
        <div data-testid="manageChildrenButton">
        <Tooltip label={students.length ? "Manage Children" : "Add Children"}>
            <Button 
                aria-label={students.length ? "Manage Children" : "Add Children"} 
                icon={students.length ? <EditIcon boxSize="1.5em" /> : <AddIcon boxSize="1.5em" />} 
                _hover={{ background: "green", color: "white" }} 
                onClick={() => {
                    setParentName(lastName)
                    setParentId(id)
                    onOpen()
                }} 
            />
        </Tooltip>
        </div>
    )
}