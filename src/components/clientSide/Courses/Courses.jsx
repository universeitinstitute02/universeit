import { useState } from "react";
import CourseCard from "./CourseCard";
import digitalMarketingImage from '../../../assets/coursesImg/digital marketing.jpg'
import webDesignImage from '../../../assets/coursesImg/web.jpg'
import graphicsDesignImage from '../../../assets/coursesImg/grphic.jpg'
import seoImage from '../../../assets/coursesImg/seo.jpg'
import fullStackImage from '../../../assets/coursesImg/fulStack.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ComponentsTitle from "../../../Shared/ComponentsTitle/ComponentsTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CourseTab from "../../../Shared/CourseTab/CourseTab";
import { Link } from "react-router-dom";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
const Courses = () => {
    const axiosPublic = useAxiosPublic()
    const [tabName, setTabName] = useState('All Courses')


    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })


    const filteredCourse = tabName === 'All Courses' ? courses : courses?.filter(course => course?.category === tabName)

    const mobileCourse = courses.slice(0, 4);

    return (
        <div className="bg-gray-100">
            <div className=" py-10 pb-20 sm:pb-10 space-y-5 max-w-7xl mx-auto">
                <ComponentsTitle title={'Our Demanding Courses'} description={'Elevate your skills with our demanding courses designed to push your boundaries and unlock your full potential.'} />
                <div className="px-5 space-y-10 hidden lg:block">
                    <CourseTab setTabName={setTabName} tabName={tabName} />
                    <div className="sm:px-16">
                        <div className="relative">
                            <div className="absolute w-full flex sm:justify-between h-full items-end justify-center sm:items-center top-14 gap-7 sm:top-0">
                                <div className="courses-prev-btn text-xl p-2 sm:p-3 rounded-full  cursor-pointer bg-primary/40 shadow-2xl hover:bg-primary/50 transition-all duration-100 active:scale-90 "><GrFormPrevious /></div>
                                <div className="courses-next-btn text-xl p-2 sm:p-3 rounded-full  cursor-pointer bg-primary/40 shadow-2xl hover:bg-primary/50 transition-all duration-100 active:scale-90"><GrFormNext /></div>
                            </div>
                            <div className="sm:px-16">
                                <Swiper
                                    navigation={{
                                        nextEl: '.courses-next-btn',
                                        prevEl: '.courses-prev-btn',
                                    }}
                                    modules={[Navigation]}
                                    spaceBetween={0}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 1,
                                        },
                                        890: {
                                            slidesPerView: 2,
                                        },
                                        1280: {
                                            slidesPerView: 3,
                                        },
                                    }}


                                    speed={300}
                                    className=""
                                >
                                    {
                                        filteredCourse?.map((course, idx) => <SwiperSlide key={idx} className="">
                                            <CourseCard key={idx} course={course} />
                                        </SwiperSlide>)
                                    }

                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:hidden grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-20 gap-5 md:gap-x-10 pt-10 px-5 '>
                    {
                        mobileCourse?.map((course, idx) => <CourseCard key={idx} course={course} isCoursePage={true} />)
                    }
                </div>

            </div>
            <div className="flex justify-center -mt-5 py-8">
                <Link to={'/courses'}>
                    <div className="w-max">
                        <ButtonStrong text={'View All'} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Courses;