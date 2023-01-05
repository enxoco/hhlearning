import { EmailIcon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Image,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { FiGlobe, FiHome, FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation, User } from "#/generated/graphql";
import logo from "#/logo.jpg";
import InitialsAvatar from "./InitialsAvatar";
import { NavButton } from "./NavButton";

export default function Sidebar({ user, path }: { user: User, path: string }) {
  const navigate = useNavigate();
  const [, logOut] = useLogoutMutation();


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

            <Stack spacing="1" data-testid="sidebarLinks">
              <Link to="/dashboard">
                <NavButton
                  label="Dashboard"
                  icon={FiHome}
                  aria-current={
                    path.includes("dashboard") ? "page" : null
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
                    path === "/students" ? "page" : null
                  }
                />
              </Link>
              <Link to="/former-students">
                <NavButton
                  label="Former Students"
                  icon={FiUsers}
                  aria-current={
                    path === "/former-students" ? "page" : null
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
                    path === "/students" ? "page" : null
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
                        path ===
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
                        path === "/profile" ? "page" : null
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
                        path === "/teachers" ? "page" : null
                      }
                    />
                  </Link>

                  <Link to="/families">
                    <NavButton
                      label="Parents"
                      icon={FiGlobe}
                      aria-current={
                        path === "/families" ? "page" : null
                      }
                    />
                  </Link>
                  <Link to="/emails">
                    <NavButton
                      label="Emails"
                      icon={EmailIcon}
                      aria-current={
                        path === "/emails" ? "page" : null
                      }
                    />
                  </Link>
                  <Link to="/settings">
                    <NavButton
                      label="Settings"
                      icon={FiSettings}
                      aria-current={
                        path === "/settings" ? "page" : null
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
            {!user || <InitialsAvatar name={user.name || `${user.firstName} ${user.lastName}`} email={user.email}/>}
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
