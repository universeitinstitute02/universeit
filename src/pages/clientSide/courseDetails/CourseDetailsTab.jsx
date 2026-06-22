import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CourseCategory from "../../../Shared/CourseCategory";
import Tabs from "./Tabs";
import Loading from "../../../Shared/Loading/Loading";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaQuoteLeft, FaGraduationCap, FaQuestionCircle } from "react-icons/fa";

const CourseDetailsTab = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [TabName, setTabName] = useState("Course Details");
  const [rows, setRowsOption] = useState(null);

  const { data: courseSemesters = [], isLoading: courseSemestersIsLoading } =
    useQuery({
      queryKey: ["singleCourseIdForSemester", id],
      queryFn: async () => {
        const res = await axiosPublic.get(`/semesterByCourse/course/${id}`);
        return res?.data;
      },
    });

  const { data: successStories = [] } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/successStory");
      return res.data;
    },
  });

  const filteredSuccessStories = successStories.filter(
    (story) => story.course_id === id,
  );

  const { data: courseCategories = [], isLoading: courseCategoriesIsLoading } =
    useQuery({
      queryKey: ["courseCategories", id],
      queryFn: async () => {
        const res = await axiosPublic.get(`/courseCategory/course/${id}`);
        return res?.data;
      },
    });

  const { data: courseObjectives = [], isLoading: courseObjectivesIsLoading } =
    useQuery({
      queryKey: ["courseObjective", id],
      queryFn: async () => {
        const res = await axiosPublic.get(`/objectives/course/${id}`);
        return res?.data;
      },
    });

  useEffect(() => {
    if (courseObjectives.length > 0 && rows) {
      rows[0]?.expand();
    }
  }, [courseObjectives, rows]);

  if (
    courseSemestersIsLoading ||
    courseCategoriesIsLoading ||
    courseObjectivesIsLoading
  ) {
    return <Loading />;
  }

  const courseObjective = courseObjectives[0] || {};
  const { objectiveFAQ = [] } = courseObjective;

  let convertedArray = objectiveFAQ.map((item) => {
    return {
      title: (
        <div className="flex items-center gap-3 py-1">
          <FaQuestionCircle className="text-primary text-lg flex-shrink-0" />
          <p className="font-bold text-gray-800 text-sm md:text-base">
            {item.question}
          </p>
        </div>
      ),
      content: (
        <div className="text-gray-600 text-sm leading-relaxed pl-7 pb-3">
          {item.answer}
        </div>
      ),
    };
  });

  const showingDataAtFAQ = {
    title: "",
    rows: convertedArray,
  };

  const config = {
    animate: true,
    arrowIcon: "V",
    openOnload: 1,
    expandIcon: "+",
    collapseIcon: "-",
  };

  const showingCategory =
    courseCategories?.find((category) => category?._id === TabName) || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Main Tabs Container */}
      <div className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 mb-12">
        <Tabs
          tabName={TabName}
          setTabName={setTabName}
          courseCategories={courseCategories}
        />

        {/* FAQ Content Area */}
        {TabName === "FAQ" && (
          <div className="mt-6 transition-all duration-300 bg-gray-50/50 rounded-xl p-4 md:p-6 border border-gray-100">
            {objectiveFAQ.length < 1 ? (
              <p className="py-10 text-center text-gray-500 font-medium">
                No FAQ Found
              </p>
            ) : (
              <div className="prose max-w-none custom-faq-wrapper">
                <Faq
                  config={config}
                  getRowOptions={setRowsOption}
                  data={showingDataAtFAQ}
                />
              </div>
            )}
          </div>
        )}

        {/* Category Content Area */}
        {showingCategory?.name && (
          <div className="mt-6">
            <CourseCategory category={showingCategory} />
          </div>
        )}

        {/* Course Details / Semesters Grid */}
        {TabName === "Course Details" && (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-gray-50 to-gray-100/60 p-6 rounded-2xl gap-4 border border-gray-200/50">
              {courseSemesters.map((semester) => (
                <div
                  className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                  key={semester._id}
                >
                  <div className="text-emerald-500 text-xl group-hover:scale-110 transition-transform">
                    <IoCheckmarkCircleOutline />
                  </div>
                  <p className="font-semibold text-gray-700 text-sm md:text-base">
                    {semester?.semesterTitle}
                  </p>
                </div>
              ))}
              {courseSemesters?.length < 1 && (
                <p className="py-8 text-center text-gray-500 font-medium col-span-full">
                  No Modules/Classes Available Yet!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Certification Section */}
      <div className="my-16 text-center">
        <h2 className="text-2xl md:text-4xl text-secondary font-black tracking-tight mb-4 flex items-center justify-center gap-2">
          What You Will Get{" "}
          <span className="text-primary bg-primary/5 px-3 py-1 rounded-xl">
            From This Course
          </span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-8">
          Earn an industry-recognized certificate to showcase your skills and
          level up your professional career.
        </p>
        <div className="w-full max-w-2xl mx-auto transform hover:scale-[1.02] transition-all duration-500 group">
          <div className="relative rounded-2xl overflow-hidden shadow-xl md:shadow-2xl border-4 border-white">
            <img
              src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1728218178/UniverseIT/nitgzsu14eguukizmcch.jpg"
              alt="Course Certificate"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Testimonials / Success Stories */}
      <div className="my-16">
        <div className="text-center mb-10">
          <span className="text-primary font-bold text-xs md:text-sm uppercase tracking-widest bg-primary/5 px-4 py-1.5 rounded-full inline-block mb-3">
            Testimonials
          </span>
          <h2 className="text-2xl md:text-4xl text-secondary font-black tracking-tight">
            Listen From Our <span className="text-primary">Learners</span>
          </h2>
        </div>

        {filteredSuccessStories?.length < 1 ? (
          <p className="text-center text-gray-400 italic">
            No reviews yet for this course.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredSuccessStories?.map((story) => (
              <div
                key={story?._id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <FaQuoteLeft className="absolute top-4 right-6 text-gray-100 text-4xl group-hover:text-primary/10 transition-colors pointer-events-none" />

                <div>
                  <p className="text-gray-600 text-sm leading-relaxed italic font-medium mb-6 relative z-10">
                    "
                    {story?.description.length > 220
                      ? `${story?.description.slice(0, 220)}...`
                      : story?.description}
                    "
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-gray-50 pt-4 mt-auto">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-2 overflow-hidden shadow-inner">
                      <img
                        src={story?.image}
                        alt="Learner"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base flex items-center gap-1.5">
                      Successful Learner
                    </h4>
                    <p className="text-xs text-primary font-semibold flex items-center gap-1">
                      <FaGraduationCap /> Verified Student
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsTab;
