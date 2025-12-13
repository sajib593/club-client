

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MemberOverview = () => {

    const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  /* ===== CLUB COUNT ===== */
  const { data: clubData = {} } = useQuery({
    queryKey: ["clubCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/user/clubs/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  /* ===== EVENT COUNT ===== */
  const { data: eventData = {} } = useQuery({
    queryKey: ["eventCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user/events/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  /* ===== UPCOMING EVENTS ===== */
  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ["upcomingEvents", user?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/user/upcoming-events/${user._id}`
      );
      return res.data;
    },
    enabled: !!user?._id,
  });

    return (
        <div className="p-6">
      {/* 👋 Welcome */}
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.displayName} 
      </h2>

      {/* 📊 Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-100 p-6 rounded-xl text-center">
          <h3 className="text-lg font-semibold">Total Clubs Joined</h3>
          <p className="text-3xl font-bold">
            {clubData.totalClubs || 0}
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-xl text-center">
          <h3 className="text-lg font-semibold">Total Events Registered</h3>
          <p className="text-3xl font-bold">
            {eventData.totalEvents || 0}
          </p>
        </div>
      </div>

      {/* 📅 Upcoming Events */}
      <h3 className="text-xl font-bold mb-4">
        Upcoming Events From Your Clubs
      </h3>

      {upcomingEvents.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.map(event => (
            <div
              key={event._id}
              className="border p-4 rounded-xl shadow"
            >
              <h4 className="font-bold text-lg">
                {event.title}
              </h4>

              <p className="text-sm text-gray-600">
                {event.description}
              </p>

              <p className="text-sm mt-2">
                📍 {event.location}
              </p>

              <p className="text-sm">
                📅 {event.eventDate}
              </p>

              {event.isPaid && (
                <p className="text-sm font-semibold text-red-500">
                  Fee: {event.eventFee}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    );
};

export default MemberOverview;