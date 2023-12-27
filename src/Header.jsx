import { Link } from "react-router-dom";
import { LogoutLink } from "./Logout";

export function Header() {
  return (
    <header>
      <nav className=" p-4 bg-[#1F1717] text-white font-mono">
        {localStorage.jwt !== undefined ? (
          <>
            <Link to="/">Home</Link> |<Link to="/characters">Your Characters</Link>|
            <Link to="/characters-new">Create Character</Link>|<Link to="/group-new">Create Group</Link>|
            <Link to="/login">Login</Link>|<LogoutLink />
          </>
        ) : (
          <>
            <Link to="/">Home</Link> | <Link to="/signup">Sign Up</Link>|<Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
