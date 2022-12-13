import { loggedInUser } from "#/atom";
import {
  Divider,
  Flex,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHome, FiLogOut, FiUsers, FiSettings, FiGlobe } from "react-icons/fi";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useCheckLoginQuery, useLogoutMutation } from "../generated/graphql";
import logo from "../logo.jpg";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, logOut] = useLogoutMutation();

  const [user, setUser] = useRecoilState(loggedInUser)

  async function handleLogout(e) {
    e.preventDefault();
    const _ = await logOut({});
    navigate("/login");
  }

  return (
    <Flex as="section" minH="100vh" bg="bg-canvas" w={300}>
      <Flex
        flex="1"
        bg="bg-surface"
        overflowY="auto"
        boxShadow={useColorModeValue("md", "sm-dark")}
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
            <Image mx="auto" src={logo} h={217} w={225} />

            <Stack spacing="1">
              <Link to="/dashboard">
                <NavButton
                  label="Dashboard"
                  icon={FiHome}
                  aria-current={
                    location.pathname.includes("dashboard") ? "page" : null
                  }
                />
              </Link>
              {user.isAdmin ? (
                <>
                <Link to="/students">
                <NavButton
                  label="Current Students"
                  icon={FiUsers}
                  aria-current={
                    location.pathname === "/students" ? "page" : null
                  }
                />
              </Link>
              <Link to="/former-students">
                <NavButton
                  label="Former Students"
                  icon={FiUsers}
                  aria-current={
                    location.pathname === "/former-students" ? "page" : null
                  }
                />
              </Link>
              </>
              ) : (
                <Link to="/students">
                <NavButton
                  label="All Students"
                  icon={FiUsers}
                  aria-current={
                    location.pathname === "/students" ? "page" : null
                  }
                />
              </Link>
              )}

              {user ? (
                <>
                  <Link to={`/students/${user?.id}`}>
                    <NavButton
                      label="My Students"
                      icon={FiUsers}
                      aria-current={
                        location.pathname ===
                        "/students/" + user?.id
                          ? "page"
                          : null
                      }
                    />
                  </Link>
                  <Link to="/profile">
                    <NavButton
                      label="Profile"
                      icon={FiSettings}
                      aria-current={
                        location.pathname === "/profile" ? "page" : null
                      }
                    />
                  </Link>
                </>
              ) : null}
              {!user ||
              !user?.isAdmin ? null : (
                <>
                  <Link to="/teachers">
                    <NavButton
                      label="Teachers"
                      icon={FiUsers}
                      aria-current={
                        location.pathname === "/teachers" ? "page" : null
                      }
                    />
                  </Link>

                  <Link to="/parents">
                    <NavButton
                      label="Parents"
                      icon={FiGlobe}
                      aria-current={
                        location.pathname === "/parents" ? "page" : null
                      }
                    />
                  </Link>

                  <Link to="/settings">
                    <NavButton
                      label="Settings"
                      icon={FiSettings}
                      aria-current={
                        location.pathname === "/settings" ? "page" : null
                      }
                    />
                  </Link>
                </>
              )}
            </Stack>
          </Stack>
          <Stack spacing={{ base: "5", sm: "6" }}>
            <Stack spacing="1">
              {/* <NavButton label="Help" icon={FiHelpCircle} />
              <NavButton label="Settings" icon={FiSettings} /> */}
              <NavButton
                label="Logout"
                icon={FiLogOut}
                onClick={handleLogout}
              />
            </Stack>

            <Divider />
            {user ? (
              <UserProfile
                name={
                  user.name ||
                  user.firstName
                }
                email={user.email}
              />
            ) : null}
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
