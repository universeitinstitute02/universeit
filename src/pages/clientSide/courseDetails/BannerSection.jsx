/* eslint-disable react/prop-types */
import {
  FaCheckCircle,
  FaClock,
  FaGraduationCap,
  FaPhoneAlt,
  FaRegStar,
  FaRocket,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import CourseDetailsPageSubVideos from "./CourseDetailsPageSubVideos";
import MainVideo from "./MainVideo";
import SuccessStory from "./SuccessStory";
import RelatedCourse from "./RelatedCourse";
import CourseTabsAndShare from "./CourseTabsAndShare";

const BannerSection = ({ filteredSuccessStories, courseData }) => {
  const {
    _id,
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
    window.location.href = "tel:+8801755450127";
  };

  const admissionLink = `/onlineAdmission?courseId=${encodeURIComponent(_id || "")}`;
  const activeFee =
    discountFee && discountFee !== "0" ? discountFee : courseFee;

  return (
    <div className="mx-auto my-6 flex max-w-7xl flex-col-reverse items-start gap-6 px-4 sm:px-6 lg:flex-row lg:gap-8">
      <div className="w-full space-y-6 lg:w-2/3">
        <div className="hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:block">
          {videoUrl && (
            <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-inner">
              <MainVideo videoUrl={videoUrl} />
            </div>
          )}

          <section className="mt-6 rounded-xl border border-gray-200/60 bg-gradient-to-br from-gray-50 to-white p-5">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
              <span className="h-5 w-1.5 rounded-full bg-primary"></span>
              Technologies You Will Learn
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 xl:grid-cols-8">
              {technologies?.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="mb-2 grid h-12 w-12 place-items-center rounded-xl bg-gray-50 p-1 transition-transform group-hover:scale-105">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="line-clamp-1 text-center text-xs font-semibold text-gray-700">
                    {item?.name}
                  </p>
                </div>
              ))}
              {technologies?.length < 1 && (
                <p className="col-span-full py-4 text-center text-sm font-medium text-gray-500">
                  No technology added yet.
                </p>
              )}
            </div>
          </section>

          <div className="mt-6">
            <CourseDetailsPageSubVideos subVideos={subVideos} />
          </div>
          <CourseTabsAndShare />
        </div>
      </div>

      <aside className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 lg:sticky lg:top-24 lg:w-1/3 lg:shadow-xl">
        <div className="relative aspect-video overflow-hidden lg:aspect-[4/3]">
          <img
            src={
              bannerImages[0] ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900"
            }
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
            {category || "Course"}
          </span>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-1 text-xl font-extrabold leading-snug tracking-tight text-gray-900 lg:text-2xl">
                {title}
              </h1>
              <div className="mt-1 flex items-center gap-2 text-sm text-amber-500">
                <Rating
                  className="space-x-0.5"
                  emptySymbol={<FaRegStar />}
                  fullSymbol={<FaStar />}
                  initialRating={5}
                  readonly
                />
                <span className="text-xs font-medium text-gray-500">
                  (4.9/5 Rating)
                </span>
              </div>
            </div>

            <div className="min-w-[96px] rounded-xl border border-primary/10 bg-primary/5 p-2.5 text-right">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Course Fee
              </span>
              <p className="text-xl font-black text-primary">TK {activeFee}</p>
              {discountFee && discountFee !== "0" && (
                <p className="text-xs font-medium text-gray-400 line-through">
                  TK {courseFee}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-primary shadow-sm">
                <FaClock />
              </span>
              <span className="font-semibold">Flexible Batch</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-primary shadow-sm">
                <FaUsers />
              </span>
              <span className="font-semibold">Expert Support</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCallClick}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-800 transition-all hover:bg-gray-100 active:scale-[0.98]"
                type="button"
              >
                <FaPhoneAlt className="text-xs text-primary" />
                CALL NOW
              </button>

              <Link to="/freeSeminar" className="w-full">
                <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-secondary px-2 py-3 text-xs font-bold tracking-wide text-white shadow-sm shadow-secondary/20 transition-all hover:bg-secondary/90 active:scale-[0.98]">
                  <FaGraduationCap className="text-sm" />
                  FREE SEMINAR
                </button>
              </Link>
            </div>

            <Link to={admissionLink} className="block w-full pt-1">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-orange-500 px-6 py-3.5 text-sm font-extrabold tracking-wider text-white shadow-md shadow-primary/20 transition-all hover:opacity-95 active:scale-[0.98]">
                <FaRocket />
                ENROLL NOW
              </button>
            </Link>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800">
              This course includes:
            </p>
            <ul className="space-y-2.5">
              {keyFeatures?.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <FaCheckCircle className="mt-0.5 flex-shrink-0 text-base text-emerald-500" />
                  <span className="font-medium leading-tight">{item}</span>
                </li>
              ))}
              {keyFeatures?.length < 1 && (
                <li className="py-2 text-center text-xs italic text-gray-400">
                  Key features will be updated soon.
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-100 bg-gray-50/40 p-4">
          <div className="lg:hidden">
            {videoUrl && (
              <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-md">
                <MainVideo videoUrl={videoUrl} />
              </div>
            )}

            <section className="mt-4 rounded-xl border border-gray-200/60 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-gray-800">
                Technologies you will learn
              </p>
              <div className="grid grid-cols-4 gap-3">
                {technologies?.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-1">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="max-h-full object-contain"
                      />
                    </div>
                    <p className="mt-1 w-full truncate text-center text-[10px] font-bold text-gray-600">
                      {item?.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <SuccessStory filteredSuccessStories={filteredSuccessStories} />
          <RelatedCourse />
        </div>
      </aside>
    </div>
  );
};

export default BannerSection;
