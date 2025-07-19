import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-2">
      <Link to="/">Matzip</Link>
    </nav>
  );
};

export default Navbar;
