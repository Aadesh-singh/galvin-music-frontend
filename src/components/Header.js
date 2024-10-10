import { NavLink } from "react-router-dom";
import { ReactComponent as HomeSvg } from "../assets/svg/home.svg";
import { FiSearch } from "react-icons/fi";
import { CgEnter } from "react-icons/cg";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  return (
    <section className="flex justify-between items-center bg-neutral-950 text-white">
      <div className="container flex justify-start items-center">
        <div className="w-[35px] h-[35px] m-2">
          <img
            src="/music-512-removebg-preview.png"
            className="w-[100%] h-[100%]"
            alt="logo"
          />
        </div>
        <div className="m-2 bg-galvin-grey p-[13px] rounded-full w-[50px] h-[50px]">
          <NavLink to={"/"}>
            <HomeSvg />
          </NavLink>
        </div>
        <div className="m-2 basis-4/5">
          <div className="flex items-center bg-galvin-grey p-1 rounded-full w-full ">
            <FiSearch className="text-white w-5 h-5 ml-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-r-2 border-e-zinc-800 text-white p-2 w-full outline-none"
            />
            <CgEnter className="text-white w-5 h-5 m-3 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="container flex justify-end items-center">
        <div className="container flex justify-end items-center">
          <div className="m-2">
            <NavLink to="/login">Login</NavLink>
          </div>
          <div className="m-2">
            <NavLink to="/signup">Signup</NavLink>
          </div>
        </div>
        <div className="m-2">
          <ProfileDropdown fName="Aadesh" lName="singh" />
        </div>
      </div>
    </section>
  );
};
export default Header;
