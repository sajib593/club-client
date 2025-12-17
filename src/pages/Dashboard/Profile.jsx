
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading';
import { Link } from 'react-router';
import { useState } from 'react';
import Swal from 'sweetalert2';



const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEdit, setIsEdit] = useState(false);

  const { data: myProfile = {}, isLoading, refetch } = useQuery({
    queryKey: ['myProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myProfile/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedData = {
      displayName: form.displayName.value,
      photoURL: form.photoURL.value,
    };

    try {
      const res = await axiosSecure.patch(
        `/myProfile/${user?.email}`,
        updatedData
      );

    //   if (res.data.modifiedCount > 0) {
    //     Swal.fire("Success", "Profile updated", "success");
    //     setIsEdit(false);
    //     refetch(); // 🔥 instantly updates UI
    //   }
    //  const updateUserProfile = (profile) =>{
    //         return updateProfile(auth.currentUser, profile)
    //     }
    
    if (res.data.modifiedCount > 0) {

        // 2️⃣ Update Firebase Auth
        await updateUserProfile({
          displayName: updatedData.displayName,
          photoURL: updatedData.photoURL,
        });

        Swal.fire("Success", "Profile updated", "success");

        // 3️⃣ Refetch DB data (optional but good)
        refetch();
        setIsEdit(false);
      }



    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">

        {/* Profile Info */}
        <div className="flex items-center gap-6">
          <img
            src={myProfile.photoURL}
            className="w-24 h-24 rounded-full border"
          />

          <div>
            <h2 className="text-2xl font-bold">{myProfile.displayName}</h2>
            <p className="text-gray-600">{myProfile.email}</p>
            <span className="badge badge-accent mt-1">
              {myProfile.role}
            </span>
          </div>
        </div>

        {/* Edit Button */}
        {!isEdit && (
          <button
            onClick={() => setIsEdit(true)}
            className="btn btn-accent mt-6"
          >
            Edit Profile
          </button>
        )}

        {/* Edit Form */}
        {isEdit && (
          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
            <div>
              <label className="label">Display Name</label>
              <input
                type="text"
                name="displayName"
                defaultValue={myProfile.displayName}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                defaultValue={myProfile.photoURL}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="flex gap-3">
              <button className="btn btn-success">Save</button>
              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Profile;