import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../shared/Loading";
import { Link } from "react-router";


const UserActiveClubs = () => {

     let axiosInstance = useAxios();
    let {user} = useAuth();
        // console.log(user?.email);

     const { data: userClubs = [], isLoading, isError } = useQuery({
        queryKey: ['userClubs', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/userClubs?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    // console.log(userClubs);

    // const approvedCount = userClubs.filter(club => club.status === "active").length;


    if (isLoading) return <Loading></Loading>
  if (isError) return <p className="text-center text-red-500">Failed to load clubs.</p>;


    return (
        <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Active Clubs ({userClubs.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {userClubs.map((club) => (
          <div
            key={club._id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-1">
              {club.clubName}
            </h3>

            <p className="text-gray-600">
              Membership Status:{" "}
              <span className="font-bold text-green-600">
                {club.status}
              </span>
            </p>

          
            <p className="text-gray-600">
              Expiry Date:{" "}
              {new Date(club.expireAt).toLocaleDateString()}
            </p>

            <Link
              to={`/allClubs/${club.clubId}`}
              className="btn btn-primary btn-sm mt-3 w-full"
            >
              View Club Details
            </Link>
          </div>
        ))}
      </div>
    </div>
    );
};
export default UserActiveClubs;
