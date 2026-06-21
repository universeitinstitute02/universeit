import ComponentsTitle from "../../../Shared/ComponentsTitle/ComponentsTitle";
import CourseCard from "../../../components/clientSide/Courses/CourseCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CourseTab from "../../../Shared/CourseTab/CourseTab";
import CoursesRadioStyle from "./CoursesRadioStyle";
import Loading from "../../../Shared/Loading/Loading";
import FilterDrawer from "./FilterDrawer";

const CoursesPage = () => {
  const axiosPublic = useAxiosPublic();
  const [tabName, setTabName] = useState("All Courses");

  const { data: popularCategories = [], isLoading: isLoadingPopular } =
    useQuery({
      queryKey: ["popularCategories"],
      queryFn: async () => {
        const res = await axiosPublic.get("/popular-category");
        return res.data;
      },
    });

  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/course");
      return res.data;
    },
  });

  // ডাটা লোড হওয়ার আগ পর্যন্ত স্ক্রিন এখানেই আটকে থাকবে (Early Return)
  if (isLoadingCourses || isLoadingPopular) {
    return <Loading />;
  }

  // ফিল্টারিং লজিক
  const filteredCourse =
    tabName === "All Courses"
      ? courses
      : courses?.filter(
          (course) =>
            course?.category === tabName || course?.popularCategory === tabName,
        );

  return (
    <>
      <Helmet>
        <title>Universe IT | Courses</title>
      </Helmet>
      <div className="bg-gray-100 min-h-screen">
        <div className="py-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Sidebar Filter - Desktop only */}
            <div className="min-w-[240px] bg-white hidden md:block rounded-sm overflow-hidden h-fit shadow-sm">
              <div className="p-5 space-y-2 border-b border-gray-100">
                <CoursesRadioStyle
                  tabName={tabName}
                  setTabName={setTabName}
                  name={"All Courses"}
                />
                <CoursesRadioStyle
                  tabName={tabName}
                  setTabName={setTabName}
                  name={"Online"}
                />
                <CoursesRadioStyle
                  tabName={tabName}
                  setTabName={setTabName}
                  name={"Offline"}
                />
                <CoursesRadioStyle
                  tabName={tabName}
                  setTabName={setTabName}
                  name={"Corporate"}
                />
              </div>

              <div className="p-5 space-y-2">
                <p className="font-semibold text-gray-700 mb-3">
                  Search By Popular Courses
                </p>
                {/* এখানে আলাদা isLoading চেকের আর প্রয়োজন নেই কারণ উপরে গ্লোবাল হ্যান্ডেল করা আছে */}
                {popularCategories.map((category, idx) => (
                  <CoursesRadioStyle
                    key={idx}
                    tabName={tabName}
                    setTabName={setTabName}
                    name={`${category.popularCategory}`}
                  />
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <ComponentsTitle
                title={"Our Demanding Courses"}
                description={
                  "Elevate your skills with our demanding courses designed to push your boundaries and unlock your full potential."
                }
              />

              <div className="flex items-center gap-2 mt-4">
                <CourseTab
                  setTabName={setTabName}
                  tabName={tabName}
                  isCoursePage={true}
                />
                {/* Mobile Filter Drawer */}
                <div className="w-full block md:hidden">
                  <FilterDrawer
                    tabName={tabName}
                    setTabName={setTabName}
                    isLoading={isLoadingCourses}
                    popularCategories={popularCategories}
                  />
                </div>
              </div>

              {/* Courses Grid */}
              {filteredCourse.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-x-8 pt-10">
                  {filteredCourse.map((course, idx) => (
                    <CourseCard key={idx} course={course} isCoursePage={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  No courses found in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
