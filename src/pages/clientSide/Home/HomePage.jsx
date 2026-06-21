import React, { useEffect } from 'react';
import Banner from '../../../components/clientSide/Banner/Banner';
import Courses from '../../../components/clientSide/Courses/Courses';
import Services from '../../../components/clientSide/Services/Services';
import { Helmet } from 'react-helmet-async';
import HomeFreeSeminar from '../../../components/clientSide/HomeFreeSeminar/HomeFreeSeminar';
import SuccessStories from '../../../components/clientSide/SuccessStories/SuccessStories';
import Testimonials from '../../../components/clientSide/Testimonials/Testimonials';
import CallUs from '../../../components/clientSide/CallUs/CallUs';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import Testimonial from '../../../components/clientSide/Testimonials/Testimonial';

const HomePage = () => {
    window.scrollTo(0, 0);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const { data: homepageContent = [], refetch: homepageContentRefetch, isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    })
    useEffect(() => {
        const milestones = document.getElementById('milestones');
        const seminar = document.getElementById('seminar');
        const successStory = document.getElementById('successStory');
        const feedback = document.getElementById('feedback');
        if (location.state?.scrollToMilestones && milestones) {
            milestones.scrollIntoView({ behavior: 'smooth' });
        }
        if (location.state?.scrollToSeminar && seminar) {
            seminar.scrollIntoView({ behavior: 'smooth' });
        }
        if (location.state?.scrollToSuccessStory && successStory) {
            successStory.scrollIntoView({ behavior: 'smooth' });
        }
        if (location.state?.scrollToFeedback && successStory) {
            feedback.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);
    if (isLoading) {
        return <Loading />
    }
    const data = homepageContent[0] || [];
    const scrollAnimationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };


    return (
        <>
            <Helmet>
                <title>Universe IT | Home</title>
            </Helmet>
            {/* <p onClick={handleNavigate}>hello</p> */}
            <div
            >
                <Banner bannerImg={data?.imageUrl || ''} data={data} notice={data?.notice || ''} />
            </div>


            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Courses />
            </motion.div>


            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Services />
            </motion.div>

            <motion.div
                id='seminar'
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <HomeFreeSeminar />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                id='successStory'
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <SuccessStories isHomePage={true} />
            </motion.div>
            <motion.div
                id='feedback'
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                {/* <Testimonials /> */}
                <Testimonial />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <CallUs />
            </motion.div>
        </>
    );
};

export default HomePage;
