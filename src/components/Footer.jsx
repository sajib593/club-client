import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-8">
        
        {/* --- Brand Section --- */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Club <span className="text-blue-500">Sphere</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted platform for connecting freelancers and clients.
            Post jobs, find talent, and grow your business with ease.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/allJobs" className="hover:text-blue-400 transition">All Jobs</a></li>
            <li><a href="/addJobs" className="hover:text-blue-400 transition">Add Job</a></li>
            <li><a href="/login" className="hover:text-blue-400 transition">Login</a></li>
            <li><a href="/register" className="hover:text-blue-400 transition">Register</a></li>
          </ul>
        </div>

        {/* --- Social Links --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition">
              <FaXTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-400 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* --- Divider --- */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">Freelance Market</span>. All rights reserved.
      </div>
    </footer>
    );
};

export default Footer;