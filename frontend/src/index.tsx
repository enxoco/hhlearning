import { theme } from "@chakra-ui/pro-theme"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import React, { lazy } from "react"

import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom"
// import '@fontsource/inter/variable.css'
import { RecoilRoot } from "recoil"
import { createClient, Provider } from "urql"
import "./index.css"
import AddStudent from "./features/students/AddStudent"
import AddTeacher from "./features/teachers/AddTeacher"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Dashboard from "./pages/Dashboard"
import EditStudent from "./features/students/EditStudent"
import Login from "./pages/Login"
import MyStudents from "./features/teachers/MyStudents"
import Parents from "./features/parents/Index"
const Register = lazy(() => import("#/pages/Register"));
// import Register from "./pages/Register"
// import StudentReport from "./pages/StudentReport"
import Students from "#/features/students/Students"
import Teachers from "#/features/teachers/Teachers"
import { MyProfile } from "#/pages/MyProfile"
import Settings from "#/pages/Settings"
import { useRecoilState } from "recoil"
import { loggedInUser } from "#/atom"
import PageSkeleton from "#/features/layout/components/PageSkeleton"
import Emails from "#/features/emails/Index"
import Email from "#/features/emails/Email"
import Parent from "./features/parents/Parent"

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
const rootElement = document.getElementById("root")

if (!rootElement) throw new Error("Failed to find root element")
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <ChakraProvider theme={myTheme}>
        <RecoilRoot>

          <React.Suspense fallback={<PageSkeleton />} >
            <Router>
              <Routes>

                <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/students" element={<RequireAuth><Students isFormer={false} /></RequireAuth>} />
                <Route path="/former-students" element={<RequireAuth><Students isFormer={true} /></RequireAuth>} />
                <Route path="/students/:id" element={<RequireAuth><MyStudents /></RequireAuth>} />
                <Route path="/student/:id" element={<RequireAuth><EditStudent /></RequireAuth>} />
                {/* Deprecated as we are now using the legacy php scripts to print reports.
                <Route path="/student/:id/report" element={<RequireAuth><StudentReport /></RequireAuth>} /> */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
                <Route path="/profile" element={<RequireAuth><MyProfile /></RequireAuth>} />
                <Route path="/add-student" element={<RequireAuth adminOnly><AddStudent /></RequireAuth>} />
                <Route path="/teachers" element={<RequireAuth adminOnly><Teachers /></RequireAuth>} />
                <Route path="/parents" element={<RequireAuth adminOnly><Parents /></RequireAuth>} />
                <Route path="/families" element={<RequireAuth adminOnly><Parents /></RequireAuth>} />
                <Route path="/families/:id" element={<RequireAuth adminOnly><Parent /></RequireAuth>}></Route>
                <Route path="/emails" element={<RequireAuth adminOnly><Emails /></RequireAuth>} />
                <Route path="/emails/:id" element={<RequireAuth adminOnly><Email /></RequireAuth>} />
                {/* <Route path="/families/:id" element={<RequireAuth adminOnly><Parent /></RequireAuth>} /> */}
                <Route path="/add-teacher" element={<RequireAuth adminOnly><AddTeacher /></RequireAuth>} />
                <Route path="/settings" element={<RequireAuth adminOnly><Settings /></RequireAuth>} />
              </Routes>
            </Router>
          </React.Suspense>

        </RecoilRoot>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
/**
 * 
 * @param adminOnly = boolean - Whether or not this route should be restricted to admin users
 * @returns Child element
 * 
 * Custom auth wrapper to protect auth routes.
 */
function RequireAuth({ children, adminOnly }: { children: JSX.Element, adminOnly?: boolean }) {
  const location = useLocation()
  const [user, setUser] = useRecoilState(loggedInUser)
  if (!user) {
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
  console.log("user", user)
  if (!user) {
    return (<></>)
  } else if (adminOnly && !user.isAdmin) {
    return (<Dashboard />)
  }
  return children
}
