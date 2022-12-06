import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
export default function useDeleteCourses(): [boolean, boolean, () => void]{
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const toast = useToast({ position: 'top', duration: 5000, isClosable: true, status: 'success' })

    const deleteCourses = () => {
        fetch("/rest/course/all", { method: "DELETE" })
        .then((res) => res.json())
        .then((json) => {
            if(json.status && json.status == "success"){
                
                setIsSuccess(true)
                toast({description: "Grades deleted successfully"})
            }
        })
        .finally(() => setIsDeleting(false))
    }

    
    return [isDeleting, isSuccess, deleteCourses];
}