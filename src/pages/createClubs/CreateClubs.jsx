import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


const CreateClubs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const handleCreateClub = async (data) => {
        const clubData = {
            clubName: data.clubName,
            description: data.description,
            category: data.category,
            location: data.location,
            bannerImage: data.bannerImage,
            membershipFee: Number(data.membershipFee),
            managerEmail: user?.email,
            
        };

        try {
            const res = await axiosSecure.post("/clubs", clubData);
            if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your data has been inserted successfully.",
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
        } catch (error) {
            // console.log(error);
                Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Unsuccessful",
                        showConfirmButton: false,
                        timer: 2000
                    });
        }
    };

    return (
        <>
        <Navbar></Navbar>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl w-full max-w-md p-8">
                
                <h2 className="text-4xl font-extrabold text-white text-center drop-shadow-md">
                    Create a New Club
                </h2>
                <p className="text-center text-purple-100 mt-1">
                    Fill the form carefully
                </p>

                <form onSubmit={handleSubmit(handleCreateClub)} className="mt-6 space-y-5 text-white">

                    {/* Club Name */}
                    <div>
                        <label className="font-semibold">Club Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full bg-white/40 text-gray-900 placeholder-gray-600 border-gray-300 rounded-xl"
                            {...register("clubName", { required: true })}
                            placeholder="Enter club name"
                        />
                        {errors.clubName && <p className="text-red-300 mt-1">Club name is required</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="font-semibold">Description</label>
                        <textarea
                            className="textarea textarea-bordered w-full bg-white/40 text-gray-900 placeholder-gray-600 border-gray-300 rounded-xl"
                            {...register("description", { required: true })}
                            placeholder="Write a short description"
                        ></textarea>
                        {errors.description && <p className="text-red-300 mt-1">Description is required</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="font-semibold">Category</label>
                        <select
                            className="select select-bordered w-full bg-white/40 text-gray-900 border-gray-300 rounded-xl"
                            {...register("category", { required: true })}
                        >
                            <option value="">Select category</option>
                            <option value="Photography">Photography</option>
                            <option value="Sports">Sports</option>
                            <option value="Tech">Tech</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                        </select>
                        {errors.category && <p className="text-red-300 mt-1">Category is required</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="font-semibold">Location</label>
                        <input
                            type="text"
                            className="input input-bordered w-full bg-white/40 text-gray-900 placeholder-gray-600 border-gray-300 rounded-xl"
                            {...register("location", { required: true })}
                            placeholder="City or area"
                        />
                        {errors.location && <p className="text-red-300 mt-1">Location is required</p>}
                    </div>

                    {/* Banner Image */}
                    <div>
                        <label className="font-semibold">Banner Image URL</label>
                        <input
                            type="text"
                            className="input input-bordered w-full bg-white/40 text-gray-900 placeholder-gray-600 border-gray-300 rounded-xl"
                            {...register("bannerImage", { required: true })}
                            placeholder="Paste image URL"
                        />
                        {errors.bannerImage && <p className="text-red-300 mt-1">Banner image URL is required</p>}
                    </div>

                    {/* Membership Fee */}
                    <div>
                        <label className="font-semibold">Membership Fee (0 for free)</label>
                        <input
                            type="number"
                            className="input input-bordered w-full bg-white/40 text-gray-900 placeholder-gray-600 border-gray-300 rounded-xl"
                            {...register("membershipFee", { required: true })}
                            placeholder="0, 100, 200..."
                        />
                        {errors.membershipFee && <p className="text-red-300 mt-1">Membership fee is required</p>}
                    </div>

                    <button className="btn w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none hover:opacity-90 rounded-xl text-lg font-semibold shadow-lg">
                        Create Club
                    </button>

                </form>
            </div>
        </div>
        
        
        <Footer></Footer>
        </>
    );
};

export default CreateClubs;
