import { IoIosMail } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";

const AddressNavbar = () => {
  // Ultra-modern white/translucent interactive button styles
  const socialIconsStyle = `text-base size-8 sm:size-9 bg-white/10 hover:bg-white text-white hover:text-primary rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 active:scale-90 shadow-sm`;

  const socialIcons = (
    <div className="flex items-center gap-3">
      <Link 
        to="https://www.facebook.com/UniverseITInstitute" 
        target="_blank" 
        rel="noreferrer"
        aria-label="Facebook"
      >
        <span className={socialIconsStyle}><FaFacebookF size={14} /></span>
      </Link>

      <Link 
        to="https://www.linkedin.com/company/universe-it-institute/" 
        target="_blank" 
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <span className={socialIconsStyle}><FaLinkedinIn size={14} /></span>
      </Link>

      <Link 
        to="https://www.youtube.com/@universeitinstitute9947" 
        target="_blank" 
        rel="noreferrer"
        aria-label="YouTube"
      >
        <span className={socialIconsStyle}><IoLogoYoutube size={15} /></span>
      </Link>
    </div>
  );

  return (
    <div className="w-full bg-primary text-white py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 shadow-sm selection:bg-white selection:text-primary">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6">
        
        {/* Contact Links Block: Visible on tablets and desktop panels */}
        <div className="hidden md:flex items-center gap-x-8 text-sm font-medium">
          <a 
            href="mailto:universeitinstitute@gmail.com" 
            className="flex items-center gap-2 hover:text-white/80 transition-colors py-1 group"
          >
            <IoIosMail className="text-lg text-white/90 group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">universeitinstitute@gmail.com</span>
          </a>
          
          <a 
            href="tel:01886-061401" 
            className="flex items-center gap-2 hover:text-white/80 transition-colors py-1 group"
          >
            <BiSolidPhoneCall className="text-base text-white/90 group-hover:rotate-12 transition-transform" />
            <span className="tracking-wide">01886-061401</span>
          </a>
        </div>

        {/* Action Widgets Floor: Center on mobile, snap right on desktop */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 sm:gap-6">
          
          {/* Social Platforms Container */}
          <div className="shrink-0">
            {socialIcons}
          </div>
          
          {/* Action Call Button Container */}
          <div className="flex items-center">
            <Link to="/certified">
              <button className="h-9 sm:h-10 px-4 sm:px-5 bg-white text-primary hover:bg-neutral hover:text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 transform active:scale-95 tracking-wide">
                Certificate Verification
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddressNavbar;