import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateClubs = () => {

    let {id} = useParams();
    console.log(id);

    const axiosSecure = useAxiosSecure();

  /* =======================
      GET SINGLE CLUB
  ======================= */
  const {data: club, isLoading, isError} = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allClubs/${id}`);
      return res.data;
    },
    enabled: !!id, 
  });
console.log(club);
  /* =======================
      UPDATE CLUB
  ======================= */
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (updatedClub) => {
      const res = await axiosSecure.patch(`/clubs/${id}`, updatedClub);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Club updated successfully", "success");
    },
  });

  /* =======================
      SUBMIT HANDLER
  ======================= */
  const handleUpdateClub = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedClub = {
      clubName: form.clubName.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      bannerImage: form.bannerImage.value,
      membershipFee: Number(form.membershipFee.value),
    };

    await mutateAsync(updatedClub);
  };

  /* =======================
      UI STATES
  ======================= */
  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load club</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update Club</h2>

         <form onSubmit={handleUpdateClub} className="space-y-4">

        <div>
          <label className="font-semibold">Club Name</label>
          <input
            name="clubName"
            defaultValue={club.clubName}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={club.description}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        {/* ✅ CATEGORY SELECT */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            name="category"
            defaultValue={club.category}
            className="select select-bordered w-full bg-white"
            required
          >
            <option value="">Select category</option>
            <option value="Photography">Photography</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input
            name="location"
            defaultValue={club.location}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Banner Image</label>
          <input
            name="bannerImage"
            defaultValue={club.bannerImage}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Membership Fee</label>
          <input
            type="number"
            name="membershipFee"
            defaultValue={club.membershipFee}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          className="btn btn-primary w-full"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Club"}
        </button>

      </form>

      
    </div>
    );
};

export default UpdateClubs;



{/* <form onSubmit={handleUpdateClub} className="space-y-3">

        <input
          defaultValue={club.clubName}
          name="clubName"
          className="input input-bordered w-full"
        />

        <textarea
          defaultValue={club.description}
          name="description"
          className="textarea textarea-bordered w-full"
        />

        <input
          defaultValue={club.category}
          name="category"
          className="input input-bordered w-full"
        />

        <input
          defaultValue={club.location}
          name="location"
          className="input input-bordered w-full"
        />

        <input
          defaultValue={club.bannerImage}
          name="bannerImage"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          defaultValue={club.membershipFee}
          name="membershipFee"
          className="input input-bordered w-full"
        />

        <button
          className="btn btn-primary w-full"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Club"}
        </button>

      </form> */}