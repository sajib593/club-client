import { Link, NavLink, Outlet } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {


  let {role} = useRole();
  // console.log(role);


  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">

        {/* Navbar --------------------*/}

        <nav className="navbar w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost text-white hover:bg-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <h2 className="px-4 text-lg font-semibold tracking-wide">
            Club Sphere Dashboard
          </h2>
        </nav>








        {/* ------------PAGE CONTENT --------------*/}
        <div className="p-4">
          <Outlet />
        </div>
      </div>





      {/*-----------------SIDEBAR ---------------*/}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="min-h-full bg-base-200 shadow-lg border-r border-gray-200 is-drawer-close:w-20 is-drawer-open:w-64 transition-all duration-300 flex flex-col">
          
          {/* Sidebar Menu */}
          <ul className="menu p-2 w-full text-base font-medium space-y-1">

            {/* HOME */}
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-indigo-100 transition-colors is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>






            {/* Club manager ------   SelfClubs */}

            {
              role == "clubManager" &&
              <>

  <li>
              <NavLink
                to="/dashboard/selfClubs"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg p-3 transition-all is-active:bg-indigo-500 is-active:text-white 
                  ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "hover:bg-indigo-100"
                  }
                  is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="SelfClubs"
              >
                <CiDeliveryTruck className="text-xl" />
                <span className="is-drawer-close:hidden">SelfClubs</span>
              </NavLink>
            </li>



            {/* Club manager ------   selfClubMembers */}

            <li>
              <NavLink
                to="/dashboard/selfClubMembers"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg p-3 transition-all is-active:bg-indigo-500 is-active:text-white 
                  ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "hover:bg-indigo-100"
                  }
                  is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="SelfClubMembers"
              >
                <CiDeliveryTruck className="text-xl" />
                <span className="is-drawer-close:hidden">SelfClubMembers</span>
              </NavLink>
            </li>


            <li>
              <NavLink
                to="/dashboard/selfEventList"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg p-3 transition-all is-active:bg-indigo-500 is-active:text-white 
                  ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "hover:bg-indigo-100"
                  }
                  is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="SelfEventList"
              >
                <CiDeliveryTruck className="text-xl" />
                <span className="is-drawer-close:hidden">SelfEventList</span>
              </NavLink>
            </li>




              </>
            }

          





            {/*----------- All Events -------------*/}

            <li>
              <NavLink
                to="/dashboard/showAllEvents"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg p-3 transition-all is-active:bg-indigo-500 is-active:text-white 
                  ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "hover:bg-indigo-100"
                  }
                  is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Events"
              >
                <CiDeliveryTruck className="text-xl" />
                <span className="is-drawer-close:hidden">Events</span>
              </NavLink>
            </li>




              {/* --------------allAdminClubs --------*/}
          
          {
            role == "admin" &&
            <>

              <li>
              <NavLink
                to="/dashboard/allAdminClubs"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg p-3 transition-all is-active:bg-indigo-500 is-active:text-white 
                  ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "hover:bg-indigo-100"
                  }
                  is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="All Admin Clubs"
              >
                <CiDeliveryTruck className="text-xl" />
                <span className="is-drawer-close:hidden">All Admin Clubs</span>
              </NavLink>
            </li>






             {/* // allAdminUsers --------------------  */}
              <li>
              <NavLink
                to="/dashboard/allAdminUsers"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg p-3 transition-all is-active:bg-indigo-500 is-active:text-white 
                  ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "hover:bg-indigo-100"
                  }
                  is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="All Admin Users"
              >
                <CiDeliveryTruck className="text-xl" />
                <span className="is-drawer-close:hidden">All Admin Users</span>
              </NavLink>
            </li>

            </>
          }


         






















            {/* Settings */}
            <li>
              <button
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-indigo-100 transition-colors is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
