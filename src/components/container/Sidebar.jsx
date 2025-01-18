import Link from "next/link";
import { BiHomeAlt, BiSearch, BiTrophy } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { MdAddCircleOutline, MdRecentActors } from "react-icons/md";
import Logout from "../extras/Logout";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="items-evenly hidden w-full justify-center gap-2 px-2 sm:flex">
        <h3 className="font-serif font-semibold">Score Board</h3>
      </div>
      <ul className="sidebarItem">
        <li className="sidebarList">
          <Link href="/">
            <label htmlFor="home">Home</label>
            <i>
              <BiHomeAlt />
            </i>
          </Link>
        </li>
        <li className="sidebarList">
          <Link href={`/search`}>
            <label htmlFor="new-match">Search</label>
            <i>
              <BiSearch />
            </i>
          </Link>
        </li>
        <div className="hidden w-full sm:inline">
          <li className="sidebarList">
            <Link href={`/prev-matches`}>
              <label htmlFor="prev">Prev</label>
              <i>
                <MdRecentActors />
              </i>
            </Link>
          </li>
        </div>
        <li className="sidebarList">
          <Link href={`/new-match`}>
            <label htmlFor="tournament">New Match</label>
            <i>
              <MdAddCircleOutline />
            </i>
          </Link>
        </li>
        <li className="sidebarList">
          <Link href={`/profile`}>
            <label htmlFor="account">Profile</label>
            <i>
              <CgProfile />
            </i>
          </Link>
        </li>
        <li className="sidebarList">
          <Link href={`/settings`}>
            <label htmlFor="settings">Settings</label>
            <i>
              <CiSettings />
            </i>
          </Link>
        </li>
      </ul>
      <div className="hidden w-full px-2 sm:inline">
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
