import { theme } from "@chakra-ui/pro-theme"
import { ChakraProvider, extendTheme, Skeleton } from "@chakra-ui/react"
import React from "react"

import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate} from "react-router-dom"
// import '@fontsource/inter/variable.css'
import { RecoilRoot } from "recoil"
import { createClient, Provider } from "urql"
import "./index.css"
import AddStudent from "./pages/AddStudent"
import AddTeacher from "./pages/AddTeacher"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Dashboard from "./pages/Dashboard"
import EditStudent from "./pages/EditStudent"
import Login from "./pages/Login"
import MyStudents from "./pages/MyStudents"
import Parents from "./pages/Parents"
// import Register from "./pages/Register"
import StudentReport from "./pages/StudentReport"
import Students from "./pages/Students"
import Teachers from "./pages/Teachers"
import reportWebVitals from "./reportWebVitals"
import {MyProfile} from "./pages/MyProfile"
import Settings from "./pages/Settings"
import { useRecoilState } from "recoil"
import { loggedInUser } from "./atom"
import { useCheckLoginQuery } from "./generated/graphql"

// import Parents from "./pages/Parents"
const client = createClient({
  url: "/api/graphql",
})

const myTheme = extendTheme(
  {
    colors: { ...theme.colors, brand: theme.colors.blue },
  },
  theme
)

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ChakraProvider theme={myTheme}>
          <RecoilRoot>
            <React.Suspense fallback='...loading' >
            <Router>
              <Routes>
                
              <Route path="/" element={<RequireAuth adminOnly={false} teacherOnly={false}><Dashboard /></RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Login />} />
                
                  <Route path="/dashboard" element={<RequireAuth adminOnly={false} teacherOnly={false}><Dashboard /></RequireAuth>} />
                  <Route path="/students" element={<RequireAuth adminOnly={false} teacherOnly><Students /></RequireAuth>} />
                  <Route path="/students/:id" element={<RequireAuth adminOnly={false} teacherOnly={false}><MyStudents /></RequireAuth>} />
                  <Route path="/student/:id" element={<RequireAuth adminOnly={false} teacherOnly><EditStudent /></RequireAuth>} />
                  <Route path="/student/:id/report" element={<RequireAuth adminOnly={false} teacherOnly={false}><StudentReport /></RequireAuth>} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
                  <Route path="/profile" element={<RequireAuth adminOnly={false} teacherOnly={false}><MyProfile /></RequireAuth>} />
                  <Route path="/add-student" element={<RequireAuth adminOnly teacherOnly><AddStudent /></RequireAuth>} />
                  <Route path="/teachers" element={<RequireAuth adminOnly teacherOnly><Teachers /></RequireAuth>} />
                  <Route path="/parents" element={<RequireAuth adminOnly teacherOnly><Parents /></RequireAuth>} />
                  <Route path="/add-teacher" element={<RequireAuth adminOnly teacherOnly><AddTeacher /></RequireAuth>} />
                  <Route path="/settings" element={<RequireAuth adminOnly teacherOnly><Settings /></RequireAuth>} />
                
 

              </Routes>
            </Router>
            </React.Suspense>

          </RecoilRoot>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.



/**
 * 
 * @param adminOnly = boolean - Whether or not this route should be restricted to admin users
 * @returns Child element
 * 
 * Custom auth wrapper to protect auth routes.
 */
function RequireAuth({ children, adminOnly, teacherOnly }: { children: JSX.Element, adminOnly: boolean, teacherOnly: boolean }) {
  const location = useLocation()
  const [user, setUser] = useRecoilState(loggedInUser)
  const [me] = useCheckLoginQuery()
  if (!user && !me.fetching && !me?.data?.authenticatedItem) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  /**
   * If we don't have a user
   * and the me query hasn't
   * yet completed, then we should
   * return an empty element,
   * otherwise return our layout
   */
  //  setUser(me.data?.authenticatedItem)

  // if (adminOnly && !me.data?.authenticatedItem.isAdmin) {
  //   return <Navigate to="/dashboard" state={{ from: location }} replace />
  // }

  // If we are getting to this point, then we know we have an
  // authenticated user so set them in state for the rest of
  // the application
  if (!user && !me.data?.authenticatedItem) {
    return (<></>)
    
  } else if (teacherOnly && me.data?.authenticatedItem.isParent) {
    return (<Dashboard />)
  } else if (adminOnly && !me.data?.authenticatedItem.isAdmin) {
    return (<Dashboard />)
  } 
  return children
}
