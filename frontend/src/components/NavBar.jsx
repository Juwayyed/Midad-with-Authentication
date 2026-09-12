import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import logo from "../assets/logo-green.webp";

const NavBar = () => {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between w-full">
          <img
            src={logo}
            alt="Midad Logo"
            className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
          />

          <div className="flex items-center">
            <Link
              to="/create"
              className="
                btn
                btn-primary
                h-10 sm:h-11
                min-h-0
                px-3 sm:px-5
                gap-2
                text-sm sm:text-base
                shadow-md shadow-indigo-500/20
                hover:shadow-indigo-500/40
                transition-all duration-200
              "
            >
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
