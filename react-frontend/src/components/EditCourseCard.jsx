import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, Flex, FormControl, FormLabel, IconButton, Input, Stack, useColorModeValue, Textarea, Badge } from '@chakra-ui/react'
import * as React from 'react'
import { useState, useContext } from 'react'
import { useUpdateCourseMutation, useCreateCourseMutation, useDeleteCourseMutation } from '../generated/graphql'
import { UserContext } from '../UserContext'
import {useNavigate} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {fetchCourses as fetchCoursesAtom, impersonateUser} from '../atom'
const EditStudentCard = ({name, grade, feedback, id, student, hideNewCourseCard, teacher, teacherName}) => {

    const navigate = useNavigate()
    const  [courseName, setCourseName] = useState(name)
    const [courseGrade, setCourseGrade] = useState(grade)
    const [courseFeedback, setFeedback] = useState(feedback)
    const {state, setState} = useContext(UserContext)

    const [updatedCourse, setUpdateCourse] = useUpdateCourseMutation()
    const [createdCourse, createCourse] = useCreateCourseMutation()
    const [_, deleteCourse] = useDeleteCourseMutation()
    const [fetchCourses, setFetchCourses] = useRecoilState(fetchCoursesAtom)
    const {impersonatedUser} = useRecoilState(impersonateUser)
    const handleCourseNameUpdate = (e) => {
        setCourseName(e.target.value)
    }

    const handleCourseGradeUpdate = (e) => {
        setCourseGrade(e.target.value)
    }

    const handleFeedbackUpdate = (e) => {
      setFeedback(e.target.value)
    }

    const handleFormSubmission = async () => {
        await setUpdateCourse({
            name: courseName,
            grade: courseGrade,
            feedback: courseFeedback,
            id: id
        })
    }

    const handleCreateNewCourse = async () => {
        await createCourse({
            name: courseName,
            grade: courseGrade,
            feedback: courseFeedback,
            student,
            teacher
        })

        navigate(0)
        hideNewCourseCard()



    }

    const handleDeleteCourse = () => {
      deleteCourse({id})
    }
    return (
        <Box as="form" bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")} borderRadius="lg">
          <Badge borderRadius={0} p={5}>Teacher: {teacherName}</Badge>
        <Stack spacing="5" px={{ base: "4", md: "6" }} py={{ base: "5", md: "6" }}>
          
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input defaultValue={courseName} onChange={handleCourseNameUpdate} />
            </FormControl>
            <FormControl id="grade" onChange={handleCourseGradeUpdate}>
              <FormLabel>Grade</FormLabel>
              <Input defaultValue={courseGrade} />
            </FormControl>

          </Stack>
          <FormControl id="feedback">
              <FormLabel>Feedback</FormLabel>
              <Textarea value={courseFeedback || null} onChange={handleFeedbackUpdate} />
            </FormControl>
        </Stack>
        <Divider />
        <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
          <Button variant="primary" onClick={(id) ? handleFormSubmission : handleCreateNewCourse} isLoading={updatedCourse.fetching || createdCourse.fetching}>Save</Button>
          <IconButton icon={<DeleteIcon />} variant="ghost" mr={'auto'} aria-label='Delete Course' colorScheme="red" onClick={handleDeleteCourse}>Delete</IconButton>

        </Flex>
      </Box>
    )
}
export default EditStudentCard