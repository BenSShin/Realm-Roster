import { Link } from "react-router-dom";
export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/group">Your Group</Link>| <a href="#">Create Party</a>|{" "}
        <a href="#">Login</a>|<a href="#">Sign Up</a>
      </nav>
    </header>
  );
}
