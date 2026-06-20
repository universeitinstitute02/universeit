import { IoIosCall, IoIosMail } from "react-icons/io";
import logo from "../../../assets/logo/whiteLogo.png";
import { FaLinkedin, FaLocationDot, FaYoutube } from "react-icons/fa6";
import { FaFacebook, FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const axiosPublic = useAxiosPublic();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_saos63c", "template_x1ajmyn", formRef.current, {
        publicKey: "PbUISmrSE9uXrKvsb",
      })
      .then(
        () => {
          setSuccess(true);
          setError(false);
          formRef.current.reset();
        },
        (error) => {
          setError(true);
          setSuccess(false);
          console.error("FAILED...", error.text);
        },
      );
  };

  const { data: popularCategories = [] } = useQuery({
    queryKey: ["popularCategories"],
    queryFn: async () => {
      const res = await axiosPublic("/popular-category");
      return res.data;
    },
  });

  return (
    <div className="bg-[#0f1115] text-gray-300 pt-16 pb-4 border-t border-gray-800/60 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Modern Corporate Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pb-12 border-b border-gray-800/60">
          {/* Main Brand & Interaction Suite (Spans 1 Column on Large screens) */}
          <div className="flex flex-col space-y-6 lg:col-span-1">
            <div>
              <img
                className="w-40 h-auto object-contain mb-4"
                src={logo}
                alt="Universe IT"
              />
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Equipping minds with global technical expertise. Universe IT
                Institute provides production-grade IT programs designed to
                launch paths into tech industries.
              </p>
            </div>

            {/* Premium Pill-Style Newsletter */}
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="w-full max-w-sm"
            >
              <div className="relative flex items-center bg-gray-900/80 rounded-full p-1.5 border border-gray-800 focus-within:border-primary/70 transition-all duration-300">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Subscribe to our tech updates"
                  className="bg-transparent pl-4 pr-2 py-2 text-xs text-white w-full outline-none placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-focus text-white px-5 py-2 text-xs font-semibold rounded-full transition-all shrink-0 tracking-wide shadow-md"
                >
                  Join
                </button>
              </div>
              {success && (
                <p className="text-xs text-emerald-400 mt-2 ml-3">
                  ✨ Subscription updated successfully.
                </p>
              )}
              {error && (
                <p className="text-xs text-rose-400 mt-2 ml-3">
                  ❌ Processing failed. Try again.
                </p>
              )}
            </form>
          </div>

          {/* Nav Directory Sub-Grid (Spans 2 Columns on Large Screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:col-span-2">
            {/* Column 1: Directory */}
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
                Explore
              </h6>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link
                    to="/aboutUs"
                    className="hover:text-white transition-colors"
                  >
                    About our vision
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faculties"
                    className="hover:text-white transition-colors"
                  >
                    Expert Faculty
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="hover:text-white transition-colors"
                  >
                    Resource Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/representative"
                    className="hover:text-white transition-colors"
                  >
                    Global Agents
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Dynamic Categories */}
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
                Popular Tracks
              </h6>
              <ul className="space-y-3 text-sm text-gray-400">
                {popularCategories?.slice(0, 5).map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/courses/${category.popularCategory}`}
                      className="hover:text-white transition-colors block truncate"
                    >
                      {category.popularCategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Index */}
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
                HQ Address
              </h6>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2.5 items-start">
                  <span className="text-primary mt-0.5">
                    <FaLocationDot size={14} />
                  </span>
                  <span className="text-xs leading-relaxed">
                    House #8 (8th floor), Block F, Banasree Main Rd, Rampura,
                    Dhaka 1219
                  </span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <span className="text-primary">
                    <IoIosMail size={16} />
                  </span>
                  <a
                    href="mailto:universeitinstitute@gmail.com"
                    className="text-xs hover:text-white truncate"
                  >
                    universeitinstitute@gmail.com
                  </a>
                </li>
                <li className="flex gap-2.5 items-center">
                  <span className="text-primary">
                    <IoIosCall size={16} />
                  </span>
                  <div className="text-xs space-x-2">
                    <a href="tel:01886-061401" className="hover:text-white">
                      01886-061401
                    </a>
                    <span>/</span>
                    <a href="tel:01821-779282" className="hover:text-white">
                      01821-779282
                    </a>
                  </div>
                </li>
              </ul>
              {/* Flat Monochromatic Social Deck */}
              <div className="flex items-center gap-6 order-1 md:order-2 mt-3 ml-4">
                <a
                  href="https://www.facebook.com/UniverseITInstitute"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/universe-it-institute/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@universeitinstitute9947"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <FaYoutube size={22} />
                </a>
                <a
                  href="https://github.com/universeIt137"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <FaGithubSquare size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Sub-Footer Utility Bar */}
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <p>© {new Date().getFullYear()} Universe IT Institute.</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/contact-us"
              className="hover:text-gray-400 transition-colors"
            >
              Help Desk
            </Link>
            <Link
              to="/photoGallery"
              className="hover:text-gray-400 transition-colors"
            >
              Media Gallery
            </Link>
            <Link
              to="/videoGallery"
              className="hover:text-gray-400 transition-colors"
            >
              Virtual Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
