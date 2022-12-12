import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { UseMutationState, UseQueryState, OperationContext } from "urql";
import { CreateParentMutation, Exact, GetAllParentsQuery, useCreateParentMutation, useGetAllParentsQuery } from "../../../generated/graphql";

type IAddParentProps = {
    parentFirstName: string;
    parentLastName: string;
    parentEmail: string;
}
export default function useHandleAddingParent({ parentFirstName, parentLastName, parentEmail }: IAddParentProps): [
    UseMutationState<CreateParentMutation, Exact<{
        name: string;
        lastName: string;
        password: string;
        email: string;
    }>>, 
    UseQueryState<GetAllParentsQuery, Exact<{
        [key: string]: never;
    }>>, 
    (opts?: Partial<OperationContext>) => void] 
    {
    const [isPaused, setIsPaused] = useState(true);
    const [isCreatingParent, setIsCreatingParent] = useState(false);
    const [newParent, createNewParent] = useCreateParentMutation();
    const [parentData, getParents] = useGetAllParentsQuery({ pause: isPaused });
    const toast = useToast();
    const handleAddParent = async (e) => {
        e.preventDefault()
        let uuid = self.crypto.randomUUID();
        createNewParent({
            name: parentFirstName,
            lastName: parentLastName,
            email: parentEmail,
            password: uuid
        })

        await getParents()
        if (newParent.error) {
            console.log(newParent.error.message)
            if (newParent.error.message == "[GraphQL] Prisma error: Unique constraint failed on the fields: (`email`)")
                toast({
                    status: "error",
                    description: "There is already a family with this email address.  Please try another."
                })
        } else {
            toast({
                status: "success",
                description: "Parents added successfully"
            })
            //   setParentFirstName("")
            //   setParentLastName("")
            //   setParentEmail("")
            //   onClose()
        }

    }
    return [newParent, parentData, getParents]
}