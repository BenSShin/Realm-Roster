import { Link } from "react-router-dom";
import { LogoutLink } from "./Authorization/Logout";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className=" p-4 bg-[#1F1717] text-white font-mono">
        {localStorage.jwt !== undefined ? (
          <>
            <div className="flex justify-center">
              <Link className="px-3" to="/">
                Home
              </Link>{" "}
              |
              <Link className="px-3" to="/characters">
                Your Characters
              </Link>
              |
              <Link className="px-3" to="/characters-new">
                Create Character
              </Link>
              |
              <Link className="px-3" to="/group-new">
                Create Group
              </Link>
              |
              <Link className="px-3" to="/groups">
                Groups
              </Link>
              |
              <div className="relative flex flex-col items-center px-4 rounded-lg cursor-pointer">
                <a
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center justify-between tracking-wider select-none"
                >
                  Tools
                </a>
                {isOpen && (
                  <div className="absolute bg-black mt-6 flex-col items-start rounded-md p-2 w-[110%]">
                    <ul>
                      <li>
                        <Link to="/combat">Combat</Link>
                      </li>
                      <li className="text-center">
                        <Link>Spell List</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              |
              <div className="px-3">
                <LogoutLink />
              </div>
            </div>
          </>
        ) : (
          <>
            <Link className="px-3" to="/">
              Home
            </Link>{" "}
            |{" "}
            <Link className="px-3" to="/signup">
              Sign Up
            </Link>
            |
            <Link className="px-3" to="/login">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
