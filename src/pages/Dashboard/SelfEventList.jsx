import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateEventModal from "./OnlClubMembers/UpdateEventModal";
import Loading from "../../shared/Loading";


const SelfEventList = () => {

    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [selectedEvent, setSelectedEvent] = useState(null);

    // 🔹 Load Events using React Query
    const { data: events = [], refetch, isLoading } = useQuery({
        queryKey: ["selfEventList", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/manager/events/${user.email}`);
            return res.data;
        },
    });
    // console.log(events);

    // 🔹 Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/event/${id}`);
        },
        onSuccess: () => {
            refetch(); // Reload events after delete
        }
    });

    // 🔹 Delete handler with confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This event will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
                Swal.fire("Deleted!", "Event removed successfully", "success");
            }
        });
    };

    if(isLoading) return <Loading></Loading>

    if (loading) return <div className="flex items-center justify-center h-screen"> </div>


    return (
         <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">Manage Events</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Paid?</th>
                            <th>Fee</th>
                            <th>Max</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td>{event.title}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.location}</td>
                                <td>{event.isPaid ? "Yes" : "No"}</td>
                                <td>{event.eventFee}</td>
                                <td>{event.maxAttendees}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        Update
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(event._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {selectedEvent && (
                <UpdateEventModal
                    eventData={selectedEvent}
                    closeModal={() => setSelectedEvent(null)}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default SelfEventList;