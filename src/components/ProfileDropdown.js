import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/auth-slice";

function ProfileDropdown(props) {
  const dispatch = useDispatch();
  let name = `${props.fName[0]}${props.lName[0]}`;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left m-2">
      {/* Profile Icon */}
      <div
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-galvin-grey text-white font-bold"
      >
        {name.toUpperCase()}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-galvin-grey text-white  rounded-md shadow-lg z-10">
          <div className="py-1">
            <NavLink
              to="/settings/upload-song"
              className="block px-4 py-2 text-sm hover:bg-galvin-green"
            >
              Upload Song
            </NavLink>
            <NavLink
              to="/settings"
              className="block px-4 py-2 text-sm hover:bg-galvin-green"
            >
              Settings
            </NavLink>
            <NavLink
              to="#"
              style={{ borderTopWidth: "1px" }}
              className="block border-t-slate-200 px-4 py-2 text-sm hover:bg-galvin-green"
              onClick={() => dispatch(logout())}
            >
              Logout
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
