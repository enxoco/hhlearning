import {
  Divider,
  Flex,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHome, FiLogOut, FiUsers, FiSettings, FiGlobe } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCheckLoginQuery, useLogoutMutation } from "../generated/graphql";
import logo from "../logo.jpg";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";
export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, logOut] = useLogoutMutation();

  const [me] = useCheckLoginQuery();

  async function handleLogout(e) {
    e.preventDefault();
    const _ = await logOut();
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
              {me?.data?.authenticatedItem?.isParent ? null : (
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
              {me?.data?.authenticatedItem ? (
                <>
                  <Link to={`/students/${me?.data?.authenticatedItem?.id}`}>
                    <NavButton
                      label="My Students"
                      icon={FiUsers}
                      aria-current={
                        location.pathname ===
                        "/students/" + me?.data?.authenticatedItem?.id
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
              {!me?.data?.authenticatedItem ||
              !me?.data?.authenticatedItem?.isAdmin ? null : (
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
            {me?.data?.authenticatedItem ? (
              <UserProfile
                name={
                  me.data?.authenticatedItem.name ||
                  me.data?.authenticatedItem.firstName
                }
                email={me?.data?.authenticatedItem?.email}
              />
            ) : null}
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
