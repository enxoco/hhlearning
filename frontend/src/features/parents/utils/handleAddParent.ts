import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { UseMutationState, UseQueryState, OperationContext } from "urql";
import { CreateUserMutation, Exact, GetAllParentsQuery, useCreateUserMutation, useGetAllParentsQuery, UserCreateInput, UserOrderByInput } from "#/generated/graphql";

type IAddParentProps = {
    parentFirstName: string;
    parentLastName: string;
    parentEmail: string;
}
export default function useHandleAddingParent({ parentFirstName, parentLastName, parentEmail }: IAddParentProps): [
    UseMutationState<CreateUserMutation, Exact<{
data: UserCreateInput
    }>>, 
    UseQueryState<GetAllParentsQuery, Exact<{ limit: number; offset: number; searchString: string; sortParams: UserOrderByInput | UserOrderByInput[]; }>>, 
    (opts?: Partial<OperationContext>) => void] 
    {
    const [isPaused, setIsPaused] = useState(true);
    const [isCreatingParent, setIsCreatingParent] = useState(false);
    const [newParent, createNewParent] = useCreateUserMutation();
    const [parentData, getParents] = useGetAllParentsQuery({ pause: isPaused });
    const toast = useToast();
    const handleAddParent = async (e) => {
        e.preventDefault()
        let uuid = self.crypto.randomUUID();
        createNewParent({data: {
            name: parentFirstName,
            lastName: parentLastName,
            email: parentEmail,
            password: uuid,
            isParent: true
        }})

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