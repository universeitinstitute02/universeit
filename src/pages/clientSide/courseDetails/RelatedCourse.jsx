import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";

const RelatedCourse = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/course");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const relatedCourses = courses
    ?.filter((course) => course?._id !== id)
    ?.slice(0, 3);

  return (
    <div className="py-5">
      <h2 className="text-lg font-bold text-gray-900">Related Courses</h2>
      <div className="flex flex-col gap-4 py-5">
        {relatedCourses?.map((course) => {
          // চেক করছি ডিসকাউন্ট ফি আছে কিনা
          const hasDiscount = course?.discountFee && Number(course?.discountFee) > 0;

          return (
            <div
              key={course?._id}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <Link to={`/courseDetails/${course?._id}`}>
                <img
                  className="h-36 w-full object-cover"
                  src={course?.bannerImages?.[0] || ""}
                  alt={course?.title}
                />
              </Link>
              <div className="space-y-3 p-4">
                <div>
                  <Link to={`/courseDetails/${course?._id}`}>
                    <h3 className="line-clamp-2 font-bold text-gray-900 hover:text-primary">
                      {course?.title}
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">
                    {course?.instructors?.[0]?.name}
                  </p>
                  <div className="mt-1 text-base text-primary">
                    <Rating
                      className="space-x-1"
                      emptySymbol={<FaRegStar />}
                      fullSymbol={<FaStar />}
                      initialRating={4.6}
                      readonly
                    />
                  </div>
                </div>

                {/* প্রাইসিং এবং এনরোল বাটন সেকশন */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-baseline gap-2">
                    {hasDiscount ? (
                      <>
                        {/* ডিসকাউন্ট ফি (হাইলাইটেড) */}
                        <p className="font-black text-lg text-secondary">
                          ৳{course?.discountFee}
                        </p>
                        {/* মেইন কোর্স ফি (কেটে দেওয়া হয়েছে) */}
                        <p className="text-sm font-medium text-gray-400 line-through">
                          ৳{course?.courseFee}
                        </p>
                      </>
                    ) : (
                      // ডিসকাউন্ট না থাকলে শুধু রেগুলার ফি দেখাবে
                      <p className="font-black text-lg text-secondary">
                        ৳{course?.courseFee}
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/onlineAdmission?courseId=${encodeURIComponent(course?._id || "")}`}
                  >
                    <ButtonStrong text="Enroll Now" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedCourse;