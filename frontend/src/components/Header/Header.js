import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="navbar px-5 bg-[#080f24] text-white">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          Time Machine
        </Link>
      </div>
      <Navbar />
    </div>
  );
}
