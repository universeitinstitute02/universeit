import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { FaAngleDown, FaBarsStaggered } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo/mainLogo.png";
import logoWhite from "../../../assets/logo/whiteLogo.png";
import SearchInput from "./SearchInput";

const mainNavItems = [
  { label: "Home", to: "/" },
  { label: "Mentors", to: "/mentors" },
  { label: "Success Stories", to: "/feedback" },
];

const galleryItems = [
  { label: "Photo Gallery", to: "/photoGallery" },
  { label: "Video Gallery", to: "/videoGallery" },
];

const getInTouchItems = [
  { label: "About Us", to: "/aboutUs" },
  { label: "Blogs", to: "/blogs" },
  { label: "Career", to: "/career" },
  { label: "Representative", to: "/representative" },
  { label: "Contact Us", to: "/contact-us" },
];

const Navbar = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [getInTouchOpen, setGetInTouchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1150) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const baseNavLinkStyle =
    "text-sm font-semibold text-gray-700 hover:text-primary py-2 px-1 relative transition-colors duration-200 tracking-wide";

  const getNavLinkClass = ({ isActive }) =>
    `${baseNavLinkStyle} ${isActive ? "text-primary font-bold" : ""}`;

  const getMobileNavLinkClass = ({ isActive }) =>
    `flex items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
      isActive
        ? "bg-primary text-white"
        : "text-gray-200 hover:bg-white/10 hover:text-white"
    }`;

  const getDropdownLinkClass = (isMobile, isActive) =>
    `block rounded-lg px-4 py-2 text-sm transition-colors ${
      isActive
        ? "text-primary font-semibold"
        : isMobile
          ? "text-gray-300 hover:text-white"
          : "text-gray-600 hover:bg-gray-50 hover:text-primary"
    }`;

  const renderNavItem = ({ label, to }, isMobile) => (
    <NavLink
      key={to}
      to={to}
      className={isMobile ? getMobileNavLinkClass : getNavLinkClass}
      onClick={isMobile ? closeMobileMenu : undefined}
    >
      {label}
    </NavLink>
  );

  const renderDropdown = ({ label, items, isOpen, setIsOpen }, isMobile) => (
    <div
      key={label}
      className="relative group py-1"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <button
        onClick={() => isMobile && setIsOpen((value) => !value)}
        className={`flex w-full items-center justify-between gap-1.5 rounded-xl font-semibold transition-colors ${
          isMobile
            ? "px-4 py-3 text-base text-gray-200 hover:bg-white/10 hover:text-white"
            : "text-sm text-gray-700 group-hover:text-primary"
        }`}
        type="button"
      >
        <span>{label}</span>
        <FaAngleDown
          size={14}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : "text-gray-400"
          }`}
        />
      </button>

      <div
        className={
          isMobile
            ? `${
                isOpen
                  ? "mt-2 max-h-40 opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              } overflow-hidden transition-all duration-300`
            : `absolute left-0 top-full z-20 w-48 origin-top-left pt-2 transition-all duration-200 ${
                isOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`
        }
      >
        <div
          className={`flex flex-col gap-1 ${
            isMobile
              ? "ml-4 border-l border-gray-700 bg-black/30 pl-3"
              : "rounded-xl border border-gray-100 bg-white p-2 shadow-xl"
          }`}
        >
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={isMobile ? closeMobileMenu : undefined}
              className={({ isActive }) =>
                getDropdownLinkClass(isMobile, isActive)
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );

  const navLinks = (isMobile = false) => (
    <div
      className={`flex ${
        isMobile ? "flex-col gap-2 pt-4" : "flex-row items-center gap-6 xl:gap-8"
      }`}
    >
      {mainNavItems.map((item) => renderNavItem(item, isMobile))}
      {[
        {
          label: "Gallery",
          items: galleryItems,
          isOpen: galleryOpen,
          setIsOpen: setGalleryOpen,
        },
        {
          label: "Get In Touch",
          items: getInTouchItems,
          isOpen: getInTouchOpen,
          setIsOpen: setGetInTouchOpen,
        },
      ].map((item) => renderDropdown(item, isMobile))}
    </div>
  );

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-row items-center justify-between subxl:w-auto">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              className="h-auto w-28 object-contain sm:w-36"
              src={logo}
              alt="Universe IT Logo"
            />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-xl text-gray-700 transition-colors hover:text-primary subxl:hidden"
            aria-label="Open Navigation Menu"
            type="button"
          >
            <FaBarsStaggered />
          </button>
        </div>

        <div className="mx-8 hidden max-w-md flex-1 subxl:block">
          <SearchInput />
        </div>

        <nav className="hidden items-center subxl:flex">{navLinks(false)}</nav>

        <div className="ml-6 hidden subxl:block">
          <Link to="/courses">
            <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:shadow active:scale-[0.97]">
              Browse Courses
            </button>
          </Link>
        </div>
      </div>

      <button
        aria-label="Close Navigation Overlay"
        onClick={closeMobileMenu}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 subxl:hidden ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        type="button"
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[86vw] max-w-[360px] border-r border-gray-800 bg-white shadow-2xl transition-transform duration-300 ease-out subxl:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full w-full flex-col overflow-y-auto p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-4">
            <img
              className="h-auto w-32 object-contain"
              src={logo}
              alt="Universe IT"
            />
            <button
              onClick={closeMobileMenu}
              className="rounded-full p-2 text-secondary transition-colors hover:bg-white/5 hover:text-white active:scale-95"
              aria-label="Close Navigation Menu"
              type="button"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="relative mt-4 w-full">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white shadow-inner transition-all placeholder:text-gray-500 focus:border-primary/50 focus:outline-none"
              type="text"
              placeholder="What do you want to learn?"
            />
            <FiSearch className="absolute left-3.5 top-3.5 text-base text-gray-500" />
          </div>

          <div className="mt-2">{navLinks(true)}</div>

          <div className="mt-auto border-t border-zinc-900 pt-6">
            <Link to="/courses" onClick={closeMobileMenu} className="w-full">
              <button className="w-full rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-opacity-95 active:scale-[0.98]">
                Browse Courses
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
