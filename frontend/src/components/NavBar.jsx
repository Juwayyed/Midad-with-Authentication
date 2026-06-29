import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import logo from "../assets/logo-green.webp";

const NavBar = () => {
  return (
    <header className="bg-base-200/40 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Midad Logo" className="h-16 w-16" />
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary ">
              <PlusIcon className="size-5" />
              <span>New Memo</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
