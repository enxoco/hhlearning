import { User } from "#/generated/graphql";
import { Stack } from "@chakra-ui/react";
import { FiGlobe, FiHome, FiMessageSquare, FiSettings, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { NavButton } from "./NavButton";

export const NavLinks = ({ user, path }: { user: User, path: string }) => {

  return (
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
              icon={FiMessageSquare}
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

  );
}