// UpdateEventModal.jsx
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const UpdateEventModal = ({ eventData, closeModal, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm({
        defaultValues: eventData
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            return axiosSecure.patch(`/event/${eventData._id}`, updatedData);
        },
        onSuccess: () => {
            Swal.fire("Updated!", "Event updated successfully", "success");
            refetch();
            closeModal();
        }
    });

  const onSubmit = (data) => {
    const payload = { ...data };
    delete payload._id;

    payload.eventFee = Number(payload.eventFee);
    payload.maxAttendees = Number(payload.maxAttendees);
    payload.isPaid = payload.isPaid === "true";

    updateMutation.mutate(payload);
};



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Update Event</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

                    <input {...register("title")} className="input input-bordered w-full" />

                    <textarea {...register("description")} className="textarea textarea-bordered w-full" />

                    <input type="date" {...register("eventDate")} className="input input-bordered w-full" />

                    <input {...register("location")} className="input input-bordered w-full" />

                    <select {...register("isPaid")} className="select select-bordered w-full">
                        <option value={false}>Free</option>
                        <option value={true}>Paid</option>
                    </select>

                    <input
                        type="number"
                        {...register("eventFee")}
                        className="input input-bordered w-full"
                        placeholder="Event Fee"
                    />

                    <input
                        type="number"
                        {...register("maxAttendees")}
                        className="input input-bordered w-full"
                        placeholder="Max Attendees"
                    />

                    <div className="flex justify-between mt-4">
                        <button type="button" className="btn" onClick={closeModal}>Cancel</button>
                        <button className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEventModal;
