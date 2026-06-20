/* eslint-disable react/prop-types */
import logo from "../../../assets/logo/mainLogo.png";
import logoWhite from "../../../assets/logo/whiteLogo.png"; // কালো ব্যাকগ্রাউন্ডের জন্য হোয়াইট লোগো ইমপোর্ট করে নিন
import { FiSearch, FiX } from "react-icons/fi";
import { FaAngleDown, FaBarsStaggered } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1150) { // subxl breakpoint
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseNavLinkStyle =
    "text-sm font-semibold text-gray-700 hover:text-primary py-2 px-1 relative transition-colors duration-200 tracking-wide";

  const getNavLinkClass = ({ isActive }) =>
    `${baseNavLinkStyle} ${isActive ? "text-primary font-bold" : ""}`;

  // মোবাইল ড্রয়ারের জন্য টেক্সটের কালার হোয়াইট করা হয়েছে
  const getMobileNavLinkClass = ({ isActive }) =>
    `text-base font-medium text-gray-300 hover:text-white py-2 block transition-colors ${isActive ? "text-primary font-bold" : ""}`;

  const navLinks = (isMobile = false) => (
    <div className={`flex ${isMobile ? "flex-col space-y-4 pt-4" : "flex-row items-center gap-6 xl:gap-8"}`}>
      {isMobile ? (
        <>
          <NavLink to="/" className={getMobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/mentors" className={getMobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Mentors</NavLink>
          <NavLink to="/feedback" className={getMobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Success Stories</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/mentors" className={getNavLinkClass}>Mentors</NavLink>
          <NavLink to="/feedback" className={getNavLinkClass}>Success Stories</NavLink>
        </>
      )}

      {/* Gallery Dropdown */}
      <div
        className="relative group py-2"
        onMouseEnter={() => !isMobile && setGalleryOpen(true)}
        onMouseLeave={() => !isMobile && setGalleryOpen(false)}
      >
        <button 
          onClick={() => isMobile && setGalleryOpen(!galleryOpen)}
          className={`flex items-center justify-between w-full subxl:w-auto gap-1.5 font-semibold transition-colors cursor-pointer outline-none ${isMobile ? 'text-sm text-gray-300 hover:text-white' : 'text-sm text-gray-700 group-hover:text-primary'}`}
        >
          <span>Gallery</span>
          <FaAngleDown
            size={14}
            className={`transition-transform duration-300 ${galleryOpen ? "rotate-180 text-primary" : "text-gray-400"}`}
          />
        </button>

        <div
          className={`${
            isMobile 
              ? `${galleryOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"} overflow-hidden transition-all duration-300` 
              : `absolute left-0 top-full pt-2 w-48 transition-all duration-200 origin-top-left ${galleryOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`
          }`}
        >
          <div className={`${isMobile ? "bg-black/40 border-l border-gray-700 pl-4" : "bg-white border border-gray-100 shadow-xl rounded-xl p-2"} flex flex-col gap-1`}>
            <NavLink
              to="/photoGallery"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors block ${isActive ? "text-primary font-semibold" : isMobile ? "text-gray-400" : "text-gray-600"}`
              }
            >
              Photo Gallery
            </NavLink>
            <NavLink
              to="/videoGallery"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors block ${isActive ? "text-primary font-semibold" : isMobile ? "text-gray-400" : "text-gray-600"}`
              }
            >
              Video Gallery
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white/95 backdrop-blur-md w-full border-b border-gray-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* Responsive Brand & Toggle Container */}
        <div className="flex flex-row justify-between items-center w-full subxl:w-auto">
          <Link to="/" className="flex items-center shrink-0">
            <img
              className="w-28 sm:w-36 h-auto object-contain"
              src={logo}
              alt="Universe IT Logo"
            />
          </Link>

          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="subxl:hidden text-gray-700 hover:text-primary transition-colors p-1 text-xl outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <FaBarsStaggered />
          </button>
        </div>

        {/* Desktop Search Field */}
        <div className="hidden subxl:block flex-1 max-w-md mx-8">
          <SearchInput />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden subxl:flex items-center">
          {navLinks(false)}
        </nav>

        {/* Desktop Action Button */}
        <div className="hidden subxl:block ml-6">
          <Link to="/courses">
            <button className="bg-primary text-white hover:bg-opacity-90 px-5 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow active:scale-[0.97]">
              Browse Courses
            </button>
          </Link>
        </div>
      </div>

      {/* image_e1cb27.png স্টাইলের ব্ল্যাক ড্রপডাউন মেনু ওভারলে */}
      <div className={`fixed inset-x-0 top-0 z-50 bg-[#0a0a0a] border-b border-gray-800 transition-all duration-300 ease-in-out shadow-2xl subxl:hidden ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <div className="w-full p-4 sm:p-6 flex flex-col">
          
          {/* কালো সেকশনের হেডার (ঠিক যেভাবে ছবিতে আছে) */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-800/80">
            <img className="w-32 h-auto object-contain" src={logoWhite || logo} alt="Universe IT" />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 active:scale-95"
            >
              <FiX size={24} />
            </button>
          </div>
          
          {/* ড্রয়ারের ভেতর আধুনিক উপায়ে সার্চবার প্লেসমেন্ট */}
          <div className="mt-4 w-full relative">
            <input
              className="pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 w-full rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
              type="text"
              placeholder="What do you want to learn?"
            />
            <FiSearch className="absolute top-3.5 left-3.5 text-gray-500 text-base" />
          </div>

          {/* মোবাইল নেভিগেশন লিংকসমূহ */}
          <div className="mt-2">
            {navLinks(true)}
          </div>

          {/* নিচের অ্যাকশন বাটন */}
          <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
            <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <button className="w-full text-center bg-primary text-white hover:bg-opacity-95 py-3 px-4 rounded-xl transition-all font-semibold text-sm shadow-md active:scale-[0.98]">
                Browse Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;