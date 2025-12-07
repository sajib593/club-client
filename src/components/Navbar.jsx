import { use} from "react";
import { Link, NavLink } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
// import loginImage from"./../assets/login.jpg"


const Navbar = () => {


  let {user,  logOut} = use(AuthContext);

//   const [theme, setTheme] = useState("light");


   // Load theme from localStorage


//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     setTheme(savedTheme);
//     document.documentElement.setAttribute("data-theme", savedTheme);
//   }, []);

  // Handle toggle switch

//   const handleToggle = (event) => {
//     const newTheme = event.target.checked ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//     localStorage.setItem("theme", newTheme);
//   };




    let handleLogOut =()=>{

        logOut()
        .then(()=>{
            Swal.fire('Logout Successful', '', 'success')
    } )
        .catch((error)=>{
            // console.log(error);
            Swal.fire(error.message)
        })
    }



    return (
          <div className='flex flex-col md:flex-row justify-between items-center bg-gray-200 p-3 gap-2'>
            <div className="">
                {/* {user && user.email} */}

                <h2 className='text-2xl font-bold'>Freelance Market</h2>
                
            </div>

            <div className="nav flex flex-col md:flex-row gap-3 text-accent font-bold">

                <NavLink to='/'>Home</NavLink>

                <NavLink to='/login'>Login</NavLink>
                

                <NavLink to='/register'>Register</NavLink>
                
                <NavLink to='/createClubs'>CreateClubs</NavLink>
                <NavLink to='/addJobs'>Add-Jobs</NavLink>
                <NavLink to='/acceptedTasks'>Accepted-Tasks</NavLink>
                <NavLink to='/dashboard/allAdminClubs'>AllAdminClubs</NavLink>


            </div>

              
            <div className="login-btn flex flex-col md:flex-row gap-1 items-center">
                {/* <img className='w-10 rounded-full' 
                src={`${user? user.photoURL : loginImage}`} alt="" 
                title={user? user.displayName : ""}
                /> */}






 {/* Theme Toggle */}
        {/* <label className="flex items-center gap-2 cursor-pointer">
          
          <input
            type="checkbox"
            className="toggle theme-controller"
            onChange={handleToggle}
            checked={theme === "dark"}
          />
          
        </label> */}





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
      {user.displayName}
    </span>
  )}


</div>



    

                


               


                

                {
                    user? <button onClick={handleLogOut} className='btn btn-primary p-5'>Logout</button>  : <Link to='/login' className='btn btn-primary p-5'>Login</Link>
                }
                 



                 
            </div>
        </div>
    );
};

export default Navbar;