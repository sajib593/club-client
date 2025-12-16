import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const AllAdminUsers = () => {

    let axiosSecure = useAxiosSecure();
    let {user, loading} = useAuth();

     const {data: allAdminUsers = [], isLoading, isError ,refetch} = useQuery({
    queryKey: ["allAdminUsers"],
    enabled: !loading && !!user, // 🔥 WAIT until user ready
    queryFn: async () => {
      const res = await axiosSecure.get('/allAdminUsers');
      return res.data;
    },
     
  });

  // console.log(allAdminUsers);


// let handleChangeRole = (userId, role) => {
//   console.log(userId, role);

//   axiosSecure.patch('/changeUserRole', { userId, role })
//     .then(res => {
//       console.log(res.data); // ✅ correct
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };


const changeRoleMutation = useMutation({
  mutationFn: async ({ userId, role }) => {
    const res = await axiosSecure.patch('/changeUserRole', { userId, role });
    return res.data;
  },

  onSuccess: () => {
    Swal.fire({
      icon: "success",
      title: "Role Updated",
      text: "User role updated successfully",
      timer: 1200,
      showConfirmButton: false
    });

    // ✅ always refetch (no condition)
    refetch();
  },

  onError: () => {
    Swal.fire("Error", "Failed to update role", "error");
  }
});


const handleChangeRole = (userId, role) => {
  changeRoleMutation.mutate({ userId, role });
};





    if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load club</p>;
if (loading) return <p className="text-center">Foading...</p>;

    return (
        <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        All Users ({allAdminUsers.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Change-Role</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>

          <tbody>
            {allAdminUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td>{user.displayName}</td>
                <td>{user.email}</td>


                {/* chang the role ------------------------ 
                 */}


<td>
  <select
    defaultValue={user.role}   // ✅ controlled value
    onChange={(e) => handleChangeRole(user._id, e.target.value)}
    className="select select-bordered select-sm w-full max-w-[140px]"
    disabled={changeRoleMutation.isPending}
  >
    <option value="member">Member</option>
    <option value="clubManager">Club Manager</option>
    <option value="admin">Admin</option>
  </select>
</td>


 

                {/* --------------------------------------- */}


                <td>
                  <span className={`badge ${
                    user.role === "admin"
                      ? "badge-primary"
                      : user.role === "member"
                      ? "badge-outline"
                      : "badge-secondary"
                  }`}>
                    {user.role}
                  </span>
                </td>

                <td>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllAdminUsers;