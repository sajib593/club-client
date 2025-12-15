import { FaUsers, FaCalendarAlt, FaHandshake, FaStar } from "react-icons/fa";

const WhyJoin = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Why Join ClubSphere?
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            ClubSphere connects you with like-minded people, exciting events,
            and meaningful communities — all in one platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card bg-base-200 shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <FaUsers className="text-4xl text-primary mb-4" />
              <h3 className="card-title">Connect with Communities</h3>
              <p className="text-sm text-gray-500">
                Discover local clubs and meet people who share your interests
                and passions.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-200 shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <FaCalendarAlt className="text-4xl text-primary mb-4" />
              <h3 className="card-title">Exclusive Events</h3>
              <p className="text-sm text-gray-500">
                Participate in workshops, meetups, trips, and premium events
                organized by clubs.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-200 shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <FaHandshake className="text-4xl text-primary mb-4" />
              <h3 className="card-title">Easy Membership</h3>
              <p className="text-sm text-gray-500">
                Join free or paid clubs securely with Stripe-powered payments
                and full transparency.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card bg-base-200 shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <FaStar className="text-4xl text-primary mb-4" />
              <h3 className="card-title">Grow & Learn</h3>
              <p className="text-sm text-gray-500">
                Improve your skills, build networks, and gain experiences that
                help you grow personally and professionally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
