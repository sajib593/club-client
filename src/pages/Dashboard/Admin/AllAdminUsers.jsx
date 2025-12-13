import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllAdminUsers = () => {

    let axiosSecure = useAxiosSecure();

     const {data: allAdminUsers = [], isLoading, isError} = useQuery({
    queryKey: ["allAdminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get('/allAdminUsers');
      return res.data;
    },
     
  });

  console.log(allAdminUsers);



    if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load club</p>;


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