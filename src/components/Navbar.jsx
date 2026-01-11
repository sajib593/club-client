import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useRole from "../hooks/useRole";
// import loginImage from"./../assets/login.jpg"

const Navbar = () => {
  let { user, logOut } = use(AuthContext);
  let { role } = useRole();
  const [theme, setTheme] = useState("light");

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-teal-400 font-bold border-b-2 border-teal-400"
      : "text-white hover:text-yellow-300";


  // Load theme from localStorage 

    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

  // Handle toggle switch 

    const handleToggle = (event) => {
      const newTheme = event.target.checked ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };

  let handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Logout Successful", "", "success");
      })
      .catch((error) => {
        // console.log(error);
        Swal.fire(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-black p-3 gap-2 rounded-2xl">
      <div className="">
        {/* {user && user.email} */}

        <h2 className="text-2xl font-bold text-teal-400">Club Sphere</h2>
      </div>

      <div className="nav flex flex-col md:flex-row items-center justify-center gap-3 text-accent font-bold">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/clubCards" className={navLinkClass}>
          All-Clubs
        </NavLink>

        <NavLink to="/dashboard/showAllEvents" className={navLinkClass}>
          Events
        </NavLink>

        {!user && (
          <NavLink to="/register" className={navLinkClass}>
            Register
          </NavLink>
        )}


        {/* role for club manager-----------------------------------------------------    */}

        {role == "clubManager" && (
          <>
            <NavLink to="/dashboard/selfClubs" className={navLinkClass}>
              Self-Clubs
            </NavLink>

            <NavLink to="/createClubs" className={navLinkClass}>
              CreateClubs
            </NavLink>
          </>
        )}


        {/* role for admin ----------------------------  --------------------------- */}

        {role == "admin" && (
          <NavLink to="/dashboard/allAdminClubs" className={navLinkClass}>
            AllAdminClubs
          </NavLink>
        )}

        <NavLink
          to="/dashboard/myProfile"
          className={({ isActive }) =>
            isActive
              ? "text-teal-400 font-bold border-b-2 border-yellow-300"
              : "text-white font-bold text-2xl hover:text-yellow-300"
          }
        >
          DashBoard
        </NavLink>
      </div>

      <div className="login-btn flex flex-col md:flex-row gap-1 items-center">
        {/* <img className='w-10 rounded-full' 
                src={`${user? user.photoURL : loginImage}`} alt="" 
                title={user? user.displayName : ""}
                /> */}

        {/* Theme Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          
          <input
            type="checkbox"
            className="toggle theme-controller bg-base-200"
            onChange={handleToggle}
            checked={theme === "dark"}
          />
          
        </label>

        <div className="relative group login-btn flex flex-col md:flex-row gap-2 items-center">
          <img
            className="w-10 h-10 rounded-full cursor-pointer ring-1 ring-blue-300 hover:ring-4 transition-all duration-300"
            src={user?.photoURL}
            alt="User Profile"
          />

          {/* Tooltip */}

          {user && (
            <span
              className="absolute top-12 left-1/2 -translate-x-1/2 
                 bg-gray-800 text-white text-sm font-medium 
                 px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 
                 transition-all duration-300 whitespace-nowrap shadow-lg"
            >
              {user?.displayName}
            </span>
          )}
        </div>

        {user ? (
          <button onClick={handleLogOut} className="btn bg-teal-500 p-5">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn bg-teal-500 p-5">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

//  <NavLink to="/" className={({ isActive }) =>
//     isActive
//       ? "text-yellow-300 font-bold border-b-2 border-yellow-300"
//       : "text-white hover:text-yellow-300"
//   }>Home</NavLink>
