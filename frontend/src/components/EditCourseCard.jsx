import { DeleteIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, IconButton, Input, Stack, Textarea, useColorModeValue, useToast } from '@chakra-ui/react'
import { useState, useRef } from 'react'
import {useRecoilState} from 'recoil'
import {showNewCourseCard} from '../atom'
import { useCreateCourseMutation, useDeleteCourseMutation, useUpdateCourseMutation } from '../generated/graphql'
import Hashids from 'hashids'
const hashids = new Hashids(process.env.REACT_APP_SALT, +process.env.REACT_APP_SALT_LENGTH)

const EditStudentCard = ({name, grade, feedback, id, student, teacher, teacherName}) => {

    const [courseName, setCourseName] = useState(name)
    const [courseGrade, setCourseGrade] = useState(grade)
    const [courseFeedback, setFeedback] = useState(feedback)

    const [updatedCourse, setUpdateCourse] = useUpdateCourseMutation()
    const [createdCourse, createCourse] = useCreateCourseMutation()
    const [_, deleteCourse] = useDeleteCourseMutation()
    const [newCourse, setNewCourse] = useRecoilState(showNewCourseCard)
    const toast = useToast()
    const toastIdRef = useRef()
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
            teacher: +teacher,
            id: +id
        })
        setNewCourse(false)
        addToast(courseName)
    }

    const handleCreateNewCourse = async () => {
        await createCourse({
            name: courseName,
            grade: courseGrade,
            feedback: courseFeedback,
            student: +hashids.decode(student)[0],
            teacher: +teacher
        })
        setNewCourse(false)
        addToast(courseName)

    }

    const handleDeleteCourse = () => {
      deleteCourse({id})
      addDeletedToast()
    }
    const containerStyle = {
      width: '800px',
      maxWidth: '100%',
      textAlign: 'center'
    }

    function addToast(courseName) {
      toastIdRef.current = toast({
        status: 'success',
        description: `${courseName || 'Course'} saved successfully`,
        position: 'top',
        containerStyle
      })
    }

    function addDeletedToast(courseName) {
      toastIdRef.current = toast({
        status: 'error',
        description: `${courseName || 'Course'} deleted successfully`,
        position: 'top',
        containerStyle
      })
    }
    return (
        <Box as="form" bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")} borderRadius="lg" data-label="course-card">
          <HStack justifyContent="space-between">
            <Badge borderRadius={0} p={5}>Teacher: {teacherName}</Badge>
          </HStack>

        <Stack spacing="5" px={{ base: "4", md: "6" }} py={{ base: "5", md: "6" }}>
          
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl id="courseName">
              <FormLabel>Course Name</FormLabel>
              <Input defaultValue={courseName} onChange={handleCourseNameUpdate} />
            </FormControl>
            <FormControl id="courseGrade" onChange={handleCourseGradeUpdate}>
              <FormLabel>Grade</FormLabel>
              <Input defaultValue={courseGrade} />
            </FormControl>

          </Stack>
          <FormControl id="feedback">
              <FormLabel>Feedback</FormLabel>
              <Textarea onChange={handleFeedbackUpdate} defaultValue={courseFeedback || null} ></Textarea>
            </FormControl>
        </Stack>
        <Divider />
        <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
          <Button variant="primary" onClick={(id) ? handleFormSubmission : handleCreateNewCourse} isLoading={updatedCourse.fetching || createdCourse.fetching} data-action="save-course">Save</Button>
          <IconButton icon={<DeleteIcon />} variant="ghost" mr={'auto'} aria-label='Delete Course' colorScheme="red" onClick={handleDeleteCourse} data-action="delete-course">Delete</IconButton>

        </Flex>
      </Box>
    )
}
export default EditStudentCard