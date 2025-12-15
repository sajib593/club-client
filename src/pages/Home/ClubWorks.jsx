const ClubWorks = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">How ClubSphere Works</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover clubs, join communities, attend events, and manage everything in one place.
        </p>
      </div>

      {/* Timeline */}
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        
        {/* Step 1 */}
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Step 01</time>
            <div className="text-lg font-black">Create an Account</div>
            Sign up using email/password or Google. Every user starts as a member and gets access to
            browse clubs and events.
          </div>
          <hr />
        </li>

        {/* Step 2 */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">Step 02</time>
            <div className="text-lg font-black">Discover & Join Clubs</div>
            Browse clubs by category and location. Join free clubs instantly or pay securely via
            Stripe for paid memberships.
          </div>
          <hr />
        </li>

        {/* Step 3 */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Step 03</time>
            <div className="text-lg font-black">Participate in Events</div>
            View upcoming events from your clubs, register for free or paid events, and track all
            registrations from your dashboard.
          </div>
          <hr />
        </li>

        {/* Step 4 */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">Step 04</time>
            <div className="text-lg font-black">Manage Clubs & Members</div>
            Club Managers create clubs, manage members, organize events, and track payments through
            a powerful dashboard.
          </div>
          <hr />
        </li>

        {/* Step 5 */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start md:text-end">
            <time className="font-mono italic">Step 05</time>
            <div className="text-lg font-black">Admin Supervision</div>
            Admins approve clubs, manage user roles, monitor payments, and ensure the platform runs
            smoothly and securely.
          </div>
        </li>

      </ul>
    </section>
  );
};

export default ClubWorks;
