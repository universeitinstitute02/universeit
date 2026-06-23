import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AboutBanner = () => {
    const axiosPublic = useAxiosPublic();
    
    const { data: homepageContent = [], isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent');
            return res?.data;
        }
    });

    // Skeleton Loading State for a seamless User Experience
    if (isLoading) {
        return (
            <div className='max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center animate-pulse'>
                <div className='space-y-6'>
                    <div className='h-6 bg-gray-200 rounded w-1/3'></div>
                    <div className='h-12 bg-gray-200 rounded w-3/4'></div>
                    <div className='space-y-2'>
                        <div className='h-4 bg-gray-200 rounded'></div>
                        <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                        <div className='h-4 bg-gray-200 rounded w-2/3'></div>
                    </div>
                    <div className='h-12 bg-gray-200 rounded-xl w-40'></div>
                </div>
                <div className='h-[400px] bg-gray-200 rounded-2xl'></div>
            </div>
        );
    }

    const {
        aboutTitle: incomingAboutTitle,
        aboutSubTitle: incomingAboutSubTitle,
        aboutdesc: incomingAboutDesc,
        aboutImage: incomingAboutImg 
    } = homepageContent[0] || {};

    return (
        <section className='relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50 py-16 md:py-24'>
            {/* Optional decorative background blur */}
            <div className='absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl' />
            
            <div className='max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center'>
                
                {/* Content Column */}
                <div className='text-center md:text-left space-y-6 lg:max-w-xl'>
                    {/* Subtitle / Kicker */}
                    {incomingAboutSubTitle && (
                        <span className='inline-block text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full'>
                            {incomingAboutSubTitle}
                        </span>
                    )}
                    
                    {/* Main Heading */}
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight'>
                        {incomingAboutTitle}
                    </h2>

                    {/* Description */}
                    <p className='text-base sm:text-lg text-slate-600 leading-relaxed font-normal'>
                        {incomingAboutDesc}
                    </p>

                    {/* Call to Action */}
                    <div className='pt-2 flex justify-center md:justify-start'>
                        <Link to="/courses">
                            <button className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-base font-semibold rounded-xl shadow-md shadow-primary/20 hover:bg-opacity-90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                Browse Courses
                                <svg 
                                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Image Column */}
                <div className='relative group mx-auto md:mx-0 w-full max-w-md md:max-w-none'>
                    <img 
                            src={incomingAboutImg} 
                            className='w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105' 
                            alt={incomingAboutTitle || "About Us Banner"} 
                            loading="lazy"
                        />
                </div>

            </div>
        </section>
    );
};

export default AboutBanner;