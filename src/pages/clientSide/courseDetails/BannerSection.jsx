/* eslint-disable react/prop-types */
import { FaRegStar, FaStar, FaPhoneAlt, FaGraduationCap, FaCheckCircle, FaRocket } from "react-icons/fa";
import Rating from "react-rating";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { Link } from "react-router-dom";
import CourseDetailsPageSubVideos from "./CourseDetailsPageSubVideos";
import MainVideo from "./MainVideo";
import CourseTabsAndShare from "./CourseTabsAndShare";
import SuccessStory from "./SuccessStory";
import RelatedCourse from "./RelatedCourse";

const BannerSection = ({ filteredSuccessStories, courseData }) => {
  const {
    category,
    title,
    videoUrl,
    bannerImages = [],
    subVideos,
    courseFee,
    discountFee,
    technologies = [],
    keyFeatures = [],
  } = courseData;

  const handleCallClick = () => {
    window.location.href = `tel:+8801755450127`;
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row my-4 gap-6 lg:gap-8 items-start max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Left Column: Main Content (Video & Technologies) */}
      <div className="w-full lg:w-2/3 space-y-6">
        
        {/* Desktop Main Video Card */}
        <div className="hidden lg:block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
          {videoUrl && (
            <div className="rounded-xl overflow-hidden shadow-inner bg-black aspect-video">
              <MainVideo videoUrl={videoUrl} />
            </div>
          )}

          {/* Technologies Section */}
          <section className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-primary rounded-full"></span>
              Technologies You Will Learn
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {technologies?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="avatar mb-2">
                    <div className="w-12 h-12 rounded-xl p-1 bg-gray-50 group-hover:scale-105 transition-transform">
                      <img src={item?.image} alt={item?.name} className="object-contain w-full h-full" />
                    </div>
                  </div>
                  <p className="font-semibold text-xs text-gray-700 text-center line-clamp-1">{item?.name}</p>
                </div>
              ))}
              {technologies?.length < 1 && (
                <p className="font-medium text-sm text-gray-500 text-center col-span-full py-4">
                  No technology added yet.
                </p>
              )}
            </div>
          </section>

          {/* Sub Videos */}
          <div className="mt-6">
            <CourseDetailsPageSubVideos subVideos={subVideos} />
          </div>

          {/* Desktop Tabs */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <CourseTabsAndShare />
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Sidebar / Premium Course Card */}
      <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-gray-100 shadow-lg lg:shadow-xl overflow-hidden lg:sticky lg:top-6 transition-all duration-300">
        
        {/* Banner Image Area */}
        <div className="relative group overflow-hidden aspect-video lg:aspect-[4/3]">
          <img 
            src={bannerImages[0] || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {category || "Course"}
          </span>
        </div>

        {/* Course Core Details */}
        <div className="p-6">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="font-extrabold text-xl lg:text-2xl text-gray-900 leading-snug tracking-tight mb-1">
                {title}
              </h1>
              <div className="flex items-center gap-2 text-amber-500 text-sm mt-1">
                <Rating
                  className="space-x-0.5"
                  emptySymbol={<FaRegStar />}
                  fullSymbol={<FaStar />}
                  initialRating={5}
                  readonly
                />
                <span className="text-gray-500 font-medium text-xs">(4.9/5 Rating)</span>
              </div>
            </div>

            {/* Pricing Tag Design */}
            <div className="text-right min-w-[90px] bg-primary/5 p-2.5 rounded-xl border border-primary/10">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Course Fee</span>
              {discountFee === "0" || !discountFee ? (
                <p className="text-xl font-black text-primary">{courseFee}৳</p>
              ) : (
                <div>
                  <p className="text-xl font-black text-primary">{discountFee}৳</p>
                  <p className="text-xs text-gray-400 line-through font-medium">{courseFee}৳</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons Group */}
          <div className="space-y-3 mt-6">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleCallClick}
                className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-xl border border-gray-200 transition-all text-sm active:scale-[0.98]"
              >
                <FaPhoneAlt className="text-primary text-xs animate-pulse" />
                CALL NOW
              </button>
              
              <Link to="/freeSeminar" className="w-full">
                <button className="w-full flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-2 rounded-xl transition-all text-xs tracking-wide active:scale-[0.98] shadow-sm shadow-secondary/20">
                  <FaGraduationCap className="text-sm" />
                  FREE SEMINAR
                </button>
              </Link>
            </div>

            <Link to="/onlineAdmission" className="block w-full pt-1">
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-orange-500 hover:opacity-95 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all text-sm tracking-wider shadow-md shadow-primary/20 active:scale-[0.98]">
                <FaRocket />
                ENROLL NOW
              </button>
            </Link>
          </div>

          {/* Course Features List */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              This course includes:
            </p>
            <ul className="space-y-2.5">
              {keyFeatures?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0 text-base" />
                  <span className="font-medium leading-tight">{item}</span>
                </li>
              ))}
              {keyFeatures?.length < 1 && (
                <li className="text-gray-400 text-xs italic text-center py-2">
                  Key features will be updated soon.
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Mobile-Only Video & Technologies View */}
        <div className="lg:hidden border-t border-gray-100 bg-gray-50/50 p-4 space-y-4">
          {videoUrl && (
            <div className="rounded-xl overflow-hidden shadow-md bg-black aspect-video">
              <MainVideo videoUrl={videoUrl} />
            </div>
          )}

          <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60">
            <p className="font-bold text-sm text-gray-800 mb-3">Technologies you will learn</p>
            <div className="grid grid-cols-4 gap-3">
              {technologies?.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg p-1 bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <img src={item?.image} alt="" className="object-contain max-h-full" />
                  </div>
                  <p className="font-bold text-[10px] text-gray-600 mt-1 text-center truncate w-full">{item?.name}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-white rounded-xl p-2 shadow-sm">
            <CourseTabsAndShare />
          </div>
        </div>

        {/* Success Stories & Related Courses inside Sidebar Flow */}
        <div className="p-4 bg-gray-50/30 border-t border-gray-100 space-y-4">
          <SuccessStory filteredSuccessStories={filteredSuccessStories} />
          <RelatedCourse />
        </div>

      </div>
    </div>
  );
};

export default BannerSection;