import { atom } from "recoil"

/**
 * 
 * @returns User
 * 
 * Run our login check on our first render so that it is available to all of our routes.
 * 
 * Relies on React.Suspense wrapper around all of our routes
 */
async function getCheckAuth(){
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      query CheckLogin {
        authenticatedItem {
          __typename
          ... on User {
            id
            email
            name
            firstName
            lastName
            isAdmin
            isParent
            hasPaidTuition
          }
        }
      }
      `
    })
  })

  const {data} = await response.json() || null
  return data.authenticatedItem 
}

export const teachers = atom({
  key: "teachers",
  default: null,
})

export const parents = atom({
  key: "parents",
  default: null,
})


export const students = atom({
  key: "students",
  default: null,
})

export const searchTerm = atom({
  key: "searchTerm",
  default: "",
})

export const loggedInUser = atom({
  key: "loggedInUser",
  default: getCheckAuth()
})

export const studentCount = atom({
  key: "studentCount",
  default: 0,
})

export const fetchCourses = atom({
  key: "fetchCourses",
  default: false,
})

export const courses = atom({
  key: "courses",
  default: {id: null, name: "", grade: ""},
})

export const pageSize = atom({
  key: "pageSize",
  default: 50
})

export const pageOffset = atom({
  key: "pageOffset",
  default: 0
})

export const impersonateUser = atom({
  key: "impersonate",
  default: null
})

export const settings = atom({
  key: "settings",
  default: null
})

export const showNewCourseCard = atom({
  key: "showNewCourseCard",
  default: false
})