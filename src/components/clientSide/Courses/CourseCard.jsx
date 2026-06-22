import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const CourseCard = ({ course = {}, isCoursePage = false }) => {
  const { bannerImages, category, title, courseFee, _id, instructors = [], discountFee = '0' } = course;
  const firstInstructor = instructors[0] || {};

  const cardStyle = 'w-[80vw] max-w-[280px] sm:w-[340px] sm:max-w-[300px] min-h-[280px] lg:min-h-[350px]'; // Set a consistent height
  const cardStyleForCoursePage = 'w-full max-w-[80vw] sm:max-w-[400px] min-h-[280px] lg:min-h-[350px]';
  const courseFeeInNum = parseInt(courseFee);
  const discountFeeInNum = parseInt(discountFee);
  const discount = discountFee === '0' ? '0' : Math.round((courseFeeInNum - discountFeeInNum) / courseFeeInNum * 100).toString();

  return (
    <Link to={`/courseDetails/${_id}`}>
      <div className={`card bg-base-100 mx-auto ${isCoursePage ?cardStyleForCoursePage :cardStyle} flex flex-col justify-between`}>
        <figure className="h-[100px] sm:h-[170px] relative">
          {discount !== '0' && (
            <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-0.5 rounded-bl-lg">
              {discount}% off
            </div>
          )}
          <img
            className="w-full h-full object-fill rounded-lg shadow-md"
            src={bannerImages[0]}
            alt="Course Banner"
          />
        </figure>
        <div className="card-body  flex flex-col justify-between px-3 sm:px-8 h-full ">
          <div className=" lg:space-y-3 flex-grow">
            <div className="flex justify-between">
              <p className="max-w-max px-3 rounded-sm text-[8px] lg:text-xs bg-primary text-white py-1">
                {category}
              </p>
              <Link to={`/courseDetails/${_id}`}>
                <p className="flex justify-end text-xl sm:text-2xl">
                  <LuArrowUpRight />
                </p>
              </Link>
            </div>
            <h2 className="font-bold text-text_color text-[12px] lg:text-base">
              {title}
            </h2>
          </div>
          <div className="flex items-end">
            {discountFee === '0' ? (
              <p className="text-center text-[12px] lg:text-base font-bold text-primary">
                {courseFee}৳
              </p>
            ) : (
              <p className="text-center text-[12px] lg:text-base font-bold text-secondary">
                <span className="font-normal">{discountFee}৳</span>{" "}
                <span className="line-through">{courseFee}৳</span>
              </p>
            )}
          </div>
          <button className="btn bg-orange-600 text-white w-full mt-4">See More</button>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
