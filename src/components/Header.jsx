import { Link } from "react-router-dom";
import { LogoutLink } from "./Authorization/Logout";

export function Header() {
  return (
    <header>
      <nav className=" p-4 bg-[#1F1717] text-white font-mono">
        {localStorage.jwt !== undefined ? (
          <>
            <div className="flex justify-center">
              <Link className="px-2" to="/">
                Home
              </Link>{" "}
              |
              <Link className="px-2" to="/characters">
                Your Characters
              </Link>
              |
              <Link className="px-2" to="/characters-new">
                Create Character
              </Link>
              |
              <Link className="px-2" to="/group-new">
                Create Group
              </Link>
              |
              <Link className="px-2" to="/groups">
                Groups
              </Link>
              |
              <Link className="px-2" to="/combat">
                Initiative
              </Link>
              |
              <div className="px-2">
                <LogoutLink />
              </div>
            </div>
          </>
        ) : (
          <>
            <Link className="px-2" to="/">
              Home
            </Link>{" "}
            |{" "}
            <Link className="px-2" to="/signup">
              Sign Up
            </Link>
            |
            <Link className="px-2" to="/login">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
