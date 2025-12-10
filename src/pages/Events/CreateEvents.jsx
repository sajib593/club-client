
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";

const CreateEvents = () => {
    
    const axiosSecure = useAxios();
    let {id} = useParams();
    console.log(id);
    let user = useAuth();


  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      clubId: id || "", // populate clubId from params
    },
  });

  // isPaid true 
  const isPaid = watch("isPaid");

  const handleCreateEvent = async (data) => {
    const eventData = {
      clubId: data.clubId,
      title: data.title,
      description: data.description,
      eventDate: data.eventDate,
      location: data.location,
      isPaid: data.isPaid === "true",
      eventFee: data.isPaid === "true" ? Number(data.eventFee) : 0,
      maxAttendees: Number(data.maxAttendees) || null,
      email: user?.email
      
    };

    try {
      const res = await axiosSecure.post("/createEvents", eventData);

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Event created successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Event creation failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl w-full max-w-md p-8">

        <h2 className="text-4xl font-extrabold text-white text-center drop-shadow-md">
          Create a New Event
        </h2>
        <p className="text-center text-purple-100 mt-1">
          Fill the form carefully
        </p>

        <form onSubmit={handleSubmit(handleCreateEvent)} className="mt-6 space-y-5 text-white">

          {/* clubId */}
          <div>
            <label className="font-semibold">Club ID</label>
            <input
              type="text"
              className="input input-bordered w-full bg-white/40 text-gray-900 placeholder-gray-600 border-gray-300 rounded-xl"
              {...register("clubId", { required: true })}
              placeholder="Enter club id"
            />
            {errors.clubId && <p className="text-red-300 mt-1">Club ID is required</p>}
          </div>

          {/* title */}
          <div>
            <label className="font-semibold">Event Title</label>
            <input
              type="text"
              className="input input-bordered w-full bg-white/40 text-gray-900 border-gray-300 rounded-xl"
              {...register("title", { required: true })}
              placeholder="Enter event title"
            />
            {errors.title && <p className="text-red-300 mt-1">Event title is required</p>}
          </div>

          {/* description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              className="textarea textarea-bordered w-full bg-white/40 text-gray-900 border-gray-300 rounded-xl"
              {...register("description", { required: true })}
              placeholder="Write event details"
            ></textarea>
            {errors.description && <p className="text-red-300 mt-1">Description is required</p>}
          </div>

          {/* event date */}
          <div>
            <label className="font-semibold">Event Date</label>
            <input
              type="date"
              className="input input-bordered w-full bg-white/40 text-gray-900 border-gray-300 rounded-xl"
              {...register("eventDate", { required: true })}
            />
            {errors.eventDate && <p className="text-red-300 mt-1">Event date is required</p>}
          </div>

          {/* location */}
          <div>
            <label className="font-semibold">Location</label>
            <input
              type="text"
              className="input input-bordered w-full bg-white/40 text-gray-900 border-gray-300 rounded-xl"
              {...register("location", { required: true })}
              placeholder="City or area"
            />
            {errors.location && <p className="text-red-300 mt-1">Location is required</p>}
          </div>

          {/* isPaid */}
          <div>
            <label className="font-semibold">Is Paid Event?</label>
            <select
              className="select select-bordered w-full bg-white/40 text-gray-900 border-gray-300 rounded-xl"
              {...register("isPaid", { required: true })}
            >
              <option value="">Select type</option>
              <option value="false">Free Event</option>
              <option value="true">Paid Event</option>
            </select>
            {errors.isPaid && <p className="text-red-300 mt-1">Select paid/free</p>}
          </div>

          {/* eventFee (only if paid) */}
          {isPaid === "true" && (
            <div>
              <label className="font-semibold">Event Fee</label>
              <input
                type="number"
                className="input input-bordered w-full bg-white/40 text-gray-900 border-gray-300 rounded-xl"
                {...register("eventFee", { required: true })}
                placeholder="100, 200..."
              />
              {errors.eventFee && <p className="text-red-300 mt-1">Event fee is required</p>}
            </div>
          )}

          {/* maxAttendees */}
          <div>
            <label className="font-semibold">Max Attendees (optional)</label>
            <input
              type="number"
              className="input input-bordered w-full bg-white/40 text-gray-900 border-gray-300 rounded-xl"
              {...register("maxAttendees")}
              placeholder="50, 100, 200..."
            />
          </div>

          {/* submit button */}
          <button className="btn w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none hover:opacity-90 rounded-xl text-lg font-semibold shadow-lg">
            Create Event
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateEvents;
