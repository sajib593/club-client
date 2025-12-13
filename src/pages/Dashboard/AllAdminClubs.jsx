import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FcApproval } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
// New icons (modern look)
import { FiEye } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlinePersonRemove } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";

const AllAdminClubs = () => {

    let axiosSecure = useAxiosSecure();

    let { data: allAdminClubs = [], refetch } = useQuery({
        queryKey: ['allAdminClubs'],
        queryFn: async () => {
            let res = await axiosSecure.get('/allAdminClubs');
            return res.data;
        }
    });

    const updateRiderStatus = (clubs, status) => {
        const updateInfo = { status: status, email: clubs.managerEmail }
        axiosSecure.patch(`/allAdminClubs/${clubs._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = clubs => {
        updateRiderStatus(clubs, 'approved');
    }

    const handleRejection = clubs => {
        updateRiderStatus(clubs, 'rejected')
    }

    return (
        <div>
            <h2 className="text-4xl font-bold mb-6">
                Total <span className="text-blue-600">{allAdminClubs.length}</span> Clubs
            </h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="table">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Club</th>
                            <th>Email</th>
                            <th>Fee</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allAdminClubs.map((clubs, index) => (
                                <tr key={clubs._id} className="hover:bg-gray-100 transition">
                                    <th>{index + 1}</th>
                                    <td className="font-semibold">{clubs.clubName}</td>
                                    <td>{clubs.managerEmail}</td>
                                    <td>{clubs.membershipFee}</td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-bold 
                                        ${clubs.status === 'approved'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-600'}
                                    `}
                                        >
                                            {clubs.status}
                                        </span>
                                    </td>

                                    <td className="flex gap-3 justify-center">

                                        <button className="btn btn-sm bg-gray-200 hover:bg-gray-300">
                                            <FiEye size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleApproval(clubs)}
                                            className="btn btn-sm bg-green-200 hover:bg-green-300"
                                        >
                                            <FcApproval size={30}/>
                                        </button>

                                        <button
                                            onClick={() => handleRejection(clubs)}
                                            className="btn btn-sm bg-orange-200 hover:bg-orange-300"
                                        >
                                            <FcDisapprove size={30}/>
                                        </button>

                                        <button className="btn btn-sm bg-red-200 hover:bg-red-300">
                                            <MdDeleteForever size={20} />
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAdminClubs;
